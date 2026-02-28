import { useEffect, useRef, useState } from 'react'
import ProductModal from '../ui/ProductModal'
import LoginModal from '../ui/Modal'
import { products as localProducts } from '../../data/products'

function preloadImage(src: string, fallbackSeed: number) {
  const img = new Image()
  img.onerror = () => { img.src = `https://picsum.photos/seed/${fallbackSeed}/500/300` }
  img.src = src
}

function isLoggedIn() {
  return !!localStorage.getItem('access_token')
}

function normalizeProduct(p: any) {
  if (p.package !== undefined) {
    return {
      id: p.id,
      name: p.package,
      tagline: 'Wellness Pack',
      desc: p.description,
      price: Number(p.price),
      image: p.img_link,
      time: '20-25 min',
      items: p.products?.length || 0,
      popular: false,
      contents: p.products?.map((x: any) => x.name || x) || [],
    }
  }
  return p
}

function ProductGrid() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    const fetchKits = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4200'
        const res = await fetch(`${baseUrl}/product-packeges/with-details`)
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data) && data.length > 0) {
            setProducts(data.map(normalizeProduct))
            data.forEach((p: any) => preloadImage(p.img_link, p.id))
            return
          }
        }
      } catch (e) {
        console.warn('API unavailable, using local products:', e)
      }
      setProducts(localProducts)
    }
    fetchKits().finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (products.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible')
          observer.unobserve(entry.target)
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    cardRefs.current.forEach(card => { if (card) observer.observe(card) })
    return () => observer.disconnect()
  }, [products])

  const handleSelectKit = (p: any) => {
    if (!isLoggedIn()) { setShowLoginModal(true); return }
    setSelectedProduct(p)
  }

  if (loading) return <div className="py-20 text-center text-gray-500">Loading Kits...</div>

  return (
    <>
      <div className="bg-[#f3f6f4] px-8 py-12 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <p className="text-xs font-semibold tracking-widest text-[#2596be] uppercase mb-1">Our Collection</p>
          <h2 className="text-2xl font-black text-gray-900 mb-1">Choose Your Instant Reset</h2>
          <p className="text-xs text-gray-500 max-w-sm mb-8">
            Each kit is hand-curated by our NYC wellness partners and delivered by drone directly to
            your GPS pin. Pick one, and reset your day.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
          {products.map((p, i) => (
            <div
              key={p.id}
              ref={el => { cardRefs.current[i] = el }}
              className="reveal bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col select-none"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative">
                <img
                  src={p.image}
                  alt={p.package}
                  className="w-full h-36 object-cover bg-gray-100"
                  onError={e => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${p.id}/500/300` }}
                />
                {p.popular && (
                  <span className="absolute top-2 left-2 bg-yellow-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Popular</span>
                )}
              </div>

              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="text-sm font-bold text-gray-900">{p.name}</h3>
                  <span className="text-xs font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded-md">
                    ${Number(p.price).toFixed(2)}
                  </span>
                </div>
                <p className="text-[11px] font-semibold text-[#2596be] italic mb-2">Wellness Pack</p>
                <p className="text-[11px] text-gray-500 leading-relaxed mb-3 flex-1">{p.description}</p>
                <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-3">
                  <span>{p.time}</span>
                  <span>{p.items} items</span>
                </div>
                <button
                  onClick={() => handleSelectKit(p)}
                  className="card-btn w-full bg-[#2596be] hover:bg-[#1a7a9e] text-white text-xs font-semibold py-2 rounded-lg"
                >
                  Select This Kit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </>
  )
}

export default ProductGrid