import styles from '@/components/LoaderComponent/LoaderComponent.module.css';
import React from 'react';

export default function LoaderComponent() {
  return (
    <>
      {/*Cool loading animation*/}
      <div className={styles.loadingContainer}>
        <div className={styles.cube}>
          <div className={`${styles.side} ${styles.front}`}>⏳</div>
          <div className={`${styles.side} ${styles.back}`}>⏰</div>
          <div className={`${styles.side} ${styles.right}`}>⏱️</div>
          <div className={`${styles.side} ${styles.left}`}>💫</div>
          <div className={`${styles.side} ${styles.top}`}>🙃</div>
          <div className={`${styles.side} ${styles.bottom}`}>🤯</div>
        </div>
        <div className={styles.loadingText}>Loading...</div>
      </div>
    </>
  );
}