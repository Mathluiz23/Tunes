import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import userPattern from '../images/userPattern.png';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className={ styles.card }>
      <img src={ user.image || userPattern } alt="Foto de perfil" className={ styles.avatar } />
      <h1>{user.name}</h1>

      <dl className={ styles.details }>
        <div>
          <dt>Email</dt>
          <dd>{user.email || '—'}</dd>
        </div>
        <div>
          <dt>Descrição</dt>
          <dd>{user.description || '—'}</dd>
        </div>
      </dl>

      <Link to="/profile/edit">
        <Button variant="ghost">Editar perfil</Button>
      </Link>
    </div>
  );
}
