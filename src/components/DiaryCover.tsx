import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Lock, Key, Sparkles, Stars, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DiaryCoverProps {
  onOpen: () => void;
  isOpen: boolean;
  coverPhoto?: string;
}

export const DiaryCover: React.FC<DiaryCoverProps> = ({ onOpen, isOpen, coverPhoto = '/photos/photo1.jpg' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isOpenCoverAnimated, setIsOpenCoverAnimated] = useState(false);
  
  // 3D Tilt state based on cursor position
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Mouse move 3D tilt calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isUnlocking) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within element.
    const y = e.clientY - rect.top;  // y position within element.

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation between -16 to 16 deg
    const rY = ((x - centerX) / centerX) * 16;
    const rX = -((y - centerY) / centerY) * 14;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleOpenDiary = () => {
    if (isUnlocking || isOpen) return;
    setIsUnlocking(true);

    // 💖 🌻 ☀️ Confetti burst
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#FF1493', '#FF69B4', '#FFD700', '#FF85A2', '#FBBF24', '#FFF0F5'],
    });

    // 3D Cover opening animation trigger
    setTimeout(() => {
      setIsOpenCoverAnimated(true);
    }, 300);

    setTimeout(() => {
      onOpen();
      setIsUnlocking(false);
    }, 1100);
  };

  if (isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FFF0F5]/85 backdrop-blur-md p-4 overflow-hidden select-none">
      {/* Background Floating Cute Emojis: 🌻 💖 ☀️ 🎀 */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-10 left-12 text-4xl sm:text-5xl animate-bounce drop-shadow-md">
          🌻
        </div>
        <div className="absolute top-16 right-16 text-4xl sm:text-5xl animate-pulse drop-shadow-md">
          💖
        </div>
        <div className="absolute bottom-16 left-20 text-4xl sm:text-5xl animate-bounce drop-shadow-md">
          ☀️
        </div>
        <div className="absolute bottom-24 right-20 text-4xl sm:text-5xl animate-pulse drop-shadow-md">
          🍓
        </div>
        <div className="absolute top-1/2 left-8 text-3xl opacity-70 animate-pulse">
          🎀
        </div>
        <div className="absolute top-1/3 right-10 text-3xl opacity-70 animate-bounce">
          ✨
        </div>
        <div className="absolute bottom-1/3 left-16 text-3xl opacity-80">
          🌻
        </div>
        <div className="absolute top-1/4 left-1/3 text-2xl opacity-70">
          ☀️
        </div>
      </div>

      {/* 3D Scene Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative max-w-sm sm:max-w-md w-full perspective-1200 py-6"
      >
        {/* 3D Tilting Book Body */}
        <motion.div
          animate={{
            rotateX: isUnlocking ? 0 : rotateX,
            rotateY: isUnlocking ? (isOpenCoverAnimated ? -10 : 0) : rotateY,
            scale: isHovered && !isUnlocking ? 1.03 : 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 220,
            damping: 20,
          }}
          className="relative w-full transform-style-3d cursor-pointer mx-auto"
          style={{
            transformStyle: 'preserve-3d',
            height: '490px',
          }}
          onClick={handleOpenDiary}
        >
          {/* 3D BOOK SPINE (Left edge, rotated -90deg in 3D) */}
          <div
            className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#C71585] via-[#FF1493] to-[#FF69B4] rounded-l-2xl border-y-2 border-l-2 border-white/40 flex flex-col justify-between items-center py-6 text-white text-[10px] font-bold tracking-widest shadow-xl"
            style={{
              transformOrigin: 'left center',
              transform: 'rotateY(-90deg) translateZ(0px)',
              backfaceVisibility: 'hidden',
            }}
          >
            <span className="transform -rotate-90 origin-center whitespace-nowrap text-[#FFF0F5] font-romantic text-xs tracking-wider">
              ✦ OUR LOVE STORY ✦
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-300"></div>
          </div>

          {/* 3D BOOK BACK COVER (Pushed back in 3D: translateZ(-26px)) */}
          <div
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#980A58] via-[#C71585] to-[#880E4F] border-2 border-pink-400/50 shadow-2xl"
            style={{
              transform: 'translateZ(-26px)',
              boxShadow: '0 30px 60px -15px rgba(255, 20, 147, 0.45), 0 20px 40px -10px rgba(0, 0, 0, 0.35)',
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:12px_12px]"></div>
          </div>

          {/* 3D LAYERED PAPER BLOCK - RIGHT SIDE (rotated 90deg in 3D) */}
          <div
            className="absolute right-1 top-2 bottom-2 w-6 rounded-r-xs"
            style={{
              transformOrigin: 'right center',
              transform: 'rotateY(90deg) translateZ(0px)',
              background: 'repeating-linear-gradient(to bottom, #FFFDF9 0px, #FFFDF9 2px, #F2E3C6 3px, #FFFDF9 4px)',
              boxShadow: 'inset 0 0 5px rgba(0,0,0,0.2)',
            }}
          ></div>

          {/* 3D LAYERED PAPER BLOCK - BOTTOM SIDE (rotated -90deg in 3D) */}
          <div
            className="absolute left-6 right-2 bottom-1 h-6 rounded-b-xs"
            style={{
              transformOrigin: 'center bottom',
              transform: 'rotateX(-90deg) translateZ(0px)',
              background: 'repeating-linear-gradient(to right, #FFFDF9 0px, #FFFDF9 2px, #F2E3C6 3px, #FFFDF9 4px)',
              boxShadow: 'inset 0 0 5px rgba(0,0,0,0.2)',
            }}
          ></div>

          {/* INSIDE PAGE (Revealed when front cover flips open in 3D) */}
          <div
            className="absolute inset-0 rounded-3xl bg-[#FFFDF9] border-2 border-[#FFD1DC] p-6 flex flex-col items-center justify-center text-center overflow-hidden"
            style={{
              transform: 'translateZ(-2px)',
              boxShadow: 'inset 0 0 20px rgba(255, 105, 180, 0.1)',
            }}
          >
            <div className="text-4xl animate-bounce mb-2">📖 ✨</div>
            <h3 className="font-romantic text-2xl font-bold text-[#FF1493] mb-1">
              Opening Our Memories...
            </h3>
            <p className="font-handwritten text-lg text-[#C71585] font-bold">
              🌻 You bring sunshine to my world ☀️
            </p>
          </div>

          {/* 3D FRONT COVER (Hinges open on the left edge in 3D) */}
          <motion.div
            animate={{
              rotateY: isOpenCoverAnimated ? -150 : 0,
            }}
            transition={{
              duration: 0.75,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="absolute inset-0 rounded-3xl p-6 sm:p-7 border-2 border-white/80 bg-gradient-to-br from-[#FF69B4] via-[#FF1493] to-[#C71585] select-none text-white shadow-xl flex flex-col justify-between"
            style={{
              transformOrigin: 'left center',
              transformStyle: 'preserve-3d',
              boxShadow: '0 20px 45px -10px rgba(255, 20, 147, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.4) inset',
            }}
          >
            {/* Front Cover Gloss / Light Reflection effect */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none opacity-30 bg-gradient-to-tr from-transparent via-white/40 to-transparent"
              style={{
                transform: `translateX(${rotateY * 4}px)`,
                transition: 'transform 0.1s ease-out',
              }}
            ></div>

            {/* Leather Stitched Spine Details on Cover Left */}
            <div className="absolute left-0 top-0 bottom-0 w-7 bg-[#A00B5B]/35 rounded-l-3xl border-r border-white/30 flex flex-col justify-between py-6 items-center">
              <div className="w-1.5 h-4 bg-white/70 rounded-full shadow-xs"></div>
              <div className="w-1.5 h-4 bg-white/70 rounded-full shadow-xs"></div>
              <div className="w-1.5 h-4 bg-white/70 rounded-full shadow-xs"></div>
              <div className="w-1.5 h-4 bg-white/70 rounded-full shadow-xs"></div>
            </div>

            {/* Golden Ribbon Bookmark Peeking at bottom */}
            <div className="absolute -bottom-4 left-16 w-5 h-8 bg-yellow-400 rounded-b-sm shadow-md border border-yellow-500 transform rotate-6 flex items-end justify-center pb-1">
              <Sparkles className="w-3 h-3 text-yellow-900 animate-spin" style={{ animationDuration: '4s' }} />
            </div>

            {/* Cute Scrapbook Stickers on Cover */}
            <div className="absolute top-3.5 right-4 bg-yellow-300 text-yellow-950 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md rotate-6 flex items-center gap-1 border border-yellow-400">
              <span>my little mirasol</span> 🌻
            </div>

            <div className="absolute bottom-4 left-10 text-2xl transform -rotate-12 drop-shadow-md">
              🌻
            </div>
            <div className="absolute top-4 left-10 text-xl transform rotate-6 drop-shadow-md">
              🎀
            </div>
            <div className="absolute top-16 right-4 text-2xl transform rotate-12 drop-shadow-md">
              ☀️
            </div>

            {/* Cover Center Content */}
            <div className="pl-5 text-center flex flex-col items-center">
              {/* Top Cute Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-[#FF1493] text-[10px] font-extrabold tracking-wider uppercase shadow-md mb-2.5 border border-white">
                <Stars className="w-3 h-3 text-[#FF69B4]" />
                <span>For My Sunshine</span>
                <Stars className="w-3 h-3 text-[#FF69B4]" />
              </div>

              {/* Title with Bright Glow */}
              <h1 className="font-romantic text-3xl sm:text-4xl font-extrabold text-white drop-shadow-[0_2px_8px_rgba(199,21,133,0.6)] tracking-wide mb-0.5">
                Our Love Story
              </h1>
              <p className="font-handwritten text-lg sm:text-xl text-pink-100 font-bold mb-3 drop-shadow-xs flex items-center gap-1">
                <span>✨ Moments with you ✨</span>
              </p>

              {/* Polaroid Photo Sticker */}
              <div className="relative bg-white p-2 pb-3.5 rounded-xl shadow-lg border-2 border-pink-200 rotate-1 mb-4 max-w-[138px] transition-transform hover:rotate-0 transform group-hover:scale-105">
                <div className="w-full h-24 bg-[#FFF0F5] rounded-lg overflow-hidden flex items-center justify-center relative">
                  <img
                    src={coverPhoto}
                    alt="Our Memory"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/photos/photo1.jpg';
                    }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-900/20 to-transparent"></div>
                </div>
              </div>

              {/* Golden 3D Heart Lock Unlock Button */}
              <div className="relative group">
                <button
                  id="unlock-diary-button"
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold shadow-lg transition-all duration-300 ${
                    isUnlocking
                      ? 'bg-yellow-400 text-yellow-950 scale-105 shadow-yellow-400/50'
                      : 'bg-white text-[#FF1493] hover:bg-[#FFF0F5] hover:scale-105 active:scale-95 shadow-pink-900/20 border-2 border-[#FFB6C1]'
                  }`}
                >
                  {isUnlocking ? (
                    <>
                      <Key className="w-4 h-4 text-yellow-800 animate-spin" />
                      <span className="tracking-wide">Unlocking Diary... ✨</span>
                    </>
                  ) : (
                    <>
                      <div className="w-5 h-5 rounded-full bg-[#FFF0F5] flex items-center justify-center text-[#FF1493] shadow-inner">
                        <Lock className="w-3 h-3 group-hover:hidden" />
                        <Key className="w-3 h-3 hidden group-hover:block text-yellow-600" />
                      </div>
                      <span className="tracking-wide">Tap to Open Diary 📖</span>
                      <Heart className="w-4 h-4 text-[#FF1493] fill-[#FF1493] animate-pulse" />
                    </>
                  )}
                </button>
              </div>

              <p className="font-handwritten text-sm text-pink-100 font-bold mt-2.5 flex items-center gap-1.5">
                <span>You are my favorite sunflower</span> 🌻
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
