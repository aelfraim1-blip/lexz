import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Music, Heart, Sparkles, RotateCcw, Play, Pause, ChevronUp, ChevronDown, Disc3, Repeat, Repeat1, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// YouTube Video ID provided: https://www.youtube.com/watch?v=UBUfpxBiLSo
const YOUTUBE_VIDEO_ID = 'UBUfpxBiLSo';
const SONG_DURATION = 210; // in seconds, updated dynamically on playback

interface AudioPlayerProps {
  autoStart?: boolean;
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string | HTMLElement,
        config: {
          videoId: string;
          height?: string | number;
          width?: string | number;
          playerVars?: {
            autoplay?: number;
            start?: number;
            controls?: number;
            showinfo?: number;
            rel?: number;
            modestbranding?: number;
            playsinline?: number;
            enablejsapi?: number;
          };
          events?: {
            onReady?: (event: { target: YTPlayerInstance }) => void;
            onStateChange?: (event: { data: number; target: YTPlayerInstance }) => void;
            onError?: (event: { data: number }) => void;
          };
        }
      ) => YTPlayerInstance;
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  setVolume: (volume: number) => void;
  getVolume: () => number;
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
  destroy: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ autoStart = true }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(SONG_DURATION);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isLooping, setIsLooping] = useState(true);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const playerRef = useRef<YTPlayerInstance | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timeUpdateIntervalRef = useRef<number | null>(null);

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Synchronize time updates
  const startTimeTracker = useCallback(() => {
    if (timeUpdateIntervalRef.current) {
      clearInterval(timeUpdateIntervalRef.current);
    }
    timeUpdateIntervalRef.current = window.setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        try {
          const curr = playerRef.current.getCurrentTime();
          if (curr !== undefined && !isNaN(curr)) {
            setCurrentTime(curr);
          }
          const dur = playerRef.current.getDuration();
          if (dur && !isNaN(dur) && dur > 0) {
            setDuration(dur);
          }
        } catch {
          // ignore transient errors
        }
      }
    }, 300);
  }, []);

  const stopTimeTracker = useCallback(() => {
    if (timeUpdateIntervalRef.current) {
      clearInterval(timeUpdateIntervalRef.current);
      timeUpdateIntervalRef.current = null;
    }
  }, []);

  // Initialize YouTube IFrame API & Handle Auto-Play on Launch
  useEffect(() => {
    let isMounted = true;

    const initYouTubePlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      const playerElement = document.getElementById('yt-the-1975-player');
      if (!playerElement) return;

      try {
        const player = new window.YT.Player('yt-the-1975-player', {
          videoId: YOUTUBE_VIDEO_ID,
          height: '100%',
          width: '100%',
          playerVars: {
            autoplay: 1,
            start: 0,
            controls: 0,
            showinfo: 0,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            enablejsapi: 1,
          },
          events: {
            onReady: (event) => {
              if (!isMounted) return;
              playerRef.current = event.target;
              setIsPlayerReady(true);
              event.target.setVolume(volume * 100);
              const dur = event.target.getDuration();
              if (dur && !isNaN(dur) && dur > 0) {
                setDuration(dur);
              }

              if (autoStart) {
                try {
                  event.target.playVideo();
                  setIsPlaying(true);
                  startTimeTracker();
                } catch {
                  // user gesture will trigger it
                }
              }
            },
            onStateChange: (event) => {
              if (!isMounted) return;
              if (event.data === window.YT?.PlayerState.PLAYING) {
                setIsPlaying(true);
                startTimeTracker();
              } else if (
                event.data === window.YT?.PlayerState.PAUSED ||
                event.data === window.YT?.PlayerState.CUED ||
                event.data === window.YT?.PlayerState.UNSTARTED
              ) {
                setIsPlaying(false);
                stopTimeTracker();
              } else if (event.data === window.YT?.PlayerState.ENDED) {
                if (isLooping && playerRef.current) {
                  playerRef.current.seekTo(0, true);
                  playerRef.current.playVideo();
                } else {
                  setIsPlaying(false);
                  stopTimeTracker();
                }
              }
            },
          },
        });
        playerRef.current = player;
      } catch (err) {
        console.warn('YouTube Player initialization error:', err);
      }
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }

      window.onYouTubeIframeAPIReady = () => {
        if (isMounted) {
          initYouTubePlayer();
        }
      };
    } else {
      initYouTubePlayer();
    }

    return () => {
      isMounted = false;
      stopTimeTracker();
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try {
          playerRef.current.destroy();
        } catch {
          // ignore
        }
      }
    };
  }, [startTimeTracker, stopTimeTracker]);

  // Play / Pause Toggle
  const togglePlay = () => {
    if (!playerRef.current) return;

    try {
      if (isPlaying) {
        if (typeof playerRef.current.pauseVideo === 'function') {
          playerRef.current.pauseVideo();
        }
        setIsPlaying(false);
        stopTimeTracker();
      } else {
        if (typeof playerRef.current.seekTo === 'function' && currentTime >= duration - 2) {
          playerRef.current.seekTo(0, true);
        }
        if (typeof playerRef.current.playVideo === 'function') {
          playerRef.current.playVideo();
        }
        setIsPlaying(true);
        startTimeTracker();
      }
    } catch (e) {
      console.warn('Playback toggle error:', e);
    }
  };

  // Jump to specific timestamp
  const handleSeek = (seekTime: number) => {
    setCurrentTime(seekTime);
    if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
      try {
        playerRef.current.seekTo(seekTime, true);
        if (!isPlaying) {
          playerRef.current.playVideo();
          setIsPlaying(true);
        }
        startTimeTracker();
      } catch {
        // ignore
      }
    }
  };

  // Restart song from 0:00
  const restartSong = () => {
    handleSeek(0);
  };

  // Volume handler
  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (newVol > 0) setIsMuted(false);
    if (playerRef.current && typeof playerRef.current.setVolume === 'function') {
      try {
        playerRef.current.setVolume(newVol * 100);
      } catch {
        // ignore
      }
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      setIsMuted(false);
      playerRef.current.setVolume(volume * 100);
    } else {
      setIsMuted(true);
      playerRef.current.setVolume(0);
    }
  };

  return (
    <div id="standalone-the1975-audio-player" ref={containerRef} className="fixed bottom-4 right-4 z-40">
      {/* Hidden YouTube IFrame Audio Engine */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          showVideoModal
            ? 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md'
            : 'w-0.5 h-0.5 opacity-0 pointer-events-none absolute -top-96'
        }`}
      >
        {showVideoModal ? (
          <div className="relative w-full max-w-2xl bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-white/20">
            <div className="flex items-center justify-between px-4 py-3 bg-black/60 border-b border-white/10">
              <div className="flex items-center gap-2 text-white">
                <Video className="w-4 h-4 text-[#D48B97]" />
                <span className="text-xs font-bold uppercase tracking-wider">The 1975 • Real World Studios</span>
              </div>
              <button
                onClick={() => setShowVideoModal(false)}
                className="text-white/70 hover:text-white px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20 transition-colors"
              >
                Close ✕
              </button>
            </div>
            <div className="aspect-video w-full">
              <div id="yt-the-1975-player" className="w-full h-full" />
            </div>
          </div>
        ) : (
          <div id="yt-the-1975-player" className="w-full h-full" />
        )}
      </div>

      {/* Standalone Player Floating Widget */}
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45 }}
        className="flex flex-col items-end"
      >
        {/* Expanded Standalone Player Card */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="mb-2 w-76 sm:w-84 bg-gradient-to-b from-[#1C1618] via-[#161012] to-[#0F0B0C] text-[#FAF4F3] rounded-3xl p-4 shadow-2xl border border-[#8E4A56]/30 overflow-hidden relative"
              style={{
                boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.6), 0 0 20px 1px rgba(212, 139, 151, 0.08)',
              }}
            >
              {/* Subtle background grain */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none opacity-50"></div>

              {/* Card Header */}
              <div className="relative z-10 flex items-center justify-between pb-2.5 border-b border-stone-800/80">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF69B4] animate-ping"></span>
                  <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-pink-300">
                    Now Playing
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setShowVideoModal(true)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium bg-stone-800/80 hover:bg-stone-700 text-stone-300 transition-colors"
                    title="Watch Video"
                  >
                    <Video className="w-2.5 h-2.5 text-[#FF69B4]" />
                    <span>Video</span>
                  </button>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                    aria-label="Minimize player"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Centerpiece: The Album Cover Page with Rotating Vinyl Record */}
              <div className="relative z-10 my-3.5 flex items-center justify-center">
                <div className="relative flex items-center">
                  {/* Vinyl Record Disc */}
                  <motion.div
                    animate={{
                      x: isPlaying ? 34 : 10,
                      rotate: isPlaying ? 360 : 0,
                    }}
                    transition={{
                      x: { duration: 0.45, ease: 'easeOut' },
                      rotate: { duration: 6, repeat: isPlaying ? Infinity : 0, ease: 'linear' },
                    }}
                    className="w-32 h-32 rounded-full bg-gradient-to-tr from-neutral-950 via-stone-900 to-neutral-950 border-2 border-stone-800 flex items-center justify-center shadow-xl relative shrink-0"
                    style={{
                      backgroundImage: `
                        radial-gradient(circle at center, transparent 38%, rgba(255,255,255,0.05) 39%, transparent 40%),
                        radial-gradient(circle at center, transparent 54%, rgba(255,255,255,0.04) 55%, transparent 56%),
                        radial-gradient(circle at center, transparent 70%, rgba(255,255,255,0.04) 71%, transparent 72%)
                      `,
                    }}
                  >
                    {/* Vinyl Center Label */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-stone-200 to-stone-400 border border-stone-800 flex flex-col items-center justify-center p-1 text-center shadow-inner">
                      <span className="text-[6.5px] font-black tracking-tighter uppercase text-stone-900 leading-tight">
                        THE 1975
                      </span>
                      <span className="text-[5.5px] font-medium text-stone-700 italic truncate max-w-[42px]">
                        All I Need
                      </span>
                      <div className="w-1.5 h-1.5 rounded-full bg-black mt-0.5"></div>
                    </div>
                  </motion.div>

                  {/* Album Cover Page Card */}
                  <div
                    className="relative z-10 w-36 h-36 rounded-2xl overflow-hidden shadow-xl border border-stone-700 bg-stone-900 flex flex-col justify-between p-2.5 select-none"
                    style={{
                      background: 'linear-gradient(145deg, #1d1719 0%, #120e10 100%)',
                      boxShadow: '-4px 8px 20px rgba(0,0,0,0.7)',
                    }}
                  >
                    {/* Authentic Album Typography Header */}
                    <div className="flex items-start justify-between border-b border-stone-800 pb-1">
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-tight text-white leading-none">
                          THE 1975
                        </h4>
                        <p className="text-[6.5px] tracking-wider uppercase text-stone-400 font-mono mt-0.5">
                          BEING FUNNY IN A FOREIGN LANGUAGE
                        </p>
                      </div>
                      <span className="text-[6px] font-mono px-1 py-0.5 rounded bg-stone-800 text-[#E8BAC5] font-semibold border border-stone-700">
                        DH
                      </span>
                    </div>

                    {/* Monochrome artistic graphic */}
                    <div className="my-1 flex-1 rounded-lg bg-black/40 border border-stone-800/80 flex flex-col items-center justify-center relative overflow-hidden p-1.5 text-center">
                      <Disc3 className={`w-6 h-6 text-stone-300 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                      <span className="font-serif italic text-[11px] tracking-wide text-stone-200 mt-1">
                        "All I Need To Hear"
                      </span>
                    </div>

                    {/* Album Footer */}
                    <div className="flex items-center justify-between text-[6.5px] text-stone-400 font-mono pt-1 border-t border-stone-800">
                      <span>DH01449</span>
                      <span className="text-[#D48B97]">2022 EDITION</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Song Title & Artist Info */}
              <div className="relative z-10 text-center mb-2.5">
                <h3 className="font-semibold text-sm text-white tracking-tight flex items-center justify-center gap-1.5">
                  <span>All I Need To Hear</span>
                  <span className="text-xs text-[#FF69B4]">💖</span>
                </h3>
                <p className="text-[11px] text-stone-400 font-normal">
                  The 1975 • <span className="italic text-pink-200">Being Funny in a Foreign Language</span>
                </p>
              </div>

              {/* Progress Bar & Seek Slider */}
              <div className="relative z-10 space-y-1 mb-2.5">
                <input
                  type="range"
                  min="0"
                  max={duration || SONG_DURATION}
                  step="0.5"
                  value={currentTime}
                  onChange={(e) => handleSeek(parseFloat(e.target.value))}
                  className="w-full h-1 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[#FF1493]"
                />
                <div className="flex justify-between text-[9px] font-mono text-stone-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Primary Controls Row */}
              <div className="relative z-10 flex items-center justify-between pt-0.5">
                {/* Volume & Mute */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={toggleMute}
                    className="text-stone-400 hover:text-white transition-colors"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-3.5 h-3.5 text-stone-500" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-12 h-1 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[#FF1493]"
                  />
                </div>

                {/* Main Playback Buttons */}
                <div className="flex items-center gap-2">
                  {/* Restart */}
                  <button
                    onClick={restartSong}
                    className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                    title="Restart track"
                    aria-label="Restart"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>

                  {/* Play / Pause */}
                  <button
                    id="standalone-play-btn"
                    onClick={togglePlay}
                    className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#C71585] via-[#FF1493] to-[#FF69B4] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
                    aria-label={isPlaying ? 'Pause song' : 'Play song'}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 fill-white" />
                    ) : (
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    )}
                  </button>

                  {/* Repeat Mode */}
                  <button
                    onClick={() => setIsLooping(!isLooping)}
                    className={`p-1.5 rounded-full transition-colors ${
                      isLooping
                        ? 'text-[#FF69B4] bg-stone-800'
                        : 'text-stone-500 hover:text-stone-300'
                    }`}
                    title={isLooping ? 'Looping enabled' : 'Looping disabled'}
                    aria-label="Toggle loop"
                  >
                    {isLooping ? <Repeat1 className="w-3 h-3" /> : <Repeat className="w-3 h-3" />}
                  </button>
                </div>

                {/* Subtle Vinyl Tag */}
                <div className="text-[9px] font-mono text-[#FF69B4] bg-stone-800/80 px-2 py-0.5 rounded-full border border-stone-700/60 font-bold">
                  Vinyl 33
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Compact Romantic Music Floating Pill Button */}
        <div className="bg-[#1C1618]/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-xl border border-[#FF69B4]/40 flex items-center gap-2.5 transition-all text-white max-w-[92vw] sm:max-w-md">
          {/* Play / Pause Toggle Button */}
          <button
            id="music-toggle-btn"
            onClick={togglePlay}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide transition-all shrink-0 ${
              isPlaying
                ? 'bg-gradient-to-r from-[#FF1493] to-[#FF69B4] text-white shadow-xs'
                : 'bg-stone-800 text-stone-200 hover:bg-stone-700'
            }`}
            title={isPlaying ? 'Pause song' : 'Play "All I Need to Hear" - The 1975'}
          >
            {isPlaying ? (
              <>
                <Disc3 className="w-3 h-3 animate-spin" />
                <span>Playing</span>
              </>
            ) : (
              <>
                <Music className="w-3 h-3 text-[#FF69B4]" />
                <span>Play</span>
              </>
            )}
          </button>

          {/* Song Info Bar */}
          <div
            onClick={() => setIsExpanded(true)}
            className="flex-1 cursor-pointer overflow-hidden text-left min-w-0 pr-1"
            title="Click to open standalone cover player"
          >
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-[11px] font-medium text-white truncate">
                All I Need To Hear
              </span>
              <span className="text-[10px] text-pink-300 truncate">
                • The 1975
              </span>
            </div>
          </div>

          {/* Expand/Collapse details button */}
          <button
            id="expand-player-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 pl-1.5 pr-1 py-0.5 text-[10px] font-bold text-[#FFB6C1] hover:text-white transition-colors border-l border-stone-800 shrink-0"
            title={isExpanded ? 'Collapse player' : 'Expand album cover player'}
          >
            <span>{isExpanded ? 'Hide' : 'Cover'}</span>
            {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
