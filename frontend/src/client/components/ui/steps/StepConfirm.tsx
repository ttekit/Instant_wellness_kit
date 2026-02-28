import { useState, useEffect } from 'react'
import { Row } from '../ModalUI'
import { Product } from '../../../data/products'

interface CreateOrderPayload {
  userId: number;
  subtotal: number;
  composite_tax_rate: number;
  tax_amount: number;
  total_amount: number;
  jurisdictionIds?: number[];
}

interface Jurisdiction {
  id: number;
  name: string;
  type: string;
}

interface CardDetails {
  number: string;
  expiry: string;
}

interface BillingRecord {
  id: number;
  userId: number;
  paymentMethod: string;
  details: CardDetails;
}

type Props = {
  product: Product;
  coords: { lat: number; lng: number };
  onNext: (serverOrderId: number) => void
}

export default function StepConfirm({ product, coords, onNext }: Props) {
  const [loading, setLoading] = useState<boolean>(false)
  const [jurisdictionId, setJurisdictionId] = useState<number | null>(null)

  const [billingId, setBillingId] = useState<number | null>(null)
  const [savedCard, setSavedCard] = useState<CardDetails | null>(null)
  const [showPaymentForm, setShowPaymentForm] = useState<boolean>(false)
  const [cardNumber, setCardNumber] = useState<string>('')
  const [expiry, setExpiry] = useState<string>('')
  const [savingCard, setSavingCard] = useState<boolean>(false)
  const [noCardError, setNoCardError] = useState<boolean>(false)

  useEffect(() => {
    const fetchJurisdictions = async () => {
      try {
        const token = localStorage.getItem('access_token')
        if (!token) return
        const res = await fetch(import.meta.env.VITE_API_JURISDICTIONS_URL, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (res.ok) {
          const data: Jurisdiction[] = await res.json()
          if (data.length > 0) setJurisdictionId(data[0].id)
        }
      } catch (e) { console.log(e) }
    }

    const fetchBilling = async () => {
      try {
        const token = localStorage.getItem('access_token')
        if (!token) return
        const payload = JSON.parse(atob(token.split('.')[1]))
        const currentUserId = Number(payload.sub || payload.id)
        const res = await fetch(import.meta.env.VITE_API_BILLINGS_URL, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (res.ok) {
          const allBillings: BillingRecord[] = await res.json()
          const userBilling = allBillings.find(b => b.userId === currentUserId)
          if (userBilling) {
            setBillingId(userBilling.id)
            setSavedCard(userBilling.details)
          }
        }
      } catch (e) { console.log(e) }
    }

    fetchJurisdictions()
    fetchBilling()
  }, [])

  const formatCard = (v: string) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  const formatExpiry = (v: string) => {
    const c = v.replace(/\D/g, '').slice(0, 4)
    return c.length >= 3 ? `${c.slice(0, 2)}/${c.slice(2)}` : c
  }

  const handleSaveCard = async () => {
    if (cardNumber.length < 19 || expiry.length < 5) return
    setSavingCard(true)
    try {
      const token = localStorage.getItem('access_token')
      if (!token) return
      const payload = JSON.parse(atob(token.split('.')[1]))
      const currentUserId = Number(payload.sub || payload.id)
      const cardDetails: CardDetails = { number: cardNumber, expiry }
      const url = billingId
        ? `${import.meta.env.VITE_API_BILLINGS_URL}/${billingId}`
        : import.meta.env.VITE_API_BILLINGS_URL
      const method = billingId ? 'PATCH' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userId: currentUserId, paymentMethod: 'CREDIT_CARD', details: cardDetails })
      })
      if (res.ok) {
        const savedData: BillingRecord = await res.json()
        setBillingId(savedData.id)
        setSavedCard(cardDetails)
        setShowPaymentForm(false)
        setNoCardError(false)
      }
    } catch (e) { console.error(e) }
    finally { setSavingCard(false) }
  }

  const handlePlaceOrder = async (): Promise<void> => {
    if (!savedCard) {
      setNoCardError(true)
      setShowPaymentForm(true)
      return
    }
    setLoading(true)
    try {
      const token = localStorage.getItem('access_token')
      if (!token) return
      const payload = JSON.parse(atob(token.split('.')[1]))
      const userId = Number(payload.sub || payload.id)
      const orderData: CreateOrderPayload = {
        userId,
        subtotal: product.price,
        composite_tax_rate: 0,
        tax_amount: 0,
        total_amount: product.price,
        jurisdictionIds: jurisdictionId ? [jurisdictionId] : []
      }
      const res = await fetch(import.meta.env.VITE_API_ORDERS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(orderData)
      })
      if (res.ok) {
        const savedOrder = await res.json()
        window.dispatchEvent(new Event('order_placed'))
        onNext(Number(savedOrder.id))
      }
    } catch (e) { console.log(e) }
    finally { setLoading(false) }
  }

  return (
    <div className="field-row">
      <h3 className="font-black text-gray-900 text-base mb-1">Confirm Your Order</h3>
      <p className="text-xs text-gray-400 mb-4">Review the details and place your order</p>

      <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-2.5">
        <Row label="Kit" value={product.name} />
        <Row label="Delivery to" value={`${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`} />
        <Row label="Est. arrival" value={product.time} />
        <div className="border-t border-gray-200 pt-2.5 flex items-center justify-between">
          <span className="text-xs font-bold text-gray-700">Total</span>
          <span className="text-sm font-black text-gray-900">${product.price.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment section */}
      {savedCard && !showPaymentForm && (
        <div className="payment-enter payment-card flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-5 bg-[#1a5c3a] rounded flex items-center justify-center">
              <span className="text-[9px] text-white font-bold">CARD</span>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800">•••• •••• •••• {savedCard.number.replace(/\s/g, '').slice(-4)}</p>
              <p className="text-[10px] text-gray-400">Expires {savedCard.expiry}</p>
            </div>
          </div>
          <button onClick={() => setShowPaymentForm(true)}
            className="text-xs text-gray-400 hover:text-gray-600 outline-none border-0 bg-transparent transition-colors">
            Change
          </button>
        </div>
      )}

      {showPaymentForm && (
        <div className="payment-enter bg-gray-50 rounded-xl p-4 border border-gray-100 mb-4">
          {noCardError && (
            <div className="flex items-center gap-2 bg-red-50 text-red-500 text-xs font-semibold px-3 py-2 rounded-lg mb-3">
              <span>⚠️</span> Please add a payment method to continue
            </div>
          )}
          <p className="text-xs font-bold text-gray-700 mb-3">
            {noCardError ? 'Add Payment Card' : 'Update Payment Card'}
          </p>
          <div className="field-row mb-3">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Card Number</label>
            <div className="iw flex items-center border border-gray-200 rounded-xl px-3 py-2 bg-white">
              <input type="text" placeholder="4242 4242 4242 4242" value={cardNumber}
                onChange={e => setCardNumber(formatCard(e.target.value))}
                className="flex-1 text-sm text-gray-800 placeholder-gray-300 outline-none bg-transparent" />
            </div>
          </div>
          <div className="field-row mb-3">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Expiry</label>
            <div className="iw flex items-center border border-gray-200 rounded-xl px-3 py-2 bg-white">
              <input type="text" placeholder="MM/YY" value={expiry}
                onChange={e => setExpiry(formatExpiry(e.target.value))}
                className="flex-1 text-sm text-gray-800 placeholder-gray-300 outline-none bg-transparent" />
            </div>
          </div>
          <div className="field-row flex items-center gap-3">
            <button onClick={handleSaveCard} disabled={savingCard}
              className="sbtn flex-1 bg-[#1a5c3a] text-white py-2 rounded-xl text-xs font-semibold outline-none border-0 disabled:opacity-50">
              {savingCard ? 'Saving...' : 'Save Card'}
            </button>
            {!noCardError && (
              <button onClick={() => setShowPaymentForm(false)}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors outline-none border-0 bg-transparent">
                Cancel
              </button>
            )}
          </div>
        </div>
      )}

      {!savedCard && !showPaymentForm && (
        <button
          onClick={() => { setNoCardError(false); setShowPaymentForm(true) }}
          className="payment-enter w-full border border-dashed border-gray-300 rounded-xl py-2.5 text-xs text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-all mb-4 bg-transparent outline-none">
          + Add payment method
        </button>
      )}

      <p className="text-[10px] text-gray-400 text-center mb-4">You pay only the kit price. No sales tax is added to your order.</p>

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className="sbtn w-full bg-[#1a5c3a] text-white py-3 rounded-xl text-sm font-semibold outline-none border-0 disabled:opacity-50"
      >
        {loading ? 'Processing...' : `Place Order — $${product.price.toFixed(2)}`}
      </button>
    </div>
  )
}