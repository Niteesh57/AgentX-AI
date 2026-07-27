// @ts-nocheck
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Volume2 } from 'lucide-react';

/* ──────────────────────────────────────────────────────────
   LAZY LOADED SHADER GRADIENT BACKGROUND (CODE SPLIT)
────────────────────────────────────────────────────────── */
const ShaderGradientBackground = lazy(() => import('./ShaderGradientBackground'));

/* ──────────────────────────────────────
   TYPEWRITER HOOK
────────────────────────────────────── */
const phrases = [
  'Calls Your Customer.',
  'Speaks Every Language.',
  'Sounds Purely Human.',
  'Translates in Real-Time.',
  'Zero Latency Voice AI.',
];

function useTypewriter() {
  const [displayText, setDisplayText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    const speed = isDeleting ? 35 : 65;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < current.length) {
          setDisplayText(current.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(current.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setPhraseIdx(i => (i + 1) % phrases.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, phraseIdx, isDeleting]);

  return displayText;
}

/* ──────────────────────────────────────
   HERO SECTION
────────────────────────────────────── */
export const HeroSection: React.FC = () => {
  const typeText = useTypewriter();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#FFFBF7]">
      {/* Animated @shadergradient/react Grain Water Plane Shader Background */}
      <Suspense fallback={null}>
        <ShaderGradientBackground />
      </Suspense>

      {/* Background Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none z-1" />

      {/* Soft Radial Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none z-1" />

      {/* Globe SVG Graphic Background — Fit for div container, centered behind text */}
      <div className="globe absolute inset-0 z-1 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <img
          src="/worldLow-pixels-hero.svg"
          alt="World Pixel Map"
          className="w-[95%] max-w-[1250px] max-h-[80vh] h-auto drop-shadow-xl transition-all duration-700"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto pt-24 pb-16 pointer-events-none flex flex-col items-center justify-center">

        {/* Top Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-300 bg-white/90 backdrop-blur-md text-orange-800 text-xs font-black uppercase tracking-widest mb-8 relative shadow-md pointer-events-auto">
          <Volume2 className="w-4 h-4 animate-pulse text-orange-600" />
          <span>Empowering Enterprises with Next-Gen Voice AI</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-[88px] font-black text-slate-900 leading-[0.95] tracking-tight mb-6 pointer-events-auto drop-shadow-xs">
          Your AI Voice Agent
          <br />
          <span className="text-white drop-shadow-md">{typeText}</span>
          <span className="typewriter-cursor bg-white" />
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-800 leading-relaxed font-semibold pointer-events-auto bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-amber-200/60 shadow-xs mb-8">
          Agenix AI resolves traditional voice AI latency to deliver real-time, fluid conversations using custom-cloned human voices across <span className="font-black text-slate-900">45+ languages</span>.
        </p>

      </div>
    </section>
  );
};

export default HeroSection;
