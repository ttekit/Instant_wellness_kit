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
  packageId: number;
}

interface Jurisdiction {
  id: number;
  name: string;
  type: string;
}

type Props = {
  product: Product;
  coords: { lat: number; lng: number };
  onNext: (serverOrderId: number) => void
}

export default function StepConfirm({ product, coords, onNext }: Props) {
  const [loading, setLoading] = useState<boolean>(false)
  const [jurisdictionId, setJurisdictionId] = useState<number | null>(null)

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
          if (data.length > 0) {
            setJurisdictionId(data[0].id)
          }
        }
      } catch (e) {
        console.log(e)
      }
    }

    fetchJurisdictions()
  }, [])

  const handlePlaceOrder = async (): Promise<void> => {
    setLoading(true)
    try {
      const token = localStorage.getItem('access_token')
      if (!token) return

      const payload = JSON.parse(atob(token.split('.')[1]))
      const userId = Number(payload.sub || payload.id)

      const orderData: CreateOrderPayload = {
        userId: userId,
        subtotal: product.price,
        composite_tax_rate: 0,
        tax_amount: 0,
        total_amount: product.price,
        jurisdictionIds: jurisdictionId ? [jurisdictionId] : [],
        packageId: product.id
      }

      const res = await fetch(import.meta.env.VITE_API_ORDERS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      })

      if (res.ok) {
        const savedOrder = await res.json()
        window.dispatchEvent(new Event('order_placed'))
        onNext(Number(savedOrder.id))
      } else {
        const errorData = await res.json()
        console.error('Order error:', errorData)
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="field-row">
      <h3 className="font-black text-gray-900 text-base mb-1">Confirm Your Order</h3>
      <p className="text-xs text-gray-400 mb-4">Review the details and place your order</p>

      <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-2.5">
        <Row label="Kit" value={product.package || product.package} />
        <Row label="Delivery to" value={`${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`} />
        <Row label="Est. arrival" value={product.time || '20-25 min'} />
        <div className="border-t border-gray-200 pt-2.5 flex items-center justify-between">
          <span className="text-xs font-bold text-gray-700">Total</span>
          <span className="text-sm font-black text-gray-900">${Number(product.price).toFixed(2)}</span>
        </div>
      </div>

      <p className="text-[10px] text-gray-400 text-center mb-4">You pay only the kit price. No sales tax is added to your order.</p>

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className="sbtn w-full bg-[#1a5c3a] text-white py-3 rounded-xl text-sm font-semibold outline-none border-0 disabled:opacity-50"
      >
        {loading ? 'Processing...' : `Place Order — $${Number(product.price).toFixed(2)}`}
      </button>
    </div>
  )
}