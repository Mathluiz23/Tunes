import { type FormEvent, useState } from 'react';
import { searchAlbums, type SearchMode } from '../api/itunes';
import { addSearchHistory, getSearchHistory } from '../api/searchHistory';
import { useAsync } from '../hooks/useAsync';
import AlbumCard from '../components/AlbumCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import Button from '../components/Button';
import styles from './SearchPage.module.css';

const MIN_QUERY_LENGTH = 2;

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<SearchMode>('artist');
  const [lastSearch, setLastSearch] = useState('');
  const [history, setHistory] = useState<string[]>(() => getSearchHistory());
  const { data: albums, loading, error, run } = useAsync(searchAlbums);

  const runSearch = (term: string, searchMode: SearchMode) => {
    if (term.length < MIN_QUERY_LENGTH) return;
    setLastSearch(term);
    run(term, searchMode);
    setHistory(addSearchHistory(term));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    runSearch(query, mode);
  };

  const handleHistoryClick = (term: string) => {
    setQuery(term);
    runSearch(term, mode);
  };

  return (
    <div className={ styles.page }>
      <form className={ styles.searchBar } onSubmit={ handleSubmit }>
        <input
          type="text"
          placeholder={ mode === 'artist' ? 'Nome do artista ou banda' : 'Nome do álbum' }
          value={ query }
          onChange={ (e) => setQuery(e.target.value) }
        />
        <Button type="submit" disabled={ query.length < MIN_QUERY_LENGTH }>
          Buscar
        </Button>
      </form>

      <div className={ styles.modeToggle } role="radiogroup" aria-label="Buscar por">
        <button
          type="button"
          role="radio"
          aria-checked={ mode === 'artist' }
          className={ `${styles.modeButton} ${mode === 'artist' ? styles.modeActive : ''}` }
          onClick={ () => setMode('artist') }
        >
          Artista
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={ mode === 'album' }
          className={ `${styles.modeButton} ${mode === 'album' ? styles.modeActive : ''}` }
          onClick={ () => setMode('album') }
        >
          Álbum
        </button>
      </div>

      {history.length > 0 && !loading && (
        <div className={ styles.history }>
          {history.map((term) => (
            <button
              key={ term }
              type="button"
              className={ styles.historyChip }
              onClick={ () => handleHistoryClick(term) }
            >
              {term}
            </button>
          ))}
        </div>
      )}

      {loading && <Loading />}
      {error && <ErrorMessage message={ error } onRetry={ () => run(lastSearch, mode) } />}

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
