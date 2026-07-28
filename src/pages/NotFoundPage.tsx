import { Link } from 'react-router-dom';
import Button from '../components/Button';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={ styles.page }>
      <h1>404</h1>
      <p>Página não encontrada.</p>
      <Link to="/search">
        <Button variant="ghost">Voltar para a busca</Button>
      </Link>
    </div>
  );
}
