import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FavoriteSong from './FavoriteSong';

class MusicCard extends Component {
  render() {
    const {
      trackName,
      artist,
      previewUrl, trackId, updateFavoritesList, artwork, favoritesPage } = this.props;
    return (
      <div className="music-card">
        { favoritesPage
          ? (
            <img
              src={ artwork }
              alt="Capa do álbum"
              className="favorites-album-artwork"
            />) : '' }
        <div className="music-card-name">
          <h4>{trackName}</h4>
        </div>

        <div className="audio-album">
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
        </div>
        <div>
          <FavoriteSong
            trackInfo={ { trackName,
              artist,
              previewUrl,
              trackId,
              artwork } }
            updateFavoritesList={ updateFavoritesList }
          />
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  artwork: PropTypes.string,
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  artist: PropTypes.string,
  updateFavoritesList: PropTypes.func,
  favoritesPage: PropTypes.bool,
};

MusicCard.defaultProps = {
  artwork: undefined,
  updateFavoritesList: null,
  artist: '',
  favoritesPage: false,
};
export default MusicCard;
