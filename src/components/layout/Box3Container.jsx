import styles from './Box3Container.module.css';

export default function Box3Container({children}) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}
