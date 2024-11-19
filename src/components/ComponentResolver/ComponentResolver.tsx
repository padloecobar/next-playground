import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
import styles from './ComponentResolver.module.css';

type BasicProps = {
  __typename: string;
  sys: { id: string };
};

export function ComponentResolver({ entry }: { entry: BasicProps }) {
  const Component: React.ComponentType<{
    entry: BasicProps;
  }> = dynamic(() => import(`@/components/${entry.__typename}/ViewModel`));
  return (
    <>
      {/*<Suspense fallback={<div>Loading...</div>}>*/}
      <Suspense
        fallback={
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
        }
      >
        {Component ? <Component entry={entry} /> : null}
      </Suspense>
    </>
  );
}
