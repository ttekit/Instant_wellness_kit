import { useState } from 'react'

type Coords = { lat: number; lng: number }
type Props = { onNext: (coords: Coords) => void }

function isInNYC(lat: number, lng: number) {
  return lat >= 40.4774 && lat <= 40.9176 && lng >= -74.2591 && lng <= -73.7004
}

export default function StepLocation({ onNext }: Props) {
  const [coords, setCoords]         = useState<Coords | null>(null)
  const [error, setError]           = useState('')
  const [loading, setLoading]       = useState(false)
  const [manualMode, setManualMode] = useState(false)
  const [manualLat, setManualLat]   = useState('')
  const [manualLng, setManualLng]   = useState('')

  const detect = () => {
    setLoading(true); setError('')
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        setLoading(false)
        if (!isInNYC(lat, lng)) return setError('Sorry, delivery is only available in New York City.')
        setCoords({ lat, lng })
      },
      () => { setLoading(false); setError('Could not detect location. Please allow location access.') },
      { timeout: 10000 }
    )
  }

  const submitManual = () => {
    const lat = parseFloat(manualLat), lng = parseFloat(manualLng)
    if (isNaN(lat) || isNaN(lng)) return setError('Please enter valid coordinates.')
    if (!isInNYC(lat, lng)) return setError('Sorry, delivery is only available in New York City.')
    setError(''); setCoords({ lat, lng })
  }

  const reset = () => { setCoords(null); setManualMode(false); setError('') }

  return (
    <div className="field-row">
      <h3 className="font-black text-gray-900 text-base mb-1">Delivery Location</h3>
      <p className="text-xs text-gray-400 mb-4">Share your GPS coordinates so our drone knows exactly where to find you</p>

      {coords ? (
        <div className="bg-[#e8f5e9] rounded-xl p-4 mb-4 text-center">
          <svg className="w-6 h-6 text-[#1a5c3a] mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          <p className="text-xs text-[#1a5c3a] font-semibold">Location detected!</p>
          <p className="text-[11px] text-gray-500 mt-1">{coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}</p>
          <button onClick={reset} className="text-[11px] text-[#2596be] mt-2 underline outline-none border-0 bg-transparent">Change location</button>
        </div>
      ) : manualMode ? (
        <div className="mb-4 space-y-3">
          <p className="text-xs text-gray-500">Enter your NYC coordinates (e.g. 40.7128, -74.0060)</p>
          {[
            { label: 'Lat', value: manualLat, set: setManualLat, placeholder: '40.7128' },
            { label: 'Lng', value: manualLng, set: setManualLng, placeholder: '-74.0060' },
          ].map(({ label, value, set, placeholder }) => (
            <div key={label} className="iw flex items-center border !border-gray-200 rounded-xl px-3 py-2 !bg-white">
              <span className="text-gray-400 text-xs mr-2 w-6">{label}</span>
              <input type="number" step="any" placeholder={placeholder} value={value}
                onChange={e => set(e.target.value)}
                className="flex-1 text-sm outline-none bg-transparent text-gray-800 select-text" />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-5 mb-4 text-center">
          <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          <p className="text-xs text-gray-400 leading-relaxed">
            We need your precise location to deliver your kit by drone.<br />
            Your coordinates are only used for this delivery.
          </p>
        </div>
      )}

      {error && <p className="text-xs text-red-500 mb-3 text-center">{error}</p>}

      {!coords && !manualMode && (
        <>
          <button onClick={detect} disabled={loading}
            className="sbtn w-full bg-[#2596be] text-white py-2.5 rounded-xl text-sm font-semibold outline-none border-0 mb-2 flex items-center justify-center gap-2 disabled:opacity-60">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {loading ? 'Detecting...' : 'Detect My Location'}
          </button>
          <button onClick={() => { setManualMode(true); setError('') }}
            className="w-full text-xs text-gray-400 hover:text-gray-600 bg-transparent outline-none border-0 py-1 transition-colors">
            Enter coordinates manually
          </button>
        </>
      )}

      {!coords && manualMode && (
        <div className="space-y-2">
          <button onClick={submitManual} className="sbtn w-full bg-[#2596be] text-white py-2.5 rounded-xl text-sm font-semibold outline-none border-0">
            Confirm Location
          </button>
          <button onClick={() => { setManualMode(false); setError('') }}
            className="w-full text-xs text-gray-400 hover:text-gray-600 bg-transparent outline-none border-0 py-1 transition-colors">
            ← Use GPS instead
          </button>
        </div>
      )}

      {coords && (
        <button onClick={() => onNext(coords)} className="sbtn w-full bg-[#1a5c3a] text-white py-3 rounded-xl text-sm font-semibold outline-none border-0">
          Continue to Order
        </button>
      )}
    </div>
  )
}