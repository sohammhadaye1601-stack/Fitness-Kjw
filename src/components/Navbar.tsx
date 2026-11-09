import React, { useState, useEffect } from 'react';
import { useFitnessCMS } from '../context/FitnessContext';
import { formatPhoneForTel } from '../utils/fitnessLogic';
import { Phone, Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { store, setIsTrialModalOpen } = useFitnessCMS();
  const { name, phone, phoneDisplay } = store.gymInfo;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Programs', href: '#programs' },
    { label: 'Memberships', href: '#memberships' },
    { label: 'Trainers', href: '#trainers' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
        isScrolled
          ? 'bg-neutral-950/95 backdrop-blur-md border-neutral-800/80 shadow-lg shadow-black/40'
          : 'bg-neutral-950/80 backdrop-blur-sm border-neutral-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Display athletic face, 1-line) */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-2xl sm:text-3xl font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 group"
        >
          <span className="font-athletic tracking-wider uppercase text-neutral-100 flex items-center">
            FITNESS<span className="text-rose-600 ml-1">POINT</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 hidden sm:inline-block"></span>
        </a>

        {/* Zone 2: 5 Clean Single-Line Text Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action + Click-to-Call */}
        <div className="flex items-center gap-4 shrink-0">
          <a
            href={formatPhoneForTel(phone)}
            className="hidden sm:flex items-center gap-2 text-xs font-semibold text-neutral-300 hover:text-white transition-colors py-2 px-3 rounded-lg border border-neutral-800 hover:border-neutral-700 bg-neutral-900/50"
            title={`Call Fitness Point at ${phoneDisplay}`}
          >
            <Phone className="w-3.5 h-3.5 text-rose-500" />
            <span className="font-mono tabular-nums">{phoneDisplay}</span>
          </a>

          <button
            onClick={() => setIsTrialModalOpen(true)}
            className="px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wide uppercase text-white bg-rose-600 hover:bg-rose-500 active:bg-rose-700 transition-colors rounded-lg shadow-sm shadow-rose-950 flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <span>Free Trial</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg transition-colors"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950 border-b border-neutral-800 px-6 py-6 space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-neutral-200 hover:text-rose-500 transition-colors py-2 border-b border-neutral-900"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <a
              href={formatPhoneForTel(phone)}
              className="flex items-center justify-center gap-2 py-3 rounded-lg bg-neutral-900 text-neutral-200 font-semibold text-sm border border-neutral-800"
            >
              <Phone className="w-4 h-4 text-rose-500" />
              Call Now: {phoneDisplay}
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsTrialModalOpen(true);
              }}
              className="w-full py-3 rounded-lg bg-rose-600 text-white font-bold text-sm uppercase tracking-wider text-center"
            >
              Book 1-Day Free Trial
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
