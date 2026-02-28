import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../ui/Modal';
function Navbar() {
    const [showModal, setShowModal] = useState(false);
    const [showOrderHint, setShowOrderHint] = useState(false);
    const [hintClosing, setHintClosing] = useState(false);
    const navigate = useNavigate();
    const scrollTo = (id) => {
        if (window.location.pathname !== '/') {
            navigate('/');
            setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
        }
        else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    const handleOrderNow = () => {
        setShowOrderHint(true);
        setHintClosing(false);
        scrollTo('kits');
        setTimeout(() => setHintClosing(true), 2000);
        setTimeout(() => setShowOrderHint(false), 2200);
    };
    return (<nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-2 bg-[#e8eceb] select-none">
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
        <button onClick={() => setShowModal(true)} className="bg-[#2596be] !text-white text-xs px-3 py-1.5 rounded-full hover:bg-[#1a7a9e] transition-all duration-200 hover:scale-105 outline-none !border-0">
          Login
        </button>
        <div className="relative">
          <button onClick={handleOrderNow} className="bg-[#1a5c3a] !text-white text-xs px-3 py-1.5 rounded-full hover:bg-[#144d30] transition-all duration-200 hover:scale-105 outline-none !border-0">
            Order Now
          </button>
          {showOrderHint && (<div className={`${hintClosing ? 'order-hint-out' : 'order-hint'} absolute top-10 right-0 flex items-center gap-2 bg-[#1a5c3a] text-white text-xs px-4 py-2.5 rounded-2xl whitespace-nowrap shadow-xl border border-white/10`}>
              <span className="text-base">👇</span>
              <div>
                <p className="font-bold">Pick your kit</p>
                <p className="text-white/70 text-[10px]">Scroll down to browse</p>
              </div>
            </div>)}
        </div>
      </div>

      {showModal && <Modal onClose={() => setShowModal(false)}/>}
    </nav>);
}
export default Navbar;
//# sourceMappingURL=Navbar.jsx.map