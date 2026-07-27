import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "How does Agenix AI sound so realistic compared to standard TTS?",
    answer: "Unlike traditional text-to-speech tools that sound robotic, Agenix AI utilizes neural acoustic models trained to reproduce natural human breath, speech pacing, emotional pitch modulation, and filler words. This mimics human conversation effortlessly."
  },
  {
    question: "Can Agenix AI dial real mobile phone numbers (PSTN)?",
    answer: "Yes! Our platform integrates directly with telecommunications carriers via SIP/PSTN trunking. You can configure agents to place outbound calls for appointments, follow-ups, and user guidance, or handle inbound customer service calls 24/7."
  },
  {
    question: "How does the Conference Room Voice-to-Voice Translator work?",
    answer: "In a multi-language conference setting, Agenix AI acts as a live voice bridge. It captures each speaker's audio feed, performs sub-180ms translation, and outputs humanized audio into participants' earbud feeds in their chosen native language (Telugu, Hindi, Tamil, English, French, Spanish, etc.)."
  },
  {
    question: "What happens if a user interrupts the AI during a phone call?",
    answer: "Agenix AI supports real-time full-duplex speech recognition. When a human speaks mid-sentence, the agent immediately pauses its output, processes the user's interruption, and seamlessly shifts context without sounding robotic or restarting."
  },
  {
    question: "Is our voice data private and compliant with security regulations?",
    answer: "Yes. All audio streams are encrypted end-to-end using SRTP and TLS protocol. We offer zero-retention voice pipelines compliant with enterprise security standards."
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-orange-50/20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-orange-600" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need to Know
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Got questions about our humanized voice engine or deployment setup? We have answers.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-amber-200/80 shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-orange-600 transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-orange-600 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-amber-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
