import React, { useState, useEffect } from 'react';
import { PhoneCall, X, ArrowUpRight, BarChart3 } from 'lucide-react';

interface NavbarProps {
  onEnterpriseClick?: () => void;
  onGetACallClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onEnterpriseClick, onGetACallClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const navLinks = [
    { label: 'Voice Studio', href: '#demo', isModal: false },
    { label: 'Solutions', href: '#solutions', isModal: false },
    { label: 'Technology', href: '#features', isModal: false },
    { label: 'Enterprise', href: '#', isModal: true },
  ];

  const handleNavClick = (link: typeof navLinks[0], e: React.MouseEvent) => {
    if (link.isModal) {
      e.preventDefault();
      setDrawerOpen(false);
      onEnterpriseClick?.();
    } else {
      setDrawerOpen(false);
    }
  };

  const handleCallBtnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setDrawerOpen(false);
    onGetACallClick?.();
  };

  return (
    <>
      {/* ── Floating Pill Navigation ─────────────────── */}
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${scrolled ? 'w-[90%] max-w-4xl' : 'w-[95%] max-w-5xl'
          }`}
      >
        <div className={`liquid-glass rounded-2xl px-5 py-3 flex items-center justify-between gap-6 transition-all duration-500 ${scrolled ? 'shadow-xl shadow-orange-500/10 border-orange-200/50' : ''
          }`}>

          {/* Brand */}
          <a href="#" className="flex items-center gap-2 flex-shrink-0 group">
            <span className="font-extrabold text-lg tracking-tight text-slate-900">
              Agenix<span className="text-orange-600">AI</span>
            </span>
          </a>

          {/* Center Nav Links — Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              link.isModal ? (
                <button
                  key={link.label}
                  onClick={(e) => handleNavClick(link, e)}
                  className="px-4 py-1.5 text-sm font-semibold text-slate-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <BarChart3 className="w-3.5 h-3.5 opacity-60" />
                  {link.label}
                </button>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(link, e)}
                  className="px-4 py-1.5 text-sm font-semibold text-slate-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
                >
                  {link.label}
                </a>
              )
            ))}
          </nav>

          {/* Right: CTA Button */}
          <div className="flex items-center gap-3">

            <button
              onClick={handleCallBtnClick}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm transition-all hover:scale-105 shadow-md shadow-orange-600/25 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Get a Call</span>
            </button>

            {/* Hamburger — Mobile */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-orange-50 transition-colors"
              aria-label="Open menu"
            >
              <span className="block w-5 h-0.5 bg-slate-800 rounded-full" />
              <span className="block w-4 h-0.5 bg-slate-800 rounded-full ml-auto" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Motion Drawer — Mobile ───────────────────── */}
      {/* Backdrop */}
      <div
        onClick={() => setDrawerOpen(false)}
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-80 bg-white/95 backdrop-blur-xl border-l border-amber-200 flex flex-col p-8 transition-transform duration-400 ease-out md:hidden ${drawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between mb-10">
          <span className="font-extrabold text-lg text-slate-900">Agenix<span className="text-orange-600">AI</span></span>
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center hover:bg-orange-100 transition-colors"
          >
            <X className="w-4 h-4 text-orange-700" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {navLinks.map((link, i) => (
            link.isModal ? (
              <button
                key={link.label}
                onClick={(e) => handleNavClick(link, e)}
                className="flex items-center justify-between px-4 py-3.5 rounded-xl text-slate-800 font-semibold hover:bg-orange-50 hover:text-orange-600 transition-all w-full text-left"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 opacity-60" />
                  {link.label}
                </span>
                <ArrowUpRight className="w-4 h-4 opacity-40" />
              </button>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(link, e)}
                className="flex items-center justify-between px-4 py-3.5 rounded-xl text-slate-800 font-semibold hover:bg-orange-50 hover:text-orange-600 transition-all"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 opacity-40" />
              </a>
            )
          ))}
        </nav>

        <div className="pt-8 border-t border-amber-100 space-y-3">
          <button
            onClick={handleCallBtnClick}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-600/25 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" />
            Get a Demo Call
          </button>
        </div>
      </div>
    </>
  );
};
