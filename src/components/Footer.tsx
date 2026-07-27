import React from 'react';
import { Activity, Phone, Mail, MapPin, Globe } from 'lucide-react';

export const Footer: React.FC = () => (
  <footer className="bg-[#18181B] text-slate-300 border-t border-amber-500/20 pt-16 pb-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-zinc-800">
        {/* Brand */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-black text-2xl text-white tracking-tight">
              Agenix<span className="text-orange-500">AI</span>
            </span>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
            Specialized engineering firm dedicated to building advanced, production-ready AI Voice Agents for Indian enterprises.
          </p>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-3 py-1.5 rounded-lg w-fit">
            <Activity className="w-3.5 h-3.5" />
            <span className="animate-pulse">●</span>
            Active Telecom Carrier Mesh: Low Latency
          </div>
        </div>

        {/* Contact Info (From Brochure) */}
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-orange-500 mb-4">Contact Us</p>
          <ul className="space-y-3 text-sm text-zinc-300">
            <li className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <span>www.Agenixai.in</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
              <div className="font-mono text-xs">
                <p>+91 9880724020</p>
                <p>+91 9986824020</p>
              </div>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <span>hello@agenixai.in</span>
            </li>
          </ul>
        </div>

        {/* Headquarters */}
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-orange-500 mb-4">Headquarters</p>
          <div className="flex items-start gap-2.5 text-sm text-zinc-300">
            <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed text-zinc-400">
              Bengaluru, Karnataka, India
            </p>
          </div>
        </div>

        {/* Platform */}
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-orange-500 mb-4">Platform</p>
          <ul className="space-y-3 text-sm text-zinc-400">
            {['Agent Creator', 'Execution Engine', 'PSTN Calling API', 'CRM Integration'].map(l => (
              <li key={l}><a href="#demo" className="hover:text-orange-400 transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
        <p>© {new Date().getFullYear()} Agenix AI Private Limited. All rights reserved.</p>
        <div className="flex items-center gap-6">
          {['Privacy Policy', 'Terms of Service', 'Security & Compliance'].map(l => (
            <a key={l} href="#" className="hover:text-zinc-300 transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);
