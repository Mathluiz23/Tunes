import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const MAX_CHARACTERS = 45;
const OK_CHARACTERS = 20;

class AlbumCard extends Component {
  render() {
    const {
      album: { collectionId, collectionName, artistName, artworkUrl100 },
    } = this.props;

    return (
      <div data-testid="album-card" className="album-card">
        <p className="album-artist-name">
          { artistName.length < OK_CHARACTERS
            ? artistName
            : `${artistName.substr(0, MAX_CHARACTERS)}...`}
        </p>
        <Link
          to={ `album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <img
            src={ artworkUrl100 }
            alt="Capa do álbum"
            className="album-artwork"
          />
          <p className="album-title">
            { collectionName.length < OK_CHARACTERS
              ? artistName
              : `${artistName.substr(0, MAX_CHARACTERS)}...` }
          </p>
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    collectionName: PropTypes.string,
    artistName: PropTypes.string,
    collectionId: PropTypes.number,
    artworkUrl100: PropTypes.string,
  }).isRequired,
};

export default AlbumCard;
