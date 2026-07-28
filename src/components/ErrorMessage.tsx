import Button from './Button';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className={ styles.wrapper } role="alert">
      <p>{message}</p>
      {onRetry && (
        <Button variant="ghost" onClick={ onRetry }>
          Tentar novamente
        </Button>
      )}
    </div>
  );
}
