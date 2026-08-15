import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Upload, Check, RefreshCw, X, Image as ImageIcon, Github, HelpCircle, Download } from 'lucide-react';
import { MemoryPhoto } from '../types';

interface PhotoSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: MemoryPhoto[];
  onUpdatePhoto: (id: string, newUrl: string) => void;
  onResetPhotos: () => void;
}

export const PhotoSyncModal: React.FC<PhotoSyncModalProps> = ({
  isOpen,
  onClose,
  photos,
  onUpdatePhoto,
  onResetPhotos,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'github'>('upload');
  const [copiedText, setCopiedText] = useState(false);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleFileUpload = (photoId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUpdatePhoto(photoId, reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCopyGitCommand = () => {
    navigator.clipboard.writeText('public/photos/photo1.jpg ... photo8.jpg');
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-5 sm:p-6 max-w-lg w-full shadow-2xl border-4 border-[#FFB6C1] max-h-[90vh] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-pink-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#FFF0F5] flex items-center justify-center text-[#FF1493] border border-[#FFB6C1]">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-romantic text-xl font-bold text-[#C71585]">
                    Photo Manager & Vercel Sync
                  </h3>
                  <p className="text-xs text-gray-500 font-sans">
                    Keep your 8 memories saved for GitHub & Vercel
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-600 flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 pt-3 pb-2">
              <button
                onClick={() => setActiveTab('upload')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'upload'
                    ? 'bg-[#FF1493] text-white shadow-md'
                    : 'bg-pink-50 text-[#C71585] hover:bg-pink-100'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                Upload / Swap Photos
              </button>
              <button
                onClick={() => setActiveTab('github')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'github'
                    ? 'bg-[#FF1493] text-white shadow-md'
                    : 'bg-pink-50 text-[#C71585] hover:bg-pink-100'
                }`}
              >
                <Github className="w-3.5 h-3.5" />
                GitHub & Vercel Guide
              </button>
            </div>

            {/* Tab 1: Upload / Replace Grid */}
            {activeTab === 'upload' && (
              <div className="flex-1 overflow-y-auto pr-1 py-2 space-y-3">
                <p className="text-xs text-[#C71585] bg-[#FFF0F5] p-2.5 rounded-xl border border-[#FFD1DC] font-sans">
                  💡 <strong>Tip:</strong> Click any photo slot below to replace it with your image. Photos are saved instantly so they stay in your browser!
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {photos.map((photo, index) => {
                    const photoNum = index + 1;
                    return (
                      <div
                        key={photo.id}
                        onClick={() => fileInputRefs.current[photo.id]?.click()}
                        className="group relative bg-[#FFF0F5] rounded-2xl p-2 border-2 border-[#FFD1DC] hover:border-[#FF1493] transition-all cursor-pointer flex flex-col items-center"
                      >
                        <div className="w-full aspect-[3/4] rounded-xl overflow-hidden bg-pink-100 relative mb-1.5">
                          <img
                            src={photo.url}
                            alt={`Photo ${photoNum}`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                            <Upload className="w-5 h-5" />
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-[#C71585]">
                          Photo #{photoNum}
                        </span>
                        <span className="text-[9px] text-gray-400 font-mono">
                          photo{photoNum}.jpg
                        </span>

                        <input
                          type="file"
                          accept="image/*"
                          ref={(el) => (fileInputRefs.current[photo.id] = el)}
                          className="hidden"
                          onChange={(e) => handleFileUpload(photo.id, e)}
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <button
                    onClick={onResetPhotos}
                    className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Reset to Default Paths
                  </button>
                  <button
                    onClick={onClose}
                    className="px-4 py-1.5 bg-[#FF1493] text-white text-xs font-bold rounded-xl shadow hover:bg-[#D81B60] transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

            {/* Tab 2: GitHub & Vercel Guide */}
            {activeTab === 'github' && (
              <div className="flex-1 overflow-y-auto pr-1 py-2 space-y-3.5 text-xs text-gray-700 font-sans">
                <div className="bg-[#FFF0F5] p-3.5 rounded-2xl border border-[#FFD1DC]">
                  <h4 className="font-bold text-[#C71585] text-sm mb-1.5 flex items-center gap-1.5">
                    <span>🚀</span> How to Show Photos on Vercel
                  </h4>
                  <p className="leading-relaxed">
                    When pushing your repository to GitHub for deployment on Vercel, simply put your 8 photos inside the <strong>public/photos/</strong> folder.
                  </p>
                </div>

                <div className="space-y-2">
                  <h5 className="font-bold text-gray-800">Folder structure in your repository:</h5>
                  <div className="bg-gray-900 text-pink-200 p-3 rounded-xl font-mono text-[11px] space-y-1">
                    <div>📁 my-love-diary/</div>
                    <div className="pl-4">📁 public/</div>
                    <div className="pl-8">📁 photos/</div>
                    <div className="pl-12 text-green-300">📄 photo1.jpg  (Cover & Memory 1)</div>
                    <div className="pl-12 text-green-300">📄 photo2.jpg  (Memory 2)</div>
                    <div className="pl-12 text-green-300">📄 photo3.jpg  (Memory 3)</div>
                    <div className="pl-12 text-green-300">📄 photo4.jpg  (Memory 4)</div>
                    <div className="pl-12 text-green-300">📄 photo5.jpg  (Memory 5)</div>
                    <div className="pl-12 text-green-300">📄 photo6.jpg  (Memory 6)</div>
                    <div className="pl-12 text-green-300">📄 photo7.jpg  (Memory 7)</div>
                    <div className="pl-12 text-green-300">📄 photo8.jpg  (Memory 8)</div>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
                  <strong>✨ Why this works:</strong> Vite automatically serves anything in the <code className="bg-amber-100 px-1 py-0.5 rounded">public/</code> directory as static files. When deployed to Vercel, your images will load directly from <code className="bg-amber-100 px-1 py-0.5 rounded">https://your-domain.vercel.app/photos/photo1.jpg</code> with zero latency!
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={onClose}
                    className="px-5 py-2 bg-[#FF1493] text-white text-xs font-bold rounded-xl shadow hover:bg-[#D81B60] transition-colors"
                  >
                    Got It!
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
