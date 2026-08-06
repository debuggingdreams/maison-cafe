import React, { useState, useEffect } from 'react';
import { MaisonLogo } from './MaisonLogo';
import { Language } from '../types';
import { ShoppingBag, Calendar, Menu as MenuIcon, X, Globe, Sparkles } from 'lucide-react';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenBooking: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  cartCount,
  onOpenCart,
  onOpenBooking,
  onNavigateToSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'story', labelEN: 'Philosophy', labelFR: 'Philosophie' },
    { id: 'menu', labelEN: 'Menu', labelFR: 'Menu' },
    { id: 'drink-studio', labelEN: 'Drink Studio', labelFR: 'Studio Lattes' },
    { id: 'reserve', labelEN: 'Reservations', labelFR: 'Réservations' },
    { id: 'photobooth', labelEN: 'Photobooth', labelFR: 'Photomaton' },
    { id: 'location', labelEN: 'Location', labelFR: 'Adresse' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/10 backdrop-blur-xl border-b border-[#1C1917]/10 py-2 sm:py-2.5 shadow-[0_4px_20px_0_rgba(0,0,0,0.02)]'
          : 'bg-transparent backdrop-blur-md py-2.5 sm:py-3.5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
        
        {/* Left: Maison Brand Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none min-h-[44px]"
        >
          <MaisonLogo size="sm" />
          <span className="hidden sm:inline-block text-[10px] uppercase tracking-[0.25em] text-[#78716C] font-semibold border-l border-[#C8C4BD] pl-3 py-0.5">
            LaSalle • QC
          </span>
        </button>

        {/* Center: Editorial Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigateToSection(link.id)}
              className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#1C1917]/80 hover:text-[#1C1917] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#1C1917] hover:after:w-full after:transition-all after:duration-300"
            >
              {language === 'EN' ? link.labelEN : link.labelFR}
            </button>
          ))}
        </nav>

        {/* Right: Actions (Language, Cart, Book Table) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Language Selector Pill */}
          <button
            onClick={() => onLanguageChange(language === 'EN' ? 'FR' : 'EN')}
            className="flex items-center gap-1.5 px-3 py-2 sm:py-1.5 min-h-[40px] rounded-full border border-white/40 text-[11px] tracking-wider uppercase font-semibold text-[#1C1917] hover:border-white/60 transition-all bg-white/20 backdrop-blur-xl active:scale-95 shadow-xs"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-[#78716C]" />
            <span>{language}</span>
          </button>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full border border-white/40 hover:border-white/60 bg-white/20 backdrop-blur-xl text-[#1C1917] transition-all active:scale-95 shadow-xs"
            title="View Order"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-[#1C1917] text-[#FAF8F5] text-[9px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Reserve Button */}
          <button
            onClick={onOpenBooking}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 min-h-[40px] rounded-full bg-[#1C1917]/85 backdrop-blur-xl border border-white/20 text-[#E2DFD8] text-[11px] uppercase tracking-[0.18em] font-medium hover:bg-[#1C1917] transition-all duration-300 shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5 text-[#D9A05B] stroke-[1.5]" />
            <span>{language === 'EN' ? 'Reserve' : 'Réserver'}</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full border border-white/40 bg-white/20 backdrop-blur-xl text-[#1C1917] hover:bg-white/35 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/40 backdrop-blur-2xl border-b border-white/40 px-4 sm:px-6 py-5 space-y-5 animate-fade-in shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-[#C8C4BD]">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#78716C] font-semibold">
              Maison Café • LaSalle, QC
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[#3F5A37] font-bold">
              Open Daily 10:00 - 20:00
            </span>
          </div>

          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigateToSection(link.id);
                  setMobileMenuOpen(false);
                }}
                className="text-left text-xs uppercase tracking-[0.2em] font-semibold text-[#1C1917] py-3 border-b border-[#C8C4BD]/60 hover:bg-[#EAE7E1] px-2 rounded-lg transition-colors flex items-center justify-between"
              >
                <span>{language === 'EN' ? link.labelEN : link.labelFR}</span>
                <span className="text-[10px] text-[#78716C] font-mono">→</span>
              </button>
            ))}
          </nav>

          <button
            onClick={() => {
              onOpenBooking();
              setMobileMenuOpen(false);
            }}
            className="w-full py-3.5 rounded-full bg-[#1C1917] text-[#E2DFD8] text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 min-h-[44px] shadow-sm active:scale-98"
          >
            <Calendar className="w-4 h-4 text-[#D9A05B]" />
            {language === 'EN' ? 'Reserve A Table' : 'Réserver Une Table'}
          </button>
        </div>
      )}
    </header>
  );
};

