import { useRef } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HowItWorks from "../components/layout/HowItWorks";
import ProductGrid from "../components/layout/ProductGrid";

const StatDivider = () => <div className="w-px h-10 bg-white/20" />;

const Stat = ({
  icon,
  label,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
}) => (
  <div className="flex flex-col items-center gap-1">
    <span className="text-white/70">{icon}</span>
    <span className="text-sm font-bold text-white">{label}</span>
    <span className="text-xs text-white/60">{sub}</span>
  </div>
);

export default function Home() {
  const kitsRef = useRef<HTMLDivElement>(null!);
  const howItWorksRef = useRef<HTMLDivElement>(null!);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div>
      <Navbar />

      <div className="relative">
        <img
          src="/src/client/assets/drone.jpg"
          alt="Drone"
          className="w-full object-cover min-h-130"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-[#f3f6f4] to-transparent" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pb-12 pt-24">
          <div className="badge flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs font-semibold tracking-widest uppercase rounded-full px-4 py-2 mb-6">
            <span className="dot w-2 h-2 rounded-full bg-yellow-400 inline-block" />
            Now Delivering Across New York
          </div>

          <h1 className="h1 text-5xl md:text-6xl font-black text-white leading-tight mb-2 drop-shadow-lg tracking-tight">
            Your Instant
          </h1>
          <h1 className="h2 text-5xl md:text-6xl font-black text-yellow-400 leading-tight mb-6 drop-shadow-lg tracking-tight">
            Wellness Reset
          </h1>

          <p className="h3 text-white/85 text-base md:text-lg max-w-md leading-relaxed mb-8 font-normal">
            Premium wellness kits delivered by drone to your exact GPS location
            in 20–30 minutes. Stress relief, energy boost, or spontaneous
            workout — we have got you covered.
          </p>

          <div className="h4 flex items-center gap-3 flex-wrap justify-center">
            <button
              onClick={() => scrollTo(kitsRef)}
              className="bg-[#2596be] hover:bg-[#1a7a9e] text-white font-semibold px-7 py-3 rounded-full text-sm transition-all shadow-lg"
            >
              Browse Kits
            </button>
            <button
              onClick={() => scrollTo(howItWorksRef)}
              className="bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 text-white font-semibold px-7 py-3 rounded-full text-sm transition-all"
            >
              How It Works
            </button>
          </div>

          <div className="h5 flex items-center gap-10 mt-12">
            <Stat
              label="20–30 min"
              sub="Delivery"
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
                  />
                </svg>
              }
            />
            <StatDivider />
            <Stat
              label="GPS Pin"
              sub="Precision"
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              }
            />
            <StatDivider />
            <Stat
              label="Drone"
              sub="Powered"
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1M4.22 4.22l.707.707m12.02 12.02.708.708M1 12h2m18 0h2M4.22 19.78l.707-.707M18.95 5.05l.708-.708"
                  />
                </svg>
              }
            />
          </div>
        </div>
      </div>

      <div id="kits" ref={kitsRef} className="scroll-mt-20">
        <ProductGrid />
      </div>
      <div id="how-it-works" ref={howItWorksRef} className="scroll-mt-20">
        <HowItWorks />
      </div>

      <Footer />
    </div>
  );
}
