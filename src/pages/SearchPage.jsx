import React, { Component } from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Search from '../components/Search';
import Loading from '../components/Loading';
import '../styles/Search.css';

class SearchPage extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
      lastestSearch: '',
      buttonDisabled: true,
      loading: false,
      albumsList: null,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    const MIN_QUERY_LENTGH = 2;
    this.setState({
      [name]: value,
      buttonDisabled: value.length < MIN_QUERY_LENTGH,
      albumsList: null,
    });
  }

  onSubmit = async () => {
    const { search } = this.state;
    this.setState({ loading: true });
    const results = await searchAlbumsAPI(search);
    this.setState({
      albumsList: results, loading: false, lastestSearch: search, search: '',
    });
  };

  render() {
    const { search, buttonDisabled, albumsList, loading, lastestSearch } = this.state;
    return (
      <div data-testid="page-search">
        <form>
          <div className="page-search">
            <div className="search-div">
              <input
                data-testid="search-artist-input"
                className="search-artist-input"
                type="text"
                placeholder="Nome do Artista ou Banda"
                name="search"
                value={ search }
                onChange={ this.handleChange }
              />
              <button
                type="button"
                onClick={ this.onSubmit }
                data-testid="search-artist-button"
                disabled={ buttonDisabled }
              >
                Procurar
              </button>
            </div>
          </div>
        </form>
        <Loading loading={ loading } />
        { albumsList
          ? <Search search={ lastestSearch } albumsList={ albumsList } />
          : '' }
      </div>
    );
  }
}

export default SearchPage;
