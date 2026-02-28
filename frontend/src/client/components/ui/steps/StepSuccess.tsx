import { useState, useEffect } from 'react'
import { Row } from '../ModalUI'
import type { Product } from '../ProductModal'

type Props = { product: Product; coords: { lat: number; lng: number }; orderId: string; onClose: () => void }

function parseMinutes(time: string): number {
  const match = time.match(/(\d+)/)
  return match ? parseInt(match[1]) * 60 : 20 * 60
}

export default function StepSuccess({ product, coords, orderId, onClose }: Props) {
  const totalSeconds = parseMinutes(product.time)
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds)
  const [delivered, setDelivered] = useState(false)

  useEffect(() => {
    if (secondsLeft <= 0) { setDelivered(true); return }
    const t = setTimeout(() => setSecondsLeft(s => s - 1), 1000)
    return () => clearTimeout(t)
  }, [secondsLeft])

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const ss = String(secondsLeft % 60).padStart(2, '0')

  return (
    <div className="field-row text-center">

      <style>{`
        @keyframes heliFloat {
          0%   { transform: translateY(0px);   }
          28%  { transform: translateY(-7px);  }
          55%  { transform: translateY(-3px);  }
          80%  { transform: translateY(-9px);  }
          100% { transform: translateY(0px);   }
        }
        @keyframes heliTilt {
          0%   { transform: rotate(-3deg); }
          22%  { transform: rotate(4deg);  }
          48%  { transform: rotate(-1deg); }
          70%  { transform: rotate(5deg);  }
          88%  { transform: rotate(-4deg); }
          100% { transform: rotate(-3deg); }
        }
        @keyframes bIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes popIn {
          0%   { transform: scale(0);    opacity: 0; }
          60%  { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1);    opacity: 1; }
        }
      `}</style>

      {/* ── Helicopter card — clean white rounded square, just like the reference ── */}
      <div
        className="flex items-center justify-center mx-auto mb-5"
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '28px',
          background: '#f2f4f3',
          boxShadow: '0 2px 0 #d8deda, 0 4px 16px rgba(0,0,0,0.06)',
        }}
      >
        {!delivered ? (
          /* outer: tilt   inner: float */
          <div style={{ animation: 'heliTilt 2.7s ease-in-out infinite' }}>
            <div style={{
              animation: 'heliFloat 2.1s ease-in-out infinite',
              fontSize: '62px',
              lineHeight: 1,
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.12))',
            }}>
              🚁
            </div>
          </div>
        ) : (
          <div className="text-5xl" style={{ animation: 'popIn 0.45s cubic-bezier(.34,1.56,.64,1) forwards' }}>🎉</div>
        )}
      </div>

      {delivered ? (
        <>
          <div
            className="w-12 h-12 rounded-full bg-[#e8f5e9] flex items-center justify-center mx-auto mb-2"
            style={{ animation: 'popIn 0.4s cubic-bezier(.34,1.56,.64,1) forwards' }}
          >
            <svg className="w-6 h-6 text-[#1a5c3a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-black text-gray-900 text-base mb-1">Delivered! 🎉</h3>
          <p className="text-xs text-gray-400 mb-4">Your {product.name} kit has arrived</p>
        </>
      ) : (
        <>
          <h3 className="font-black text-gray-900 text-base mb-1">Order Confirmed</h3>
          <p className="text-xs text-gray-400 mb-1">Your {product.name} kit is on its way</p>
          <div className="flex items-center justify-center gap-1.5 mb-4">
            <span className="text-xs text-gray-500">Est. arrival in</span>
            <span className="font-black text-[#1a5c3a] text-sm tabular-nums">{mm}:{ss}</span>
          </div>
        </>
      )}

      <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-2.5 text-left">
        <Row label="Order ID"    value={orderId} />
        <Row label="Delivery"    value={product.time} />
        <Row label="Coordinates" value={`${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`} />
      </div>

      <button
        onClick={onClose}
        className="sbtn w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl text-sm font-semibold outline-none border-0"
      >
        Done
      </button>
    </div>
  )
}