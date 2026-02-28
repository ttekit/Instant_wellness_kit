import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

type FieldProps = { label: string; icon?: string; suffix?: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>

const Field = ({ label, icon, suffix, ...props }: FieldProps) => (
  <div className="field-row">
    <label className="text-sm font-semibold text-gray-800! block mb-1">{label}</label>
    <div className="iw flex items-center border border-gray-200! rounded-xl px-3 py-2 bg-white!">
      {icon && <span className="!text-gray-400! mr-2">{icon}</span>}
      <input {...props} className="flex-1 text-sm outline-none !bg-transparent! text-gray-800! select-text" />
      {suffix}
    </div>
  </div>
)

const USERS_URL = import.meta.env.VITE_API_AUTH_URL;

function Modal({ onClose, blurBg = false }: { onClose: () => void; blurBg?: boolean }) {
  const [tab, setTab] = useState<'signin' | 'create'>('signin')
  const [showPw, setShowPw] = useState(false)
  const [closing, setClosing] = useState(false)
  const [anim, setAnim] = useState('')
  const [key, setKey] = useState(0)
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

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

  const handle_submit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (tab === 'signin') {
        if (!formData.email || !formData.password) throw new Error('Please fill in all fields')

        const response = await fetch(`${USERS_URL}/login`, {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ email: formData.email, password: formData.password })
        })
        if (!response.ok) throw new Error('Email or password is incorrect')

        const data = await response.json()
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('user', JSON.stringify(data.user))
        close()
      } else {
        if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword)
          throw new Error('Please fill in all fields')
        if (formData.password !== formData.confirmPassword)
          throw new Error('Passwords arent matching')

        const [name, ...surnameParts] = formData.fullName.split(' ')
        const surname = surnameParts.join(' ') || 'User'

        const response = await fetch(`${USERS_URL}/register`, {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ name, surname, email: formData.email, password: formData.password, roleId: 7 })
        })

        if (!response.ok) {
          const errText = await response.text()
          let errorMessage = 'Registration error'
          try {
            const errData = JSON.parse(errText)
            errorMessage = Array.isArray(errData.message) ? errData.message.join(', ') : (errData.message || errorMessage)
          } catch (e) {
            errorMessage = errText || errorMessage
            console.log(e)
          }
          throw new Error(errorMessage)
        }

        switchTab('signin')
        setError('Succsesful, now login')
      }
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  const pwType = showPw ? 'text' : 'password'
  const eyeBtn = (
    <button type='button' onClick={() => setShowPw(p => !p)}
      style={{ opacity: showPw ? .7 : 1, transition: 'opacity .15s' }}
      className="!bg-transparent !text-gray-400 text-sm ml-2 outline-none !border-0">👁</button>
  )

  return createPortal(
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center select-none ${blurBg ? 'bg-white/60 backdrop-blur-md' : 'bg-black/50'} ${closing ? 'b-out' : 'b-in'}`}>
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

        {error && (
          <div className={`text-sm mb-4 p-2 rounded-lg ${error.includes('Succsesful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
            {error}
          </div>
        )}

        <form onSubmit={handle_submit} key={key} noValidate className={`flex flex-col gap-4 ${anim}`}>
          {tab === 'signin' ? <>
            <Field label="Email" name="email" value={formData.email} onChange={handleChange} icon="✉" type="email" placeholder="you@example.com" />
            <Field label="Password" name="password" value={formData.password} onChange={handleChange} type={pwType} placeholder="Enter your password" suffix={eyeBtn} />
            <div className="field-row">
              <button disabled={isLoading} className="sbtn w-full !bg-[#2596be] !text-white py-3 rounded-xl text-sm font-semibold outline-none !border-0 disabled:opacity-50">{isLoading ? 'Loading...' : 'Sign In'}</button>
            </div>
          </> : <>
            <Field label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} icon="👤" type="text" placeholder="Jane Doe" />
            <Field label="Email" name="email" value={formData.email} onChange={handleChange} icon="✉" type="email" placeholder="you@example.com" />
            <Field label="Password" name="password" value={formData.password} onChange={handleChange} type={pwType} placeholder="Min. 8 characters" suffix={eyeBtn} minLength={8} />
            <Field label="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" placeholder="Re-enter password" minLength={8} />
            <div className="field-row">
              <button disabled={isLoading} className="sbtn w-full !bg-[#2596be] !text-white py-3 rounded-xl text-sm font-semibold outline-none !border-0 disabled:opacity-50">{isLoading ? 'Loading...' : 'Create Account'}</button>
            </div>
          </>}
        </form>
      </div>
    </div>,
    document.body
  )
}

export default Modal