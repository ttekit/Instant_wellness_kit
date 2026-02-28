import { useEffect, useRef, useState } from 'react'
import { products, Product } from '../../data/products'
import ProductModal from '../ui/ProductModal'
import LoginModal from '../ui/Modal'

function preloadImage(src: string, fallbackSeed: number) {
  const img = new Image()
  img.onerror = () => { const f = new Image(); f.src = `https://picsum.photos/seed/${fallbackSeed}/500/300` }
  img.src = src
}

function isLoggedIn() {
  return !!localStorage.getItem('access_token')
}

function ProductGrid() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const preloaded = useRef<Set<number>>(new Set())
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showLoginModal, setShowLoginModal]   = useState(false)

  useEffect(() => {
    products.forEach(p => { preloadImage(p.image, p.id); preloaded.current.add(p.id) })
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('reveal-visible'); observer.unobserve(entry.target) }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    cardRefs.current.forEach(card => { if (card) observer.observe(card) })
    return () => observer.disconnect()
  }, [])

  const handlePreload = (p: Product) => {
    if (!preloaded.current.has(p.id)) { preloadImage(p.image, p.id); preloaded.current.add(p.id) }
  }

  const handleSelectKit = (p: Product) => {
    if (!isLoggedIn()) { setShowLoginModal(true); return }
    setSelectedProduct(p)
  }

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
              onMouseEnter={() => handlePreload(p)}
              onFocus={() => handlePreload(p)}
            >
              <div className="relative">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-36 object-cover bg-gray-100"
                  onError={e => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${p.id}/500/300` }}
                />
                {p.popular && (
                  <span className="absolute top-2 left-2 bg-yellow-400 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">Popular</span>
                )}
              </div>

              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="text-sm font-bold text-gray-900">{p.name}</h3>
                  <span className="text-xs font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded-md">${p.price.toFixed(2)}</span>
                </div>
                <p className="text-[11px] font-semibold text-[#2596be] italic mb-2">{p.tagline}</p>
                <p className="text-[11px] text-gray-500 leading-relaxed mb-3 flex-1">{p.name}</p>
                <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
                    </svg>
                    {p.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                    </svg>
                    {p.items} items
                  </span>
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