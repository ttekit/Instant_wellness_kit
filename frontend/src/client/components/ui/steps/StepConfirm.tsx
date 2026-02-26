import { Row } from '../ModalUI'
import type { Product } from '../ProductModal'

type Props = { product: Product; coords: { lat: number; lng: number }; onNext: () => void }

export default function StepConfirm({ product, coords, onNext }: Props) {
  return (
    <div className="field-row">
      <h3 className="font-black text-gray-900 text-base mb-1">Confirm Your Order</h3>
      <p className="text-xs text-gray-400 mb-4">Review the details and place your order</p>

      <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-2.5">
        <Row label="Kit"         value={product.name} />
        <Row label="Delivery to" value={`${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`} />
        <Row label="Est. arrival" value={product.time} />
        <div className="border-t border-gray-200 pt-2.5 flex items-center justify-between">
          <span className="text-xs font-bold text-gray-700">Total</span>
          <span className="text-sm font-black text-gray-900">${product.price.toFixed(2)}</span>
        </div>
      </div>

      <p className="text-[10px] text-gray-400 text-center mb-4">You pay only the kit price. No sales tax is added to your order.</p>

      <button onClick={onNext} className="sbtn w-full bg-[#1a5c3a] text-white py-3 rounded-xl text-sm font-semibold outline-none border-0">
        Place Order — ${product.price.toFixed(2)}
      </button>
    </div>
  )
}