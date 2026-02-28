import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from './client/pages/Home'
import Admin from './admin/Admin'
import Account from './client/pages/Account'
export default function App() {
  const location = useLocation()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes pageFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .page-enter {
          animation: pageFadeIn 0.25s ease forwards;
        }
      `}</style>

      <div key={location.pathname} className="page-enter">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  )
}

