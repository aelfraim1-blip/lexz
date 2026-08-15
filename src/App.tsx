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
    <div className="min-h-screen bg-[#FFF0F5] text-neutral-800 font-body relative selection:bg-[#FFB6C1] selection:text-[#C71585]">
      {/* Background Floating Ambient Particles */}
      <FloatingDecorations />

      {/* Romantic Music Box Audio Player */}
      <AudioPlayer />

      {/* Diary Opening Experience */}
      <AnimatePresence>
        {!isDiaryOpen && (
          <DiaryCover
            isOpen={isDiaryOpen}
            onOpen={() => setIsDiaryOpen(true)}
          />
        )}
      </AnimatePresence>

      {/* Pure Simple Diary: Pictures + Surprise Note at the End */}
      {isDiaryOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto px-3 sm:px-4 py-4"
        >
          {/* 1. The Pictures of Us Together */}
          <MemoryScrapbook photos={INITIAL_PHOTOS} />

          {/* 2. A Little Surprise Diary Note at the End */}
          <LoveLetterSection />

          {/* Simple Loving Signoff */}
          <footer className="text-center pb-8 pt-2">
            <div className="text-xl mb-1 opacity-80">🌻 💖 ☀️</div>
            <p className="font-handwritten text-lg text-[#DB7093] font-bold">
              "Forever and always, you and me."
            </p>
          </footer>
        </motion.div>
      )}
    </div>
  );
}
