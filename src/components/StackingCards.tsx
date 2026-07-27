import React, { useRef, Suspense, lazy } from 'react';
import { Zap, Globe, Lock, Brain, Mic, PhoneCall } from 'lucide-react';

const ShaderGradientBackground = lazy(() => import('./ShaderGradientBackground'));

const CARDS = [
  {
    number: '01',
    icon: Mic,
    title: 'Human Vocal Emotion Engine',
    body: 'Reproduces natural breath, hesitation, pitch variation, and emotional warmth — so every call feels genuine.',
    accent: '#EA580C',
  },
  {
    number: '02',
    icon: Zap,
    title: 'Sub-180ms Stream Latency',
    body: 'Edge-deployed voice pipeline responds instantly, eliminating the awkward pauses that expose robotic AI.',
    accent: '#F97316',
  },
  {
    number: '03',
    icon: Globe,
    title: '45+ Global Languages',
    body: 'Flawless pronunciation across English, Telugu, Hindi, Tamil, Kannada, Malayalam, French, Spanish, German and more.',
    accent: '#D97706',
  },
  {
    number: '04',
    icon: PhoneCall,
    title: 'PSTN & SIP Dialing',
    body: 'Place real outbound calls to mobile numbers via global telecom carriers. No VoIP-only limitations.',
    accent: '#C2410C',
  },
  {
    number: '05',
    icon: Brain,
    title: 'Multi-Turn Goal Guidance',
    body: 'The agent handles interruptions, pivots context mid-call, and drives toward its goal without getting confused.',
    accent: '#F59E0B',
  },
  {
    number: '06',
    icon: Lock,
    title: 'End-to-End Voice Encryption',
    body: 'SRTP + TLS encrypted audio streams. Zero-retention pipelines available for HIPAA & GDPR compliance.',
    accent: '#EA580C',
  },
];

export const StackingCards: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Spotlight cursor effect per card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--mouse-x', `${x}%`);
    el.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <section id="features" className="relative py-24 bg-[#FFFBF7] overflow-hidden">
      {/* Animated @shadergradient/react Grain Background — exact same warm orange gradient */}
      <Suspense fallback={null}>
        <ShaderGradientBackground />
      </Suspense>

      {/* Background Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none z-1" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-orange-300" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-orange-800">Technology</span>
            <div className="h-px w-10 bg-orange-300" />
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-slate-900 leading-tight tracking-tight">
            Engineered to Sound <br />
            <span className="text-white drop-shadow-md">Unmistakably Human</span>
          </h2>
          <p className="mt-5 text-lg text-slate-800 leading-relaxed font-semibold bg-white/70 backdrop-blur-xs p-4 rounded-2xl border border-amber-200/60 shadow-xs inline-block">
            Six architectural pillars that make our voice agents indistinguishable from real human callers.
          </p>
        </div>

        {/* Cards Grid — Spotlight interaction */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" ref={containerRef}>
          {CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={card.number}
                className="spotlight-card group rounded-3xl p-8 bg-white/85 backdrop-blur-md border border-amber-200/80 flex flex-col gap-5 transition-all duration-300 hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/15 hover:bg-white"
                onMouseMove={handleMouseMove}
                style={{
                  animationDelay: `${idx * 80}ms`,
                }}
              >
                {/* Spotlight gradient (CSS var driven) */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(234,88,12,0.08), transparent 70%)`,
                  }}
                />

                {/* Number + Icon row */}
                <div className="flex items-center justify-between">
                  <span className="text-5xl font-black text-slate-300 group-hover:text-orange-300 transition-colors leading-none">
                    {card.number}
                  </span>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                    style={{ background: card.accent, boxShadow: `0 8px 24px ${card.accent}44` }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-slate-700 text-sm leading-relaxed font-medium">
                    {card.body}
                  </p>
                </div>

                {/* Bottom accent bar */}
                <div className="mt-auto pt-5 border-t border-amber-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Agenix AI Core</span>
                  <span className="text-orange-600 group-hover:translate-x-1 transition-transform text-sm font-bold">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
