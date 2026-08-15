import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Gift, Shuffle, Star, Flame, Smile } from 'lucide-react';
import { LOVE_REASONS } from '../data/romanticContent';
import confetti from 'canvas-confetti';

export const ReasonsJar: React.FC = () => {
  const [currentReason, setCurrentReason] = useState(LOVE_REASONS[0]);
  const [loveLevel, setLoveLevel] = useState(100);
  const [revealedCount, setRevealedCount] = useState(1);

  const pullNewReason = () => {
    const randomIndex = Math.floor(Math.random() * LOVE_REASONS.length);
    const selected = LOVE_REASONS[randomIndex];
    setCurrentReason(selected);
    setRevealedCount((prev) => prev + 1);

    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#fbbf24', '#f43f5e', '#fbcfe8'],
    });
  };

  const pumpLoveMeter = (e: React.MouseEvent) => {
    setLoveLevel((prev) => prev + 50);
    confetti({
      particleCount: 20,
      spread: 50,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
      colors: ['#f43f5e', '#ec4899', '#fda4af'],
    });
  };

  return (
    <section id="reasons-section" className="py-12 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-xl border-4 border-[#FFB6C1] relative overflow-hidden transform -rotate-0.5">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#FFF0F5] rounded-full text-[#C71585] text-xs font-bold shadow-xs mb-2 border-2 border-[#FFB6C1]">
            <Sparkles className="w-3.5 h-3.5 text-[#FF69B4] animate-spin" />
            <span>Interactive Love Jar</span>
          </div>

          <h2 className="font-romantic text-3xl sm:text-4xl font-bold text-[#FF1493] mb-1">
            Reasons Why I Love You ✨
          </h2>
          <p className="font-handwritten text-xl text-[#DB7093] font-bold">
            "Just a few of the millions of things that make you so special to me."
          </p>
        </div>

        {/* The Card Jar & Interactive Reason Note */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Visual Jar Graphic */}
          <div className="md:col-span-4 flex flex-col items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={pullNewReason}
              className="relative w-44 h-56 bg-[#FFF0F5] rounded-b-3xl rounded-t-xl border-4 border-[#FFB6C1] shadow-xl p-4 flex flex-col items-center justify-between cursor-pointer group"
              style={{
                boxShadow: '0 15px 30px -5px rgba(255, 105, 180, 0.35)',
              }}
            >
              {/* Jar Lid */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#FF69B4] rounded-md border-2 border-[#FF1493] shadow-xs flex items-center justify-center">
                <div className="w-16 h-1 bg-white/70 rounded-full"></div>
              </div>

              {/* Jar Ribbon */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-2.5 bg-yellow-300 rounded-full shadow-xs"></div>

              {/* Floating Mini Hearts Inside Jar */}
              <div className="relative w-full h-full flex flex-wrap items-center justify-center gap-1.5 p-2 overflow-hidden">
                <span className="text-xl animate-float-slow">💖</span>
                <span className="text-xl animate-float-gentle">🌻</span>
                <span className="text-lg animate-bounce">✨</span>
                <span className="text-xl">💌</span>
                <span className="text-xl animate-pulse">☀️</span>
                <span className="text-xl">🍓</span>
                <span className="text-xl animate-float-slow">💕</span>
              </div>

              {/* Jar Label */}
              <div className="bg-[#FF69B4] text-white font-bold text-xs px-3 py-1 rounded-full shadow-xs">
                Tap To Pick Note 💌
              </div>
            </motion.div>

            <button
              onClick={pullNewReason}
              className="mt-4 flex items-center gap-2 px-4 py-2 bg-[#FF69B4] hover:bg-[#FF1493] text-white rounded-full font-bold text-xs shadow-md shadow-[#FF69B4]/30 transition-all active:scale-95"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Pull Another Note 🌻</span>
            </button>
          </div>

          {/* Current Pulled Note Display */}
          <div className="md:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReason.id}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-[#FFF0F5] rounded-[1.5rem] p-6 sm:p-8 shadow-md border-2 border-[#FFB6C1] relative"
              >
                {/* Washi Tape */}
                <div className="absolute -top-3 right-6 w-24 h-6 washi-tape-vibrant transform rotate-3"></div>

                <div className="flex items-center justify-between mb-3">
                  <span className="bg-[#FFD1DC] text-[#C71585] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <span>{currentReason.emoji}</span>
                    <span>{currentReason.tag}</span>
                  </span>

                  <span className="text-xs text-[#DB7093] font-bold">
                    Reason #{currentReason.id} of {LOVE_REASONS.length}
                  </span>
                </div>

                <p className="font-handwritten text-2xl sm:text-3xl text-neutral-800 leading-relaxed my-3 font-bold">
                  "{currentReason.reason}"
                </p>

                <div className="pt-3 border-t border-[#FFB6C1] flex items-center justify-between">
                  <p className="text-xs text-[#DB7093] font-medium italic">
                    Pulled {revealedCount} love notes so far 💕
                  </p>
                  <span className="text-xs font-bold text-[#FF1493] bg-[#FFD1DC] px-2.5 py-0.5 rounded-full">
                    Forever & Always 💍
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Interactive Love Meter */}
            <div className="mt-4 bg-[#FFF0F5] rounded-2xl p-4 border-2 border-[#FFB6C1] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#FF1493] shadow-xs border border-[#FFB6C1]">
                  <Flame className="w-5 h-5 fill-[#FF1493] animate-pulse" />
                </div>
                <div>
                  <h5 className="font-heading font-bold text-xs text-[#C71585] uppercase">
                    My Love For You Meter:
                  </h5>
                  <p className="text-lg font-bold text-[#FF1493] font-heading">
                    {loveLevel}% & Growing to Infinity 💖
                  </p>
                </div>
              </div>

              <button
                onClick={pumpLoveMeter}
                className="flex items-center gap-1.5 bg-[#FF69B4] hover:bg-[#FF1493] text-white text-xs font-bold px-4 py-2 rounded-full shadow-md shadow-[#FF69B4]/30 hover:scale-105 active:scale-95 transition-all"
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>Pump Love ❤️</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
