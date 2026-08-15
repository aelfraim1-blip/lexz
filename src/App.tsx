import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_PHOTOS } from './data/romanticContent';
import { DiaryCover } from './components/DiaryCover';
import { MemoryScrapbook } from './components/MemoryScrapbook';
import { LoveLetterSection } from './components/LoveLetterSection';
import { FloatingDecorations } from './components/FloatingDecorations';
import { AudioPlayer } from './components/AudioPlayer';

export default function App() {
  const [isDiaryOpen, setIsDiaryOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFF0F5] bg-bright-pink-canvas text-[#4A0E2E] font-body relative selection:bg-[#FF69B4] selection:text-white">
      {/* Background Floating Cute Emojis: 💖 🌻 ☀️ 🍓 */}
      <FloatingDecorations />

      {/* The 1975 - All I Need To Hear Standalone Music Player */}
      <AudioPlayer autoStart={true} />

      {/* 3D Interactive Keepsake Diary Opening Experience */}
      <AnimatePresence>
        {!isDiaryOpen && (
          <DiaryCover
            isOpen={isDiaryOpen}
            coverPhoto={INITIAL_PHOTOS[0]?.url || '/photos/photo1.jpg'}
            onOpen={() => setIsDiaryOpen(true)}
          />
        )}
      </AnimatePresence>

      {/* Aesthetic Diary: Photobooth Pictures + Surprise Letter Note */}
      {isDiaryOpen && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-2xl mx-auto px-4 sm:px-6 py-8"
        >
          {/* Top Title Banner */}
          <div className="text-center pt-2 pb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 shadow-md border border-[#FFB6C1] mb-2.5">
              <span className="text-base animate-bounce">🌻</span>
              <span className="text-xs font-bold tracking-widest uppercase text-[#FF1493]">
                to my future wife
              </span>
              <span className="text-base animate-pulse">💖</span>
            </div>
            <h2 className="font-romantic text-3xl sm:text-4xl font-extrabold text-[#C71585] tracking-wide mt-1 lowercase">
              to my one and only
            </h2>
          </div>

          {/* 1. Photobooth Memories Scrapbook */}
          <MemoryScrapbook photos={INITIAL_PHOTOS} />

          {/* 2. Love Letter Surprise Note */}
          <LoveLetterSection />

          {/* Bright Romantic Signoff Footer */}
          <footer className="text-center pb-14 pt-6">
            <div className="flex items-center justify-center gap-3 text-lg text-[#FF1493] mb-2">
              <span className="animate-bounce">🌻</span>
              <span className="font-romantic text-base font-bold text-[#C71585]">forever & always</span>
              <span className="animate-pulse">💖</span>
            </div>
            <p className="font-romantic text-base sm:text-lg text-[#D81B60] font-bold tracking-wide">
              "You are my favorite place to go when my mind searches for peace."
            </p>
            <div className="flex justify-center items-center gap-1 text-sm text-[#FF69B4] mt-2 font-handwritten font-bold">
              <span>Made with all my love for you</span> ☀️ 💖 🌻
            </div>
          </footer>
        </motion.div>
      )}
    </div>
  );
}
