import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { ChevronLeft, ChevronRight, Camera, Sparkles, MapPin, Instagram } from 'lucide-react';

interface CafeAtmosphereProps {
  language: Language;
}

export const CafeAtmosphere: React.FC<CafeAtmosphereProps> = ({ language }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselItems = [
    {
      url: '/src/public/assets/images/maison_hero_coffee_1785928324393.jpg',
      title: 'Architectural Cement Sanctuary',
      subtitle: 'Raw plaster finishes, minimal concrete counters, and warm ambient glow.',
      tag: 'Interior & Design',
      location: 'LaSalle, QC'
    },
    {
      url: '/src/public/assets/images/maison_mango_coco_1785928338386.jpg',
      title: 'Mango Coco Matcha Infusion',
      subtitle: 'First-flush Japanese Uji matcha gently layered over ripe mango puree and coconut cream.',
      tag: 'Instagram Favorite',
      location: 'Signature Beverage'
    },
    {
      url: '/src/public/assets/images/maison_bagel_salmon_1785928358337.jpg',
      title: 'Saumon Fumé Bagel',
      subtitle: 'Wood-fired sesame bagel toasted crisp with dill cream cheese, capers, and red onion.',
      tag: 'Montréal Culinary Classic',
      location: 'Baked Daily'
    },
    {
      url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
      title: 'Morning Light over Plaster Tables',
      subtitle: 'Designed for quiet reflection, reading, and slow morning espresso rituals.',
      tag: 'Atmosphere',
      location: 'LaSalle Studio'
    },
    {
      url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=80',
      title: 'Ceremonial Whisking Ritual',
      subtitle: 'Every bowl of Uji matcha is whisked to order with bamboo chasen at 80°C.',
      tag: 'Japanese Craftsmanship',
      location: 'Kyoto Imports'
    }
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  useEffect(() => {
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, [carouselItems.length]);

  return (
    <section id="atmosphere" className="w-full py-20 px-6 md:px-12 bg-transparent border-t border-[#1C1917]/20">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1C1917]/20 pb-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#78716C] font-semibold block mb-2">
              05 — Atmosphere &amp; Moments
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-normal text-[#1C1917] tracking-tight">
              {language === 'EN' ? 'Café Moments & Space' : 'L’Espace & Les Moments Café'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/maisoncafe.lasalle"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C8C4BD] bg-[#E2DFD8] text-[11px] font-semibold uppercase tracking-wider text-[#1C1917] hover:border-[#1C1917] transition-all"
            >
              <Instagram className="w-3.5 h-3.5 text-[#8C5E3C]" />
              <span>@maisoncafe.lasalle</span>
            </a>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full bg-[#E2DFD8] hover:bg-[#1C1917] hover:text-white text-[#1C1917] border border-[#C8C4BD] transition-all shadow-2xs"
                title="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-[#E2DFD8] hover:bg-[#1C1917] hover:text-white text-[#1C1917] border border-[#C8C4BD] transition-all shadow-2xs"
                title="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Visual Frame */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2.4/1] w-full rounded-3xl overflow-hidden border border-[#C8C4BD] shadow-xl bg-[#E2DFD8] group">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.7 }}
              className="relative w-full h-full"
            >
              <img
                src={carouselItems[currentIndex].url}
                alt={carouselItems[currentIndex].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {/* Gradient Scrim for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/80 via-[#1C1917]/20 to-transparent" />

              {/* Top Tag & Location Badge */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C1917]/70 backdrop-blur-md border border-white/20 text-[10px] uppercase tracking-[0.2em] font-semibold">
                  <Sparkles className="w-3 h-3 text-[#D9A05B]" />
                  <span>{carouselItems[currentIndex].tag}</span>
                </div>

                <div className="hidden sm:inline-flex items-center gap-1.5 text-xs text-white/80 font-medium bg-[#1C1917]/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  <MapPin className="w-3 h-3 text-[#D9A05B]" />
                  <span>{carouselItems[currentIndex].location}</span>
                </div>
              </div>

              {/* Bottom Caption & Counter Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4 text-white z-10">
                <div className="max-w-xl space-y-1">
                  <h3 className="text-xl sm:text-3xl font-serif italic font-normal tracking-wide text-white">
                    {carouselItems[currentIndex].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E2DFD8]/90 font-light leading-relaxed">
                    {carouselItems[currentIndex].subtitle}
                  </p>
                </div>

                {/* Progress Indicators & Slide Counter */}
                <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-white/20 pt-3 md:pt-0 md:pl-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#D9A05B] font-bold">
                    0{currentIndex + 1} / 0{carouselItems.length}
                  </span>
                  
                  {/* Dots */}
                  <div className="flex items-center gap-1.5">
                    {carouselItems.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          currentIndex === idx ? 'w-6 bg-[#D9A05B]' : 'w-2 bg-white/40 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Carousel Thumbnails Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {carouselItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative aspect-[16/10] rounded-xl overflow-hidden border transition-all text-left group ${
                currentIndex === idx
                  ? 'border-[#1C1917] ring-2 ring-[#1C1917]/20 scale-102 shadow-md'
                  : 'border-[#C8C4BD] opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={item.url}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
              <div className="absolute bottom-1.5 left-2 right-2 text-white text-[9px] font-semibold truncate drop-shadow-xs">
                {item.title}
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
