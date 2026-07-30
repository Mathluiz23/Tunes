import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaLink } from 'react-icons/fa';
import { getAlbumTracks } from '../api/itunes';
import { useAsync } from '../hooks/useAsync';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import styles from './AlbumPage.module.css';

const COPIED_FEEDBACK_MS = 2000;

export default function AlbumPage() {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error, run } = useAsync(getAlbumTracks);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS);
  };

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
        <div className={ styles.headerInfo }>
          <h1 className="truncate" title={ album.collectionName }>{album.collectionName}</h1>
          <p className={ styles.artist }>{album.artistName}</p>
          <p className={ styles.meta }>
            {[
              album.releaseDate && new Date(album.releaseDate).getFullYear(),
              album.primaryGenreName,
              `${album.trackCount} faixas`,
            ].filter(Boolean).join(' · ')}
          </p>
        </div>
        <button type="button" className={ styles.shareButton } onClick={ handleShare }>
          <FaLink />
          {copied ? 'Link copiado!' : 'Compartilhar'}
        </button>
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
              albumId: album.collectionId,
            } }
            queue={ tracks.map((t) => ({
              trackId: t.trackId,
              trackName: t.trackName,
              artist: album.artistName,
              previewUrl: t.previewUrl,
              artwork: album.artworkUrl100,
              albumId: album.collectionId,
            })) }
          />
        ))}
      </div>
    </div>
  );
}
