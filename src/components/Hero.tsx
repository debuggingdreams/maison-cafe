import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { Calendar, ArrowDown, Sparkles, MapPin, Coffee, Star, Clock, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

interface HeroProps {
  language: Language;
  onOpenBooking: () => void;
  onOpenMenu: () => void;
  onOpenDrinkStudio: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onOpenBooking,
  onOpenMenu,
  onOpenDrinkStudio,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroShowcase = [
    {
      id: 'mango-matcha',
      title: 'Mango Coco Matcha',
      subtitle: 'Ceremonial Grade Uji Matcha',
      tag: 'Instagram Viral',
      image: '/src/public/assets/images/maison_mango_coco_1785928338386.jpg',
      badge: 'LaSalle #1 Signature',
      price: '$8.50'
    },
    {
      id: 'bagel-salmon',
      title: 'Saumon Fumé Bagel',
      subtitle: 'Wood-Fired Sesame Bagel & House Cream Cheese',
      tag: 'Fresh Daily',
      image: '/src/public/assets/images/maison_bagel_salmon_1785928358337.jpg',
      badge: 'Montréal Tradition',
      price: '$12.00'
    },
    {
      id: 'interior-atmosphere',
      title: 'Maison Concrete Studio',
      subtitle: 'Raw Plaster Architecture & Morning Sunlight',
      tag: 'Quiet Sanctuary',
      image: '/src/public/assets/images/maison_hero_coffee_1785928324393.jpg',
      badge: 'LaSalle, QC',
      price: 'Open 7/7'
    }
  ];

  // Auto slide showcase
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroShowcase.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [heroShowcase.length]);

  return (
    <section className="relative w-full lg:min-h-[calc(100vh-65px)] flex flex-col justify-between py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-12 bg-transparent text-[#1C1917] overflow-hidden">
      
      {/* Background Liquid Glass Light Glow & Fluid Reflections */}
      <div className="absolute -top-20 left-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-br from-white/30 via-white/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-10 right-10 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-gradient-to-tl from-[#D9A05B]/10 via-white/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Editorial Status & Location Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1C1917]/10 pb-2.5 mb-3 sm:mb-4"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#3F5A37] animate-ping" />
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#524E4A] font-semibold">
            {language === 'EN' ? 'Café & Artisanal Bagel Studio' : 'Café & Bar à Bagels Artisanaux'}
          </span>
        </div>

        <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-4 text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#78716C]">
          <span className="flex items-center gap-1 text-[#1C1917] font-medium">
            <MapPin className="w-3 h-3 text-[#524032]" />
            LaSalle, Montréal • QC
          </span>
          <span className="text-[#1C1917]/20">•</span>
          <span className="flex items-center gap-1 text-[#1C1917]">
            <Clock className="w-3 h-3 text-[#3F5A37]" />
            {language === 'EN' ? 'Open 10:00 – 20:00' : 'Ouvert 10h – 20h'}
          </span>
        </div>
      </motion.div>

      {/* Hero Main Core Content Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-12 items-center my-auto py-1 sm:py-2">
        
        {/* Left Column: Modern Editorial Typography & Action */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
          
          {/* High-Fashion Minimal Liquid Glass Pill Badge */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/40 text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] font-semibold text-[#1C1917] shadow-[0_4px_20px_0_rgba(0,0,0,0.03)] max-w-full overflow-hidden truncate"
          >
            <Sparkles className="w-3 h-3 text-[#8C5E3C] shrink-0" />
            <span className="truncate">{language === 'EN' ? 'Ceremonial Uji Matcha & Bagels' : 'Cérémonie de Matcha & Bagels'}</span>
            <span className="w-1 h-1 rounded-full bg-[#1C1917] shrink-0" />
            <span className="text-[#78716C] shrink-0">LaSalle</span>
          </motion.div>

          {/* Headline Statement */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-normal tracking-tight text-[#1C1917] leading-[1.08]"
          >
            {language === 'EN' ? (
              <>
                Calm Mornings <br className="hidden sm:inline" />
                <span className="italic font-light text-[#524E4A]">&amp;</span> Handcrafted <br className="hidden sm:inline" />
                Quality.
              </>
            ) : (
              <>
                Matins Paisibles <br className="hidden sm:inline" />
                <span className="italic font-light text-[#524E4A]">&amp;</span> Qualité <br className="hidden sm:inline" />
                Artisanale.
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xs sm:text-sm text-[#524E4A] max-w-lg font-normal leading-relaxed tracking-wide"
          >
            {language === 'EN'
              ? 'An intentional café and Montreal bagel bar in LaSalle. Home to ceremonial Mango Coco Matcha, Ube Matcha, toasted Saumon Fumé bagels, and quiet morning rituals.'
              : 'Un café et bar à bagels montréalais à LaSalle. Dégustez notre Mango Coco Matcha, Ube Matcha, nos bagels au saumon fumé et nos rituels matinaux.'}
          </motion.p>

          {/* Liquid Action Callouts */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1 sm:pt-2"
          >
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-6 py-3.5 min-h-[44px] rounded-full bg-[#1C1917]/85 backdrop-blur-xl text-[#E2DFD8] text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-[#1C1917] transition-all duration-300 flex items-center justify-center gap-2 shadow-sm active:scale-98 border border-white/20"
            >
              <Calendar className="w-3.5 h-3.5 text-[#D9A05B]" />
              <span>{language === 'EN' ? 'Reserve A Table' : 'Réserver Une Table'}</span>
            </button>

            <button
              onClick={onOpenMenu}
              className="w-full sm:w-auto px-6 py-3.5 min-h-[44px] rounded-full border border-white/40 bg-white/15 backdrop-blur-xl text-[#1C1917] text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-white/30 hover:border-white/60 transition-all duration-300 flex items-center justify-center active:scale-98 shadow-[0_4px_20px_0_rgba(0,0,0,0.03)]"
            >
              {language === 'EN' ? 'Explore Menu' : 'Découvrir Le Menu'}
            </button>

            <button
              onClick={onOpenDrinkStudio}
              className="w-full sm:w-auto px-4 py-3 min-h-[44px] text-[11px] uppercase tracking-[0.2em] font-semibold text-[#524032] hover:text-[#1C1917] transition-all flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/25 backdrop-blur-md rounded-full border border-white/30 shadow-xs"
            >
              <Coffee className="w-3.5 h-3.5 text-[#3F5A37]" />
              <span>{language === 'EN' ? 'Drink Studio' : 'Studio Lattes'}</span>
            </button>
          </motion.div>

          {/* Translucent Liquid Glass Feature Highlights Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-3 gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-[#1C1917]/10"
          >
            <div className="bg-white/20 backdrop-blur-xl p-2.5 sm:p-3 rounded-xl border border-white/40 shadow-[0_4px_20px_0_rgba(0,0,0,0.03)] hover:bg-white/35 transition-all duration-300">
              <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-bold text-[#1C1917]">
                <Sparkles className="w-3 h-3 text-[#8C5E3C] shrink-0" />
                <span className="truncate">Uji Matcha</span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-[#78716C] mt-0.5 font-medium truncate">Ceremonial</p>
            </div>

            <div className="bg-white/20 backdrop-blur-xl p-2.5 sm:p-3 rounded-xl border border-white/40 shadow-[0_4px_20px_0_rgba(0,0,0,0.03)] hover:bg-white/35 transition-all duration-300">
              <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-bold text-[#1C1917]">
                <Coffee className="w-3 h-3 text-[#524032] shrink-0" />
                <span className="truncate">Wood-Fired</span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-[#78716C] mt-0.5 font-medium truncate">Montréal Bagels</p>
            </div>

            <div className="bg-white/20 backdrop-blur-xl p-2.5 sm:p-3 rounded-xl border border-white/40 shadow-[0_4px_20px_0_rgba(0,0,0,0.03)] hover:bg-white/35 transition-all duration-300">
              <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-bold text-[#1C1917]">
                <Star className="w-3 h-3 text-[#3F5A37] shrink-0" />
                <span className="truncate">4.9 Rating</span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-[#78716C] mt-0.5 font-medium truncate">LaSalle Fav</p>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Liquid Glass Showcase Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-[4/4.5] sm:aspect-[4/4.8] w-full max-h-[380px] sm:max-h-[500px] mx-auto rounded-2xl sm:rounded-3xl overflow-hidden border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.08)] bg-white/10 backdrop-blur-2xl group">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={heroShowcase[activeSlide].id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.7 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <img
                  src={heroShowcase[activeSlide].image}
                  alt={heroShowcase[activeSlide].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover mix-blend-multiply opacity-95"
                />

                {/* Floating Top Rating / Badge - Liquid Frosted Glass */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/30 backdrop-blur-2xl border border-white/50 flex items-center gap-1.5 shadow-sm text-xs text-[#1C1917]">
                  <span className="w-2 h-2 rounded-full bg-[#3F5A37] animate-pulse" />
                  <span className="font-bold text-[10px] sm:text-[11px] uppercase tracking-wider">{heroShowcase[activeSlide].badge}</span>
                </div>

                {/* Top Right Controls - Liquid Glass Buttons */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1.5">
                  <button
                    onClick={() => setActiveSlide((prev) => (prev - 1 + heroShowcase.length) % heroShowcase.length)}
                    className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full bg-white/30 hover:bg-[#1C1917] hover:text-white text-[#1C1917] border border-white/50 backdrop-blur-2xl transition-all active:scale-95 shadow-sm"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setActiveSlide((prev) => (prev + 1) % heroShowcase.length)}
                    className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full bg-white/30 hover:bg-[#1C1917] hover:text-white text-[#1C1917] border border-white/50 backdrop-blur-2xl transition-all active:scale-95 shadow-sm"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Bottom Overlay Card - Liquid Glass Plaque */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/30 backdrop-blur-2xl border border-white/50 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                  <div className="space-y-0.5 pr-2">
                    <span className="text-[9px] uppercase tracking-widest text-[#8C5E3C] font-bold block">
                      {heroShowcase[activeSlide].tag}
                    </span>
                    <h3 className="font-serif italic font-semibold text-xs sm:text-base text-[#1C1917] truncate">
                      {heroShowcase[activeSlide].title}
                    </h3>
                    <p className="text-[10px] text-[#524E4A] font-medium line-clamp-1">
                      {heroShowcase[activeSlide].subtitle}
                    </p>
                  </div>
                  <div className="text-right pl-3 border-l border-white/40 shrink-0">
                    <span className="font-mono font-bold text-xs sm:text-sm text-[#1C1917] block">
                      {heroShowcase[activeSlide].price}
                    </span>
                    <button
                      onClick={onOpenMenu}
                      className="text-[9px] uppercase tracking-widest font-bold text-[#3F5A37] hover:underline"
                    >
                      Order
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Carousel Indicators */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
              {heroShowcase.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    activeSlide === idx ? 'w-6 bg-[#1C1917]' : 'w-2 bg-[#1C1917]/30 hover:bg-[#1C1917]/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        </motion.div>

      </div>

      {/* Bottom Editorial Scroll Cue */}
      <div className="relative z-10 flex items-center justify-between pt-2.5 sm:pt-3 border-t border-[#1C1917]/10 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#78716C]">
        <span>01 / 06 — INTRO</span>
        <button
          onClick={() => {
            const el = document.getElementById('story');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex items-center gap-1.5 hover:text-[#1C1917] transition-colors font-medium min-h-[36px]"
        >
          <span>{language === 'EN' ? 'Scroll to explore' : 'Faire défiler'}</span>
          <ArrowDown className="w-3 h-3 animate-bounce" />
        </button>
        <span className="hidden sm:inline">MONTRÉAL • QC</span>
      </div>

    </section>
  );
};
