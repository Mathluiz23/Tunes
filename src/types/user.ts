export interface User {
  name: string;
  email: string;
  description: string;
  image: string;
}

export interface FavoriteTrack {
  trackId: number;
  trackName: string;
  artist: string;
  previewUrl: string;
  artwork: string;
  albumId?: number;
}
