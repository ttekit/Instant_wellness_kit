import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { products, Product } from '../../data/products'
import ProductModal from './ProductModal'

interface ServerOrder {
  id: number;
  subtotal: string | number;
  userId: number;
  timestamp: string;
  productId?: number;
  productName?: string;
}

interface UIOrder {
  id: number;
  orderId: string;
  name: string;
  image: string;
  price: number;
}

function matchProduct(o: ServerOrder): { name: string; image: string } {
  if (o.productId) {
    const p = products.find(p => p.id === o.productId)
    if (p) return { name: p.name, image: p.image }
  }
  if (o.productName) {
    const p = products.find(p => p.name === o.productName)
    if (p) return { name: p.name, image: p.image }
  }
  const byPrice = products.find(p => p.price === Number(o.subtotal))
  if (byPrice) return { name: byPrice.name, image: byPrice.image }
  return { name: 'Wellness Kit', image: '' }
}

export default function OrdersTab() {
  const [showKits, setShowKits] = useState(false)
  const [myOrders, setMyOrders] = useState<UIOrder[]>([])
  const kitsRef = useRef<HTMLDivElement>(null)

  const loadOrders = async (): Promise<void> => {
    try {
      const token = localStorage.getItem('access_token')
      if (!token) return

      const payload = JSON.parse(atob(token.split('.')[1]))
      const currentUserId = Number(payload.sub || payload.id)

      const res = await fetch(import.meta.env.VITE_API_ORDERS_URL, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (res.ok) {
        const allOrders: ServerOrder[] = await res.json()
        const formatted: UIOrder[] = allOrders
          .filter(o => o.userId === currentUserId)
          .map(o => {
            const { name, image } = matchProduct(o)
            return { id: o.id, orderId: `INK-${o.id}`, name, image, price: Number(o.subtotal) }
          })
          .sort((a, b) => b.id - a.id)
        setMyOrders(formatted)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleOrderPlaced = (e: Event) => {
    const detail = (e as CustomEvent).detail as {
      orderId: string;
      product?: Product;
      price?: number;
      serverOrderId?: number;
    } | undefined

    if (detail?.product) {
      const newOrder: UIOrder = {
        id: detail.serverOrderId ?? Date.now(),
        orderId: detail.orderId,
        name: detail.product.name,
        image: detail.product.image,
        price: detail.price ?? detail.product.price,
      }
      setMyOrders(prev => {
        if (prev.some(o => o.orderId === newOrder.orderId)) return prev
        return [newOrder, ...prev]
      })
    }
    loadOrders()
  }

  useEffect(() => {
    loadOrders()
    window.addEventListener('order_placed', handleOrderPlaced)
    return () => window.removeEventListener('order_placed', handleOrderPlaced)
  }, [])

  const handleBrowse = () => {
    setShowKits(true)
    setTimeout(() => kitsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  return (
    <div className="tab-enter">
      {myOrders.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <div className="w-14 h-14 rounded-full bg-[#e8f5e9] flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-[#1a5c3a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-sm font-bold text-gray-800 mb-1">No orders yet</p>
          <p className="text-xs text-gray-400 mb-5">Your order history will appear here after your first delivery.</p>
          <button onClick={handleBrowse} className="sbtn bg-[#1a5c3a] hover:bg-[#154d30] text-white text-xs font-semibold px-5 py-2.5 rounded-full outline-none border-0">
            Browse Kits
          </button>
        </div>
      ) : (
        <div className="mb-8 max-w-lg">
          <p className="text-sm font-bold text-gray-900 mb-4">Your Order History</p>
          <div className="space-y-3">
            {myOrders.map((o) => (
              <div key={o.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4">
                <img
                  src={o.image}
                  alt={o.name}
                  className="w-12 h-12 rounded-lg object-cover bg-gray-100 shrink-0"
                  onError={e => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${o.id}/500/300` }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900 truncate">{o.name}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Order ID: {o.orderId}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-gray-800">${o.price.toFixed(2)}</p>
                  <span className="inline-block mt-1 text-[9px] font-bold text-[#1a5c3a] bg-[#e8f5e9] px-2 py-0.5 rounded-full">Delivered</span>
                </div>
              </div>
            ))}
          </div>
          <button onClick={handleBrowse} className="mt-5 sbtn bg-[#1a5c3a] hover:bg-[#154d30] text-white text-xs font-semibold px-5 py-2.5 rounded-full outline-none border-0">
            Order More
          </button>
        </div>
      )}

      {showKits && (
        <div ref={kitsRef} className="kit-grid-enter mt-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-black text-gray-900">Available Kits</p>
            <button
              onClick={() => setShowKits(false)}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors bg-transparent border-0 outline-none cursor-pointer"
            >
              Hide
            </button>
          </div>
          <KitGrid />
        </div>
      )}
    </div>
  )
}

function KitGrid() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('reveal-visible'); observer.unobserve(e.target) }
      }),
      { threshold: 0.05 }
    )
    const t = setTimeout(() => { cardRefs.current.forEach(c => { if (c) observer.observe(c) }) }, 50)
    return () => { clearTimeout(t); observer.disconnect() }
  }, [])

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {products.map((p, i) => (
          <div
            key={p.id}
            ref={el => { cardRefs.current[i] = el }}
            className="reveal bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className="relative">
              <img
                src={p.image} alt={p.name}
                className="w-full h-28 object-cover bg-gray-100"
                onError={e => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${p.id}/500/300` }}
              />
              {p.popular && <span className="absolute top-2 left-2 bg-yellow-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Popular</span>}
            </div>
            <div className="p-3 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-0.5">
                <p className="text-xs font-bold text-gray-900">{p.name}</p>
                <span className="text-xs font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded-md">${p.price.toFixed(2)}</span>
              </div>
              <p className="text-[11px] font-semibold text-[#2596be] italic mb-1">{p.tagline}</p>
              <p className="text-[10px] text-gray-400 leading-relaxed mb-3 flex-1">{p.desc}</p>
              <button
                onClick={() => setSelectedProduct(p)}
                className="card-btn w-full bg-[#2596be] hover:bg-[#1a7a9e] text-white text-xs font-semibold py-2 rounded-lg"
              >
                Select This Kit
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedProduct && createPortal(
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />,
        document.body
      )}
    </>
  )
}