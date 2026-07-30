import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Loading from '../components/Loading';
import TunesLogo from '../components/TunesLogo';
import styles from './LoginPage.module.css';

const MIN_NAME_LENGTH = 3;

const readAsBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result as string);
  reader.onerror = reject;
  reader.readAsDataURL(file);
});

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const base64 = await readAsBase64(file);
    setImage(base64);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    await login({ name, email, image, description: '' });
    navigate('/search');
  };

  if (isSubmitting) {
    return <Loading />;
  }

  return (
    <div className={ styles.page }>
      <form className={ styles.card } onSubmit={ handleSubmit }>
        <TunesLogo className={ styles.logo } />

        <label className={ styles.field } htmlFor="login-name-input">
          Nome
          <input
            id="login-name-input"
            type="text"
            value={ name }
            onChange={ (e) => setName(e.target.value) }
            placeholder="Como podemos te chamar?"
            required
          />
        </label>

        <label className={ styles.field } htmlFor="login-email-input">
          Email
          <input
            id="login-email-input"
            type="email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
            placeholder="voce@email.com"
            required
          />
        </label>

        <label className={ styles.uploadField } htmlFor="login-image-input">
          {image ? (
            <img src={ image } alt="Pré-visualização" className={ styles.preview } />
          ) : (
            <span>Escolher foto de perfil</span>
          )}
          <input
            id="login-image-input"
            className="visually-hidden"
            type="file"
            accept="image/png, image/jpeg"
            onChange={ handleImageChange }
          />
        </label>

        <Button type="submit" disabled={ name.length < MIN_NAME_LENGTH }>
          Entrar
        </Button>
      </form>
    </div>
  );
}
