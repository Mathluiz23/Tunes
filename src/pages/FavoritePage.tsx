import { useFavorites } from '../context/FavoritesContext';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import styles from './FavoritePage.module.css';

export default function FavoritePage() {
  const { favorites, isLoading } = useFavorites();

  if (isLoading) return <Loading />;

  if (favorites.length === 0) {
    return <p className={ styles.empty }>Sua lista de favoritas está vazia.</p>;
  }

  return (
    <div className={ styles.list }>
      {favorites.map((track) => (
        <MusicCard key={ track.trackId } track={ track } queue={ favorites } />
      ))}
    </div>
  );
}
