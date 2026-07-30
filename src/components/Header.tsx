import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import userPattern from '../images/userPattern.png';
import TunesLogo from './TunesLogo';
import styles from './Header.module.css';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) => (
    isActive ? `${styles.link} ${styles.active}` : styles.link
  );

  return (
    <header className={ styles.header }>
      <NavLink to="/search" className={ styles.brand }>
        <TunesLogo size="sm" />
      </NavLink>
      <nav className={ styles.nav }>
        <NavLink to="/search" className={ navLinkClass }>Pesquisa</NavLink>
        <NavLink to="/favorites" className={ navLinkClass }>Favoritas</NavLink>
        <NavLink to="/profile" className={ navLinkClass }>Perfil</NavLink>
      </nav>
      <div className={ styles.userArea }>
        <img
          src={ user?.image || userPattern }
          alt="Foto de perfil"
          className={ styles.avatar }
        />
        <span className={ `${styles.userName} truncate` }>{user?.name}</span>
        <button type="button" className={ styles.logoutButton } onClick={ handleLogout }>
          Sair
        </button>
      </div>
    </header>
  );
}
