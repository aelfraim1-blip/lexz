import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Heart, Sparkles } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);

  // Soft romantic music-box melody notes (frequencies in Hz)
  // Canon in D inspired romantic arpeggios
  const melodyNotes = [
    523.25, 659.25, 783.99, 1046.50, // C5, E5, G5, C6
    493.88, 587.33, 783.99, 987.77,  // B4, D5, G5, B5
    440.00, 523.25, 659.25, 880.00,  // A4, C5, E5, A5
    392.00, 493.88, 587.33, 783.99,  // G4, B4, D5, G5
    349.23, 440.00, 523.25, 698.46,  // F4, A4, C5, F5
    329.63, 392.00, 493.88, 659.25,  // E4, G4, B4, E5
    349.23, 440.00, 523.25, 698.46,  // F4, A4, C5, F5
    392.00, 493.88, 587.33, 783.99,  // G4, B4, D5, G5
  ];

  const playNote = (freq: number, timeOffset = 0) => {
    if (!audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Soft sine + triangle chime timbre (music box / celesta feel)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + timeOffset);

      // Gentle bell envelope
      gain.gain.setValueAtTime(0.001, ctx.currentTime + timeOffset);
      gain.gain.exponentialRampToValueAtTime(volume * 0.15, ctx.currentTime + timeOffset + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + timeOffset + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + timeOffset);
      osc.stop(ctx.currentTime + timeOffset + 1.3);
    } catch {
      // Ignore audio errors if context is interrupted
    }
  };

  const startMusicLoop = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    let noteIndex = 0;
    const interval = 380; // tempo ms

    const tick = () => {
      const freq = melodyNotes[noteIndex % melodyNotes.length];
      playNote(freq);
      
      // Random gentle sparkling harmony
      if (noteIndex % 4 === 0) {
        playNote(freq * 0.5, 0.08); // Lower octave bass chime
      }

      noteIndex++;
      timerRef.current = window.setTimeout(tick, interval);
    };

    tick();
  };

  const stopMusicLoop = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopMusicLoop();
      setIsPlaying(false);
    } else {
      startMusicLoop();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      stopMusicLoop();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div id="bg-music-controls" className="fixed bottom-4 right-4 z-40 flex items-center gap-1.5">
      <div className="bg-white/90 backdrop-blur-xs px-2.5 py-1.5 rounded-full shadow-md border border-[#FFB6C1] flex items-center gap-1.5 transition-all">
        <button
          id="music-toggle-btn"
          onClick={togglePlay}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide transition-all ${
            isPlaying
              ? 'bg-[#FF69B4] text-white shadow-xs'
              : 'bg-[#FFF0F5] text-[#C71585] hover:bg-[#FFD1DC]'
          }`}
          title={isPlaying ? 'Pause music' : 'Play soft music box melody'}
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5" />
              <span>Music On 🎵</span>
            </>
          ) : (
            <>
              <Music className="w-3.5 h-3.5" />
              <span>Music 💖</span>
            </>
          )}
        </button>

        {isPlaying && (
          <div className="flex items-center gap-1 pl-1 pr-0.5 border-l border-[#FFB6C1]/50">
            <Sparkles className="w-3 h-3 text-[#FF69B4]" />
            <input
              type="range"
              min="0.05"
              max="0.8"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-12 h-1 bg-[#FFB6C1] rounded-lg appearance-none cursor-pointer accent-[#FF69B4]"
              title="Volume"
            />
          </div>
        )}
      </div>
    </div>
  );
};
