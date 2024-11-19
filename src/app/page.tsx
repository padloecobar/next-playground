import styles from './page.module.css';
import React, { Suspense } from 'react';
import LoaderComponent from '@/components/LoaderComponent/LoaderComponent';
import Link from 'next/link';

export default async function Home() {
  return (
    <div className={styles.pageListContainer}>
      <h1 className={styles.pageListTitle}>Explore Pages</h1>
      <ul className={styles.pageList}>
        <Suspense fallback={<LoaderComponent />}>
          <li className={styles.pageListItem}>
            <Link className={styles.pageLink} href={`/ssr-cache`}>SSR with Data Cache</Link>
            <Link
              className={styles.pageLink}
              href={`/ssr-cache-streaming`}
            >SSR STREAMING</Link>
            <Link className={styles.pageLink} href={`/isr`}>ISR (ON DEMAND REVALIDATION)</Link>
          </li>
        </Suspense>
      </ul>
    </div>
  );
}
