import React, { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import '../styles/Favorites.css';

class FavoritePage extends Component {
  constructor() {
    super();

    this.state = {
      favoriteSongsList: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getFavoriteSongsList();
  }

  getFavoriteSongsList = async () => {
    this.setState({ loading: true });
    const favoriteSongsList = await getFavoriteSongs();
    this.setState({ favoriteSongsList, loading: false });
  }

  updateFavoritesList = () => {
    this.getFavoriteSongsList();
  }

  render() {
    const { favoriteSongsList, loading } = this.state;
    return (
      loading
        ? <Loading loading={ loading } />
        : (
          <div data-testid="page-favorites">
            <div className="favorite-songs-list">
              { favoriteSongsList.length ? favoriteSongsList.map(
                ({ trackName, artist, previewUrl, trackId, artwork }) => (
                  <MusicCard
                    key={ trackId }
                    favoritesPage
                    artwork={ artwork }
                    artist={ artist }
                    trackName={ trackName }
                    previewUrl={ previewUrl }
                    trackId={ trackId }
                    updateFavoritesList={ this.updateFavoritesList }
                  />
                ),
              ) : (<h2>Sua lista de favoritas está vazia.</h2>) }
            </div>
          </div>)
    );
  }
}

export default FavoritePage;
