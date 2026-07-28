export interface Album {
  artistId: number;
  artistName: string;
  collectionId: number;
  collectionName: string;
  collectionPrice?: number;
  artworkUrl100: string;
  releaseDate: string;
  trackCount: number;
}

export interface Track {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName: string;
  previewUrl: string;
  artworkUrl100: string;
}
