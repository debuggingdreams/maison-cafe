import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, Volume2, VolumeX, Sparkles, Check, Gauge, Pause, Eye } from 'lucide-react';
import { Language } from '../types';

interface IntroDrawingAnimationProps {
  language: Language;
  onComplete?: () => void;
  autoPlay?: boolean;
}

export const IntroDrawingAnimation: React.FC<IntroDrawingAnimationProps> = ({
  language,
  onComplete,
  autoPlay = true,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);
  const [animationKey, setAnimationKey] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(1); // 0.5x, 1x, 1.5x
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [drawingProgress, setDrawingProgress] = useState<number>(0);

  // Steps breakdown
  const steps = [
    { id: 'roof', en: '1. Awning Roof & Scallops', fr: '1. Auvent & Bordure' },
    { id: 'walls', en: '2. Facade Frame & Divider', fr: '2. Façade & Séparateur' },
    { id: 'logo', en: '3. "Mai son" Hand Logo', fr: '3. Logo "Mai son"' },
    { id: 'door', en: '4. Glass Door & OPEN Sign', fr: '4. Porte & Panneau OPEN' },
    { id: 'terrace', en: '5. Cafe Table & Chairs', fr: '5. Table & Chaises' },
    { id: 'bush', en: '6. Potted Bush Plant', fr: '6. Plante en Pot' },
    { id: 'stars', en: '7. Celestial Stars & Coffee Steam', fr: '7. Étoiles & Vapeur Café' },
  ];

  // Sound generator effect using Web Audio API
  useEffect(() => {
    let audioCtx: AudioContext | null = null;
    let interval: any = null;

    if (isPlaying && soundEnabled) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioCtx = new AudioContextClass();

        interval = setInterval(() => {
          if (!audioCtx) return;
          // Short white noise stroke scratch
          const bufferSize = audioCtx.sampleRate * 0.03; // 30ms
          const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.05; // soft volume
          }
          const noise = audioCtx.createBufferSource();
          noise.buffer = buffer;

          // Filter for paper texture sound
          const filter = audioCtx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.value = 1200;

          noise.connect(filter);
          filter.connect(audioCtx.destination);
          noise.start();
        }, 120 / speed);
      } catch (e) {
        console.warn('Web Audio not supported or blocked:', e);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
      if (audioCtx) {
        audioCtx.close().catch(() => {});
      }
    };
  }, [isPlaying, soundEnabled, speed]);

  // Handle step progression
  useEffect(() => {
    if (!isPlaying) return;

    const totalDuration = 7000 / speed;
    const intervalTime = 100;
    const stepDuration = totalDuration / steps.length;

    const timer = setInterval(() => {
      setDrawingProgress((prev) => {
        const next = prev + (intervalTime / totalDuration) * 100;
        if (next >= 100) {
          setIsPlaying(false);
          if (onComplete) onComplete();
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, speed, animationKey]);

  // Update current step index based on progress
  useEffect(() => {
    const stepIdx = Math.min(
      Math.floor((drawingProgress / 100) * steps.length),
      steps.length - 1
    );
    setCurrentStep(stepIdx);
  }, [drawingProgress]);

  const handleReplay = () => {
    setDrawingProgress(0);
    setCurrentStep(0);
    setAnimationKey((prev) => prev + 1);
    setIsPlaying(true);
  };

  const durationFactor = 1 / speed;

  return (
    <div className="bg-[#FAF8F5] border border-[#D6D0C4] rounded-3xl p-6 md:p-10 shadow-xl space-y-6 relative overflow-hidden">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D6D0C4]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#6F4E37] bg-[#EFECE6] px-2.5 py-1 rounded-full border border-[#D6D0C4]">
              {language === 'EN' ? 'Live Hand-Drawn Intro Sketch' : 'Animation de Dessin Fait Main'}
            </span>
            {isPlaying && (
              <span className="flex items-center gap-1 text-[11px] font-semibold text-[#4E6E45] animate-pulse">
                <Sparkles className="w-3.5 h-3.5" />
                {language === 'EN' ? 'Drawing in progress...' : 'Dessin en cours...'}
              </span>
            )}
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#2A2421] mt-1">
            {language === 'EN' ? 'Maison Café Storefront Sketch' : 'Façade Croquis Maison Café'}
          </h3>
        </div>

        {/* Animation Controls */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Play / Pause Toggle */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3.5 py-2 rounded-xl bg-[#2A2421] text-white text-xs font-semibold hover:bg-[#3E3733] transition-colors flex items-center gap-1.5 shadow-xs"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'EN' ? 'Pause' : 'Pause'}</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'EN' ? 'Play Sketch' : 'Jouer'}</span>
              </>
            )}
          </button>

          {/* Replay Button */}
          <button
            onClick={handleReplay}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#D6D0C4] text-[#2A2421] text-xs font-semibold hover:bg-[#EFECE6] transition-colors flex items-center gap-1.5 shadow-2xs"
            title="Replay drawing from line 1"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#6F4E37]" />
            <span>{language === 'EN' ? 'Replay' : 'Rejouer'}</span>
          </button>

          {/* Speed Selector */}
          <div className="flex items-center bg-[#EFECE6] p-1 rounded-xl border border-[#D6D0C4] text-xs font-medium">
            <Gauge className="w-3.5 h-3.5 text-[#6F4E37] ml-1 mr-1" />
            {[0.5, 1, 1.5].map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all ${
                  speed === s ? 'bg-[#2A2421] text-white' : 'text-[#5C544E] hover:text-black'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>

          {/* Sound Scratch Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border transition-all ${
              soundEnabled
                ? 'bg-[#E29D38]/20 border-[#E29D38] text-[#2A2421]'
                : 'bg-white border-[#D6D0C4] text-[#8C867C] hover:text-black'
            }`}
            title="Toggle pencil scratching sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-700" /> : <VolumeX className="w-4 h-4" />}
          </button>

        </div>
      </div>

      {/* Progress Bar & Current Step Badge */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-[#6F4E37] font-semibold">
          <span>{language === 'EN' ? steps[currentStep]?.en : steps[currentStep]?.fr}</span>
          <span className="font-mono">{Math.round(drawingProgress)}%</span>
        </div>
        <div className="w-full h-1.5 bg-[#EAE6DE] rounded-full overflow-hidden border border-[#D6D0C4]/50">
          <div
            className="h-full bg-[#2A2421] transition-all duration-200"
            style={{ width: `${drawingProgress}%` }}
          />
        </div>
      </div>

      {/* Main Drawing Canvas Frame */}
      <div className="relative w-full aspect-[16/10] bg-[#FAF8F5] border border-[#D6D0C4] rounded-2xl p-4 md:p-8 flex items-center justify-center shadow-inner overflow-hidden">
        
        {/* Paper texture subtle grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#D6D0C4_1px,transparent_1px)] [background-size:20px_20px] opacity-25 pointer-events-none" />

        {/* Interactive SVG Sketch Animation */}
        <svg
          key={animationKey}
          viewBox="0 0 800 520"
          className="w-full h-full max-h-[480px] drop-shadow-sm select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* DEFINITION OF STROKE STYLES */}
          {/* Step 1: Roof Awning */}
          {/* Awning Top Roof Line */}
          <motion.path
            d="M 140 100 Q 140 60 160 55 L 640 55 Q 660 60 660 100 Z"
            stroke="#2A2421"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2 * durationFactor, ease: 'easeInOut', delay: 0.1 * durationFactor }}
          />

          {/* Awning Scalloped Fringe Edge */}
          <motion.path
            d="M 140 100 
               Q 157.5 118 175 100 
               Q 192.5 118 210 100 
               Q 227.5 118 245 100 
               Q 262.5 118 280 100 
               Q 297.5 118 315 100 
               Q 332.5 118 350 100 
               Q 367.5 118 385 100 
               Q 402.5 118 420 100 
               Q 437.5 118 455 100 
               Q 472.5 118 490 100 
               Q 507.5 118 525 100 
               Q 542.5 118 560 100 
               Q 577.5 118 595 100 
               Q 612.5 118 630 100 
               Q 647.5 118 660 100"
            stroke="#2A2421"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4 * durationFactor, ease: 'easeInOut', delay: 0.8 * durationFactor }}
          />

          {/* Step 2: Main Facade Box & Vertical Divider Wall */}
          <motion.rect
            x="175"
            y="105"
            width="450"
            height="260"
            stroke="#2A2421"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2 * durationFactor, ease: 'easeInOut', delay: 1.8 * durationFactor }}
          />

          {/* Vertical Door Divider Line */}
          <motion.line
            x1="480"
            y1="105"
            x2="480"
            y2="365"
            stroke="#2A2421"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8 * durationFactor, ease: 'easeInOut', delay: 2.6 * durationFactor }}
          />

          {/* Horizontal Window / Wall Divider Line */}
          <motion.line
            x1="175"
            y1="230"
            x2="480"
            y2="230"
            stroke="#2A2421"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7 * durationFactor, ease: 'easeInOut', delay: 3.0 * durationFactor }}
          />

          {/* Step 3: Maison Hand Doodle Logo */}
          <g transform="translate(265, 135) scale(0.95)" stroke="#2A2421" strokeLinecap="round" strokeLinejoin="round">
            {/* 'M' Doodle Strokes */}
            <motion.path
              d="M 28 44 C 26 28, 29 16, 34 14 C 38 12, 44 24, 50 36 C 55 24, 61 12, 66 14 C 70 16, 73 28, 71 44"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6 * durationFactor, ease: 'easeInOut', delay: 3.4 * durationFactor }}
            />
            <motion.path
              d="M 29 45 C 27 30, 30 18, 34 15 M 50 37 C 55 25, 60 14, 65 15"
              strokeWidth="2"
              opacity="0.6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 * durationFactor, ease: 'easeInOut', delay: 3.6 * durationFactor }}
            />

            {/* 'a' Doodle Stroke */}
            <motion.path
              d="M 94 28 C 84 26, 76 34, 79 41 C 82 47, 92 46, 94 38 M 94 28 L 94 44 C 94 46, 96 46, 98 44"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 * durationFactor, ease: 'easeInOut', delay: 3.8 * durationFactor }}
            />

            {/* 'i' Doodle Stem & Dot */}
            <motion.path
              d="M 112 28 C 111 34, 111 40, 112 44"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3 * durationFactor, ease: 'easeInOut', delay: 4.1 * durationFactor }}
            />
            <motion.circle
              cx="112"
              cy="18"
              r="3.5"
              fill="#2A2421"
              stroke="none"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 * durationFactor, delay: 4.3 * durationFactor }}
            />

            {/* 's' Doodle Stroke */}
            <motion.path
              d="M 48 72 C 38 70, 37 78, 44 81 C 52 84, 50 93, 39 93"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 * durationFactor, ease: 'easeInOut', delay: 4.4 * durationFactor }}
            />

            {/* 'o' Doodle Oval */}
            <motion.path
              d="M 72 71 C 60 70, 58 93, 72 93 C 86 93, 84 70, 72 71 Z"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 * durationFactor, ease: 'easeInOut', delay: 4.7 * durationFactor }}
            />

            {/* 'n' Doodle Arch & Leg */}
            <motion.path
              d="M 94 93 L 94 76 C 94 70, 106 69, 108 77 L 108 93"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 * durationFactor, ease: 'easeInOut', delay: 5.0 * durationFactor }}
            />

            {/* Doodle Underline Accent */}
            <motion.path
              d="M 28 102 Q 68 108, 118 100 Q 128 98, 132 101"
              stroke="#6F4E37"
              strokeWidth="2.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4 * durationFactor, ease: 'easeInOut', delay: 5.3 * durationFactor }}
            />
          </g>

          {/* Step 4: Glass Door & OPEN Sign */}
          {/* Inner Door Frame */}
          <motion.rect
            x="492"
            y="120"
            width="120"
            height="245"
            stroke="#2A2421"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.0 * durationFactor, ease: 'easeInOut', delay: 4.6 * durationFactor }}
          />

          {/* Door Top Transom Line */}
          <motion.line
            x1="492"
            y1="135"
            x2="612"
            y2="135"
            stroke="#2A2421"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 * durationFactor, delay: 5.2 * durationFactor }}
          />

          {/* Door Handle */}
          <motion.line
            x1="604"
            y1="230"
            x2="604"
            y2="255"
            stroke="#2A2421"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4 * durationFactor, delay: 5.5 * durationFactor }}
          />

          {/* Hanging OPEN Sign Strings */}
          <motion.path
            d="M 552 155 L 530 172 M 552 155 L 574 172"
            stroke="#2A2421"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6 * durationFactor, delay: 5.7 * durationFactor }}
          />

          {/* OPEN Sign Box & Text */}
          <motion.rect
            x="518"
            y="172"
            width="68"
            height="32"
            rx="4"
            stroke="#2A2421"
            strokeWidth="2"
            fill="#FAF8F5"
            initial={{ pathLength: 0, fillOpacity: 0 }}
            animate={{ pathLength: 1, fillOpacity: 1 }}
            transition={{ duration: 0.8 * durationFactor, delay: 6.0 * durationFactor }}
          />

          <motion.text
            x="552"
            y="193"
            textAnchor="middle"
            fill="#2A2421"
            style={{
              fontFamily: 'sans-serif',
              fontWeight: 700,
              fontSize: '12px',
              letterSpacing: '0.12em'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 * durationFactor, delay: 6.5 * durationFactor }}
          >
            OPEN
          </motion.text>

          {/* Step 5: Outdoor Bistro Table & Chairs */}
          {/* Table Top Ellipse */}
          <motion.ellipse
            cx="335"
            y="325"
            rx="45"
            ry="12"
            stroke="#2A2421"
            strokeWidth="2.5"
            fill="#FAF8F5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8 * durationFactor, delay: 6.8 * durationFactor }}
          />

          {/* Table Legs */}
          <motion.path
            d="M 335 337 L 335 385 M 312 385 L 358 385 M 325 337 L 315 385 M 345 337 L 355 385"
            stroke="#2A2421"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9 * durationFactor, delay: 7.2 * durationFactor }}
          />

          {/* Left Chair */}
          <motion.path
            d="M 235 295 C 235 280, 260 280, 260 295 L 260 330 L 225 330 L 225 380 M 260 330 L 260 380"
            stroke="#2A2421"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.0 * durationFactor, delay: 7.8 * durationFactor }}
          />

          {/* Right Chair */}
          <motion.path
            d="M 430 295 C 430 280, 405 280, 405 295 L 405 330 L 440 330 L 440 380 M 405 330 L 405 380"
            stroke="#2A2421"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.0 * durationFactor, delay: 8.4 * durationFactor }}
          />

          {/* Step 6: Potted Bush Plant on Stand */}
          {/* Cloud-like Foliage Outline */}
          <motion.path
            d="M 125 355 
               C 100 335, 100 295, 125 280 
               C 140 260, 175 260, 190 280 
               C 210 295, 210 335, 185 355 Z"
            stroke="#2A2421"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="#FAF8F5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2 * durationFactor, delay: 9.0 * durationFactor }}
          />

          {/* Inner Foliage Texture Dots/Lines */}
          <motion.path
            d="M 135 300 Q 145 290 155 305 M 165 315 Q 175 300 180 320 M 130 330 Q 140 340 150 325"
            stroke="#2A2421"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8 * durationFactor, delay: 9.8 * durationFactor }}
          />

          {/* Plant Stand Pot Base */}
          <motion.path
            d="M 140 355 L 140 375 L 170 375 L 170 355 M 132 375 L 122 400 M 178 375 L 188 400"
            stroke="#2A2421"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8 * durationFactor, delay: 10.3 * durationFactor }}
          />

          {/* Step 7: Celestial Sparkle Stars & Hot Coffee Steam */}
          {/* Left Celestial 8-Point Star */}
          <g transform="translate(65, 170)">
            <motion.path
              d="M 20 0 L 23 15 L 38 18 L 23 21 L 20 36 L 17 21 L 2 18 L 17 15 Z"
              fill="#2A2421"
              stroke="#2A2421"
              strokeWidth="1"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 * durationFactor, type: 'spring', delay: 11.0 * durationFactor }}
            />
          </g>

          {/* Right Celestial 8-Point Star */}
          <g transform="translate(710, 280)">
            <motion.path
              d="M 18 0 L 21 13 L 34 16 L 21 19 L 18 32 L 15 19 L 2 16 L 15 13 Z"
              fill="#2A2421"
              stroke="#2A2421"
              strokeWidth="1"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 * durationFactor, type: 'spring', delay: 11.4 * durationFactor }}
            />
          </g>

          {/* Coffee Cup on Table with Rising Animated Steam */}
          <g>
            <motion.rect
              x="328"
              y="312"
              width="14"
              height="11"
              rx="2"
              stroke="#2A2421"
              strokeWidth="2"
              fill="#2A2421"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 * durationFactor, delay: 11.8 * durationFactor }}
            />

            <motion.path
              d="M 332 308 Q 330 300 334 294"
              stroke="#6F4E37"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1, y: [-1, -6, -1], opacity: [0.3, 1, 0.3] }}
              transition={{
                pathLength: { duration: 0.5 * durationFactor, delay: 12.0 * durationFactor },
                y: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
                opacity: { repeat: Infinity, duration: 2, ease: 'easeInOut' }
              }}
            />
            <motion.path
              d="M 338 308 Q 340 300 336 292"
              stroke="#6F4E37"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1, y: [-1, -6, -1], opacity: [0.2, 0.9, 0.2] }}
              transition={{
                pathLength: { duration: 0.5 * durationFactor, delay: 12.2 * durationFactor },
                y: { repeat: Infinity, duration: 2.2, delay: 0.3, ease: 'easeInOut' },
                opacity: { repeat: Infinity, duration: 2.2, delay: 0.3, ease: 'easeInOut' }
              }}
            />
          </g>

        </svg>

      </div>

      {/* Footer Instructions */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#6F4E37] pt-2">
        <p className="flex items-center gap-1.5 font-medium">
          <Eye className="w-4 h-4 text-[#4E6E45]" />
          {language === 'EN'
            ? 'Hand-drawn line art rendered stroke-by-stroke with smooth cubic vector curves.'
            : 'Rendu vectoriel du croquis ligne par ligne en temps réel.'}
        </p>

        <button
          onClick={handleReplay}
          className="mt-2 sm:mt-0 text-xs font-bold text-[#2A2421] underline hover:text-[#4E6E45] transition-colors"
        >
          {language === 'EN' ? 'Restart Animation' : 'Recommencer l’Animation'}
        </button>
      </div>

    </div>
  );
};
