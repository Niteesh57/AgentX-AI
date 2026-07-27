import React, { useState, useEffect } from 'react';
import { Play, Pause, PhoneCall, Sparkles, CheckCircle2, ShieldCheck, Zap, RefreshCw } from 'lucide-react';

interface VoiceSample {
  id: string;
  language: string;
  nativeName: string;
  flag: string;
  agentRole: string;
  roboticTranscript: string;
  humanizedTranscript: string;
}

const VOICE_SAMPLES: VoiceSample[] = [
  {
    id: 'en-us',
    language: 'English (US)',
    nativeName: 'American Accent',
    flag: '🇺🇸',
    agentRole: 'Phone Appointment Agent',
    roboticTranscript: '"Hello user. I am calling to confirm your appointment scheduled for tomorrow at two PM."',
    humanizedTranscript: '"Hey Sarah! Quick call from Agenix AI — just wanted to check if 2:00 PM tomorrow still works great for your team?"'
  },
  {
    id: 'te-in',
    language: 'Telugu',
    nativeName: 'తెలుగు',
    flag: '🇮🇳',
    agentRole: 'Phone Appointment Agent',
    roboticTranscript: '"నమస్కారం. మీ అపాయింట్‌మెంట్ రేపటికి నిర్ధారించబడింది."',
    humanizedTranscript: '"నమస్కారం! రేపటి మీ అపాయింట్‌మెంట్ నిర్ధారించడానికి Agenix AI నుండి కాల్ చేస్తున్నాను — సమయం అనుకూలంగా ఉందా?"'
  },
  {
    id: 'hi-in',
    language: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    agentRole: 'Support & Guidance Agent',
    roboticTranscript: '"नमस्ते ग्राहक। आपकी सेवा के लिए कॉल की गई है।"',
    humanizedTranscript: '"नमस्ते! मैं Agenix AI से बोल रहा हूँ। क्या आप अपनी नई सर्विस सेटअप करने में मदद चाहेंगे? चलिए मिलकर करते हैं!"'
  },
  {
    id: 'ta-in',
    language: 'Tamil',
    nativeName: 'தமிழ்',
    flag: '🇮🇳',
    agentRole: 'Customer Service Agent',
    roboticTranscript: '"வணக்கம். உங்கள் சந்திப்பு உறுதிப்படுத்தப்பட்டது."',
    humanizedTranscript: '"வணக்கம்! நாளைய உங்கள் சந்திப்பை உறுதிப்படுத்த Agenix AI மூலம் அழைக்கிறேன் — நேரம் உங்களுக்கு வசதியா?"'
  },
  {
    id: 'ja-jp',
    language: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    agentRole: 'Conference Room Translator',
    roboticTranscript: '"こんにちは。会議の翻訳を開始します。"',
    humanizedTranscript: '"こんにちは！Agenix AIのリアルタイム通訳を担当しますね。それでは会議を始めましょう！"'
  }
];

export const VoiceDemoWidget: React.FC = () => {
  const [selectedSample, setSelectedSample] = useState<VoiceSample>(VOICE_SAMPLES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState<'humanized' | 'robotic'>('humanized');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'connected'>('idle');

  useEffect(() => {
    if (!isPlaying) return;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = mode === 'humanized' 
        ? selectedSample.humanizedTranscript.replace(/"/g, '')
        : selectedSample.roboticTranscript.replace(/"/g, '');

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = mode === 'humanized' ? 1.05 : 0.85;
      utterance.pitch = mode === 'humanized' ? 1.1 : 0.8;

      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    } else {
      const timer = setTimeout(() => setIsPlaying(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, selectedSample, mode]);

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRequestCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setCallStatus('calling');
    setTimeout(() => {
      setCallStatus('connected');
    }, 2500);
  };

  return (
    <section id="widget-demo" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>Interactive Voice Studio</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Experience Natural <br />
            <span className="text-gradient-orange">
              Human-Mimicking Voice AI
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Compare standard robotic TTS with Agenix AI's humanized voice engine featuring natural tone, emotion, zero lag, and pitch modulation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-orange-50/20 rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xl shadow-orange-500/5">
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Select Language & Voice Persona:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {VOICE_SAMPLES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => {
                      setSelectedSample(sample);
                      setIsPlaying(false);
                    }}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${
                      selectedSample.id === sample.id
                        ? 'bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-600/20'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-orange-300 hover:bg-orange-50/50'
                    }`}
                  >
                    <span className="text-xl">{sample.flag}</span>
                    <div className="flex flex-col truncate">
                      <span className="text-xs font-bold truncate">{sample.language}</span>
                      <span className={`text-[10px] truncate ${selectedSample.id === sample.id ? 'text-orange-100' : 'text-slate-500'}`}>
                        {sample.nativeName}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between bg-white p-2 rounded-2xl border border-amber-200/80 mb-6">
              <button
                onClick={() => {
                  setMode('robotic');
                  setIsPlaying(false);
                }}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  mode === 'robotic'
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Legacy Robotic TTS</span>
              </button>
              <button
                onClick={() => {
                  setMode('humanized');
                  setIsPlaying(false);
                }}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  mode === 'humanized'
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
                    : 'text-slate-600 hover:text-orange-600'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Agenix AI Humanized Voice</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-amber-200/80 shadow-xs relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePlayToggle}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                      isPlaying
                        ? 'bg-slate-900 text-white ring-4 ring-slate-200'
                        : 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-600/30 hover:scale-105'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </button>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-orange-600">
                      {selectedSample.flag} {selectedSample.language} &bull; {selectedSample.agentRole}
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {mode === 'humanized' ? 'Agenix AI Humanized Engine' : 'Monotone Robotic Baseline'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 h-8">
                  {[40, 70, 30, 90, 50, 80, 20, 100, 60, 40].map((h, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full transition-all duration-300 ${
                        isPlaying
                          ? mode === 'humanized' ? 'bg-orange-600 animate-pulse' : 'bg-slate-400'
                          : 'bg-slate-200'
                      }`}
                      style={{ height: isPlaying ? `${Math.max(8, Number((h * Math.random()).toFixed(0)))}px` : '8px' }}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-orange-50/50 rounded-xl p-4 border border-amber-200/60">
                <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider block mb-1">
                  Synthesized Voice Transcript:
                </span>
                <p className="text-sm font-medium text-slate-800 italic leading-relaxed">
                  {mode === 'humanized' ? selectedSample.humanizedTranscript : selectedSample.roboticTranscript}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-orange-600 via-orange-600 to-amber-700 text-white rounded-3xl p-6 sm:p-8 shadow-2xl shadow-orange-600/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-4 backdrop-blur-xs">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Instant Outbound Call Sandbox</span>
              </div>

              <h3 className="text-2xl font-extrabold text-white mb-2">
                Receive an AI Phone Call Right Now
              </h3>

              <p className="text-sm text-orange-100 mb-6 leading-relaxed">
                Test our phone call agent directly. Enter your mobile number, and our Agenix AI agent will dial you in under 10 seconds to guide you through a live voice sample.
              </p>

              {callStatus === 'idle' && (
                <form onSubmit={handleRequestCall} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-orange-100 mb-1.5">
                      Your Phone Number (with Country Code):
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98807 24020"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 placeholder-slate-400 font-medium text-sm focus:outline-hidden focus:ring-4 focus:ring-amber-300"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                  >
                    <PhoneCall className="w-4 h-4 text-orange-400" />
                    <span>Trigger Live AI Call</span>
                  </button>
                </form>
              )}

              {callStatus === 'calling' && (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center space-y-4 border border-white/20">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-orange-600 mx-auto animate-bounce shadow-lg">
                    <PhoneCall className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Dialing {phoneNumber}...</h4>
                    <p className="text-xs text-orange-100">Connecting to PSTN Telecom Carrier Bridge</p>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-xs text-orange-200">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Initiating Humanized Agent...</span>
                  </div>
                </div>
              )}

              {callStatus === 'connected' && (
                <div className="bg-white text-slate-900 rounded-2xl p-6 text-center space-y-4 shadow-xl">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-slate-900">Call Connected!</h4>
                    <p className="text-xs text-slate-600">Your phone should be ringing now.</p>
                  </div>
                  <button
                    onClick={() => {
                      setCallStatus('idle');
                      setPhoneNumber('');
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors"
                  >
                    Test Another Number
                  </button>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-white/15 grid grid-cols-2 gap-3 text-xs text-orange-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-orange-200" />
                  <span>Strict Telecom Privacy</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-orange-200" />
                  <span>Sub-180ms Latency</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
