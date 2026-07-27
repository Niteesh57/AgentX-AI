import { useEffect, useState, lazy, Suspense } from 'react';
import { X } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HorizontalScrollSolutions } from './components/HorizontalScrollSolutions';
import { StackingCards } from './components/StackingCards';
import { StickyScrollDemo } from './components/StickyScrollDemo';
import { TerminalCTA } from './components/TerminalCTA';
import { LanguageMarquee } from './components/LanguageMarquee';
import { Footer } from './components/Footer';
import { GetACallModal } from './components/GetACallModal';

// Lazy-load the heavy market graph — only renders when Enterprise popup opens
const VoiceAiMarketGraph = lazy(() =>
  import('./components/VoiceAiMarketGraph').then(m => ({ default: m.VoiceAiMarketGraph }))
);

/* ──────────────────────────────────────────────────
   AGENIX AI MINIMAL SKETCH LOADER SCREEN
────────────────────────────────────────────────── */
function SketchLoaderScreen({ done }: { done: boolean }) {
  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#FFFBF7] flex flex-col items-center justify-center transition-all duration-700 ${
        done ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 scale-100'
      }`}
    >
      {/* Soft warm background radial glow */}
      <div className="absolute w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Website Name & Sketch Loading Line */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <span className="font-black text-4xl sm:text-5xl text-slate-900 tracking-tight">
          Agenix<span className="text-orange-600">AI</span>
        </span>

        {/* Sleek Sketch Loading Line */}
        <div className="w-48 h-1 bg-amber-200/60 rounded-full overflow-hidden relative shadow-sm">
          <div className="absolute inset-y-0 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-full animate-sketch-line" />
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────
   ENTERPRISE ANALYTICS POPUP MODAL
────────────────────────────────────────────────── */
function EnterpriseModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div className="relative z-10 w-full max-w-7xl mx-4 my-8 bg-[#FFFBF7] rounded-3xl border border-amber-200 shadow-2xl shadow-orange-900/20 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">

        {/* Modal Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-b border-amber-200/60">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="font-black text-lg text-slate-900 tracking-tight">
              Enterprise <span className="text-orange-600">Analytics</span>
            </span>
            <span className="text-xs font-bold text-orange-800 bg-orange-100 px-2 py-0.5 rounded-full">
              Voice AI Market Intelligence
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Enterprise modal"
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-orange-100 flex items-center justify-center transition-colors group"
          >
            <X className="w-4 h-4 text-slate-600 group-hover:text-orange-700 transition-colors" />
          </button>
        </div>

        {/* Modal Content — the full VoiceAiMarketGraph */}
        <div className="overflow-y-auto">
          <Suspense fallback={
            <div className="flex items-center justify-center py-32 text-slate-500">
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm font-semibold">Loading Market Analytics...</p>
              </div>
            </div>
          }>
            <VoiceAiMarketGraph />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export function App() {
  const [loaded, setLoaded] = useState(false);
  const [enterpriseOpen, setEnterpriseOpen] = useState(false);
  const [getACallOpen, setGetACallOpen] = useState(false);

  useEffect(() => {
    // Show sketch loader for 1.4s
    const t = setTimeout(() => setLoaded(true), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Film-grain noise overlay — entire page */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Agenix AI Minimal Sketch Loader Screen */}
      <SketchLoaderScreen done={loaded} />

      {/* Enterprise Analytics Modal Popup */}
      <EnterpriseModal open={enterpriseOpen} onClose={() => setEnterpriseOpen(false)} />

      {/* Get a Call Lead Form Modal Popup */}
      <GetACallModal open={getACallOpen} onClose={() => setGetACallOpen(false)} />

      <div className={`transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar
          onEnterpriseClick={() => setEnterpriseOpen(true)}
          onGetACallClick={() => setGetACallOpen(true)}
        />
        <main>
          {/* 1. Full-screen hero with Typewriter + Shader Gradient */}
          <HeroSection />

          {/* 2. Side-by-side core solution cards */}
          <HorizontalScrollSolutions />

          {/* 3. Spotlight card grid — technology features */}
          <StackingCards />

          {/* 4. Dual-row infinite language marquee */}
          <LanguageMarquee />

          {/* 5. Voice demo studio */}
          <StickyScrollDemo />

          {/* 6. Terminal UI deploy CTA */}
          <TerminalCTA onGetACallClick={() => setGetACallOpen(true)} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
