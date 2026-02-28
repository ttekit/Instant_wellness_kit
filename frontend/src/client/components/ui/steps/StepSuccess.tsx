import { Row } from '../ModalUI'
import { Product } from '../../../data/products'

type Props = { product: Product; coords: { lat: number; lng: number }; orderId: string; onClose: () => void }

export default function StepSuccess({ product, coords, orderId, onClose }: Props) {
  return (
    <div className="field-row text-center">
      <div className="w-14 h-14 rounded-full bg-[#e8f5e9] flex items-center justify-center mx-auto mb-3">
        <svg className="w-7 h-7 text-[#1a5c3a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="font-black text-gray-900 text-base mb-1">Order Confirmed</h3>
      <p className="text-xs text-gray-400 mb-4">Your {product.name} kit is being prepared for drone delivery</p>

      <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-2.5 text-left">
        <Row label="Order ID" value={orderId} />
        <Row label="Delivery" value={product.time} />
        <Row label="Coordinates" value={`${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`} />
      </div>

      <div className="bg-gray-100 rounded-full p-3 mb-4 flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-[#1a5c3a] flex-shrink-0" />
        <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-[#2596be] rounded-full animate-[droneProgress_3s_ease-in-out_infinite]" style={{ width: '60%' }} />
        </div>
        <svg className="w-4 h-4 text-[#2596be] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      </div>
      <p className="text-[10px] text-gray-400 mb-4">Drone en route to your location</p>

      <button onClick={onClose} className="sbtn w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl text-sm font-semibold outline-none border-0">
        Done
      </button>
    </div>
  )
}