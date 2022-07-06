import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import '../styles/Profile.css';
import userPattern from '../images/userPattern.png';

class ProfilePage extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    this.setState({ loading: true });
    const { name, email, description, image } = await getUser();
    this.setState({ loading: false, name, email, description, image });
  }

  render() {
    const { name, email, description, image, loading } = this.state;
    return (
      loading ? (
        <Loading loading={ loading } />
      ) : (
        <div className="container-profile" data-testid="page-profile">
          <h1>Perfil</h1>
          <img
            data-testid="profile-image"
            className="profile-image"
            src={ image || userPattern }
            alt="Foto de perfil"
          />
          <div data-testid="profile-name" className="profile-name">
            <h3>Nome: </h3>
            { name }
          </div>
          <div data-testid="profile-email" className="profile-email">
            <h3>Email: </h3>
            { email }
          </div>
          <div data-testid="profile-description" className="profile-description">
            <h3>Descrição: </h3>
            <textarea>{ description }</textarea>
          </div>
          <Link to="/profile/edit">
            <button className="button-edit-perfil" type="button">
              Editar perfil
            </button>
          </Link>
        </div>
      )
    );
  }
}

export default ProfilePage;
