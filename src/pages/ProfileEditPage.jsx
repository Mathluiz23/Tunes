import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import '../styles/ProfileEdit.css';
import userPattern from '../images/userPattern.png';

class ProfileEditPage extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      currentImage: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    const profile = await getUser();
    const { name, email, description, image } = profile;
    this.setState({
      loading: false,
      name,
      email,
      description,
      image,
      currentImage: image });
  }

  handleSubmit = async () => {
    const { name, email, description, image } = this.state;
    this.setState({ loading: true });
    await updateUser({ name, email, description, image });
    this.setState({ loading: false });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    const MIN_NAME_LENTGH = 3;
    this.setState({
      [name]: value,
    });
    if (name === 'name') {
      this.setState({
        buttonDisabled: value.length < MIN_NAME_LENTGH,
      });
    }
  }

  getBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });

  imageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      this.getBase64(file).then((base64) => {
        this.setState({ image: base64 });
      });
    }
  };

  render() {
    const { name,
      email,
      description,
      image,
      currentImage,
      loading,
      buttonDisabled } = this.state;

    return (
      <div data-testid="page-profile-edit" className="page-profile-edit">
        <h1>Editar perfil</h1>
        <img
          className="profile-image"
          data-testid="profile-image"
          src={ currentImage }
          alt="Foto de perfil"
        />
        {loading ? (
          <Loading loading={ loading } />
        ) : (
          <form>
            <label htmlFor="edit-input-name">
              Nome:
              <input
                id="edit-input-name"
                data-testid="edit-input-name"
                name="name"
                type="text"
                value={ name }
                onChange={ this.handleChange }
                required
              />
            </label>
            <label htmlFor="edit-input-email">
              Email:
              <input
                id="edit-input-email"
                data-testid="edit-input-email"
                type="email"
                name="email"
                value={ email }
                onChange={ this.handleChange }
                required
              />
            </label>
            <label htmlFor="edit-input-description" className="edit-input-description">
              Descrição:
              <textarea
                id="edit-input-description"
                data-testid="edit-input-description"
                name="description"
                value={ description }
                onChange={ this.handleChange }
                required
              />
            </label>
            <label htmlFor="edit-input-image">
              Foto de Perfil:
              <input
                id="edit-input-image"
                data-testid="edit-input-image"
                type="text"
                placeholder="Link da imagem"
                name="image"
                value={ image || userPattern }
                onChange={ this.handleChange }
                required
              />
            </label>
            ou
            <label htmlFor="edit-input-image" className="edit-image-input-file">
              <input
                id="edit-image-input-file"
                data-testid="edit-image-input-file"
                type="file"
                name="image"
                accept="image/png, image/jpeg"
                onChange={ this.imageUpload }
              />
            </label>
            <Link to="/profile">
              <button
                type="submit"
                data-testid="edit-button-save"
                className="edit-button-save"
                onClick={ this.handleSubmit }
                disabled={ buttonDisabled }
              >
                Enviar
              </button>
            </Link>
          </form>
        )}
      </div>
    );
  }
}

export default ProfileEditPage;
