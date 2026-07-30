import styles from './TunesLogo.module.css';

interface TunesLogoProps {
  size?: 'md' | 'sm';
  className?: string;
}

export default function TunesLogo({ size = 'md', className }: TunesLogoProps) {
  const classes = [styles.logo, size === 'sm' && styles.sm, className].filter(Boolean).join(' ');

  return (
    <div className={ classes }>
      <svg className={ styles.logoIcon } viewBox="0 0 24 22" aria-hidden="true">
        <rect className={ styles.bar } x="1" y="9" width="3.2" height="6" rx="1.6" />
        <rect className={ styles.bar } x="7.2" y="4" width="3.2" height="16" rx="1.6" />
        <rect className={ styles.bar } x="13.4" y="0" width="3.2" height="22" rx="1.6" />
        <rect className={ styles.bar } x="19.6" y="6" width="3.2" height="10" rx="1.6" />
      </svg>
      <span className={ styles.logoText }>tunes</span>
    </div>
  );
}
