import React, { useState, useEffect } from "react";
import { Compass, Sparkles } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [mounted, setMounted] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2400);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-8 bg-[#000F21] text-white transition-opacity duration-500 ease-out ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      id="splash-screen"
    >
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 -left-10 w-72 h-72 bg-[#50C878] rounded-full blur-[120px] opacity-10 animate-pulse" />
      <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-[#D4AF37] rounded-full blur-[120px] opacity-10 animate-pulse" />

      {/* Top Brand Tag */}
      <div className="mt-4 flex items-center gap-1.5 opacity-60">
        <span className="w-1.5 h-1.5 rounded-full bg-[#50C878]" />
        <span className="text-[10px] tracking-[0.3em] font-mono text-slate-300 uppercase">
          MEMBER DIRECTORY & CORE HUB
        </span>
      </div>

      {/* Main Logo Content */}
      <div className="flex flex-col items-center text-center">
        <div
          className={`relative mb-6 transform transition-all duration-1000 ease-out ${
            mounted ? "scale-100 opacity-100" : "scale-75 opacity-0"
          }`}
        >
          {/* Logo Badge Icon in Editorial Golden border */}
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#D4AF37] via-[#f7df94] to-[#D4AF37] p-[1.5px] shadow-2xl shadow-[#D4AF37]/10">
            <div className="w-full h-full rounded-[14px] bg-[#000F21] flex items-center justify-center">
              <Compass className="w-11 h-11 text-[#D4AF37]" />
            </div>
          </div>
          {/* Sparkles decoration */}
          <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-[#50C878] animate-bounce" />
        </div>

        <h1
          className={`text-4xl md:text-5xl font-serif tracking-widest text-[#D4AF37] transition-all duration-1000 delay-300 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          MYZONE CLUB
        </h1>

        <p
          className={`mt-4 text-xs tracking-[0.4em] text-slate-300 uppercase font-mono transition-all duration-1000 delay-500 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          Connect • Grow • Belong
        </p>
      </div>

      {/* Premium Footer Branding */}
      <div
        className={`flex flex-col items-center text-center transition-all duration-1000 delay-700 ease-out ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-[#50C878] animate-ping" />
          <p className="text-[10px] text-slate-400 font-mono tracking-widest">
            THE PREMIUM UAE STARTUP ECOSYSTEM
          </p>
        </div>
        <p className="text-[9px] text-slate-600">DUBAI • ABU DHABI • SHARJAH</p>
      </div>
    </div>
  );
}
