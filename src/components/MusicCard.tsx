import { FaPause, FaPlay } from 'react-icons/fa';
import FavoriteButton from './FavoriteButton';
import { usePlayer } from '../context/PlayerContext';
import type { FavoriteTrack } from '../types/user';
import styles from './MusicCard.module.css';

interface MusicCardProps {
  track: FavoriteTrack;
  queue?: FavoriteTrack[];
}

export default function MusicCard({ track, queue }: MusicCardProps) {
  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayer();
  const isCurrent = currentTrack?.trackId === track.trackId;

  const handlePlayClick = () => {
    if (isCurrent) {
      togglePlay();
    } else {
      playTrack(track, queue);
    }
  };

  return (
    <div className={ `${styles.card} ${isCurrent ? styles.active : ''}` }>
      {track.artwork && (
        <img src={ track.artwork } alt="" className={ styles.artwork } />
      )}
      <div className={ styles.info }>
        <p className={ `${styles.trackName} truncate` } title={ track.trackName }>
          {track.trackName}
        </p>
        <p className={ `${styles.artist} truncate` }>{track.artist}</p>
      </div>
      <button
        type="button"
        className={ styles.playButton }
        onClick={ handlePlayClick }
        aria-label={ isCurrent && isPlaying ? `Pausar ${track.trackName}` : `Tocar ${track.trackName}` }
      >
        {isCurrent && isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <FavoriteButton track={ track } />
    </div>
  );
}
