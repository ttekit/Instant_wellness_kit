import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function LoggedNavbar() {
  const [showOrderHint, setShowOrderHint] = useState(false)
  const [hintClosing, setHintClosing]     = useState(false)
  const [showDropdown, setShowDropdown]   = useState(false)
  const navigate = useNavigate()
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const getUser = () => {
    const userData = localStorage.getItem('user')
    return userData ? JSON.parse(userData) : { name: 'User', email: '' }
  }
  const [user, setUser] = useState(getUser)

  useEffect(() => {
    const refresh = () => setUser(getUser())
    window.addEventListener('storage', refresh)
    window.addEventListener('user_updated', refresh)
    return () => {
      window.removeEventListener('storage', refresh)
      window.removeEventListener('user_updated', refresh)
    }
  }, [])

  const scrollTo = (id: string) => {
    if (window.location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleOrderNow = () => {
    setShowOrderHint(true)
    setHintClosing(false)
    scrollTo('kits')
    setTimeout(() => setHintClosing(true), 2000)
    setTimeout(() => setShowOrderHint(false), 2200)
  }

  const handleSignOut = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    window.location.reload()
  }

  const onMouseEnter = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current)
    setShowDropdown(true)
  }
  const onMouseLeave = () => {
    hideTimer.current = setTimeout(() => setShowDropdown(false), 120)
  }

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-2 bg-[#e8eceb] select-none">

      <style>{`
        @keyframes avatarSpin {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
        .avatar-gradient {
          background: linear-gradient(135deg, #2596be, #7dd3fc, #a5f3fc, #38bdf8, #0e7490, #2596be);
          background-size: 300% 300%;
          animation: avatarSpin 4s ease infinite;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .drop-in { animation: dropIn 0.15s ease forwards; }
        .menu-item { transition: background-color 0.15s ease, padding-left 0.2s ease; }
        .menu-item:hover { padding-left: 20px; }
        .menu-item-red { transition: background-color 0.15s ease, padding-left 0.2s ease; }
        .menu-item-red:hover { padding-left: 20px; }
      `}</style>

      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <div className="bg-[#2596be] text-white rounded-lg p-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
        <div>
          <div className="font-bold text-xs text-gray-800">Instant Wellness</div>
          <div className="text-[10px] text-gray-500 uppercase tracking-widest">Kits</div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button onClick={() => scrollTo('kits')} className="text-xs !text-gray-600 hover:!text-gray-900 !bg-transparent outline-none !border-0 transition-all duration-200 hover:scale-105">
          Our Kits
        </button>
        <button onClick={() => scrollTo('how-it-works')} className="text-xs !text-gray-600 hover:!text-gray-900 !bg-transparent outline-none !border-0 transition-all duration-200 hover:scale-105">
          How It Works
        </button>

        {/* Avatar + hover dropdown */}
        <div className="relative flex items-center" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <button
            className="avatar-gradient w-8 h-8 rounded-full outline-none !border-0 transition-all duration-200 hover:scale-110 cursor-pointer"
            aria-label={user.name}
          />

          {showDropdown && (
            <div className="drop-in absolute top-11 right-0 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden w-52 z-50">

              {/* User info */}
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-xs font-bold text-gray-900 truncate">{user.name}</p>
                <p className="text-[11px] text-gray-400 truncate">{user.email || ''}</p>
              </div>

              {/* Links */}
              <div className="py-1.5">
                <button onClick={() => { setShowDropdown(false); navigate('/account', { state: { tab: 'account' } }) }}
                  className="menu-item w-full flex items-center gap-2.5 px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 !bg-transparent !border-0 outline-none text-left">
                  <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  My Account
                </button>

              </div>
                            {/* Sign out */}
              <div className="border-t border-gray-100 py-1.5">
                <button onClick={handleSignOut}
                  className="menu-item-red w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-500 hover:bg-red-50 !bg-transparent !border-0 outline-none text-left">
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Now */}
        <div className="relative">
          <button onClick={handleOrderNow}
            className="bg-[#1a5c3a] !text-white text-xs px-3 py-1.5 rounded-full hover:bg-[#144d30] transition-all duration-200 hover:scale-105 outline-none !border-0">
            Order Now
          </button>
          {showOrderHint && (
            <div className={`${hintClosing ? 'order-hint-out' : 'order-hint'} absolute top-10 right-0 flex items-center gap-2 bg-[#1a5c3a] text-white text-xs px-4 py-2.5 rounded-2xl whitespace-nowrap shadow-xl border border-white/10`}>
              <span className="text-base">👇</span>
              <div>
                <p className="font-bold">Pick your kit</p>
                <p className="text-white/70 text-[10px]">Scroll down to browse</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default LoggedNavbar