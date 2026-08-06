import React, { useState } from 'react';
import { Camera, Download, RefreshCw, Heart } from 'lucide-react';
import { Language } from '../types';
import { MaisonLogo } from './MaisonLogo';

interface PhotoboothProps {
  language: Language;
}

export const Photobooth: React.FC<PhotoboothProps> = ({ language }) => {
  const [filter, setFilter] = useState<'monochrome' | 'sepia' | 'vintage' | 'natural'>('monochrome');
  const [customCaption, setCustomCaption] = useState<string>('Maison x LaSalle');
  const [selectedFrame, setSelectedFrame] = useState<number>(0);

  const photoPresets = [
    [
      'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop',
      '/src/assets/images/maison_mango_coco_1785928338386.jpg',
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=600&auto=format&fit=crop',
    ],
    [
      '/src/assets/images/maison_hero_coffee_1785928324393.jpg',
      '/src/assets/images/maison_bagel_salmon_1785928358337.jpg',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop',
    ]
  ];

  const currentPhotos = photoPresets[selectedFrame];

  const filterStyleMap = {
    monochrome: 'grayscale contrast-125 brightness-95',
    sepia: 'sepia contrast-110 brightness-90',
    vintage: 'contrast-125 saturate-50 hue-rotate-15',
    natural: 'saturate-110'
  };

  return (
    <section id="photobooth" className="w-full py-20 px-6 md:px-12 bg-transparent border-t border-[#1C1917]/20">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1C1917]/20 pb-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#78716C] font-semibold block mb-2">
              06 — Photobooth Experience
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-[#1F1C1A] tracking-tight">
              {language === 'EN' ? 'Maison Photo Strip' : 'Photomaton Souvenir Maison'}
            </h2>
            <p className="text-xs uppercase tracking-[0.2em] text-[#524E4A] mt-2 max-w-xl leading-relaxed">
              {language === 'EN'
                ? 'Capture memories of your morning coffee ritual with our analog-inspired photobooth generator.'
                : 'Immortalisez vos moments café avec notre photomaton analogique.'}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-[#A5A39D]/40 p-1.5 rounded-full border border-[#1C1917]/20">
            {(['monochrome', 'sepia', 'vintage', 'natural'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-wider font-medium transition-all ${
                  filter === f
                    ? 'bg-[#1F1C1A] text-[#FAF8F5] shadow-xs'
                    : 'text-[#8C867D] hover:text-[#1F1C1A]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Photobooth Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Photo Strip Output (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-64 bg-[#F5F0E8] p-5 shadow-xl border border-[#DCD4C5] flex flex-col items-center space-y-4 rounded-xs font-mono">
              <div className="w-full flex items-center justify-between text-[10px] font-medium text-[#1F1C1A] tracking-widest pb-2 border-b border-[#DCD4C5]">
                <span>2026 . 08 . 10</span>
                <span className="uppercase text-[9px] text-[#8C867D]">LaSalle QC</span>
              </div>

              <div className="w-full space-y-3">
                {currentPhotos.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="w-full h-36 bg-[#1F1C1A] overflow-hidden relative shadow-inner border border-[#DCD4C5]"
                  >
                    <img
                      src={imgUrl}
                      alt={`Photobooth frame ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover transition-all duration-500 ${filterStyleMap[filter]}`}
                    />
                  </div>
                ))}
              </div>

              <div className="w-full pt-2 text-center border-t border-[#DCD4C5]">
                <MaisonLogo size="sm" />
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#8C867D] mt-1 font-serif italic">
                  "{customCaption}"
                </p>
              </div>
            </div>
          </div>

          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 bg-[#F5F0E8] p-8 rounded-2xl border border-[#E8E2D5]">
            <div className="space-y-2 border-b border-[#DCD4C5] pb-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C867D]">Customization</span>
              <h3 className="font-serif text-2xl font-normal text-[#1F1C1A]">
                {language === 'EN' ? 'Personalize Your Memory Strip' : 'Personnalisez Votre Souvenir'}
              </h3>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#8C867D] block mb-2 font-medium">
                {language === 'EN' ? 'Memory Stamp Caption' : 'Légende Souvenir'}
              </label>
              <input
                type="text"
                value={customCaption}
                onChange={(e) => setCustomCaption(e.target.value)}
                maxLength={25}
                className="w-full bg-[#FAF8F5] border border-[#DCD4C5] text-[#1F1C1A] text-xs rounded-full px-5 py-3 focus:outline-none focus:border-[#1F1C1A]"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setSelectedFrame((prev) => (prev === 0 ? 1 : 0))}
                className="px-6 py-3.5 rounded-full border border-[#1F1C1A] text-[#1F1C1A] text-xs uppercase tracking-wider font-medium hover:bg-[#FAF8F5] transition-all flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Shuffle Photo Set</span>
              </button>

              <a
                href="#download-strip"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Your custom Maison Photo Strip has been saved to your downloads!');
                }}
                className="px-8 py-3.5 rounded-full bg-[#1F1C1A] text-[#FAF8F5] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#3D3834] transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-[#D9A05B]" />
                <span>Save Photo Strip</span>
              </a>
            </div>

            <p className="text-[11px] text-[#8C867D] font-serif italic pt-4">
              Tag @maisoncafelasalle on Instagram to be featured in our monthly photo archive.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
