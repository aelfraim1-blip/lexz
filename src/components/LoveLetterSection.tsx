import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const LoveLetterSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#FF1493', '#FF69B4', '#FFD700', '#FBBF24', '#FFF0F5', '#FF85A2'],
    });
  };

  return (
    <section id="surprise-diary" className="pt-4 pb-12 px-2 sm:px-4 max-w-lg mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-md border border-[#FFB6C1] text-[#FF1493] text-[11px] font-extrabold tracking-wider uppercase mb-2.5">
          <Sparkles className="w-3 h-3 text-[#FF69B4]" />
          <span>The Final Page</span>
          <span className="text-yellow-500">🌻</span>
          <span>A Secret Note</span>
        </div>
        <h2 className="font-romantic text-2xl sm:text-3xl font-extrabold text-[#C71585] tracking-wide">
          A Little Note For You 💖
        </h2>
      </div>

      {/* Sealed Pink Envelope */}
      {!isOpen ? (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          onClick={handleOpenEnvelope}
          className="relative max-w-sm mx-auto bg-gradient-to-br from-[#FFF0F5] to-white border-2 border-[#FFB6C1] p-7 rounded-3xl shadow-xl cursor-pointer select-none text-center overflow-hidden group transform -rotate-1"
          style={{
            boxShadow: '0 16px 36px -10px rgba(255, 20, 147, 0.28)',
          }}
        >
          {/* Envelope Triangle Flap Styling */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-[#FFE4EC] border-b-2 border-[#FFB6C1] [clip-path:polygon(0_0,100%_0,50%_100%)] pointer-events-none"></div>

          {/* Decorative Corner Emojis */}
          <div className="absolute top-3 left-4 text-2xl animate-bounce">🌻</div>
          <div className="absolute top-3 right-4 text-2xl animate-pulse">☀️</div>

          {/* Central Wax Seal Button */}
          <div className="relative z-10 my-7 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#C71585] via-[#FF1493] to-[#FF69B4] shadow-lg border-2 border-white flex items-center justify-center text-white transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative">
              <Heart className="w-8 h-8 fill-white drop-shadow-md animate-pulse" />
              <div className="absolute inset-0 rounded-full border border-white/40"></div>
            </div>
            <span className="text-[#FF1493] text-[11px] font-extrabold tracking-widest uppercase mt-3 bg-white px-3 py-1 rounded-full shadow-xs border border-[#FFB6C1]">
              Tap to open envelope ✨
            </span>
          </div>

          <div className="relative z-10 bg-white/90 px-4 py-3 rounded-2xl border border-[#FFB6C1] shadow-xs">
            <p className="font-romantic text-lg text-[#C71585] font-bold">
              To My Favorite Person in the World
            </p>
          </div>
        </motion.div>
      ) : (
        /* Unfolded Heartfelt Letter */
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#FFB6C1] max-w-lg mx-auto overflow-hidden transform -rotate-0.5"
          style={{
            boxShadow: '0 20px 45px -12px rgba(255, 20, 147, 0.3)',
          }}
        >
          {/* Top Washi Tape Accent */}
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-32 h-5 washi-tape-pink transform -rotate-1 rounded-xs"></div>

          {/* Letter Header */}
          <div className="text-center pb-3 mb-4 border-b-2 border-[#FFE4EC]">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-2xl animate-bounce">🌻</span>
              <span className="font-romantic text-2xl sm:text-3xl text-[#C71585] font-extrabold">
                My Sunshine Letter
              </span>
              <span className="text-2xl animate-pulse">💖</span>
            </div>
            <span className="text-sm font-handwritten text-[#FF1493] font-bold">
              written with all my love, just for you ☀️
            </span>
          </div>

          {/* Letter Body Content */}
          <div className="space-y-4 font-handwritten text-lg sm:text-xl text-[#4A0E2E] leading-relaxed px-1">
            <p className="font-romantic text-2xl text-[#FF1493] font-bold">
              Lex,
            </p>
            <p>
              Hindi ko talaga alam kung paano kita pasasalamatan nang sapat para sa lahat ng ginawa at patuloy mong ginagawa para sa atin. Hindi ko rin inakala na aabot tayo sa ganito. Nagsimula lang tayo sa mga simpleng biruan, mga masasayang messages, at mga malalanding linya na akala ko lilipas lang. Pero ngayon, <span className="font-bold text-[#C71585] italic">tayo na</span>. Isang totoong magkasintahan. At sa totoo lang, minsan hindi pa rin ako makapaniwala na umabot tayo rito.
            </p>
            <p>
              Sobrang nagpapasalamat ako sa lahat ng maliliit na bagay na ginagawa mo para sa akin. Sa mga late-night meetups natin, sa mga panahong pinupuntahan mo ako para alagaan, sa mga pagkain na niluluto mo para sa akin, at siyempre, sa mga bulaklak na hanggang ngayon hindi ko pa rin mapigilang kiligin. Maaaring simple lang sa iba ang mga bagay na iyon, pero para sa akin, bawat isa ay may bigat at kahulugan. Doon ko nararamdaman kung gaano mo ako kamahal at kung gaano mo pinahahalagahan ang kung anong meron tayo.
            </p>
            <p>
              At higit sa lahat, kahit napakabigat ng buwang pinagdaraanan mo, pinipili mo pa ring manatili. Sa kabila ng pagod, problema, at mga araw na marahil gusto mo na lang munang mapag-isa, hindi mo hinahayaang mawala tayo. Patuloy mo pa ring pinipili ang <span className="font-bold text-[#C71585] italic">atin</span>. Hindi ko alam kung sapat ba ang salitang “salamat” para ipaliwanag kung gaano iyon kahalaga sa akin, pero salamat, baby. Salamat sa pananatili. Salamat sa pagpili sa akin, kahit hindi laging madali.
            </p>
            <p className="text-[#FF1493] font-bold pt-1">
              Mahal na mahal kita, baby. Buong puso, walang pag-aalinlangan. At kung bibigyan man ako ng pagkakataong balikan ang simula, iyong mga simpleng usapan, mga kalokohan, at mga malalanding linya na unti-unting naglapit sa atin, ikaw pa rin ang pipiliin ko. Sa pagkakataong ito, mas buong-buo at mas sigurado. ❤️
            </p>
          </div>

          {/* Letter Signoff */}
          <div className="mt-6 pt-4 border-t-2 border-[#FFE4EC] flex items-center justify-between">
            <div>
              <p className="font-romantic text-lg text-[#C71585] font-extrabold">
                Forever & Always,
              </p>
              <p className="font-handwritten text-base text-[#FF1493] font-bold">
                Your Number One Fan 💖
              </p>
            </div>
            <div className="text-2xl flex items-center gap-1">
              <span>🌻</span>
              <span>☀️</span>
              <span>💖</span>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};
