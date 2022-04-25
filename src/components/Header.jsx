import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/Header.css';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    getUser()
      .then(({ name, image }) => {
        this.setState({
          userName: name, profilePicture: image, loading: false });
      });
  }

  render() {
    const { userName, profilePicture, loading } = this.state;
    return (
      <header data-testid="header-component" className="header-component">

        <Link
          to="/search"
          data-testid="link-to-search"
          className="link-to-search"
        >
          Pesquisa
        </Link>
        <Link
          to="/favorites"
          data-testid="link-to-favorites"
          className="link-to-favorites"
        >
          Favoritas
        </Link>
        <Link
          to="/profile"
          data-testid="link-to-profile"
          className="link-to-profile"
        >
          Perfil
        </Link>
        <div data-testid="header-user-name" className="header-user-name">
          { loading
            ? <Loading loading={ loading } />
            : (
              <div className="profile-container">
                <span className="user-name">{userName}</span>
                <img src={ profilePicture } alt="Foto de perfil" />
              </div>
            ) }
        </div>

      </header>
    );
  }
}

export default Header;
