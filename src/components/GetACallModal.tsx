import React, { useState, useEffect } from 'react';
import { X, PhoneCall, CheckCircle2, User, Mail, Phone, Briefcase, Sparkles } from 'lucide-react';

interface GetACallModalProps {
  open: boolean;
  onClose: () => void;
}

export const GetACallModal: React.FC<GetACallModalProps> = ({ open, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [useCase, setUseCase] = useState('Appointment Confirmation');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    setEmail('');
    setUseCase('Appointment Confirmation');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl border border-amber-200 shadow-2xl shadow-orange-950/20 overflow-hidden animate-in fade-in zoom-in-95 duration-200 p-6 sm:p-8">

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close form popup"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-orange-100 flex items-center justify-center transition-colors text-slate-500 hover:text-orange-700"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* Success Screen */
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              AI Demo Call Requested!
            </h3>
            <p className="text-sm text-slate-700 max-w-sm mx-auto leading-relaxed font-medium">
              Thank you <span className="font-bold text-slate-900">{name}</span>! An Agenix AI voice agent will dial <span className="font-bold text-orange-600 font-mono">{phone}</span> shortly to demonstrate our real-time voice pipeline.
            </p>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="w-full py-3.5 px-6 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm transition-all shadow-lg shadow-orange-600/25"
              >
                Close & Return to Website
              </button>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-black uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                <span>Instant Voice AI Demo</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Get a Live AI Call
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 mt-1 font-medium">
                Enter your details to receive an outbound test call from our native neural agent.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Name Field */}
              <div>
                <label htmlFor="user-full-name" className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-orange-600" />
                  <span>Full Name</span>
                </label>
                <input
                  id="user-full-name"
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-sm outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="user-phone-number" className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-orange-600" />
                  <span>Phone Number (With Country Code)</span>
                </label>
                <input
                  id="user-phone-number"
                  type="tel"
                  required
                  placeholder="e.g. +91 98807 24020"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all font-mono"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="user-email-address" className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-orange-600" />
                  <span>Business Email</span>
                </label>
                <input
                  id="user-email-address"
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-sm outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                />
              </div>

              {/* Use Case Select */}
              <div>
                <label htmlFor="user-use-case" className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-orange-600" />
                  <span>Primary Use Case / Usage</span>
                </label>
                <select
                  id="user-use-case"
                  value={useCase}
                  onChange={e => setUseCase(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-sm outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all cursor-pointer"
                >
                  <option value="Appointment Confirmation">Appointment Confirmation & Reminders</option>
                  <option value="Outbound Sales & Lead Outreach">Outbound Sales & Lead Outreach</option>
                  <option value="Customer Service & Support">Customer Service & Support Agent</option>
                  <option value="Conference Room Voice Translation">Real-Time Conference Room Voice Translation</option>
                  <option value="Enterprise Custom Integration">Enterprise Custom API Integration</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-base transition-all shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-98 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Scheduling Your AI Call...</span>
                    </>
                  ) : (
                    <>
                      <PhoneCall className="w-5 h-5" />
                      <span>Submit & Request Call</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
