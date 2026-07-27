import React from 'react';
import { ArrowRight, Mic, PhoneCall, Play } from 'lucide-react';

const SOLUTIONS = [
  {
    index: '01',
    title: 'Conference Room\nVoice Translator',
    subtitle: 'Multi-Party Live Bridge',
    description: 'Real-time speech-to-speech translation across English, Japanese, Hindi, French, Spanish, and regional Indian languages — maintaining each speaker\'s tone and cadence.',
    image: '/voice-to-voice-ai-trn.jpg',
    icon: Mic,
    stats: [
      { val: '<180ms', label: 'Translation Speed' },
      { val: '45+', label: 'Languages' },
      { val: '99%', label: 'Tone Accuracy' },
    ],
    accent: 'from-orange-600 via-orange-600 to-amber-700',
    tag: 'Conference AI'
  },
  {
    index: '02',
    title: 'Autonomous Phone\nCall Agent',
    subtitle: 'Outbound & Inbound AI',
    description: 'Deploy agents that dial real phone numbers via PSTN/SIP, guide users through complex tasks, handle interruptions naturally, and sync to your CRM after every call.',
    image: '/person-holding-a-smartphone-close-to-their-face-ai.png',
    icon: PhoneCall,
    stats: [
      { val: 'PSTN', label: 'Carrier Integration' },
      { val: '24/7', label: 'Always On' },
      { val: 'CRM', label: 'Auto-Sync' },
    ],
    accent: 'from-amber-600 via-orange-600 to-amber-800',
    tag: 'Phone Agent AI'
  }
];

export const HorizontalScrollSolutions: React.FC = () => {
  return (
    <section id="solutions" className="relative py-24 bg-orange-50/20 overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
      {/* Soft orange glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-orange-400" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-orange-600">Core Offering</span>
            <div className="h-px w-10 bg-orange-400" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
            Two Solutions.<br />
            <span className="text-gradient-orange">One Voice Engine.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Real-time conference room speech translation and autonomous outbound PSTN phone call agents.
          </p>
        </div>

        {/* Side-by-Side 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {SOLUTIONS.map((sol) => {
            const Icon = sol.icon;
            return (
              <div key={sol.index} className="w-full">
                <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${sol.accent} p-0 shadow-2xl shadow-orange-600/20 h-full flex flex-col justify-between`} style={{ minHeight: 520 }}>
                  {/* Background image */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={sol.image}
                      alt={sol.title}
                      className="w-full h-full object-cover opacity-25"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col justify-between h-full p-8 sm:p-10">
                    {/* Top */}
                    <div className="flex items-start justify-between mb-6">
                      <span className="text-[70px] sm:text-[80px] font-black text-white/10 leading-none -mt-4">{sol.index}</span>
                      <div className="bg-white/15 backdrop-blur-sm px-3.5 py-1.5 rounded-full flex items-center gap-2 border border-white/20">
                        <Icon className="w-4 h-4 text-orange-200" />
                        <span className="text-xs font-bold text-white/90">{sol.tag}</span>
                      </div>
                    </div>

                    {/* Bottom */}
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4 whitespace-pre-line">
                        {sol.title}
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed mb-8 max-w-md">
                        {sol.description}
                      </p>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-white/15">
                        {sol.stats.map(s => (
                          <div key={s.label}>
                            <p className="text-xl font-black text-white">{s.val}</p>
                            <p className="text-xs text-white/60 font-semibold mt-0.5">{s.label}</p>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <a href="#demo"
                          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-orange-700 hover:bg-orange-50 font-extrabold text-sm transition-all hover:scale-105 shadow-lg">
                          <Play className="w-4 h-4 fill-current" />
                          <span>Try Live Demo</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
