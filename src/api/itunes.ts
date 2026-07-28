import type { Album, Track } from '../types/itunes';

const ITUNES_BASE_URL = 'https://itunes.apple.com';

export class ItunesApiError extends Error {}

export const searchAlbums = async (artist: string): Promise<Album[]> => {
  const term = encodeURIComponent(artist);
  const url = `${ITUNES_BASE_URL}/search?entity=album&term=${term}&attribute=allArtistTerm`;

  let response: Response;
  try {
    response = await fetch(url);
  } catch {
    throw new ItunesApiError('Não foi possível conectar à API do iTunes.');
  }

  if (!response.ok) {
    throw new ItunesApiError('A busca de álbuns falhou. Tente novamente.');
  }

  const { results } = await response.json();
  return results as Album[];
};

interface AlbumWithTracks {
  album: Album;
  tracks: Track[];
}

export const getAlbumTracks = async (albumId: string): Promise<AlbumWithTracks> => {
  const url = `${ITUNES_BASE_URL}/lookup?id=${albumId}&entity=song`;

  let response: Response;
  try {
    response = await fetch(url);
  } catch {
    throw new ItunesApiError('Não foi possível conectar à API do iTunes.');
  }

  if (!response.ok) {
    throw new ItunesApiError('Não foi possível carregar este álbum. Tente novamente.');
  }

  const { results } = await response.json();
  const [album, ...rest] = results;

  if (!album) {
    throw new ItunesApiError('Álbum não encontrado.');
  }

  const tracks = rest.filter((item: { kind: string }) => item.kind === 'song') as Track[];

  return { album: album as Album, tracks };
};
