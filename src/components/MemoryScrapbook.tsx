import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { MemoryPhoto } from '../types';
import { FALLBACK_PHOTO, INITIAL_PHOTOS } from '../data/romanticContent';

interface MemoryScrapbookProps {
  photos?: MemoryPhoto[];
}

export const MemoryScrapbook: React.FC<MemoryScrapbookProps> = ({ photos = INITIAL_PHOTOS }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);

  const nextPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % photos.length;
    setSelectedPhoto(photos[nextIndex]);
  };

  const prevPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    setSelectedPhoto(photos[prevIndex]);
  };

  return (
    <section className="py-2 px-2 sm:px-4 max-w-sm sm:max-w-md mx-auto">
      {/* Single Column Vertical Scroll: Photobooth Strips */}
      <div className="flex flex-col space-y-8 sm:space-y-9 pb-8">
        {photos.map((photo, index) => {
          const isEven = index % 2 === 0;
          const emojiSticker = index % 3 === 0 ? '🌻' : index % 3 === 1 ? '💖' : '☀️';

          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="w-full flex justify-center"
              onClick={() => setSelectedPhoto(photo)}
            >
              {/* Photobooth Frame with Washi Tape and Cute Stickers */}
              <div
                className="w-full max-w-[315px] sm:max-w-[335px] bg-white p-4 pb-5 rounded-3xl shadow-lg border-2 border-[#FFB6C1] transition-all duration-300 hover:shadow-2xl hover:border-[#FF1493] hover:scale-[1.02] relative cursor-pointer group"
                style={{
                  transform: `rotate(${isEven ? -1 : 1}deg)`,
                  boxShadow: '0 12px 30px -8px rgba(255, 105, 180, 0.25)',
                }}
              >
                {/* Washi Tape Header */}
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-5 ${
                    isEven ? 'washi-tape-pink' : 'washi-tape-sunshine'
                  } rounded-xs transform ${isEven ? '-rotate-2' : 'rotate-2'}`}
                ></div>

                {/* Corner Cute Sticker */}
                <div className="absolute -bottom-2 -right-2 text-2xl transform rotate-12 drop-shadow-md group-hover:scale-125 transition-transform">
                  {emojiSticker}
                </div>

                {/* Photobooth Top Cutout Dots */}
                <div className="flex justify-between items-center px-1 pt-1 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#FFB6C1]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFD1DC]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#FFB6C1]"></div>
                </div>

                {/* Photo Container */}
                <div className="relative w-full aspect-[3/4] bg-[#FFF0F5] rounded-2xl overflow-hidden border-2 border-[#FFD1DC] shadow-inner">
                  <img
                    src={photo.url}
                    alt="Memory"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK_PHOTO;
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FF1493]/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Photobooth Bottom Footer */}
                <div className="flex justify-between items-center px-1 pt-3">
                  <div className="w-2 h-2 rounded-full bg-[#FFB6C1]"></div>
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-[#FF1493] fill-[#FF1493]" />
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[#FFB6C1]"></div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox / Zoom Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm sm:max-w-md w-full bg-white rounded-3xl p-4 pb-6 shadow-2xl border-4 border-[#FFB6C1] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-3.5 -right-3.5 z-30 w-8 h-8 rounded-full bg-[#FF1493] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 border-2 border-white"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Prev / Next Buttons */}
              <button
                onClick={prevPhoto}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white text-[#FF1493] flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 border-2 border-[#FFB6C1]"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextPhoto}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white text-[#FF1493] flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 border-2 border-[#FFB6C1]"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Photobooth Photo Display */}
              <div className="w-full aspect-[3/4] bg-[#FFF0F5] rounded-2xl overflow-hidden border-2 border-[#FFD1DC] flex items-center justify-center shadow-inner">
                <img
                  src={selectedPhoto.url}
                  alt="Memory"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_PHOTO;
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex justify-between items-center px-2 pt-3">
                <span className="text-xl">🌻</span>
                <Heart className="w-5 h-5 text-[#FF1493] fill-[#FF1493]" />
                <span className="text-xl">☀️</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
