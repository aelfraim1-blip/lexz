import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
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
    <section className="py-4 px-3 sm:px-4 max-w-md mx-auto">
      {/* Single Column Vertical Scroll: One Photobooth Picture at a Time */}
      <div className="flex flex-col space-y-8 sm:space-y-10 pb-8">
        {photos.map((photo, index) => {
          const isEven = index % 2 === 0;

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
              {/* Photobooth Frame - Clean, No Words/Captions */}
              <div
                className="w-full max-w-[320px] sm:max-w-[340px] bg-white p-3.5 pb-6 rounded-2xl shadow-md border border-[#FFB6C1]/60 transition-all duration-300 hover:shadow-xl hover:shadow-[#FF69B4]/20 relative cursor-pointer group"
                style={{
                  transform: `rotate(${isEven ? -0.8 : 0.8}deg)`,
                }}
              >
                {/* Photobooth Top Cutout Dots / Notch Accent */}
                <div className="flex justify-between items-center px-1 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFB6C1]/60"></div>
                  <div className="w-8 h-1 rounded-full bg-[#FFB6C1]/40"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFB6C1]/60"></div>
                </div>

                {/* Photo container */}
                <div className="relative w-full aspect-[3/4] bg-[#FFF0F5] rounded-lg overflow-hidden border border-[#FFB6C1]/40 shadow-inner">
                  <img
                    src={photo.url}
                    alt="Memory"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK_PHOTO;
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#FF1493]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Photobooth Bottom Footer Accents (Minimal aesthetic marks, no text) */}
                <div className="flex justify-between items-center px-1 pt-3.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFB6C1]/60"></div>
                  <div className="flex items-center gap-1.5 opacity-60">
                    <div className="w-1 h-1 rounded-full bg-[#FF69B4]"></div>
                    <div className="w-1 h-1 rounded-full bg-[#FF69B4]"></div>
                    <div className="w-1 h-1 rounded-full bg-[#FF69B4]"></div>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFB6C1]/60"></div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox / Zoom Modal - Clean, No Text */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm sm:max-w-md w-full bg-white rounded-2xl p-3 pb-5 shadow-2xl border border-[#FFB6C1] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-3 -right-3 z-30 w-8 h-8 rounded-full bg-white text-[#FF1493] flex items-center justify-center shadow-md transition-transform hover:scale-105 border border-[#FFB6C1]"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Prev / Next Buttons */}
              <button
                onClick={prevPhoto}
                className="absolute -left-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white text-[#FF1493] flex items-center justify-center shadow-md transition-transform hover:scale-105 border border-[#FFB6C1]"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextPhoto}
                className="absolute -right-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white text-[#FF1493] flex items-center justify-center shadow-md transition-transform hover:scale-105 border border-[#FFB6C1]"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Photobooth Photo Display */}
              <div className="w-full aspect-[3/4] bg-[#FFF0F5] rounded-lg overflow-hidden border border-[#FFB6C1]/40 flex items-center justify-center">
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

              {/* Photobooth Bottom Dots */}
              <div className="flex justify-between items-center px-1 pt-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFB6C1]/60"></div>
                <div className="flex items-center gap-1.5 opacity-60">
                  <div className="w-1 h-1 rounded-full bg-[#FF69B4]"></div>
                  <div className="w-1 h-1 rounded-full bg-[#FF69B4]"></div>
                  <div className="w-1 h-1 rounded-full bg-[#FF69B4]"></div>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFB6C1]/60"></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
