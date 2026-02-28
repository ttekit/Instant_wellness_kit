import { useState, useEffect } from 'react';
export default function PaymentTab() {
    const [showForm, setShowForm] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [savedCard, setSavedCard] = useState(null);
    const [billingId, setBillingId] = useState(null);
    useEffect(() => {
        const loadBilling = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token)
                    return;
                const payload = JSON.parse(atob(token.split('.')[1]));
                const currentUserId = Number(payload.sub || payload.id);
                const res = await fetch(import.meta.env.VITE_API_BILLINGS_URL, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) {
                    const allBillings = await res.json();
                    const userBilling = allBillings.find(b => b.userId === currentUserId);
                    if (userBilling) {
                        setBillingId(userBilling.id);
                        setSavedCard(userBilling.details);
                    }
                }
            }
            catch (e) {
                console.error(e);
            }
        };
        loadBilling();
    }, []);
    const formatCard = (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    const formatExpiry = (v) => {
        const c = v.replace(/\D/g, '').slice(0, 4);
        return c.length >= 3 ? `${c.slice(0, 2)}/${c.slice(2)}` : c;
    };
    const handleSave = async () => {
        if (cardNumber.length >= 19 && expiry.length >= 5) {
            try {
                const token = localStorage.getItem('access_token');
                if (!token)
                    return;
                const payload = JSON.parse(atob(token.split('.')[1]));
                const currentUserId = Number(payload.sub || payload.id);
                const cardDetails = { number: cardNumber, expiry };
                const requestBody = {
                    userId: currentUserId,
                    paymentMethod: 'CREDIT_CARD',
                    details: cardDetails
                };
                const url = billingId
                    ? `${import.meta.env.VITE_API_BILLINGS_URL}/${billingId}`
                    : import.meta.env.VITE_API_BILLINGS_URL;
                const method = billingId ? 'PATCH' : 'POST';
                const res = await fetch(url, {
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(requestBody)
                });
                if (res.ok) {
                    const savedData = await res.json();
                    setBillingId(savedData.id);
                    setSavedCard(cardDetails);
                    setShowForm(false);
                }
            }
            catch (e) {
                console.error(e);
            }
        }
    };
    const handleRemove = async () => {
        if (!billingId)
            return;
        try {
            const token = localStorage.getItem('access_token');
            if (!token)
                return;
            const res = await fetch(`${import.meta.env.VITE_API_BILLINGS_URL}/${billingId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok || res.status === 204) {
                setSavedCard(null);
                setBillingId(null);
                setCardNumber('');
                setExpiry('');
            }
        }
        catch (e) {
            console.error(e);
        }
    };
    if (savedCard && !showForm)
        return (<div className="tab-enter bg-white rounded-2xl border border-gray-100 p-6 max-w-lg">
      <p className="text-sm font-bold text-gray-900 mb-5">Saved Payment Method</p>
      <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-6 bg-[#1a5c3a] rounded flex items-center justify-center">
            <span className="text-[10px] text-white font-bold">CARD</span>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">•••• •••• •••• {savedCard.number.slice(-4)}</p>
            <p className="text-xs text-gray-500">Expires {savedCard.expiry}</p>
          </div>
        </div>
        <button onClick={handleRemove} className="text-xs font-semibold text-red-500 hover:text-red-600 outline-none border-0 bg-transparent">
          Remove
        </button>
      </div>
      <button onClick={() => setShowForm(true)} className="mt-4 sbtn w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2.5 rounded-xl text-sm font-semibold outline-none border-0">
        Update Card
      </button>
    </div>);
    if (!showForm)
        return (<div className="tab-enter flex flex-col items-center py-16 text-center">
      <div className="w-14 h-14 rounded-full bg-[#e8f5e9] flex items-center justify-center mb-4">
        <svg className="w-6 h-6 text-[#1a5c3a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"/>
        </svg>
      </div>
      <p className="text-sm font-bold text-gray-800 mb-1">No payment method saved</p>
      <p className="text-xs text-gray-400 mb-5">Add a card to speed up your checkout.</p>
      <button onClick={() => setShowForm(true)} className="sbtn bg-[#1a5c3a] hover:bg-[#154d30] text-white text-xs font-semibold px-5 py-2.5 rounded-full outline-none border-0">
        Add Payment Card
      </button>
    </div>);
    return (<div className="tab-enter bg-white rounded-2xl border border-gray-100 p-6 max-w-lg">
      <p className="text-sm font-bold text-gray-900 mb-5">Add Payment Card</p>
      <div className="field-row mb-4">
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Card Number</label>
        <div className="iw flex items-center border border-gray-200 rounded-xl px-4 py-2.5 bg-white">
          <input type="text" placeholder="4242 4242 4242 4242" value={cardNumber} onChange={e => setCardNumber(formatCard(e.target.value))} className="flex-1 text-sm text-gray-800 placeholder-gray-300 outline-none bg-transparent"/>
        </div>
      </div>
      <div className="field-row mb-6">
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Expiry</label>
        <div className="iw flex items-center border border-gray-200 rounded-xl px-4 py-2.5 bg-white">
          <input type="text" placeholder="MM/YY" value={expiry} onChange={e => setExpiry(formatExpiry(e.target.value))} className="flex-1 text-sm text-gray-800 placeholder-gray-300 outline-none bg-transparent"/>
        </div>
      </div>
      <div className="field-row flex items-center gap-3">
        <button onClick={handleSave} className="sbtn flex-1 bg-[#1a5c3a] hover:bg-[#154d30] text-white py-2.5 rounded-xl text-sm font-semibold outline-none border-0">Save Card</button>
        <button onClick={() => setShowForm(false)} className="text-sm text-gray-400 hover:text-gray-600 transition-colors outline-none border-0 bg-transparent">Cancel</button>
      </div>
    </div>);
}
//# sourceMappingURL=PaymentTab.jsx.map