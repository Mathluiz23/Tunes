import FavoriteButton from './FavoriteButton';
import type { FavoriteTrack } from '../types/user';
import styles from './MusicCard.module.css';

interface MusicCardProps {
  track: FavoriteTrack;
}

export default function MusicCard({ track }: MusicCardProps) {
  return (
    <div className={ styles.card }>
      {track.artwork && (
        <img src={ track.artwork } alt="" className={ styles.artwork } />
      )}
      <div className={ styles.info }>
        <p className={ `${styles.trackName} truncate` } title={ track.trackName }>
          {track.trackName}
        </p>
        <audio className={ styles.audio } src={ track.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento de áudio.
        </audio>
      </div>
      <FavoriteButton track={ track } />
    </div>
  );
}
