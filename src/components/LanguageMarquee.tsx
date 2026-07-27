import React, { lazy, Suspense } from 'react';

const ShaderGradientBackground = lazy(() => import('./ShaderGradientBackground'));

const ROW1 = [
  { lang: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
  { lang: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { lang: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
  { lang: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { lang: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' },
  { lang: 'Bengali', native: 'বাংলা', flag: '🇮🇳' },
  { lang: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' },
  { lang: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
  { lang: 'Urdu', native: 'اردو', flag: '🇮🇳' },
  { lang: 'English (US)', native: 'English', flag: '🇺🇸' },
];

const ROW2 = [
  { lang: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { lang: 'French', native: 'Français', flag: '🇫🇷' },
  { lang: 'German', native: 'Deutsch', flag: '🇩🇪' },
  { lang: 'Japanese', native: '日本語', flag: '🇯🇵' },
  { lang: 'Mandarin', native: '普通话', flag: '🇨🇳' },
  { lang: 'Korean', native: '한국어', flag: '🇰🇷' },
  { lang: 'Arabic', native: 'العربية', flag: '🇸🇦' },
  { lang: 'Portuguese', native: 'Português', flag: '🇧🇷' },
  { lang: 'Italian', native: 'Italiano', flag: '🇮🇹' },
  { lang: 'English (UK)', native: 'British English', flag: '🇬🇧' },
];

const LangChip = ({ lang, native, flag }: { lang: string; native: string; flag: string }) => (
  <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/90 backdrop-blur-md border border-amber-200/80 hover:border-orange-500 hover:bg-white transition-all cursor-default select-none flex-shrink-0 shadow-md hover:scale-105">
    <span className="text-2xl">{flag}</span>
    <div>
      <p className="text-sm font-extrabold text-slate-900 whitespace-nowrap">{lang}</p>
      <p className="text-xs text-orange-800 font-mono font-extrabold">{native}</p>
    </div>
  </div>
);

export const LanguageMarquee: React.FC = () => (
  <div className="relative py-16 bg-[#FFFBF7] border-y border-amber-200/60 overflow-hidden">
    {/* Animated @shadergradient/react Grain Background — exact same warm orange gradient */}
    <Suspense fallback={null}>
      <ShaderGradientBackground />
    </Suspense>

    {/* Background Grid Pattern Overlay */}
    <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none z-1" />

    <div className="max-w-7xl mx-auto px-4 mb-8 text-center relative z-10">
      <span className="inline-block text-xs sm:text-sm font-black uppercase tracking-widest text-slate-900 bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-full shadow-md border border-amber-200/80">
        45+ Supported Voice Languages — All Native Indian & Global Accents
      </span>
    </div>

    {/* Row 1 — scrolling left */}
    <div className="relative mb-4 overflow-hidden z-10">
      <div className="marquee-track marquee-left flex gap-4">
        {[...ROW1, ...ROW1].map((l, i) => <LangChip key={i} {...l} />)}
      </div>
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-orange-500/20 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-orange-500/20 to-transparent pointer-events-none z-10" />
    </div>

    {/* Row 2 — scrolling right */}
    <div className="relative overflow-hidden z-10">
      <div className="marquee-track marquee-right flex gap-4">
        {[...ROW2, ...ROW2].map((l, i) => <LangChip key={i} {...l} />)}
      </div>
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-orange-500/20 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-orange-500/20 to-transparent pointer-events-none z-10" />
    </div>
  </div>
);
