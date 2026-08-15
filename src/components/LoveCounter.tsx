import React, { useState, useEffect } from 'react';
import { Heart, Clock, Calendar, Sparkles, Smile, Star, Coffee } from 'lucide-react';

export const LoveCounter: React.FC = () => {
  // Default relationship start date (can be customized)
  const [startDate, setStartDate] = useState<string>('2024-02-14');
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeTogether({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <section className="py-8 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-xl border-4 border-[#FFB6C1] text-center relative overflow-hidden transform rotate-0.5">
        {/* Decorative Tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-36 h-6 washi-tape-vibrant transform rotate-1"></div>

        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#FFF0F5] text-[#C71585] text-xs font-bold rounded-full mb-3 border-2 border-[#FFB6C1]">
          <Clock className="w-3.5 h-3.5 text-[#FF69B4]" />
          <span>Every Second Counts</span>
        </div>

        <h3 className="font-romantic text-3xl sm:text-4xl font-bold text-[#FF1493] mb-1">
          Falling More In Love Every Second 💕
        </h3>
        <p className="font-handwritten text-xl text-[#DB7093] font-bold mb-6">
          "Time flies when I'm smiling with you, but forever is just getting started."
        </p>

        {/* Counter Blocks */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto mb-6">
          <div className="bg-[#FFF0F5] p-4 rounded-[1.5rem] border-2 border-[#FFB6C1] shadow-xs">
            <span className="font-heading text-3xl sm:text-4xl font-extrabold text-[#FF1493] block">
              {timeTogether.days}
            </span>
            <span className="text-xs font-bold text-[#C71585] uppercase tracking-wider">
              Days Together ☀️
            </span>
          </div>

          <div className="bg-[#FFF0F5] p-4 rounded-[1.5rem] border-2 border-[#FFB6C1] shadow-xs">
            <span className="font-heading text-3xl sm:text-4xl font-extrabold text-[#FF1493] block">
              {timeTogether.hours}
            </span>
            <span className="text-xs font-bold text-[#C71585] uppercase tracking-wider">
              Hours ⏰
            </span>
          </div>

          <div className="bg-[#FFF0F5] p-4 rounded-[1.5rem] border-2 border-[#FFB6C1] shadow-xs">
            <span className="font-heading text-3xl sm:text-4xl font-extrabold text-[#FF1493] block">
              {timeTogether.minutes}
            </span>
            <span className="text-xs font-bold text-[#C71585] uppercase tracking-wider">
              Minutes ✨
            </span>
          </div>

          <div className="bg-[#FFF0F5] p-4 rounded-[1.5rem] border-2 border-[#FFB6C1] shadow-xs">
            <span className="font-heading text-3xl sm:text-4xl font-extrabold text-[#FF69B4] block animate-pulse">
              {timeTogether.seconds}
            </span>
            <span className="text-xs font-bold text-[#C71585] uppercase tracking-wider">
              Seconds 💖
            </span>
          </div>
        </div>

        {/* Little fun couple stat pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-[#C71585]">
          <span className="bg-[#FFF0F5] px-3.5 py-1.5 rounded-full border border-[#FFB6C1] flex items-center gap-1 shadow-xs">
            ☕ 350+ Cafe Laughs
          </span>
          <span className="bg-[#FFF0F5] px-3.5 py-1.5 rounded-full border border-[#FFB6C1] flex items-center gap-1 shadow-xs">
            🌻 Unlimited Hugs Given
          </span>
          <span className="bg-[#FFF0F5] px-3.5 py-1.5 rounded-full border border-[#FFB6C1] flex items-center gap-1 shadow-xs">
            💋 10,000+ Kisses & Counting
          </span>
          <span className="bg-[#FFF0F5] px-3.5 py-1.5 rounded-full border border-[#FFB6C1] flex items-center gap-1 shadow-xs">
            💍 1 Forever Soulmate
          </span>
        </div>
      </div>
    </section>
  );
};
