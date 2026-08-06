import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { Sparkles, Award, Compass, Heart } from 'lucide-react';

interface EditorialStoryProps {
  language: Language;
}

export const EditorialStory: React.FC<EditorialStoryProps> = ({ language }) => {
  return (
    <section id="story" className="w-full py-12 sm:py-20 px-4 sm:px-6 md:px-12 bg-transparent border-y border-[#1C1917]/20">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-16">
        
        {/* Section Number & Heading Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 border-b border-[#1C1917]/20 pb-6 sm:pb-8">
          <div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#78716C] font-semibold block mb-2">
              01 — Philosophy &amp; Atmosphere
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-normal text-[#1C1917] tracking-tight leading-tight">
              {language === 'EN'
                ? 'Designed for Intentional Living & Quiet Mornings.'
                : 'Conçu pour Vivre Intentionnellement et Calmement.'}
            </h2>
          </div>
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#524E4A] max-w-xs leading-relaxed">
            {language === 'EN'
              ? 'Architectural concrete plaster simplicity meets Montreal culinary heritage.'
              : 'Simplicité architecturale en béton et héritage culinaire montréalais.'}
          </p>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Photo with Soft Daylight (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#C8C4BD] shadow-md">
              <img
                src="https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=80"
                alt="Minimalist Concrete Cafe Interior"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover editorial-image-hover"
              />
            </div>
            
            {/* Overlapping Small Detail Photo */}
            <div className="hidden sm:block absolute -bottom-8 -right-6 w-40 md:w-48 aspect-square rounded-xl overflow-hidden border-4 border-[#E2DFD8] shadow-xl">
              <img
                src="/src/assets/images/maison_mango_coco_1785928338386.jpg"
                alt="Mango Coco Matcha Detail"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: Editorial Text & Craftsmanship Pillars (6 cols) */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 pl-0 lg:pl-6">
            
            <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl font-normal italic text-[#1C1917] leading-snug border-l-2 border-[#1C1917] pl-4 sm:pl-6 py-1">
              {language === 'EN'
                ? '“We believe a morning coffee is not a quick habit, but a ritual of calm, reflection, and warmth.”'
                : '“Nous croyons que le café du matin n’est pas une habitude rapide, mais un rituel de calme et de chaleur.”'}
            </blockquote>

            <p className="text-xs sm:text-sm text-[#524E4A] font-normal leading-relaxed tracking-wide">
              {language === 'EN'
                ? 'At Maison, every detail is considered—from our custom-milled raw concrete plaster counters to our ceremonial grade Uji matcha whisked directly to order. Located in LaSalle, we offer a peaceful respite from the city pace.'
                : 'Chez Maison, chaque détail compte — de nos comptoirs en béton brut à nos finitions minérales, jusqu’à notre matcha de qualité cérémoniale d’Uji. Situé à LaSalle, nous offrons un refuge paisible.'}
            </p>

            {/* 3 Editorial Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 pt-4 border-t border-[#C8C4BD]">
              <div className="space-y-1 bg-[#E2DFD8]/50 p-3 sm:p-0 rounded-xl sm:rounded-none sm:bg-transparent">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#3F5A37] font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Uji Matcha
                </span>
                <h4 className="font-serif text-sm sm:text-base font-semibold text-[#1C1917]">First Flush Harvest</h4>
                <p className="text-[11px] text-[#78716C] leading-relaxed">
                  Stone-ground in Kyoto, whisked per order with oat or organic milk.
                </p>
              </div>

              <div className="space-y-1 bg-[#E2DFD8]/50 p-3 sm:p-0 rounded-xl sm:rounded-none sm:bg-transparent">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C5E3C] font-semibold flex items-center gap-1">
                  <Award className="w-3 h-3" /> Wood-Fired
                </span>
                <h4 className="font-serif text-sm sm:text-base font-semibold text-[#1C1917]">Montreal Bagels</h4>
                <p className="text-[11px] text-[#78716C] leading-relaxed">
                  Boiled in honey water, baked fresh daily with whipped house spreads.
                </p>
              </div>

              <div className="space-y-1 bg-[#E2DFD8]/50 p-3 sm:p-0 rounded-xl sm:rounded-none sm:bg-transparent">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#1C1917] font-semibold flex items-center gap-1">
                  <Compass className="w-3 h-3" /> Space &amp; Light
                </span>
                <h4 className="font-serif text-sm sm:text-base font-semibold text-[#1C1917]">Concrete Architecture</h4>
                <p className="text-[11px] text-[#78716C] leading-relaxed">
                  Natural daylight, raw plaster textures, and quiet nook seating.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
