import type { FavoriteTrack } from '../types/user';

const FAVORITES_KEY = 'favorite_songs';
const SIMULATED_DELAY_MS = 200;

const readFavorites = (): FavoriteTrack[] => {
  const raw = localStorage.getItem(FAVORITES_KEY);
  return raw ? (JSON.parse(raw) as FavoriteTrack[]) : [];
};

const saveFavorites = (favorites: FavoriteTrack[]) => localStorage
  .setItem(FAVORITES_KEY, JSON.stringify(favorites));

const delay = <T>(value: T): Promise<T> => new Promise((resolve) => {
  setTimeout(() => resolve(value), SIMULATED_DELAY_MS);
});

export const getFavorites = (): Promise<FavoriteTrack[]> => delay(readFavorites());

export const addFavorite = (track: FavoriteTrack): Promise<FavoriteTrack[]> => {
  const favorites = readFavorites();
  const updated = [...favorites, track];
  saveFavorites(updated);
  return delay(updated);
};

export const removeFavorite = (trackId: number): Promise<FavoriteTrack[]> => {
  const favorites = readFavorites();
  const updated = favorites.filter((track) => track.trackId !== trackId);
  saveFavorites(updated);
  return delay(updated);
};
