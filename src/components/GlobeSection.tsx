import React, { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';
import { PhoneCall, Radio, Volume2, Sparkles, User, Bot, Languages } from 'lucide-react';

/* ─────── Live call data ─────── */
const CALLS = [
  { id: 'CALL-901', from: 'San Francisco', fromLang: 'English (US)', to: 'Tokyo', toLang: '日本語', type: 'Conference Translator' },
  { id: 'CALL-902', from: 'London', fromLang: 'English (UK)', to: 'Paris', toLang: 'Français', type: 'Autonomous Phone Agent' },
  { id: 'CALL-903', from: 'New York', fromLang: 'English', to: 'Mumbai', toLang: 'हिन्दी', type: 'Autonomous Phone Agent' },
  { id: 'CALL-904', from: 'São Paulo', fromLang: 'Latin / Portuguese', to: 'Madrid', toLang: 'Español', type: 'Conference Translator' },
  { id: 'CALL-905', from: 'Sydney', fromLang: 'English (AU)', to: 'Seoul', toLang: '한국어', type: 'Autonomous Phone Agent' },
];

const LANGS = ['English', '日本語', 'हिन्दी', 'Français', 'Español', 'Latin', 'Deutsch', '한국어', 'Italiano', 'Português'];

export const GlobeSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerDelta = useRef(0);
  const [callIdx, setCallIdx] = useState(0);
  const [langIdx, setLangIdx] = useState(0);

  // Auto-cycle calls
  useEffect(() => {
    const iv = setInterval(() => setCallIdx(i => (i + 1) % CALLS.length), 4000);
    return () => clearInterval(iv);
  }, []);

  // Auto-cycle displayed language
  useEffect(() => {
    const iv = setInterval(() => setLangIdx(i => (i + 1) % LANGS.length), 1800);
    return () => clearInterval(iv);
  }, []);

  // Cobe Globe — vivid blue, high contrast
  useEffect(() => {
    let phi = 0;
    let width = 0;
    const resize = () => { if (canvasRef.current) width = canvasRef.current.offsetWidth; };
    window.addEventListener('resize', resize);
    resize();
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.25,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.05, 0.10, 0.25],
      markerColor: [0.3, 0.6, 1.0],
      glowColor: [0.15, 0.4, 0.9],
      markers: [
        { location: [37.7749, -122.4194], size: 0.09 }, // SF
        { location: [35.6762, 139.6503],  size: 0.09 }, // Tokyo
        { location: [51.5074, -0.1278],   size: 0.08 }, // London
        { location: [19.0760,  72.8777],  size: 0.08 }, // Mumbai
        { location: [48.8566,   2.3522],  size: 0.07 }, // Paris
        { location: [-23.5505,-46.6333],  size: 0.08 }, // São Paulo
        { location: [40.7128, -74.0060],  size: 0.09 }, // NYC
        { location: [37.5665, 126.9780],  size: 0.07 }, // Seoul
        { location: [40.4168,  -3.7038],  size: 0.07 }, // Madrid
        { location: [-33.8688,151.2093],  size: 0.08 }, // Sydney
      ],
      onRender: (state: Record<string, any>) => {
        if (!pointerInteracting.current) phi += 0.004;
        state.phi = phi + pointerDelta.current;
      },
    } as any);

    return () => { globe.destroy(); window.removeEventListener('resize', resize); };
  }, []);

  const call = CALLS[callIdx];

  return (
    <section id="globe" className="relative py-24 bg-slate-950 overflow-hidden">
      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundSize: '40px 40px', backgroundImage: 'linear-gradient(to right, rgba(99,179,237,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,179,237,0.15) 1px, transparent 1px)' }} />

      {/* Large glow behind globe */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section label ─── */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-700" />
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400">Global Voice Network</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-700" />
        </div>

        {/* ── Headline ─── */}
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight">
            Human-to-AI Voice Calls,<br />
            <span className="text-gradient-blue">Live Across the Planet</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Watch real-time humanized AI voice sessions bridging cities, languages, and conference rooms — continuously.
          </p>
        </div>

        {/* ── Main Layout: Globe + Live Sidebar ── */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

          {/* Globe sphere — center of gravity */}
          <div className="w-full lg:w-[55%] relative flex items-center justify-center">
            {/* Outer atmosphere ring */}
            <div className="absolute inset-6 rounded-full border-2 border-blue-400/20 animate-pulse pointer-events-none" />
            <div className="absolute inset-12 rounded-full border border-blue-300/15 pointer-events-none" />

            {/* Glow disc behind globe */}
            <div className="absolute inset-8 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />

            {/* Floating language cycling badge — top */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 badge-float-1 z-20">
              <div className="liquid-glass-blue px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                <Languages className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-xs font-bold text-blue-700 min-w-16 text-center transition-all duration-500">
                  {LANGS[langIdx]}
                </span>
              </div>
            </div>

            {/* Floating call badges: left */}
            <div className="absolute left-0 top-1/3 badge-float-2 z-20">
              <div className="liquid-glass px-3 py-2 rounded-xl shadow-lg flex items-center gap-2 text-xs font-bold text-slate-800 max-w-[160px]">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
                </span>
                <span>SF ↔ Tokyo · EN/JA</span>
              </div>
            </div>

            {/* Floating call badge: right */}
            <div className="absolute right-0 top-1/2 badge-float-3 z-20">
              <div className="liquid-glass-blue px-3 py-2 rounded-xl shadow-lg flex items-center gap-2 text-xs font-bold text-blue-800 max-w-[160px]">
                <PhoneCall className="w-3 h-3 animate-pulse text-blue-600 shrink-0" />
                <span>NY ↔ Mumbai · Phone Agent</span>
              </div>
            </div>

            {/* Floating badge: bottom */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 badge-float-4 z-20">
              <div className="liquid-glass px-3 py-2 rounded-xl shadow-lg flex items-center gap-2 text-xs font-bold text-slate-700">
                <Radio className="w-3 h-3 text-blue-600 animate-pulse shrink-0" />
                <span>London ↔ Paris Bridge</span>
              </div>
            </div>

            {/* Globe Canvas */}
            <div className="w-full max-w-[480px] aspect-square relative z-10">
              <canvas
                ref={canvasRef}
                className="w-full h-full cursor-grab active:cursor-grabbing outline-hidden"
                onPointerDown={e => {
                  pointerInteracting.current = e.clientX - pointerDelta.current;
                }}
                onPointerUp={() => { pointerInteracting.current = null; }}
                onPointerOut={() => { pointerInteracting.current = null; }}
                onMouseMove={e => {
                  if (pointerInteracting.current !== null) {
                    pointerDelta.current = (e.clientX - pointerInteracting.current) * 0.005;
                  }
                }}
              />
            </div>

            {/* Blur vignette over edges — dark */}
            <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{ background: 'radial-gradient(ellipse at center, transparent 52%, rgba(2,6,23,0.98) 100%)' }} />

            {/* Control hint */}
            <div className="absolute bottom-2 right-2 liquid-glass-dark px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 flex items-center gap-1.5 z-20">
              <Sparkles className="w-3 h-3 text-blue-400" />
              Drag to spin · WebGL
            </div>
          </div>

          {/* ── Right: Live Call Stream Panel ── */}
          <div className="w-full lg:w-[42%] flex flex-col gap-5">

            {/* Live active call card */}
            <div className="spotlight-card liquid-glass rounded-3xl p-6 border border-blue-100">
              {/* Header */}
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-blue-100/50">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute h-full w-full rounded-full bg-blue-500 opacity-75" />
                    <span className="relative rounded-full h-3 w-3 bg-blue-600" />
                  </span>
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-700">
                    Live · {call.id}
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold">
                  {call.type}
                </span>
              </div>

              {/* Call flow */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-white/80 rounded-xl p-3.5 border border-slate-100">
                  <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center">
                    <User className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold">Human Caller</p>
                    <p className="text-sm font-bold text-slate-900">{call.from}</p>
                  </div>
                  <span className="ml-auto text-xs font-semibold px-2 py-1 rounded-lg bg-slate-100 text-slate-600">{call.fromLang}</span>
                </div>

                <div className="flex items-center gap-2 px-2">
                  <div className="h-px flex-1 bg-gradient-to-r from-slate-200 via-blue-400 to-blue-600" />
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600 text-white text-[10px] font-bold shadow-md shadow-blue-600/30">
                    <PhoneCall className="w-3 h-3 animate-pulse" />
                    AI Bridge · 168ms
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-l from-slate-200 via-blue-400 to-blue-600" />
                </div>

                <div className="flex items-center gap-3 bg-blue-600 rounded-xl p-3.5">
                  <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-blue-100 font-semibold">Humanized Voice Agent</p>
                    <p className="text-sm font-bold text-white">{call.to}</p>
                  </div>
                  <span className="ml-auto text-xs font-bold px-2 py-1 rounded-lg bg-white/20 text-white">{call.toLang}</span>
                </div>
              </div>

              {/* Wave bars */}
              <div className="mt-5 pt-4 border-t border-blue-100/40 flex items-center justify-between">
                <div className="flex items-end gap-1 h-8">
                  {[40, 75, 30, 90, 55, 80, 35, 100, 60].map((h, i) => (
                    <div
                      key={i}
                      className="wave-bar w-1 bg-blue-500 rounded-full origin-bottom"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                  <span className="ml-2 text-xs font-semibold text-blue-700 self-center">Live Voice Stream</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <Volume2 className="w-3.5 h-3.5 text-blue-500" />
                  Human Tone
                </div>
              </div>
            </div>

            {/* Supported languages compact grid */}
            <div className="liquid-glass rounded-2xl p-5 border border-slate-100">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5 text-blue-500" />
                Supported Voice Languages & Accents
              </p>
              <div className="flex flex-wrap gap-2">
                {['English (US/UK/AU)', 'Japanese', 'Hindi', 'French', 'Spanish', 'Latin', 'German', 'Korean'].map(l => (
                  <span key={l} className="text-[11px] font-semibold px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100 transition-colors cursor-default">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
