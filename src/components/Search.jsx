import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AlbumCard from './AlbumCard';
import '../styles/NotFound.css';

class Search extends Component {
  render() {
    const { albumsList, search } = this.props;
    if (albumsList.length === 0) {
      return (<h1 className="not-results">Nenhum álbum foi encontrado</h1>);
    }
    return (
      <div className="search-results">
        <h1>
          Resultado de álbuns de:
          { search }
        </h1>
        <div className="albumList">
          { albumsList.map((album) => (
            <AlbumCard key={ album.collectionId } album={ album } />
          ))}
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  albumsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  search: PropTypes.string.isRequired,
};
export default Search;
