import { useState } from 'react'
import OrdersTab from './OrdersTab'
import PaymentTab from './PaymentTab'
import AccountSettingsTab from './AccountSettingsTab'

type Tab = 'orders' | 'payment' | 'account'

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'orders', label: 'Orders', icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> },
  { id: 'payment', label: 'Payment', icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg> },
  { id: 'account', label: 'Account', icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
]

export default function AccountTabs() {
  const [active, setActive] = useState<Tab>('orders')

  return (
    <div>
      <div className="flex bg-[#eef2ee] rounded-full p-1 mb-8 max-w-sm">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 text-xs py-2 rounded-full font-medium transition-all outline-none border-0 ${active === t.id ? 'bg-white shadow text-gray-800' : 'bg-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      <div className={active === 'orders' ? 'block' : 'hidden'}>
        <OrdersTab />
      </div>
      <div className={active === 'payment' ? 'block' : 'hidden'}>
        <PaymentTab />
      </div>
      <div className={active === 'account' ? 'block' : 'hidden'}>
        <AccountSettingsTab />
      </div>
    </div>
  )
}