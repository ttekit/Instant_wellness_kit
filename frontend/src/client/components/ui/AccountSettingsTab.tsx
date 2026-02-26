import { useState } from 'react'

export default function AccountSettingsTab() {
  const [name, setName]   = useState('te')
  const [email, setEmail] = useState('dg@gsm.cio')

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
          <button className="sbtn bg-[#1a5c3a] hover:bg-[#154d30] text-white text-xs font-semibold px-5 py-2.5 rounded-xl">Save Changes</button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-700">Member since February 2026</p>
          <p className="text-xs text-gray-400 mt-0.5">{email}</p>
        </div>
        <button className="flex items-center gap-1.5 text-xs font-semibold text-red-500 border border-red-200 hover:bg-red-50 px-3 py-2 rounded-xl transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          Sign Out
        </button>
      </div>
    </div>
  )
}