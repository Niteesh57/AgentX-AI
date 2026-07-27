import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';

const ShaderGradientBackground = lazy(() => import('./ShaderGradientBackground'));

interface TranslationSample {
  langCode: string;
  langName: string;
  command: string;
  stream: string;
  speech: string;
}

const TRANSLATION_SAMPLES: TranslationSample[] = [
  {
    langCode: 'te-IN',
    langName: 'Telugu',
    command: '$ agenixai translate --from=en-US --to=te-IN --mode=humanized',
    stream: '✓ Stream active: Bengaluru ↔ Hyderabad',
    speech: '⚡ Agent speaking... "నమస్కారం! అపాయింట్‌మెంట్ నిర్ధారణ అయ్యింది."'
  },
  {
    langCode: 'ta-IN',
    langName: 'Tamil',
    command: '$ agenixai translate --from=en-US --to=ta-IN --mode=humanized',
    stream: '✓ Stream active: Chennai ↔ Bengaluru',
    speech: '⚡ Agent speaking... "வணக்கம்! உங்கள் சந்திப்பு நாளை உறுதி செய்யப்பட்டுள்ளது."'
  },
  {
    langCode: 'hi-IN',
    langName: 'Hindi',
    command: '$ agenixai translate --from=en-US --to=hi-IN --mode=humanized',
    stream: '✓ Stream active: Delhi ↔ Bengaluru',
    speech: '⚡ Agent speaking... "नमस्ते! आपकी बुकिंग कल दोपहर दो बजे के लिए पक्की हो गई है।"'
  },
  {
    langCode: 'es-ES',
    langName: 'Spanish',
    command: '$ agenixai translate --from=en-US --to=es-ES --mode=humanized',
    stream: '✓ Stream active: Madrid ↔ New York',
    speech: '⚡ Agent speaking... "¡Hola! Su cita ha sido confirmada para mañana a las dos."'
  },
  {
    langCode: 'ja-JP',
    langName: 'Japanese',
    command: '$ agenixai translate --from=en-US --to=ja-JP --mode=humanized',
    stream: '✓ Stream active: Tokyo ↔ San Francisco',
    speech: '⚡ Agent speaking... "こんにちは！明日の午後2時のご予約が確定しました。"'
  },
  {
    langCode: 'de-DE',
    langName: 'German',
    command: '$ agenixai translate --from=en-US --to=de-DE --mode=humanized',
    stream: '✓ Stream active: Berlin ↔ New York',
    speech: '⚡ Agent speaking... "Hallo! Ihr Termin für morgen um 14 Uhr ist bestätigt."'
  },
  {
    langCode: 'fr-FR',
    langName: 'French',
    command: '$ agenixai translate --from=en-US --to=fr-FR --mode=humanized',
    stream: '✓ Stream active: Paris ↔ New York',
    speech: '⚡ Agent speaking... "Bonjour! Votre rendez-vous est confirmé pour demain à 14h."'
  },
  {
    langCode: 'it-IT',
    langName: 'Italian',
    command: '$ agenixai translate --from=en-US --to=it-IT --mode=humanized',
    stream: '✓ Stream active: Rome ↔ London',
    speech: '⚡ Agent speaking... "Ciao! Il tuo appuntamento per domani alle 14 è confermato."'
  },
  {
    langCode: 'zh-CN',
    langName: 'Chinese (Mandarin)',
    command: '$ agenixai translate --from=en-US --to=zh-CN --mode=humanized',
    stream: '✓ Stream active: Beijing ↔ Seattle',
    speech: '⚡ Agent speaking... "你好！您明天的预约已确认在下午两点。"'
  }
];

interface TerminalCTAProps {
  onGetACallClick?: () => void;
}

export const TerminalCTA: React.FC<TerminalCTAProps> = ({ onGetACallClick }) => {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  const [currentSampleIdx, setCurrentSampleIdx] = useState(0);
  const [isShifting, setIsShifting] = useState(false);
  const [shiftProgress, setShiftProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const initialLineDelays = [0, 600, 1200, 1900, 2600, 3300, 4000, 4700];
    const timers = initialLineDelays.map((delay, i) =>
      setTimeout(() => setVisibleLines(prev => [...prev, i]), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [started]);

  useEffect(() => {
    if (!visibleLines.includes(7)) return;

    const interval = setInterval(() => {
      triggerShifting();
    }, 4500);

    return () => clearInterval(interval);
  }, [visibleLines]);

  const triggerShifting = () => {
    setIsShifting(true);
    setShiftProgress(0);

    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += 10;
      setShiftProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(progressInterval);
        
        setCurrentSampleIdx(prevIdx => {
          let nextIdx = prevIdx;
          while (nextIdx === prevIdx) {
            nextIdx = Math.floor(Math.random() * TRANSLATION_SAMPLES.length);
          }
          return nextIdx;
        });
        
        setIsShifting(false);
      }
    }, 80); // 10 steps of 80ms = 800ms total transition
  };

  const getLineData = (i: number) => {
    if (i === 0) return { text: '$ agenixai init --humanized --language=all', color: '#64748B' };
    if (i === 1) return { text: '✓ Voice engine loaded — 45+ languages detected', color: '#EA580C' };
    if (i === 2) return { text: '$ agenixai dial +91-9880724020 --agent=phone-outreach', color: '#64748B' };
    if (i === 3) return { text: '✓ PSTN carrier bridge established — latency: 155ms', color: '#059669' };
    
    if (i === 4) {
      if (isShifting) {
        return { text: '$ agenixai translate --from=en-US --to=shifting-language...', color: '#64748B' };
      }
      return { text: TRANSLATION_SAMPLES[currentSampleIdx].command, color: '#64748B' };
    }
    
    if (i === 5) {
      if (isShifting) {
        const bars = Math.round(shiftProgress / 10);
        const dots = 10 - bars;
        return { 
          text: `⟳ Syncing carrier bridge... [${'■'.repeat(bars)}${' '.repeat(dots)}] ${shiftProgress}%`, 
          color: '#EA580C' 
        };
      }
      return { text: TRANSLATION_SAMPLES[currentSampleIdx].stream, color: '#EA580C' };
    }
    
    if (i === 6) {
      if (isShifting) {
        return { text: '⚡ Re-initializing humanized agent neural voice model...', color: '#D97706' };
      }
      return { text: TRANSLATION_SAMPLES[currentSampleIdx].speech, color: '#D97706' };
    }
    
    if (i === 7) {
      return { text: '', color: '#64748B' };
    }
    
    return { text: '', color: '#64748B' };
  };

  return (
    <section ref={sectionRef} className="relative py-24 bg-[#FFFBF7] overflow-hidden">
      {/* Animated @shadergradient/react Grain Background — exact same warm orange gradient */}
      <Suspense fallback={null}>
        <ShaderGradientBackground />
      </Suspense>

      {/* Background Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none z-1" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-orange-300" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-orange-800">Deploy Today</span>
            <div className="h-px w-10 bg-orange-300" />
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-slate-900 leading-tight tracking-tight">
            Your Voice Agent is <br />
            <span className="text-white drop-shadow-md">One Command Away</span>
          </h2>
          <p className="mt-4 text-lg text-slate-800 leading-relaxed font-semibold bg-white/70 backdrop-blur-xs p-4 rounded-2xl border border-amber-200/60 shadow-xs max-w-xl mx-auto">
            Deploy in minutes. No complex infrastructure required. Configure, deploy, and your AI voice agent starts humanizing every call.
          </p>
        </div>

        {/* Terminal window — clean light glass card matching color theme */}
        <div className="bg-white/90 backdrop-blur-md border border-amber-200 rounded-2xl overflow-hidden shadow-xl shadow-orange-500/10">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-amber-100 bg-white">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="ml-4 text-xs text-slate-500 font-mono font-bold">agenixai — terminal</span>
          </div>

          {/* Terminal body */}
          <div className="p-6 sm:p-8 space-y-2 min-h-64">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((lineNum) => {
              const line = getLineData(lineNum);
              return (
                <div
                  key={lineNum}
                  className={`terminal-line text-sm font-mono leading-relaxed transition-opacity duration-300 ${visibleLines.includes(lineNum) ? 'opacity-100' : 'opacity-0'}`}
                  style={{ color: line.color }}
                >
                  {lineNum === 7 && visibleLines.includes(7) ? (
                    <span>
                      <span style={{ color: '#94A3B8' }}>$ </span>
                      <span className="typewriter-cursor bg-orange-600" />
                    </span>
                  ) : line.text}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Buttons below terminal */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onGetACallClick}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-base shadow-xl shadow-orange-600/30 transition-all hover:scale-105 cursor-pointer"
          >
            Schedule a Demo Call
          </button>
        </div>
      </div>
    </section>
  );
};
