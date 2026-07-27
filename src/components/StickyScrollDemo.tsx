import React, { useState, useEffect } from 'react';
import { Play, Pause, Sparkles, ChevronDown, Sliders, Info } from 'lucide-react';
import { fetchEdgeTTSAudio, globalEdgeAudioPlayer } from '../services/edgeTtsService';

/* ─────────────────────────────────────────────────
   AZURE / EDGE TTS FEMALE NATIVE NEURAL CATALOG
   Standard Female Neural Voice per Language
───────────────────────────────────────────────── */
export interface AzureVoice {
  id: string;
  country: string;
  flag: string;
  lang: string; // BCP-47 locale
  voiceName: string; // Official Microsoft Female Neural Voice
  femaleName: string;
  humanized: string;
  robotic: string;
}

const AZURE_CATALOG: AzureVoice[] = [
  // 🇺🇸 AMERICAS VOICES
  {
    id: 'en-US', country: 'English (United States)', flag: '🇺🇸', lang: 'en-US',
    voiceName: 'en-US-AriaNeural', femaleName: 'Aria (Neural)',
    humanized: "Hey Sarah! Just a quick call — your 2 PM appointment tomorrow still looking good? Let me know if you need to shift it!",
    robotic: "Hello user. Your appointment is confirmed for 2 PM tomorrow."
  },

  // 🇮🇳 INDIA REGIONAL NEURAL VOICES
  {
    id: 'te-IN', country: 'Telugu (India)', flag: '🇮🇳', lang: 'te-IN',
    voiceName: 'te-IN-ShrutiNeural', femaleName: 'శృతి (Shruti Neural)',
    humanized: "నమస్కారం! రేపటి మీ అపాయింట్‌మెంట్ నిర్ధారించడానికి AgenixAI నుండి కాల్ చేస్తున్నాను — సమయం అనుకూలంగా ఉందా?",
    robotic: "నమస్కారం. మీ అపాయింట్‌మెంట్ రేపటికి నిర్ధారించబడింది."
  },
  {
    id: 'hi-IN', country: 'Hindi (India)', flag: '🇮🇳', lang: 'hi-IN',
    voiceName: 'hi-IN-SwaraNeural', femaleName: 'स्वरा (Swara Neural)',
    humanized: "नमस्ते! मैं आपकी कल की अपॉइंटमेंट कन्फर्म करने के लिए AgenixAI से कॉल कर रहा हूँ — क्या समय ठीक है?",
    robotic: "नमस्ते। आपकी अपॉइंटमेंट कन्फर्म हो गई है."
  },
  {
    id: 'ta-IN', country: 'Tamil (India)', flag: '🇮🇳', lang: 'ta-IN',
    voiceName: 'ta-IN-PallaviNeural', femaleName: 'பல்லவி (Pallavi Neural)',
    humanized: "வணக்கம்! நாளைய உங்கள் சந்திப்பை உறுதிப்படுத்த அழைக்கிறேன் — நேரம் உங்களுக்கு வசதியா?",
    robotic: "வணக்கம். உங்கள் சந்திப்பு உறுதிப்படுத்தப்பட்டது."
  },
  {
    id: 'kn-IN', country: 'Kannada (India)', flag: '🇮🇳', lang: 'kn-IN',
    voiceName: 'kn-IN-SapnaNeural', femaleName: 'ಸಪ್ನಾ (Sapna Neural)',
    humanized: "ನಮಸ್ಕಾರ! ನಾಳಿನ ನಿಮ್ಮ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ದೃಢಪಡಿಸಲು ಕರೆ ಮಾಡುತ್ತಿದ್ದೇನೆ — ಸಮಯ ನಿಮಗೆ ಸರಿಯಾಗಿದೆಯೇ?",
    robotic: "ನಮಸ್ಕಾರ. ನಿಮ್ಮ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ದೃಢಪಡಿಸಲಾಗಿದೆ."
  },
  {
    id: 'bn-IN', country: 'Bengali (India)', flag: '🇮🇳', lang: 'bn-IN',
    voiceName: 'bn-IN-TanishaaNeural', femaleName: 'তানিষা (Tanishaa Neural)',
    humanized: "নমস্কার! আগামীকালের আপনার অ্যাপয়েন্টমেন্ট নিশ্চিত করতে ফোন করছি — সময়টা ঠিক আছে তো?",
    robotic: "নমস্কার। আপনার অ্যাপয়েন্টমেন্ট নিশ্চিত করা হয়েছে."
  },
  {
    id: 'ml-IN', country: 'Malayalam (India)', flag: '🇮🇳', lang: 'ml-IN',
    voiceName: 'ml-IN-SobhanaNeural', femaleName: 'ശോഭന (Sobhana Neural)',
    humanized: "നമസ്കാരം! നാളത്തെ അപ്പോയ്‌ന്റ്‌മെന്റ് സ്ഥിരീകരിക്കാൻ വിളിക്കുകയാണ് — സമയം ശരിയാണോ?",
    robotic: "നമസ്കാരം. നിങ്ങളുടെ അപ്പോയ്‌ന്റ്‌മെന്റ് സ്ഥിരീകരിച്ചു."
  },
  {
    id: 'gu-IN', country: 'Gujarati (India)', flag: '🇮🇳', lang: 'gu-IN',
    voiceName: 'gu-IN-DhwaniNeural', femaleName: 'ધ્વનિ (Dhwani Neural)',
    humanized: "નમસ્તે! કાલની તમારી એપોઇન્ટમેન્ટ કન્ફર્મ કરવા ફોન કર્યો છે — સમય અનુકૂળ છે ને?",
    robotic: "નમસ્તે. તમારી એપોઇન્ટમેન્ટ કન્ફર્મ થઈ ગઈ છે."
  },
  {
    id: 'mr-IN', country: 'Marathi (India)', flag: '🇮🇳', lang: 'mr-IN',
    voiceName: 'mr-IN-AarohiNeural', femaleName: 'आरोही (Aarohi Neural)',
    humanized: "नमस्ते! उद्याच्या तुमच्या अपॉइंटमेंटची पुष्टी करण्यासाठी फोन केला — वेळ सोयीची आहे ना?",
    robotic: "नमस्ते. तुमची अपॉइंटमेंट कन्फर्म झाली आहे."
  },
  {
    id: 'ur-IN', country: 'Urdu (India)', flag: '🇮🇳', lang: 'ur-IN',
    voiceName: 'ur-IN-GulNeural', femaleName: 'گل (Gul Neural)',
    humanized: "ہیلو! کل کی آپ کی ملاقات کی تصدیق کے لیے کال کر رہا ہوں۔",
    robotic: "سلام۔ آپ کی ملاقات کی تصدیق ہو گئی ہے۔"
  },
  {
    id: 'en-IN', country: 'English (India)', flag: '🇮🇳', lang: 'en-IN',
    voiceName: 'en-IN-NeerjaNeural', femaleName: 'Neerja (Expressive)',
    humanized: "Hello! Calling from AgenixAI to confirm your appointment for tomorrow — is this time convenient?",
    robotic: "Hello. Your appointment has been confirmed for tomorrow."
  },
  {
    id: 'es-MX', country: 'Spanish (Mexico)', flag: '🇲🇽', lang: 'es-MX',
    voiceName: 'es-MX-DaliaNeural', femaleName: 'Dalia (Neural)',
    humanized: "¡Hola! Sólo para confirmar tu cita de mañana a las dos — ¿te queda bien la hora?",
    robotic: "Hola. Su cita está confirmada para mañana."
  },
  {
    id: 'pt-BR', country: 'Portuguese (Brazil)', flag: '🇧🇷', lang: 'pt-BR',
    voiceName: 'pt-BR-FranciscaNeural', femaleName: 'Francisca (Neural)',
    humanized: "Oi! Só passando para confirmar seu horário de amanhã — tudo certo por aí?",
    robotic: "Olá. Sua consulta foi confirmada para amanhã."
  },

  // 🇪🇺 EUROPEAN VOICES
  {
    id: 'fr-FR', country: 'French (France)', flag: '🇫🇷', lang: 'fr-FR',
    voiceName: 'fr-FR-DeniseNeural', femaleName: 'Denise (Neural)',
    humanized: "Bonjour Marc ! Je vous appelle pour confirmer notre rendez-vous de demain — est-ce que l'horaire vous convient sempre ?",
    robotic: "Bonjour. Votre rendez-vous est confirmé pour demain."
  },
  {
    id: 'de-DE', country: 'German (Germany)', flag: '🇩🇪', lang: 'de-DE',
    voiceName: 'de-DE-KatjaNeural', femaleName: 'Katja (Neural)',
    humanized: "Hallo Thomas! Ich rufe an, um unseren Termin für morgen zu bestätigen — passt die Uhrzeit weiterhin bei Ihnen?",
    robotic: "Hallo. Ihr Termin für morgen ist bestätigt."
  },
  {
    id: 'es-ES', country: 'Spanish (Spain)', flag: '🇪🇸', lang: 'es-ES',
    voiceName: 'es-ES-ElviraNeural', femaleName: 'Elvira (Neural)',
    humanized: "¡Hola Elena! Te llamo para confirmar nuestra cita de mañana a las dos — ¿te viene bien el horario?",
    robotic: "Hola. Su cita para mañana ha sido confirmada."
  },
  {
    id: 'it-IT', country: 'Italian (Italy)', flag: '🇮🇹', lang: 'it-IT',
    voiceName: 'it-IT-ElsaNeural', femaleName: 'Elsa (Neural)',
    humanized: "Ciao Marco! Ti chiamo per confermare il nostro appuntamento di domani — l'orario ti va bene?",
    robotic: "Ciao. Il tuo appuntamento di domani è confermato."
  },
  {
    id: 'en-GB', country: 'English (United Kingdom)', flag: '🇬🇧', lang: 'en-GB',
    voiceName: 'en-GB-SoniaNeural', femaleName: 'Sonia (British Neural)',
    humanized: "Hello Arthur! Just ringing to confirm our meeting scheduled for tomorrow afternoon — does 2 PM still suit you perfectly?",
    robotic: "Hello. Your meeting for tomorrow afternoon is confirmed."
  },

  // 🌏 ASIA PACIFIC VOICES
  {
    id: 'ja-JP', country: 'Japanese (Japan)', flag: '🇯🇵', lang: 'ja-JP',
    voiceName: 'ja-JP-NanamiNeural', femaleName: '七海 (Nanami Neural)',
    humanized: "こんにちは！明日の2時のお約束のご確認でお電話いたしました。お時間よろしいでしょうか？",
    robotic: "こんにちは。明日の予約が確定しました。"
  },
  {
    id: 'zh-CN', country: 'Mandarin (China)', flag: '🇨🇳', lang: 'zh-CN',
    voiceName: 'zh-CN-XiaoxiaoNeural', femaleName: '晓晓 (Xiaoxiao Neural)',
    humanized: "您好！我是AgenixAI助手，打电话跟您确认一下明天的预约时间，请问您方便吗？",
    robotic: "您好。您明天的预约已经确认。"
  },
  {
    id: 'ko-KR', country: 'Korean (South Korea)', flag: '🇰🇷', lang: 'ko-KR',
    voiceName: 'ko-KR-SunHiNeural', femaleName: '선희 (SunHi Neural)',
    humanized: "안녕하세요! 내일 예약 일정을 확인해 드리려고 전화드렸습니다. 시간 괜찮으신가요?",
    robotic: "안녕하세요. 내일 예약이 확정되었습니다."
  },
  {
    id: 'ar-SA', country: 'Arabic (Saudi Arabia)', flag: '🇸🇦', lang: 'ar-SA',
    voiceName: 'ar-SA-ZariyahNeural', femaleName: 'زَارِيَة (Zariyah Neural)',
    humanized: "مرحباً! أتصل بك لتأكيد موعدنا يوم غدٍ في الساعة الثانية مساءً — هل الوقت مناسب لك؟",
    robotic: "مرحباً. تم تأكيد موعدك ليوم غد."
  }
];

const PITCH_OPTIONS = [
  { label: 'Default', value: 1.0, pitchStr: '+0Hz' },
  { label: 'Extra Low', value: 0.85, pitchStr: '-10Hz' },
  { label: 'Low', value: 0.92, pitchStr: '-5Hz' },
  { label: 'Medium High', value: 1.08, pitchStr: '+5Hz' },
  { label: 'Extra High', value: 1.15, pitchStr: '+10Hz' }
];

export const StickyScrollDemo: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<AzureVoice>(AZURE_CATALOG[0]);
  const [mode, setMode] = useState<'humanized' | 'robotic'>('humanized');
  const [pitchIdx, setPitchIdx] = useState<number>(0);
  const [pace, setPace] = useState<number>(1.0);

  const [playing, setPlaying] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [pitchOpen, setPitchOpen] = useState(false);

  useEffect(() => {
    return () => {
      globalEdgeAudioPlayer.stop();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePlay = async () => {
    if (playing) {
      globalEdgeAudioPlayer.stop();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setPlaying(false);
      return;
    }

    const textToSpeak = mode === 'humanized' ? selectedLang.humanized : selectedLang.robotic;
    setLoadingAudio(true);

    try {
      const audioBuffer = await fetchEdgeTTSAudio({
        text: textToSpeak,
        voiceName: selectedLang.voiceName,
        rate: `${Math.round((pace - 1.0) * 100)}%`,
        pitch: PITCH_OPTIONS[pitchIdx].pitchStr,
      });

      if (audioBuffer && audioBuffer.byteLength > 100) {
        setLoadingAudio(false);
        setPlaying(true);

        globalEdgeAudioPlayer.playBuffer(
          audioBuffer,
          { playbackRate: (mode === 'robotic' ? 0.75 : 1.05) * pace },
          () => setPlaying(false),
          () => setPlaying(false)
        );
        return;
      }
    } catch (edgeErr) {
      console.warn('[Edge-TTS Cloud API Error, trying Web Speech API fallback]:', edgeErr);
    }

    // SECOND STRATEGY: Local Browser SpeechSynthesis Fallback
    setLoadingAudio(false);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const voices = window.speechSynthesis.getVoices();
      const prefix = selectedLang.lang.split('-')[0].toLowerCase();

      const nativeVoice = voices.find(v => {
        const vLang = v.lang.toLowerCase();
        return vLang === selectedLang.lang.toLowerCase() || vLang.startsWith(prefix);
      });

      if (!nativeVoice) {
        alert(`Native ${selectedLang.country} voice server connection timed out and local system voice is not installed. Please try again.`);
        setPlaying(false);
        return;
      }

      setPlaying(true);

      const utt = new SpeechSynthesisUtterance(textToSpeak);
      utt.lang = nativeVoice.lang;
      utt.voice = nativeVoice;

      utt.rate = (mode === 'robotic' ? 0.75 : 1.05) * pace;
      utt.pitch = 1.10 * PITCH_OPTIONS[pitchIdx].value;

      utt.onend = () => setPlaying(false);
      utt.onerror = () => setPlaying(false);

      window.speechSynthesis.speak(utt);
    } else {
      setPlaying(false);
    }
  };

  return (
    <section id="demo" className="relative py-24 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-orange-50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-orange-400" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-orange-800">
              Edge-TTS Native Voice Studio
            </span>
            <div className="h-px w-10 bg-orange-400" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight tracking-tight">
            Pristine Native Neural Speech.<br />
            <span className="text-gradient-orange">Humanized Voice Synthesis for 45+ Languages.</span>
          </h2>
          <p className="mt-4 text-base text-slate-700 max-w-xl mx-auto font-medium">
            Select a target language locale to hear native female neural speech synthesis in real-time.
          </p>
        </div>

        {/* Main Azure Speech Studio Form Card */}
        <div className="bg-white rounded-3xl border border-amber-200 shadow-xl shadow-orange-500/5 overflow-hidden p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* ── Left Column: Language Selector & Fine-Tuning ── */}
            <div className="lg:col-span-6 space-y-6">

              {/* Language Selector */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-1.5">
                  <span>Target Language Locale</span>
                  <Info className="w-3.5 h-3.5 text-slate-500" />
                </label>
                <div className="relative">
                  {langOpen && (
                    <div 
                      className="fixed inset-0 z-40 cursor-default" 
                      onClick={() => setLangOpen(false)} 
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => setLangOpen(!langOpen)}
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-orange-50/50 border border-amber-200 text-slate-900 font-bold text-sm outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all cursor-pointer relative z-40"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-lg leading-none">{selectedLang.flag}</span>
                      <span>{selectedLang.country}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {langOpen && (
                    <div className="absolute left-0 right-0 z-50 mt-2 max-h-64 overflow-y-auto bg-white border border-amber-200 rounded-2xl shadow-2xl p-2 space-y-1 scrollbar-thin">
                      {AZURE_CATALOG.map(lang => {
                        const isSelected = selectedLang.id === lang.id;
                        return (
                          <button
                            key={lang.id}
                            type="button"
                            onClick={() => {
                              setSelectedLang(lang);
                              setLangOpen(false);
                            }}
                            className={`flex items-center gap-2.5 w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                              isSelected 
                                ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20' 
                                : 'text-slate-800 hover:bg-orange-50 hover:text-orange-700'
                            }`}
                          >
                            <span className="text-lg leading-none">{lang.flag}</span>
                            <span>{lang.country}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Advanced Fine-Tuning */}
              <div className="pt-4 border-t border-amber-100 space-y-5">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-900">
                  <Sliders className="w-4 h-4 text-orange-700" />
                  <span>Advanced Voice Fine-Tuning</span>
                </div>

                {/* Vocal Pitch Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-2">
                    Vocal pitch
                  </label>
                  <div className="relative">
                    {pitchOpen && (
                      <div 
                        className="fixed inset-0 z-40 cursor-default" 
                        onClick={() => setPitchOpen(false)} 
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => setPitchOpen(!pitchOpen)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-sm outline-none focus:ring-2 focus:ring-orange-500 transition-all cursor-pointer relative z-40"
                    >
                      <span>
                        {PITCH_OPTIONS[pitchIdx].label} {PITCH_OPTIONS[pitchIdx].value !== 1.0 ? `(${PITCH_OPTIONS[pitchIdx].pitchStr})` : ''}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${pitchOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {pitchOpen && (
                      <div className="absolute left-0 right-0 z-50 mt-2 max-h-64 overflow-y-auto bg-white border border-amber-200 rounded-2xl shadow-2xl p-2 space-y-1 scrollbar-thin">
                        {PITCH_OPTIONS.map((p, idx) => {
                          const isSelected = pitchIdx === idx;
                          return (
                            <button
                              key={p.label}
                              type="button"
                              onClick={() => {
                                setPitchIdx(idx);
                                setPitchOpen(false);
                              }}
                              className={`flex items-center justify-between w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                                isSelected 
                                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20' 
                                  : 'text-slate-800 hover:bg-orange-50 hover:text-orange-700'
                              }`}
                            >
                              <span>{p.label}</span>
                              {p.value !== 1.0 && (
                                <span className={`text-xs ${isSelected ? 'text-orange-100' : 'text-slate-500'}`}>
                                  {p.pitchStr}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Pace / Speed Slider */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
                    <label htmlFor="pace-speed-slider">Pace / Speed</label>
                    <span className="font-mono text-orange-800 font-bold">{pace.toFixed(1)}x</span>
                  </div>
                  <input
                    id="pace-speed-slider"
                    aria-label="Pace / Speed playback multiplier"
                    type="range"
                    min="0.5"
                    max="2.0"
                    step="0.1"
                    value={pace}
                    onChange={e => setPace(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-600 font-bold mt-1">
                    <span>0.5x</span>
                    <span>1.0x</span>
                    <span>2.0x</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right Column: Mode Switcher & Real-Time Voice Studio Card ── */}
            <div className="lg:col-span-6 space-y-6">

              {/* Robotic vs. AgenixAI Humanized Toggle */}
              <div className="flex bg-orange-50/80 border border-amber-200 rounded-2xl p-1.5">
                <button
                  onClick={() => setMode('robotic')}
                  aria-label="Select Robotic Monotone Mode"
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${mode === 'robotic'
                      ? 'bg-white text-slate-900 shadow border border-slate-200'
                      : 'text-slate-700 hover:text-slate-900'
                    }`}
                >
                  Robotic Monotone
                </button>
                <button
                  onClick={() => setMode('humanized')}
                  aria-label="Select Agenix AI Humanized Voice Mode"
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${mode === 'humanized'
                      ? 'bg-orange-600 text-white shadow-md shadow-orange-600/25'
                      : 'text-slate-700 hover:text-orange-800'
                    }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Agenix AI Humanized
                </button>
              </div>

              {/* Player Card */}
              <div className="rounded-3xl border border-amber-200 bg-orange-50/30 p-6 space-y-6">

                {/* Banner Header */}
                <div className="flex items-center justify-between pb-4 border-b border-amber-200">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{selectedLang.flag}</span>
                    <div>
                      <p className="font-extrabold text-slate-900">{selectedLang.country}</p>
                      <p className="text-xs text-orange-800 font-bold font-mono mt-0.5">
                        Native Voice: {selectedLang.femaleName}
                      </p>
                    </div>
                  </div>

                  {/* Play/Pause Button */}
                  <button
                    onClick={handlePlay}
                    disabled={loadingAudio}
                    aria-label={playing ? "Pause native speech synthesis" : "Play native speech synthesis"}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-lg flex-shrink-0 disabled:opacity-50 ${playing
                        ? 'bg-slate-900 text-white shadow-slate-900/30 hover:bg-black'
                        : 'bg-orange-600 hover:bg-orange-500 text-white shadow-orange-600/30 hover:scale-105'
                      }`}
                  >
                    {loadingAudio
                      ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      : playing
                        ? <Pause className="w-6 h-6" />
                        : <Play className="w-6 h-6 ml-0.5 fill-current" />
                    }
                  </button>
                </div>

                {/* Script Box */}
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-2.5">
                    Native Language Script
                  </p>
                  <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-xs">
                    <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed font-sans">
                      &quot;{mode === 'humanized' ? selectedLang.humanized : selectedLang.robotic}&quot;
                    </p>
                  </div>
                </div>

                {/* Audio Wave Visualizer */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 h-6">
                    {[35, 75, 45, 90, 60, 100, 50, 80, 40, 70, 30, 85].map((h, i) => (
                      <div
                        key={i}
                        className={`w-1 rounded-full transition-all duration-300 ${playing ? 'bg-orange-600 animate-pulse' : 'bg-slate-300'
                          }`}
                        style={{ height: playing ? `${Math.max(6, Math.floor(h * Math.random()))}px` : '6px' }}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-600 font-mono">
                    {playing ? 'Playing Native Audio Stream...' : 'Ready for Playback'}
                  </span>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
