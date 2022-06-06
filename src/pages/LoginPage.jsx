import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { GiMusicalNotes } from 'react-icons/gi';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../styles/Login.css';
import logotunes from '../images/logotunes.png';

class LoginPage extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      buttonDisabled: true,
      loading: false,
    };
  }

  handleClick = (handleSubmit) => {
    const { name, email, description, image } = this.state;
    this.setState({ loading: true });
    createUser({ name, email, description, image }).then(() => {
      // this.setState({ loading: false });
      handleSubmit();
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    console.log(name);
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
    this.getBase64(file).then((base64) => {
      this.setState({ image: base64 });
    });
  };

  render() {
    const { name, email, loading, buttonDisabled } = this.state;
    const { handleSubmit } = this.props;
    return (
      <div data-testid="page-login" className="page-login">
        {loading ? (
          <Loading loading={ loading } />
        ) : (
          <div className="container-login">

            <img className="logotunes" alt="logo" src={ logotunes } />

            <form>
              <label htmlFor="login-name-input">
                Nome:
                <input
                  id="login-name-input"
                  data-testid="login-name-input"
                  className="login-name-input"
                  name="name"
                  type="text"
                  value={ name }
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="login-email-input">
                Email:
                <input
                  id="login-email-input"
                  data-testid="login-email-input"
                  className="login-email-input"
                  type="email"
                  name="email"
                  value={ email }
                  onChange={ this.handleChange }
                />
              </label>
              {/* <label
                htmlFor="login-description-input"
                className="login-description-input"
              >
                Descrição:
                <textarea
                  id="login-description-input"
                  data-testid="login-description-input"
                  name="description"
                  value={ description }
                  // na linha 61 excluída
                  onChange={ this.handleChange }
                />
              </label> */}
              <label htmlFor="login-image-input">
                Foto de Perfil:
                <label htmlFor="login-image-input" className="upload-image-button">

                  <input
                    id="login-image-input"
                    className="login-image-input"
                    data-testid="login-image-input"
                    type="file"
                    name="image"
                    accept="image/png, image/jpeg"
                    onChange={ this.imageUpload }
                  />
                </label>
              </label>
              <button
                type="submit"
                data-testid="login-submit-button"
                className="button-entrar"
                onClick={ () => {
                  this.handleClick(handleSubmit);
                } }
                disabled={ buttonDisabled }
              >
                Entrar
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

LoginPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default LoginPage;
