import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface OpeningIntroOverlayProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
}

export const OpeningIntroOverlay: React.FC<OpeningIntroOverlayProps> = ({
  language,
  isOpen,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Handle step progression & auto exit when complete
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const totalDuration = 4500;
    const intervalTime = 50;

    const timer = setInterval(() => {
      setIsPlaying((prev) => {
        return true;
      });
    }, intervalTime);

    const autoCloseTimer = setTimeout(() => {
      onClose();
    }, totalDuration);

    return () => {
      clearInterval(timer);
      clearTimeout(autoCloseTimer);
    };
  }, [isOpen, isPlaying]);

  const durationFactor = 1;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-[#E2DFD8] text-[#1C1917] flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-hidden selection:bg-[#1C1917] selection:text-[#E2DFD8]"
        >
          {/* Paper Texture Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#C4C0B7_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

          {/* Top Header Bar */}
          <div className="relative z-10 max-w-6xl w-full mx-auto flex items-center justify-between border-b border-[#C8C4BD] pb-4 sm:pb-6">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3F5A37] animate-ping" />
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#78716C] font-mono block">
                  {language === 'EN' ? 'Maison Café • LaSalle' : 'Maison Café • LaSalle'}
                </span>
                <h2 className="text-lg sm:text-xl font-serif font-semibold text-[#1C1917]">
                  Welcome
                </h2>
              </div>
            </div>

            {/* Skip / Enter Button */}
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-[#1C1917] text-[#E2DFD8] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#322E2B] transition-all flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
            >
              <span>{language === 'EN' ? 'Enter Café' : 'Entrer au Café'}</span>
              <ArrowRight className="w-4 h-4 text-[#D9A05B]" />
            </button>
          </div>

          {/* Center Main SVG Sketch Canvas (Image 1 Doodle Storefront & Image 2 Logo) */}
          <div
            onClick={onClose}
            className="relative z-10 max-w-4xl w-full mx-auto my-auto py-4 flex flex-col items-center cursor-pointer group"
            title="Click to enter café"
          >
            <div className="w-full aspect-[16/10] max-h-[70vh] relative flex items-center justify-center">
              <svg
                viewBox="0 0 800 520"
                className="w-full h-full drop-shadow-sm select-none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* 1. Roof Awning */}
                <motion.path
                  d="M 140 100 Q 140 60 160 55 L 640 55 Q 660 60 660 100 Z"
                  stroke="#1F1C1A"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.0 * durationFactor, ease: 'easeInOut', delay: 0.1 * durationFactor }}
                />

                {/* Awning Scalloped Fringe */}
                <motion.path
                  d="M 140 100 
                     Q 157.5 118 175 100 Q 192.5 118 210 100 Q 227.5 118 245 100 Q 262.5 118 280 100 
                     Q 297.5 118 315 100 Q 332.5 118 350 100 Q 367.5 118 385 100 Q 402.5 118 420 100 
                     Q 437.5 118 455 100 Q 472.5 118 490 100 Q 507.5 118 525 100 Q 542.5 118 560 100 
                     Q 577.5 118 595 100 Q 612.5 118 630 100 Q 647.5 118 660 100"
                  stroke="#1F1C1A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2 * durationFactor, ease: 'easeInOut', delay: 0.6 * durationFactor }}
                />

                {/* 2. Facade Frame */}
                <motion.rect
                  x="175"
                  y="105"
                  width="450"
                  height="260"
                  stroke="#1F1C1A"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.0 * durationFactor, ease: 'easeInOut', delay: 1.4 * durationFactor }}
                />

                {/* Door Vertical Divider */}
                <motion.line
                  x1="480"
                  y1="105"
                  x2="480"
                  y2="365"
                  stroke="#1F1C1A"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7 * durationFactor, ease: 'easeInOut', delay: 2.1 * durationFactor }}
                />

                {/* Horizontal Window Line */}
                <motion.line
                  x1="175"
                  y1="230"
                  x2="480"
                  y2="230"
                  stroke="#1F1C1A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6 * durationFactor, ease: 'easeInOut', delay: 2.5 * durationFactor }}
                />

                {/* 3. Stacked MAI SON Logo directly on facade wall (matching Image 2 exactly) */}
                <g transform="translate(265, 125)">
                  {/* Top Line "Mai" */}
                  <motion.text
                    x="60"
                    y="42"
                    textAnchor="middle"
                    fill="none"
                    stroke="#1F1C1A"
                    strokeWidth="2"
                    style={{
                      fontFamily: "'Bodoni Moda', 'Italiana', 'Didot', serif",
                      fontWeight: 800,
                      fontSize: '48px',
                      fontStyle: 'italic',
                      letterSpacing: '-0.02em',
                    }}
                    initial={{ strokeDasharray: 200, strokeDashoffset: 200, fillOpacity: 0 }}
                    animate={{ strokeDashoffset: 0, fillOpacity: 1 }}
                    transition={{
                      strokeDashoffset: { duration: 1.0 * durationFactor, ease: 'easeInOut', delay: 2.8 * durationFactor },
                      fillOpacity: { duration: 0.5 * durationFactor, delay: 3.6 * durationFactor }
                    }}
                  >
                    Mai
                  </motion.text>

                  {/* Bottom Line "son" */}
                  <motion.text
                    x="60"
                    y="82"
                    textAnchor="middle"
                    fill="none"
                    stroke="#1F1C1A"
                    strokeWidth="2"
                    style={{
                      fontFamily: "'Bodoni Moda', 'Italiana', 'Didot', serif",
                      fontWeight: 800,
                      fontSize: '48px',
                      letterSpacing: '-0.02em',
                    }}
                    initial={{ strokeDasharray: 200, strokeDashoffset: 200, fillOpacity: 0 }}
                    animate={{ strokeDashoffset: 0, fillOpacity: 1 }}
                    transition={{
                      strokeDashoffset: { duration: 1.0 * durationFactor, ease: 'easeInOut', delay: 3.4 * durationFactor },
                      fillOpacity: { duration: 0.5 * durationFactor, delay: 4.2 * durationFactor }
                    }}
                  >
                    son
                  </motion.text>
                </g>

                {/* 4. Glass Door & OPEN Sign */}
                <motion.rect
                  x="492"
                  y="120"
                  width="120"
                  height="245"
                  stroke="#1F1C1A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8 * durationFactor, delay: 3.8 * durationFactor }}
                />

                {/* Hanging OPEN Sign */}
                <g>
                  <motion.path
                    d="M 552 155 L 530 172 M 552 155 L 574 172"
                    stroke="#1F1C1A"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 * durationFactor, delay: 4.3 * durationFactor }}
                  />
                  <motion.rect
                    x="520"
                    y="172"
                    width="64"
                    height="32"
                    rx="3"
                    stroke="#1F1C1A"
                    strokeWidth="2"
                    fill="#FAF8F5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6 * durationFactor, delay: 4.5 * durationFactor }}
                  />
                  <motion.text
                    x="552"
                    y="193"
                    textAnchor="middle"
                    fill="#1F1C1A"
                    style={{
                      fontFamily: "'Bodoni Moda', Georgia, serif",
                      fontSize: '14px',
                      fontWeight: '700',
                      letterSpacing: '1px'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 * durationFactor, delay: 4.9 * durationFactor }}
                  >
                    OPEN
                  </motion.text>
                </g>

                {/* 5. Terrace Bistro Table & Chairs */}
                {/* Table Top */}
                <motion.ellipse
                  cx="335"
                  cy="337"
                  rx="38"
                  ry="12"
                  stroke="#1F1C1A"
                  strokeWidth="2.5"
                  fill="#FAF8F5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7 * durationFactor, delay: 5.0 * durationFactor }}
                />
                {/* Table Legs */}
                <motion.path
                  d="M 335 337 L 335 385 M 312 385 L 358 385 M 325 337 L 315 385 M 345 337 L 355 385"
                  stroke="#1F1C1A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8 * durationFactor, delay: 5.4 * durationFactor }}
                />
                {/* Left Chair */}
                <motion.path
                  d="M 235 295 C 235 280, 260 280, 260 295 L 260 330 L 225 330 L 225 380 M 260 330 L 260 380"
                  stroke="#1F1C1A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8 * durationFactor, delay: 5.8 * durationFactor }}
                />
                {/* Right Chair */}
                <motion.path
                  d="M 430 295 C 430 280, 405 280, 405 295 L 405 330 L 440 330 L 440 380 M 405 330 L 405 380"
                  stroke="#1F1C1A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8 * durationFactor, delay: 6.2 * durationFactor }}
                />

                {/* 6. Potted Bush Plant on Stand */}
                <motion.path
                  d="M 125 355 C 100 335, 100 295, 125 280 C 140 260, 175 260, 190 280 C 210 295, 210 335, 185 355 Z"
                  stroke="#1F1C1A"
                  strokeWidth="2.5"
                  fill="#FAF8F5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9 * durationFactor, delay: 6.5 * durationFactor }}
                />
                <motion.path
                  d="M 140 355 L 140 375 L 170 375 L 170 355 M 132 375 L 122 400 M 178 375 L 188 400"
                  stroke="#1F1C1A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6 * durationFactor, delay: 7.0 * durationFactor }}
                />

                {/* 7. Celestial 8-Point Stars (Image 1) */}
                <g transform="translate(65, 170)">
                  <motion.path
                    d="M 20 0 L 23 15 L 38 18 L 23 21 L 20 36 L 17 21 L 2 18 L 17 15 Z"
                    fill="#1F1C1A"
                    stroke="#1F1C1A"
                    strokeWidth="1"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 * durationFactor, delay: 7.3 * durationFactor }}
                  />
                </g>
                <g transform="translate(710, 280)">
                  <motion.path
                    d="M 18 0 L 21 13 L 34 16 L 21 19 L 18 32 L 15 19 L 2 16 L 15 13 Z"
                    fill="#1F1C1A"
                    stroke="#1F1C1A"
                    strokeWidth="1"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 * durationFactor, delay: 7.6 * durationFactor }}
                  />
                </g>
              </svg>
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};
