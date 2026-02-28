import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginModal from './Modal'

export default function AccountSettingsTab() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [userId, setUserId] = useState<number | null>(null)
  const [saved, setSaved] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem('access_token')
        if (!token) return

        let currentUserId = null
        try {
          const payload = JSON.parse(atob(token.split('.')[1]))
          currentUserId = payload.sub || payload.id
        } catch (e) { console.log(e) }

        if (!currentUserId) return
        setUserId(currentUserId)

        const res = await fetch(`${import.meta.env.VITE_API_USERS_URL}/${currentUserId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        })

        if (res.ok) {
          const data = await res.json()
          setName(data.name || '')
          setEmail(data.email || '')
        }
      } catch (e) { console.log(e) }
    }
    loadProfile()
  }, [])

  const handleSave = async () => {
    if (!userId) return
    try {
      const token = localStorage.getItem('access_token')
      const res = await fetch(`${import.meta.env.VITE_API_USERS_URL}/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name, email })
      })
      if (res.ok) {
        localStorage.setItem('user', JSON.stringify({ name, email }))
        window.dispatchEvent(new Event('user_updated'))
        window.dispatchEvent(new CustomEvent('profile_updated', { detail: { name, email } }))
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      }
    } catch (e) { console.log(e) }
  }

  const handleSignOut = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    setShowLogin(true)
  }

  return (
    <div className="tab-enter space-y-4 max-w-lg">
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <p className="text-sm font-bold text-gray-900 mb-5">Profile Details</p>
        <div className="field-row mb-4">
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Full Name</label>
          <div className="iw flex items-center border border-gray-200 rounded-xl px-4 py-2.5 bg-white">
            <input value={name} onChange={e => setName(e.target.value)}
              className="flex-1 text-sm text-gray-800 outline-none bg-transparent" />
          </div>
        </div>
        <div className="field-row mb-5">
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email Address</label>
          <div className="iw flex items-center border border-gray-200 rounded-xl px-4 py-2.5 bg-white">
            <input value={email} onChange={e => setEmail(e.target.value)}
              className="flex-1 text-sm text-gray-800 outline-none bg-transparent" />
          </div>
        </div>
        <div className="field-row">
          <button onClick={handleSave} className="sbtn bg-[#1a5c3a] hover:bg-[#154d30] text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all">
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-700">Member</p>
          <p className="text-xs text-gray-400 mt-0.5">{email || 'No email set'}</p>
        </div>
        <button onClick={handleSignOut} className="flex items-center gap-1.5 text-xs font-semibold text-red-500 border border-red-200 hover:bg-red-50 px-3 py-2 rounded-xl transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          Sign Out
        </button>
      </div>

      {showLogin && (
        <LoginModal onClose={() => navigate('/')} blurBg />
      )}
    </div>
  )
}