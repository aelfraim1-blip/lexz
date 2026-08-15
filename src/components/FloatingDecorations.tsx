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

  // Bright pink heart, sunflower, sunshine and cute emojis
  const romanticEmojis = ['💖', '🌻', '☀️', '💖', '✨', '🌻', '☀️', '🎀', '🍓', '💕'];

  useEffect(() => {
    // Generate 12 bright and joyful floating ambient items
    const initialItems: FloatingItem[] = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      emoji: romanticEmojis[i % romanticEmojis.length],
      left: Math.random() * 92 + 4,
      size: Math.floor(Math.random() * 10) + 18,
      duration: Math.random() * 6 + 10,
      delay: Math.random() * 5,
      sway: Math.random() * 30 - 15,
    }));
    setItems(initialItems);
  }, []);

  // Interactive click burst spawning sunflowers, sunshines, and pink hearts!
  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'BUTTON'
      ) {
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

      const burstEmojis = ['💖', '🌻', '☀️', '✨', '💕', '💛'];
      const count = 3;
      const newParticles: ClickParticle[] = Array.from({ length: count }).map((_, idx) => ({
        id: Date.now() + Math.random() + idx,
        x: clientX + (Math.random() * 24 - 12),
        y: clientY + (Math.random() * 24 - 12),
        emoji: burstEmojis[Math.floor(Math.random() * burstEmojis.length)],
      }));

      setClickParticles((prev) => [...prev.slice(-10), ...newParticles]);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    if (clickParticles.length === 0) return;
    const timeout = setTimeout(() => {
      setClickParticles((prev) => prev.slice(3));
    }, 900);
    return () => clearTimeout(timeout);
  }, [clickParticles]);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
      {/* Delicate floating background elements */}
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute select-none drop-shadow-sm filter brightness-105"
          style={{
            left: `${item.left}%`,
            fontSize: `${item.size}px`,
            bottom: '-40px',
          }}
          animate={{
            y: [0, -window.innerHeight - 60],
            x: [0, item.sway, -item.sway, 0],
            rotate: [0, 20, -20, 0],
            opacity: [0, 0.75, 0.75, 0],
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
            initial={{ opacity: 1, scale: 0.6, x: p.x - 12, y: p.y - 12 }}
            animate={{
              opacity: 0,
              scale: 1.35,
              y: p.y - 65 - Math.random() * 25,
              x: p.x + (Math.random() * 40 - 20),
              rotate: Math.random() * 40 - 20,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="absolute select-none text-base sm:text-lg filter drop-shadow-md"
          >
            {p.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
