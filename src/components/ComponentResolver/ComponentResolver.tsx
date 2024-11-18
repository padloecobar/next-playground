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
          <div className={styles.componentContainer}>
            <p className={styles.wiggle}>🎉 Loading funny stuff... 🎉</p>
            <div className={styles.bounce}>
              <p>🎉 🎉 🎉</p>
            </div>
          </div>
            }
              >
              {Component ? <Component entry={entry} /> : null}
            </Suspense>
          </>
          );
        }
