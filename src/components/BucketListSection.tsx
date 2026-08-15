import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Circle, Plus, Sparkles, Heart, Compass, Coffee, Plane, Home, Trophy, Gift, Wand2, X } from 'lucide-react';
import { BucketListItem } from '../types';
import confetti from 'canvas-confetti';

interface BucketListSectionProps {
  initialItems: BucketListItem[];
}

export const BucketListSection: React.FC<BucketListSectionProps> = ({ initialItems }) => {
  const [items, setItems] = useState<BucketListItem[]>(initialItems);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<BucketListItem['category']>('Dates');
  const [newEmoji, setNewEmoji] = useState('💖');
  const [randomIdea, setRandomIdea] = useState<string | null>(null);

  const completedCount = items.filter((i) => i.completed).length;
  const progressPercent = Math.round((completedCount / items.length) * 100) || 0;

  const toggleItem = (id: string, e: React.MouseEvent) => {
    const item = items.find((i) => i.id === id);
    const willComplete = !item?.completed;

    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, completed: !i.completed } : i))
    );

    if (willComplete) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        },
        colors: ['#f472b6', '#fbbf24', '#34d399', '#fbcfe8'],
      });
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: BucketListItem = {
      id: `custom-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      completed: false,
      emoji: newEmoji,
    };

    setItems((prev) => [newItem, ...prev]);
    setNewTitle('');
    setIsAddModalOpen(false);

    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#fb7185', '#fbbf24'],
    });
  };

  const categories = ['All', 'Dates', 'Travel', 'Cozy', 'Food', 'Future'];

  const filteredItems = items.filter((i) => {
    if (activeCategory === 'All') return true;
    return i.category === activeCategory;
  });

  const surpriseDateIdeas = [
    '🍓 Midnight strawberry fondue & board games night!',
    '🎨 Blindfolded painting portraits of each other!',
    '🚗 Random road trip with no map—turn right whenever you see a yellow car!',
    '📸 Rent a disposable vintage camera and take 27 candid silly photos today!',
    '⛺ Indoor living room camping with s’mores and scary stories!',
    '🥐 Breakfast in bed cooked with love and cute fruit shapes!',
    '🎡 Carnival ferris wheel kiss right at the highest peak!',
  ];

  const pickRandomIdea = () => {
    const random = surpriseDateIdeas[Math.floor(Math.random() * surpriseDateIdeas.length)];
    setRandomIdea(random);
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.5 },
      colors: ['#fbbf24', '#f472b6'],
    });
  };

  return (
    <section id="bucketlist-section" className="py-12 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Container with scrapbook textured card */}
      <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-xl border-4 border-[#FFB6C1] relative overflow-hidden transform rotate-0.5">
        {/* Floating Top-Right Badge */}
        <div className="absolute -top-4 -right-4 bg-[#FF69B4] text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg border-2 border-white z-20">
          📝
        </div>

        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-diary-grid opacity-50 pointer-events-none"></div>

        {/* Header Tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-44 h-8 washi-tape-gold transform -rotate-1"></div>

        {/* Section Title */}
        <div className="text-center relative z-10 mb-8 pt-2">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#FFF0F5] text-[#C71585] text-xs font-bold rounded-full mb-3 border-2 border-[#FFB6C1]">
            <Compass className="w-3.5 h-3.5 text-[#FF69B4]" />
            <span>Our Lifetime Adventures</span>
          </div>

          <h2 className="font-romantic text-4xl sm:text-5xl font-bold text-[#FF1493] mb-2 flex items-center justify-center gap-2">
            Our Bucket List <span className="text-3xl">🌻</span>
          </h2>
          <p className="font-handwritten text-2xl text-[#DB7093] font-bold max-w-lg mx-auto">
            "All the crazy, cozy, and dreamy adventures we are going to do together!"
          </p>
        </div>

        {/* Progress Tracker Card */}
        <div className="relative z-10 bg-[#FFF0F5] rounded-2xl p-5 border-2 border-[#FFB6C1] shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[#FF69B4] text-white flex items-center justify-center font-bold text-sm shadow-md">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-[#C71585] text-base">
                  Adventure Progress
                </h4>
                <p className="text-xs text-[#DB7093] font-medium">
                  {completedCount} of {items.length} dreams fulfilled together ✨
                </p>
              </div>
            </div>

            <span className="text-xl font-bold text-[#FF1493] font-heading self-end sm:self-center">
              {progressPercent}% Complete
            </span>
          </div>

          {/* Progress Bar with heart */}
          <div className="w-full bg-[#FFD1DC] h-3.5 rounded-full overflow-hidden p-0.5 relative">
            <motion.div
              className="bg-gradient-to-r from-[#FF69B4] to-[#FF1493] h-full rounded-full transition-all duration-700 relative"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 text-xs">
                ✨
              </div>
            </motion.div>
          </div>
        </div>

        {/* Top Buttons: Surprise Idea Generator & Add New Item */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#FF69B4] text-white shadow-sm scale-105'
                    : 'bg-[#FFF0F5] text-[#C71585] hover:bg-[#FFD1DC] border border-[#FFB6C1]'
                }`}
              >
                {cat === 'All' && '🌟 All'}
                {cat === 'Dates' && '🍷 Dates'}
                {cat === 'Travel' && '✈️ Travel'}
                {cat === 'Cozy' && '☀️ Cozy'}
                {cat === 'Food' && '🍰 Food'}
                {cat === 'Future' && '💍 Future'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={pickRandomIdea}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFFACD] hover:bg-yellow-200 text-yellow-900 text-xs font-bold border border-yellow-300 transition-transform active:scale-95 shadow-xs"
              title="Pick a random cute date idea!"
            >
              <Wand2 className="w-3.5 h-3.5 text-yellow-600" />
              <span>Surprise Date Idea ✨</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FF69B4] hover:bg-[#FF1493] text-white text-xs font-bold shadow-md shadow-[#FF69B4]/30 hover:scale-105 active:scale-95 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Wish 💖</span>
            </button>
          </div>
        </div>

        {/* Random Idea Alert Banner */}
        <AnimatePresence>
          {randomIdea && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="relative z-10 bg-[#FFFACD] border-2 border-yellow-300 rounded-2xl p-4 mb-6 shadow-xs flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">✨</span>
                <div>
                  <h5 className="text-xs font-bold text-yellow-900 uppercase tracking-wider">
                    Tonight's Date Suggestion For Us:
                  </h5>
                  <p className="font-heading font-bold text-neutral-800 text-sm">
                    {randomIdea}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setRandomIdea(null)}
                className="text-yellow-800 hover:text-yellow-950 text-xs font-bold ml-2 p-1"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bucket List Items List */}
        <div className="relative z-10 space-y-3">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.04 }}
              onClick={(e) => toggleItem(item.id, e)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer select-none flex items-start justify-between gap-4 ${
                item.completed
                  ? 'bg-[#FFF0F5] border-[#FFB6C1] shadow-xs'
                  : 'bg-white hover:bg-[#FFF0F5]/80 border-[#FFB6C1] shadow-xs hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 flex-shrink-0">
                  {item.completed ? (
                    <div className="w-8 h-8 rounded-full border-2 border-[#FF69B4] flex items-center justify-center text-white bg-[#FF69B4] shadow-xs font-bold text-sm">
                      ✓
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full border-2 border-[#FFB6C1] flex items-center justify-center hover:border-[#FF69B4] transition-colors"></div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-lg">{item.emoji}</span>
                    <span
                      className={`font-heading text-lg transition-colors ${
                        item.completed
                          ? 'line-through text-[#DB7093] opacity-70'
                          : 'text-[#C71585] font-medium'
                      }`}
                    >
                      {item.title}
                    </span>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FFD1DC] text-[#C71585]">
                      {item.category}
                    </span>
                  </div>

                  {item.notes && (
                    <p className="font-handwritten text-lg text-[#DB7093] mt-1 pl-1">
                      💌 Note: "{item.notes}"
                    </p>
                  )}
                </div>
              </div>

              {item.completed && (
                <span className="flex-shrink-0 text-xs font-bold text-[#FF1493] bg-[#FFD1DC] px-3 py-1 rounded-full flex items-center gap-1">
                  <span>Done!</span> 💖
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add New Dream Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setIsAddModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-white rounded-[2rem] p-6 sm:p-8 shadow-2xl border-4 border-[#FFB6C1]"
            >
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 text-[#DB7093] hover:text-[#C71585]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-5">
                <span className="text-3xl">✨</span>
                <h3 className="font-heading text-2xl font-bold text-[#FF1493] mt-1">
                  Add to Our Bucket List
                </h3>
                <p className="text-xs text-[#DB7093]">
                  What dream do you want to accomplish with me next?
                </p>
              </div>

              <form onSubmit={handleAddItem} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#C71585] uppercase tracking-wider mb-1.5">
                    Our New Dream / Wish:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Picnic under the stars, trip to Paris..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-[#FFB6C1] focus:outline-none focus:ring-2 focus:ring-[#FF69B4] text-sm font-medium bg-[#FFF0F5]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#C71585] uppercase tracking-wider mb-1.5">
                      Category:
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as BucketListItem['category'])}
                      className="w-full px-3 py-2 rounded-xl border-2 border-[#FFB6C1] focus:outline-none focus:ring-2 focus:ring-[#FF69B4] text-sm font-medium bg-[#FFF0F5]"
                    >
                      <option value="Dates">🍷 Cute Dates</option>
                      <option value="Travel">✈️ Travel</option>
                      <option value="Cozy">☀️ Cozy Times</option>
                      <option value="Food">🍰 Food Craving</option>
                      <option value="Future">💍 Future Goals</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#C71585] uppercase tracking-wider mb-1.5">
                      Choose Emoji:
                    </label>
                    <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                      {['💖', '🌻', '🌸', '✈️', '🍓', '☀️', '🏖️', '💍', '🥐'].map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => setNewEmoji(emoji)}
                          className={`text-xl p-1 rounded-lg transition-transform ${
                            newEmoji === emoji ? 'bg-[#FFD1DC] scale-125' : 'hover:bg-[#FFF0F5]'
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#FF69B4] hover:bg-[#FF1493] text-white font-bold py-3 rounded-full shadow-lg shadow-[#FF69B4]/30 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Save to Our Diary ✨</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
