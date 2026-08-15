import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Lock, Key, Sparkles, BookOpen, Stars, Smile, ArrowDown } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DiaryCoverProps {
  onOpen: () => void;
  isOpen: boolean;
}

export const DiaryCover: React.FC<DiaryCoverProps> = ({ onOpen, isOpen }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleOpenDiary = () => {
    if (isUnlocking || isOpen) return;
    setIsUnlocking(true);

    // Heart explosion confetti
    confetti({
      particleCount: 70,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#f472b6', '#fb7185', '#fbbf24', '#fbcfe8', '#fda4af'],
    });

    setTimeout(() => {
      onOpen();
      setIsUnlocking(false);
    }, 700);
  };

  if (isOpen) {
    return null; // Closed when opened
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FFF0F5]/90 backdrop-blur-md p-4 overflow-hidden">
      {/* Background cute ambient floating emojis */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-10 left-12 text-4xl animate-bounce">🌻</div>
        <div className="absolute top-20 right-16 text-4xl animate-pulse">💖</div>
        <div className="absolute bottom-16 left-20 text-4xl animate-bounce">☀️</div>
        <div className="absolute bottom-24 right-20 text-4xl animate-pulse">🍓</div>
        <div className="absolute top-1/2 left-8 text-3xl opacity-60">🎀</div>
        <div className="absolute top-1/3 right-10 text-3xl opacity-60">✨</div>
      </div>

      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 1.05, opacity: 0, rotateY: -90 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative max-w-sm w-full perspective-1000"
      >
        {/* The Pink Diary Book Container */}
        <div
          id="diary-book-cover"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleOpenDiary}
          className={`relative cursor-pointer transition-all duration-500 rounded-3xl p-6 sm:p-7 shadow-xl border-2 border-white/90 bg-gradient-to-br from-[#FF69B4] via-[#FF1493] to-[#C71585] select-none transform ${
            isHovered ? 'scale-[1.02] shadow-[#FF69B4]/50 -rotate-1' : 'rotate-0'
          }`}
          style={{
            boxShadow: '0 15px 35px -8px rgba(255, 20, 147, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.4) inset',
          }}
        >
          {/* Leather Book Spine / Stitching Details */}
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-[#C71585]/40 rounded-l-3xl border-r border-white/20 flex flex-col justify-between py-5 items-center">
            <div className="w-1 h-4 bg-white/60 rounded-full"></div>
            <div className="w-1 h-4 bg-white/60 rounded-full"></div>
            <div className="w-1 h-4 bg-white/60 rounded-full"></div>
            <div className="w-1 h-4 bg-white/60 rounded-full"></div>
          </div>

          {/* Golden Ribbon Bookmark peeking out */}
          <div className="absolute -bottom-4 left-16 w-5 h-8 bg-yellow-400 rounded-b-sm shadow-xs border border-yellow-500 transform rotate-6 flex items-end justify-center pb-0.5">
            <Sparkles className="w-2.5 h-2.5 text-yellow-800" />
          </div>

          {/* Cute Scrapbook Stickers on Cover */}
          <div className="absolute top-3.5 right-4 bg-yellow-200 text-yellow-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs rotate-6 flex items-center gap-1 border border-yellow-300">
            <span>Special</span> 💖
          </div>

          <div className="absolute bottom-4 left-9 text-xl transform -rotate-12 drop-shadow-xs">
            🌻
          </div>
          <div className="absolute top-4 left-9 text-lg transform rotate-6 drop-shadow-xs">
            🎀
          </div>

          {/* Inside Cover Card Styling */}
          <div className="pl-4 text-center flex flex-col items-center">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[#C71585] text-[10px] font-bold tracking-wider uppercase shadow-xs mb-3 border border-white">
              <Stars className="w-3 h-3 text-[#FF69B4]" />
              <span>For My Favorite Person</span>
              <Stars className="w-3 h-3 text-[#FF69B4]" />
            </div>

            {/* Diary Title */}
            <h1 className="font-romantic text-3xl sm:text-4xl font-extrabold text-white drop-shadow-sm tracking-wide mb-0.5">
              Our Love Story
            </h1>
            <p className="font-handwritten text-lg sm:text-xl text-pink-100 font-bold mb-4 drop-shadow-xs">
              ✨ Every Little Memory of Us ✨
            </p>

            {/* Little couple avatar preview polaroid */}
            <div className="relative bg-white p-2 rounded-xl shadow-md border border-[#FFB6C1] rotate-1 mb-5 max-w-[140px] transition-transform hover:rotate-0">
              <div className="w-full h-24 bg-[#FFF0F5] rounded-lg overflow-hidden flex items-center justify-center relative">
                <img
                  src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80"
                  alt="Our Photo"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80';
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <span className="absolute bottom-1 text-[9px] text-white font-bold px-2 py-0.5 bg-[#FF1493]/80 rounded-full backdrop-blur-xs">
                  Chapter One 📖
                </span>
              </div>
            </div>

            {/* Glowing Golden Heart Lock Button */}
            <div className="relative group">
              <button
                id="unlock-diary-button"
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-md transition-all duration-300 ${
                  isUnlocking
                    ? 'bg-yellow-400 text-yellow-950 scale-105'
                    : 'bg-white text-[#FF1493] hover:bg-[#FFF0F5] hover:scale-105 active:scale-95 shadow-black/10 border border-[#FFB6C1]'
                }`}
              >
                {isUnlocking ? (
                  <>
                    <Key className="w-3.5 h-3.5 text-yellow-700 animate-spin" />
                    <span>Unlocking Diary... ✨</span>
                  </>
                ) : (
                  <>
                    <div className="w-5 h-5 rounded-full bg-[#FFF0F5] flex items-center justify-center text-[#FF69B4]">
                      <Lock className="w-3 h-3 group-hover:hidden" />
                      <Key className="w-3 h-3 hidden group-hover:block text-yellow-600" />
                    </div>
                    <span>Tap to Open Diary 📖</span>
                    <Heart className="w-3.5 h-3.5 text-[#FF69B4] fill-[#FF69B4] animate-pulse" />
                  </>
                )}
              </button>
            </div>

            <p className="font-body text-[11px] text-white/90 mt-2.5 flex items-center gap-1 font-medium">
              <span>Made with all my love</span> 🌻
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
