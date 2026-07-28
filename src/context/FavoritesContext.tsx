import {
  createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode,
} from 'react';
import { addFavorite, getFavorites, removeFavorite } from '../api/favoritesStorage';
import type { FavoriteTrack } from '../types/user';

interface FavoritesContextValue {
  favorites: FavoriteTrack[];
  isLoading: boolean;
  isFavorite: (trackId: number) => boolean;
  toggleFavorite: (track: FavoriteTrack) => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteTrack[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getFavorites().then((storedFavorites) => {
      setFavorites(storedFavorites);
      setIsLoading(false);
    });
  }, []);

  const isFavorite = useCallback(
    (trackId: number) => favorites.some((track) => track.trackId === trackId),
    [favorites],
  );

  const toggleFavorite = useCallback(async (track: FavoriteTrack) => {
    const alreadyFavorite = favorites.some((fav) => fav.trackId === track.trackId);
    const updated = alreadyFavorite
      ? await removeFavorite(track.trackId)
      : await addFavorite(track);
    setFavorites(updated);
  }, [favorites]);

  const value = useMemo<FavoritesContextValue>(() => ({
    favorites,
    isLoading,
    isFavorite,
    toggleFavorite,
  }), [favorites, isLoading, isFavorite, toggleFavorite]);

  return <FavoritesContext.Provider value={ value }>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
