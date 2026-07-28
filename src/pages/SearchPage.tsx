import { type FormEvent, useState } from 'react';
import { searchAlbums } from '../api/itunes';
import { useAsync } from '../hooks/useAsync';
import AlbumCard from '../components/AlbumCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import Button from '../components/Button';
import styles from './SearchPage.module.css';

const MIN_QUERY_LENGTH = 2;

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [lastSearch, setLastSearch] = useState('');
  const { data: albums, loading, error, run } = useAsync(searchAlbums);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (query.length < MIN_QUERY_LENGTH) return;
    setLastSearch(query);
    run(query);
  };

  return (
    <div className={ styles.page }>
      <form className={ styles.searchBar } onSubmit={ handleSubmit }>
        <input
          type="text"
          placeholder="Nome do artista ou banda"
          value={ query }
          onChange={ (e) => setQuery(e.target.value) }
        />
        <Button type="submit" disabled={ query.length < MIN_QUERY_LENGTH }>
          Buscar
        </Button>
      </form>

      {loading && <Loading />}
      {error && <ErrorMessage message={ error } onRetry={ () => run(lastSearch) } />}

      {albums && !loading && !error && (
        albums.length === 0 ? (
          <p className={ styles.empty }>Nenhum álbum foi encontrado para &ldquo;{lastSearch}&rdquo;.</p>
        ) : (
          <>
            <p className={ styles.resultsLabel }>
              Resultados para &ldquo;{lastSearch}&rdquo;
            </p>
            <div className={ styles.grid }>
              {albums.map((album) => (
                <AlbumCard key={ album.collectionId } album={ album } />
              ))}
            </div>
          </>
        )
      )}
    </div>
  );
}
