import {
  createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode,
} from 'react';
import type { FavoriteTrack } from '../types/user';

interface PlayerContextValue {
  currentTrack: FavoriteTrack | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  hasNext: boolean;
  hasPrev: boolean;
  playTrack: (track: FavoriteTrack, queue?: FavoriteTrack[]) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrev: () => void;
  seek: (time: number) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [queue, setQueue] = useState<FavoriteTrack[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentTrack = currentIndex >= 0 ? queue[currentIndex] ?? null : null;

  const playTrack = useCallback((track: FavoriteTrack, trackQueue?: FavoriteTrack[]) => {
    const nextQueue = trackQueue ?? [track];
    const index = nextQueue.findIndex((item) => item.trackId === track.trackId);

    setQueue(nextQueue);
    setCurrentIndex(index === -1 ? 0 : index);
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current || !currentTrack) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying((prev) => !prev);
  }, [isPlaying, currentTrack]);

  const playNext = useCallback(() => {
    setCurrentIndex((index) => (index + 1 < queue.length ? index + 1 : index));
    setIsPlaying(true);
  }, [queue.length]);

  const playPrev = useCallback(() => {
    setCurrentIndex((index) => (index > 0 ? index - 1 : index));
    setIsPlaying(true);
  }, []);

  const seek = useCallback((time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setProgress(time);
  }, []);

  const value = useMemo<PlayerContextValue>(() => ({
    currentTrack,
    isPlaying,
    progress,
    duration,
    hasNext: currentIndex + 1 < queue.length,
    hasPrev: currentIndex > 0,
    playTrack,
    togglePlay,
    playNext,
    playPrev,
    seek,
    audioRef,
  }), [
    currentTrack, isPlaying, progress, duration, currentIndex, queue.length,
    playTrack, togglePlay, playNext, playPrev, seek,
  ]);

  return (
    <PlayerContext.Provider value={ value }>
      {children}
      <audio
        ref={ audioRef }
        src={ currentTrack?.previewUrl }
        autoPlay={ isPlaying }
        onTimeUpdate={ (e) => setProgress(e.currentTarget.currentTime) }
        onLoadedMetadata={ (e) => setDuration(e.currentTarget.duration) }
        onEnded={ playNext }
        onPause={ () => setIsPlaying(false) }
        onPlay={ () => setIsPlaying(true) }
      />
    </PlayerContext.Provider>
  );
}

export function usePlayer(): PlayerContextValue {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
