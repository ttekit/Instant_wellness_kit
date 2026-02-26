import { useState, useEffect, useRef } from 'react'

// Це для логіна!! Я просто коли пробувала змінити ім'я, то весь сайт ламався womp womp
type FieldProps = { label: string; icon?: string; suffix?: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>

const Field = ({ label, icon, suffix, ...props }: FieldProps) => (
  <div className="field-row">
    <label className="text-sm font-semibold !text-gray-800 block mb-1">{label}</label>
    <div className="iw flex items-center border !border-gray-200 rounded-xl px-3 py-2 !bg-white">
      {icon && <span className="!text-gray-400 mr-2">{icon}</span>}
      <input {...props} className="flex-1 text-sm outline-none !bg-transparent !text-gray-800 select-text" />
      {suffix}
    </div>
  </div>
)

function Modal({ onClose }: { onClose: () => void }) {
  const [tab, setTab]         = useState<'signin' | 'create'>('signin')
  const [showPw, setShowPw]   = useState(false)
  const [closing, setClosing] = useState(false)
  const [anim, setAnim]       = useState('')
  const [key, setKey]         = useState(0)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const close = () => { setClosing(true); setTimeout(onClose, 220) }

  const switchTab = (next: 'signin' | 'create') => {
    if (next === tab) return
    setAnim(next === 'create' ? 's-r' : 's-l')
    setKey(k => k + 1)
    setTab(next)
    setShowPw(false)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setAnim(''), 260)
  }

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  const pwType = showPw ? 'text' : 'password'
  const eyeBtn = (
    <button onClick={() => setShowPw(p => !p)}
      style={{ opacity: showPw ? .7 : 1, transition: 'opacity .15s' }}
      className="!bg-transparent !text-gray-400 text-sm ml-2 outline-none !border-0">👁</button>
  )

  return (
    <div className={`fixed inset-0 bg-black/50 z-50 flex items-center justify-center select-none ${closing ? 'b-out' : 'b-in'}`}>
      <div className={`!bg-[#f5f7f5] rounded-2xl p-6 w-full max-w-sm relative border !border-gray-200 ${closing ? 'm-out' : 'm-in'}`}>

        <button onClick={close} className="xbtn absolute top-4 right-4 !bg-transparent !text-gray-400 hover:!text-gray-600 text-lg outline-none !border-0">✕</button>

        <h2 className="text-2xl font-bold !text-gray-900 mb-1">Welcome</h2>
        <p className="text-sm !text-gray-500 mb-4">Sign in to track orders and manage your account</p>

        <div className="flex !bg-[#eef2ee] rounded-full p-1 mb-5">
          {(['signin', 'create'] as const).map(t => (
            <button key={t} onClick={() => switchTab(t)}
              style={{ transition: 'background-color .2s, color .2s, box-shadow .2s' }}
              className={`flex-1 text-sm py-2 rounded-full font-medium outline-none !border-0 ${tab === t ? '!bg-white shadow !text-gray-800' : '!bg-transparent !text-gray-500'}`}>
              {t === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>

        <div key={key} className={`flex flex-col gap-4 ${anim}`}>
          {tab === 'signin' ? <>
            <Field label="Email"    icon="✉"  type="email"   placeholder="you@example.com" />
            <Field label="Password"            type={pwType}  placeholder="Enter your password" suffix={eyeBtn} />
            <div className="field-row">
              <button className="sbtn w-full !bg-[#2596be] !text-white py-3 rounded-xl text-sm font-semibold outline-none !border-0">Sign In</button>
            </div>
          </> : <>
            <Field label="Full Name"        icon="👤" type="text"     placeholder="Jane Doe" />
            <Field label="Email"            icon="✉"  type="email"    placeholder="you@example.com" />
            <Field label="Password"                   type={pwType}   placeholder="Min. 6 characters" suffix={eyeBtn} />
            <Field label="Confirm Password"           type="password" placeholder="Re-enter password" />
            <div className="field-row">
              <button className="sbtn w-full !bg-[#2596be] !text-white py-3 rounded-xl text-sm font-semibold outline-none !border-0">Create Account</button>
            </div>
          </>}
        </div>

      </div>
    </div>
  )
}

export default Modal