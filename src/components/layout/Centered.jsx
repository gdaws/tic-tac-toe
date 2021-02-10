import styles from './Centered.module.css';

export default function Centered({children}) {

  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}
