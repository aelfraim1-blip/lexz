import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera } from 'lucide-react';
import { INITIAL_PHOTOS } from './data/romanticContent';
import { MemoryPhoto } from './types';
import { DiaryCover } from './components/DiaryCover';
import { MemoryScrapbook } from './components/MemoryScrapbook';
import { LoveLetterSection } from './components/LoveLetterSection';
import { FloatingDecorations } from './components/FloatingDecorations';
import { AudioPlayer } from './components/AudioPlayer';
import { PhotoSyncModal } from './components/PhotoSyncModal';

const STORAGE_KEY = 'my_sunshine_photos';

export default function App() {
  const [isDiaryOpen, setIsDiaryOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [photos, setPhotos] = useState<MemoryPhoto[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_PHOTOS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
    } catch {
      // ignore
    }
  }, [photos]);

  const handleUpdatePhoto = (id: string, newUrl: string) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, url: newUrl } : p))
    );
  };

  const handleResetPhotos = () => {
    setPhotos(INITIAL_PHOTOS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF0F5] bg-bright-pink-canvas text-[#4A0E2E] font-body relative selection:bg-[#FF69B4] selection:text-white">
      {/* Background Floating Cute Emojis: 💖 🌻 ☀️ 🍓 */}
      <FloatingDecorations />

      {/* The 1975 - All I Need To Hear Standalone Music Player */}
      <AudioPlayer autoStart={true} />

      {/* Discreet Photo / GitHub Sync Button in Top-Right */}
      <div className="fixed top-4 right-4 z-40">
        <button
          onClick={() => setIsPhotoModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-[#FF1493] text-xs font-bold shadow-md border border-[#FFB6C1] transition-all hover:scale-105"
          title="Upload or sync photos for GitHub/Vercel"
        >
          <Camera className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Photos & GitHub Setup</span>
        </button>
      </div>

      {/* Photo Sync & GitHub/Vercel Helper Modal */}
      <PhotoSyncModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        photos={photos}
        onUpdatePhoto={handleUpdatePhoto}
        onResetPhotos={handleResetPhotos}
      />

      {/* 3D Interactive Keepsake Diary Opening Experience */}
      <AnimatePresence>
        {!isDiaryOpen && (
          <DiaryCover
            isOpen={isDiaryOpen}
            coverPhoto={photos[0]?.url || '/photos/photo1.jpg'}
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
          <MemoryScrapbook photos={photos} />

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
