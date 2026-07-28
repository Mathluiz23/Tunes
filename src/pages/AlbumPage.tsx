import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAlbumTracks } from '../api/itunes';
import { useAsync } from '../hooks/useAsync';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import styles from './AlbumPage.module.css';

export default function AlbumPage() {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error, run } = useAsync(getAlbumTracks);

  useEffect(() => {
    if (id) run(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={ error } onRetry={ () => id && run(id) } />;
  if (!data) return null;

  const { album, tracks } = data;

  return (
    <div className={ styles.page }>
      <div className={ styles.header }>
        <img
          src={ album.artworkUrl100 }
          alt={ `Capa do álbum ${album.collectionName}` }
          className={ styles.artwork }
        />
        <div>
          <h1 className="truncate" title={ album.collectionName }>{album.collectionName}</h1>
          <p className={ styles.artist }>{album.artistName}</p>
        </div>
      </div>

      <div className={ styles.tracklist }>
        {tracks.map((track) => (
          <MusicCard
            key={ track.trackId }
            track={ {
              trackId: track.trackId,
              trackName: track.trackName,
              artist: album.artistName,
              previewUrl: track.previewUrl,
              artwork: album.artworkUrl100,
            } }
          />
        ))}
      </div>
    </div>
  );
}
