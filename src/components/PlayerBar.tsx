import { FaPause, FaPlay, FaStepBackward, FaStepForward } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';
import styles from './PlayerBar.module.css';

const formatTime = (seconds: number): string => {
  if (!Number.isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
};

export default function PlayerBar() {
  const {
    currentTrack, isPlaying, progress, duration, hasNext, hasPrev,
    togglePlay, playNext, playPrev, seek,
  } = usePlayer();

  if (!currentTrack) return null;

  const trackInfo = (
    <>
      {currentTrack.artwork && (
        <img src={ currentTrack.artwork } alt="" className={ styles.artwork } />
      )}
      <div className={ styles.info }>
        <p className={ `${styles.trackName} truncate` } title={ currentTrack.trackName }>
          {currentTrack.trackName}
        </p>
        <p className={ `${styles.artist} truncate` }>{currentTrack.artist}</p>
      </div>
    </>
  );

  return (
    <div className={ styles.bar }>
      {currentTrack.albumId ? (
        <Link
          to={ `/album/${currentTrack.albumId}` }
          className={ `${styles.track} ${styles.trackLink}` }
          title="Ir para o álbum"
        >
          {trackInfo}
        </Link>
      ) : (
        <div className={ styles.track }>{trackInfo}</div>
      )}

      <div className={ styles.controls }>
        <div className={ styles.buttons }>
          <button
            type="button"
            className={ styles.iconButton }
            onClick={ playPrev }
            disabled={ !hasPrev }
            aria-label="Faixa anterior"
          >
            <FaStepBackward />
          </button>
          <button
            type="button"
            className={ styles.playButton }
            onClick={ togglePlay }
            aria-label={ isPlaying ? 'Pausar' : 'Tocar' }
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button
            type="button"
            className={ styles.iconButton }
            onClick={ playNext }
            disabled={ !hasNext }
            aria-label="Próxima faixa"
          >
            <FaStepForward />
          </button>
        </div>

        <div className={ styles.progressRow }>
          <span className={ styles.time }>{formatTime(progress)}</span>
          <input
            type="range"
            className={ styles.progress }
            min={ 0 }
            max={ duration || 0 }
            value={ progress }
            onChange={ (e) => seek(Number(e.target.value)) }
            aria-label="Progresso da faixa"
          />
          <span className={ styles.time }>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
