import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const LoveLetterSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#FF1493', '#FF69B4', '#FFB6C1', '#FFF0F5', '#FFD700'],
    });
  };

  return (
    <section id="surprise-diary" className="pt-4 pb-14 px-3 sm:px-4 max-w-xl mx-auto">
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFF0F5] border border-[#FFB6C1] text-[#C71585] text-[11px] font-bold shadow-xs mb-1.5">
          <Sparkles className="w-3 h-3 text-[#FF69B4]" />
          <span>The Final Page</span>
          <span className="text-[#FFB6C1]">•</span>
          <span>A Surprise For You</span>
        </div>
        <h2 className="font-romantic text-2xl sm:text-3xl font-bold text-[#FF1493]">
          A Little Surprise Diary Note 💌
        </h2>
      </div>

      {/* Sealed Envelope */}
      {!isOpen ? (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.01 }}
          onClick={handleOpenEnvelope}
          className="relative max-w-sm mx-auto bg-white border-2 border-[#FFB6C1] p-6 sm:p-7 rounded-2xl shadow-lg cursor-pointer select-none text-center overflow-hidden group transform -rotate-1"
          style={{
            boxShadow: '0 12px 30px -8px rgba(255, 105, 180, 0.3)',
          }}
        >
          {/* Top Badge */}
          <div className="absolute -top-3 -left-3 bg-[#FF69B4] text-white w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-md border-2 border-white z-20">
            💌
          </div>

          {/* Envelope Triangle Flap Styling */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-[#FFF0F5] border-b border-[#FFB6C1] [clip-path:polygon(0_0,100%_0,50%_100%)] pointer-events-none"></div>

          {/* Cute Floating Elements */}
          <div className="absolute top-2 left-3 text-lg">🌻</div>
          <div className="absolute top-2 right-3 text-lg">💖</div>
          <div className="absolute bottom-3 left-4 text-lg">🍓</div>
          <div className="absolute bottom-3 right-4 text-lg">☀️</div>

          {/* Central Wax Seal Button */}
          <div className="relative z-10 my-5 flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#C71585] via-[#FF1493] to-[#FF69B4] shadow-md border-2 border-white flex items-center justify-center text-white transform group-hover:scale-105 group-hover:rotate-6 transition-all duration-300 relative">
              <Heart className="w-7 h-7 fill-white drop-shadow-xs animate-pulse" />
              <div className="absolute inset-0 rounded-full border border-white/50"></div>
            </div>
            <span className="text-[#C71585] text-[11px] font-bold uppercase tracking-wider mt-2">
              Tap to open your surprise note
            </span>
          </div>

          <div className="relative z-10 bg-[#FFF0F5] px-4 py-2 rounded-xl shadow-xs border border-[#FFB6C1]/80">
            <p className="font-romantic text-xl font-bold text-[#FF1493]">
              To My Favorite Person 💕
            </p>
            <p className="font-handwritten text-sm text-[#C71585] font-bold">
              "Click to read what's in my heart..."
            </p>
          </div>
        </motion.div>
      ) : (
        /* Unfolded Heartfelt Letter */
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative bg-white rounded-2xl p-5 sm:p-7 shadow-lg border-2 border-[#FFB6C1] max-w-lg mx-auto overflow-hidden transform -rotate-0.5"
          style={{
            boxShadow: '0 15px 35px -8px rgba(255, 105, 180, 0.25)',
          }}
        >
          {/* Top Washi Tape */}
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 washi-tape-vibrant transform -rotate-1"></div>

          {/* Letter Header */}
          <div className="text-center pb-3 mb-4 border-b border-[#FFB6C1]/70">
            <span className="font-romantic text-2xl sm:text-3xl font-bold text-[#FF1493] block">
              My Secret Diary Note 💖
            </span>
            <span className="text-[11px] font-bold text-[#DB7093]">
              Written with all my love, just for you
            </span>
          </div>

          {/* Letter Body Content */}
          <div className="space-y-3 font-serif text-sm sm:text-base text-[#4A4A4A] leading-relaxed italic px-1">
            <p className="font-bold text-[#FF1493] not-italic text-base sm:text-lg font-romantic">
              My Dearest Sarah,
            </p>
            <p>
              Looking back at every single photo of us together reminds me of how truly blessed I am. From our quiet cafe dates and silly inside jokes to late-night car rides and warm cuddles, you have brought endless color and joy into my universe.
            </p>
            <p>
              You are my best friend, my safe place, and the brightest part of every day. No matter where life takes us, my hand will always be holding yours.
            </p>
            <p className="font-bold text-[#C71585] pt-1">
              Thank you for choosing me every single day. I love you to the moon and back! 🌙✨
            </p>
          </div>

          {/* Letter Signoff */}
          <div className="mt-5 pt-4 border-t border-[#FFB6C1]/70 flex items-center justify-between">
            <div>
              <p className="font-handwritten text-lg font-bold text-[#FF1493]">
                Forever & Always,
              </p>
              <p className="font-romantic text-sm font-bold text-[#C71585]">
                Your Number One Fan 💕
              </p>
            </div>
            <div className="text-2xl">
              💍✨
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};
