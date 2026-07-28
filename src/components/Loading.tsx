import styles from './Loading.module.css';

export default function Loading() {
  return (
    <div className={ styles.wrapper } role="status" aria-live="polite">
      <span className={ styles.spinner } />
      <span className="visually-hidden">Carregando...</span>
    </div>
  );
}
