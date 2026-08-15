import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FloatingItem {
  id: number;
  emoji: string;
  left: number; // percentage
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  sway: number; // px sway amplitude
}

interface ClickParticle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export const FloatingDecorations: React.FC = () => {
  const [items, setItems] = useState<FloatingItem[]>([]);
  const [clickParticles, setClickParticles] = useState<ClickParticle[]>([]);

  // Subtle romantic emoji pool
  const cuteEmojis = ['🌻', '💖', '🌸', '✨', '🍓', '☀️', '🌷', '💕'];

  useEffect(() => {
    // Generate 10 subtle floating ambient items
    const initialItems: FloatingItem[] = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      emoji: cuteEmojis[i % cuteEmojis.length],
      left: Math.random() * 92 + 4, // 4% to 96%
      size: Math.floor(Math.random() * 8) + 14, // 14px - 22px
      duration: Math.random() * 6 + 12, // 12s - 18s
      delay: Math.random() * 4,
      sway: Math.random() * 30 - 15,
    }));
    setItems(initialItems);
  }, []);

  // Subtle click burst
  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.tagName === 'BUTTON') {
        return;
      }

      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      const randomEmojis = ['💖', '✨', '💕', '🌸'];
      const newParticle: ClickParticle = {
        id: Date.now() + Math.random(),
        x: clientX,
        y: clientY,
        emoji: randomEmojis[Math.floor(Math.random() * randomEmojis.length)],
      };

      setClickParticles((prev) => [...prev.slice(-6), newParticle]);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    if (clickParticles.length === 0) return;
    const timeout = setTimeout(() => {
      setClickParticles((prev) => prev.slice(1));
    }, 900);
    return () => clearTimeout(timeout);
  }, [clickParticles]);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
      {/* Delicate floating background emojis */}
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute select-none opacity-30 drop-shadow-xs"
          style={{
            left: `${item.left}%`,
            fontSize: `${item.size}px`,
            bottom: '-30px',
          }}
          animate={{
            y: [0, -window.innerHeight - 60],
            x: [0, item.sway, -item.sway, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0, 0.45, 0.45, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: 'linear',
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* Interactive Click Popups */}
      <AnimatePresence>
        {clickParticles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0.6, x: p.x - 10, y: p.y - 10 }}
            animate={{
              opacity: 0,
              scale: 1.2,
              y: p.y - 50 - Math.random() * 20,
              x: p.x + (Math.random() * 20 - 10),
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute select-none text-base font-bold"
          >
            {p.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
