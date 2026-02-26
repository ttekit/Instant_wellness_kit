import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import AccountTabs from '../components/ui/AccountTabs'

// тимчасовий юз підтягніть бек пжпжпжппжжп
const user = {
  name: 'te',
  email: 'dg@gsm.cio',
  initials: 'T',
}

export default function Account() {
  const navigate = useNavigate()

  return (
    <div className="fixed inset-0 bg-[#f3f6f4] z-50 overflow-y-auto">
      <Navbar />

      <div className="bg-white border-b border-gray-100 px-6 py-8 pt-20">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors mb-6 outline-none border-0 bg-transparent cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#1a5c3a] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-lg">{user.initials}</span>
            </div>
            <div>
              <p className="text-base font-black text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <AccountTabs />
      </div>
    </div>
  )
}