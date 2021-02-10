import styles from './Overlay.module.css';

export default function Overlay({children, ...props}) {

  return (
    <div className={styles.container} onClick={props.onClick}>
      {children}
    </div>
  );
}
