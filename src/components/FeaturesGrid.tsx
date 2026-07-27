import React from 'react';
import { Zap, Globe, Lock, Brain, Sparkles, PhoneCall, Mic } from 'lucide-react';

const FEATURES = [
  {
    icon: Mic,
    title: "Human Vocal Emotion Engine",
    description: "Models natural human breath, hesitation, pitch variation, and emotional warmth so calls feel genuine and empathetic.",
    badge: "Humanized AI Voice"
  },
  {
    icon: Zap,
    title: "< 180ms Streaming Latency",
    description: "Edge-deployed voice processing delivers instant responses, preventing awkward pauses and enabling smooth conversation flow.",
    badge: "Ultra Fast"
  },
  {
    icon: Globe,
    title: "45+ Languages & Accents",
    description: "Flawless pronunciation across English, Telugu, Hindi, Tamil, Kannada, Malayalam, French, Spanish, German, and local dialects.",
    badge: "Global Mesh"
  },
  {
    icon: PhoneCall,
    title: "PSTN & SIP Phone Dialing",
    description: "Seamlessly dial out to real mobile numbers or receive incoming customer service calls over standard telecommunication carriers.",
    badge: "Telecom Bridge"
  },
  {
    icon: Brain,
    title: "Multi-Turn Goal Guidance",
    description: "Guides users through multi-step procedures, answers unexpected follow-up questions, and updates CRM records automatically.",
    badge: "Autonomous AI"
  },
  {
    icon: Lock,
    title: "Bank-Grade Privacy & Encryption",
    description: "End-to-end TLS/SRTP encrypted voice streams with zero data retention options for strict compliance.",
    badge: "Enterprise Security"
  }
];

export const FeaturesGrid: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>State-of-the-Art Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Engineered for <br />
            <span className="text-gradient-orange">
              Flawless Voice Interactions
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Powered by modern neural acoustic modeling, real-time speech translation, and high-concurrency telephony infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-3xl p-8 border border-amber-200/80 shadow-md hover:shadow-xl hover:border-orange-300 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center shadow-lg shadow-orange-600/20 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-orange-100/70 text-orange-700 uppercase tracking-wider">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-xs font-semibold text-orange-600">
                  <span>Agenix AI Core</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
