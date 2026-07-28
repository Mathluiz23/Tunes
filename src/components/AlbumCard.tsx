import { Link } from 'react-router-dom';
import type { Album } from '../types/itunes';
import styles from './AlbumCard.module.css';

interface AlbumCardProps {
  album: Album;
}

export default function AlbumCard({ album }: AlbumCardProps) {
  const { collectionId, collectionName, artistName, artworkUrl100 } = album;

  return (
    <Link to={ `/album/${collectionId}` } className={ styles.card }>
      <img src={ artworkUrl100 } alt={ `Capa do álbum ${collectionName}` } className={ styles.artwork } />
      <p className={ `${styles.title} truncate` } title={ collectionName }>
        {collectionName}
      </p>
      <p className={ `${styles.artist} truncate` } title={ artistName }>
        {artistName}
      </p>
    </Link>
  );
}
