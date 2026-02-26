import { useState } from 'react'
import { StepDots } from './ModalUI'
import StepContents from './steps/StepContents'
import StepLocation from './steps/StepLocation'
import StepConfirm  from './steps/StepConfirm'
import StepSuccess  from './steps/StepSuccess'

export type Product = {
  id: number
  name: string
  tagline: string
  price: number
  image: string
  contents: string[]
  time: string
}

type Coords = { lat: number; lng: number }

const generateOrderId = () => `INK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`

export default function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [step, setStep]       = useState(1)
  const [coords, setCoords]   = useState<Coords | null>(null)
  const [closing, setClosing] = useState(false)
  const [orderId]             = useState(generateOrderId)

  const close = () => { setClosing(true); setTimeout(onClose, 220) }
  const handleLocation = (c: Coords) => { setCoords(c); setStep(3) }

  return (
    <div className={`fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 ${closing ? 'b-out' : 'b-in'}`}>
      <div className={`bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl ${closing ? 'm-out' : 'm-in'}`}>

        <div className="relative h-32">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover"
            onError={e => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${product.id}/500/300` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button onClick={close} className="xbtn absolute top-3 right-3 bg-black/30 hover:bg-black/50 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm outline-none border-0">✕</button>
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <div>
              <p className="text-white font-black text-base leading-tight">{product.name}</p>
              <p className="text-white/70 text-xs">{product.tagline}</p>
            </div>
            <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-3 py-1 rounded-lg">${product.price.toFixed(2)}</span>
          </div>
        </div>

        <div className="p-5">
          <StepDots step={step} />
          {step === 1 && <StepContents product={product} onNext={() => setStep(2)} />}
          {step === 2 && <StepLocation onNext={handleLocation} />}
          {step === 3 && coords && <StepConfirm product={product} coords={coords} onNext={() => setStep(4)} />}
          {step === 4 && coords && <StepSuccess product={product} coords={coords} orderId={orderId} onClose={close} />}
        </div>

      </div>
    </div>
  )
}