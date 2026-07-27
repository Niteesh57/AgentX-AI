import React from 'react';
import { PhoneCall, Users, CheckCircle2, ArrowRight, Cpu, Mic } from 'lucide-react';

export const SolutionsSection: React.FC = () => {
  return (
    <section id="solutions" className="py-24 bg-orange-50/20 relative overflow-hidden">
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5 text-orange-600" />
            <span>Core Enterprise Solutions</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Two Groundbreaking Products, <br />
            <span className="text-gradient-orange">
              One Humanized Voice Engine
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Agenix AI powers real-time multi-speaker conference translations and autonomous outbound/inbound phone calls with zero latency.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-amber-200/80 shadow-xl shadow-orange-500/5 mb-16 transition-all hover:shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-orange-50 text-orange-700 text-xs font-bold border border-orange-200">
                <Users className="w-4 h-4 text-orange-600" />
                <span>Solution 01: Multi-Party Voice Bridge</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Conference Room Real-Time <br />
                <span className="text-orange-600">Voice-to-Voice Translation</span>
              </h3>

              <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                Break language barriers in boardroom meetings and virtual conferences. Our AI listens to human speakers and instantly synthesizes humanized translated speech in each participant&apos;s native earbud feed.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'Zero accent friction across Telugu, Hindi, Tamil, English, French & Spanish',
                  'Maintains speaker cadence, vocal tone, and contextual nuance',
                  'Multi-speaker identification & simultaneous earbud channel routing',
                  'Instant meeting transcripts formatted in real time'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm font-semibold text-slate-800">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-4">
                <a
                  href="#demo"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md shadow-orange-600/20 transition-all hover:translate-x-0.5"
                >
                  <span>See Conference Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100 group">
                <img
                  src="/voice-to-voice-ai-trn.jpg"
                  alt="Voice to Voice AI Translation in Conference Room"
                  className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = '/people-or-talking-in-phone.png';
                  }}
                />
                
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-4 border border-amber-200 shadow-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-600 text-white flex items-center justify-center">
                      <Mic className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-900">Live Global Conference</span>
                      <span className="text-[11px] text-orange-600 font-semibold">EN ↔ TE ↔ HI ↔ TA Active Bridge</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-orange-50 text-orange-700 text-xs font-bold">
                    &lt; 180ms
                  </span>
                </div>
              </div>

              <div className="hidden sm:flex absolute -top-6 -right-6 w-36 h-36 rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                <img
                  src="/people-or-talking-in-phone.png"
                  alt="People talking in conference call"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#18181B] via-zinc-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-amber-500/20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-6 order-2 lg:order-1 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 group">
                <img
                  src="/person-holding-a-smartphone-close-to-their-face-ai.png"
                  alt="Person holding smartphone receiving AI voice call"
                  className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                
                <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md rounded-xl p-3.5 border border-orange-500/40 shadow-xl flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-orange-600 text-white flex items-center justify-center animate-pulse">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">Autonomous Phone Agent</span>
                    <span className="text-[11px] text-orange-300 font-semibold">Outbound Guidance & Execution</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-orange-500/20 text-orange-300 text-xs font-bold border border-orange-400/30">
                <PhoneCall className="w-4 h-4 text-orange-400" />
                <span>Solution 02: Humanized Outbound Phone Agent</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                Autonomous Phone Call Agent <br />
                <span className="text-orange-500">That Speaks & Guides Like a Human</span>
              </h3>

              <p className="text-zinc-300 leading-relaxed text-base sm:text-lg">
                Deploy AI agents that call users over PSTN carriers, deliver crucial updates, answer complex questions, and guide customers step-by-step through tasks using natural conversational tone and turn-taking.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'Natural pauses, fillers ("uh-huh", "got it"), and pitch modulation',
                  'Handles unexpected interruptions smoothly without restarting sentences',
                  'Executes live phone workflows: scheduling, verify details, troubleshooting',
                  'Direct SIP & PSTN integration with CRM sync (Salesforce, HubSpot, Zendesk)'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-orange-500/30 text-orange-400 flex items-center justify-center shrink-0 mt-0.5 border border-orange-400/40">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm font-semibold text-zinc-200">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <a
                  href="#demo"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-sm shadow-xl shadow-orange-600/30 transition-all hover:scale-105"
                >
                  <PhoneCall className="w-4 h-4 text-white" />
                  <span>Test Phone Call Agent Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
