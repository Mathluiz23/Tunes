import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import userPattern from '../images/userPattern.png';
import styles from './ProfileEditPage.module.css';

const readAsBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result as string);
  reader.onerror = reject;
  reader.readAsDataURL(file);
});

export default function ProfileEditPage() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [description, setDescription] = useState(user?.description ?? '');
  const [image, setImage] = useState(user?.image ?? '');
  const [imageMode, setImageMode] = useState<'url' | 'upload'>('url');
  const [isSaving, setIsSaving] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const base64 = await readAsBase64(file);
    setImage(base64);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    await updateProfile({ name, email, description, image });
    navigate('/profile');
  };

  return (
    <div className={ styles.page }>
      <img src={ image || userPattern } alt="Foto de perfil" className={ styles.avatar } />

      <form className={ styles.form } onSubmit={ handleSubmit }>
        <label className={ styles.field } htmlFor="edit-input-name">
          Nome
          <input
            id="edit-input-name"
            type="text"
            value={ name }
            onChange={ (e) => setName(e.target.value) }
            required
          />
        </label>

        <label className={ styles.field } htmlFor="edit-input-email">
          Email
          <input
            id="edit-input-email"
            type="email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
            required
          />
        </label>

        <label className={ styles.field } htmlFor="edit-input-description">
          Descrição
          <textarea
            id="edit-input-description"
            value={ description }
            onChange={ (e) => setDescription(e.target.value) }
            rows={ 3 }
          />
        </label>

        <div className={ styles.field }>
          <span>Foto de perfil</span>
          <div className={ styles.segmented }>
            <button
              type="button"
              className={ imageMode === 'url' ? styles.segmentActive : styles.segment }
              onClick={ () => setImageMode('url') }
            >
              Link da imagem
            </button>
            <button
              type="button"
              className={ imageMode === 'upload' ? styles.segmentActive : styles.segment }
              onClick={ () => setImageMode('upload') }
            >
              Enviar arquivo
            </button>
          </div>

          {imageMode === 'url' ? (
            <input
              type="text"
              placeholder="https://..."
              value={ image.startsWith('data:') ? '' : image }
              onChange={ (e) => setImage(e.target.value) }
            />
          ) : (
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={ handleImageUpload }
            />
          )}
        </div>

        <Button type="submit" disabled={ isSaving }>
          {isSaving ? 'Salvando...' : 'Salvar'}
        </Button>
      </form>
    </div>
  );
}
