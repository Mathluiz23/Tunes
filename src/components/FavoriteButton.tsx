import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useFavorites } from '../context/FavoritesContext';
import type { FavoriteTrack } from '../types/user';
import styles from './FavoriteButton.module.css';

interface FavoriteButtonProps {
  track: FavoriteTrack;
}

export default function FavoriteButton({ track }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(track.trackId);

  return (
    <button
      type="button"
      className={ styles.button }
      onClick={ () => toggleFavorite(track) }
      aria-pressed={ favorite }
      aria-label={ favorite ? `Remover ${track.trackName} das favoritas` : `Adicionar ${track.trackName} às favoritas` }
    >
      {favorite ? <FaHeart className={ styles.filled } /> : <FaRegHeart />}
    </button>
  );
}
