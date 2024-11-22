import styles from '../page.module.css';
import { fetchGraphQL } from '@/graphql/fetchGraphQL';
import {
  DemoPagesDocument,
  DemoPagesQuery,
  DemoPagesQueryVariables,
} from '@/graphql/graphql';
import React, { Suspense } from 'react';
import LoaderComponent from '@/components/LoaderComponent/LoaderComponent';

export default async function Home() {
  const pages = await fetchGraphQL<DemoPagesQuery, DemoPagesQueryVariables>(
    DemoPagesDocument,
    {},
    {
      delay: true,
      cache: 'force-cache',
    }
  );

  return (
    <div className={styles.pageListContainer}>
      <h1 className={styles.pageListTitle}>Explore Pages</h1>
      <ul className={styles.pageList}>
        <Suspense fallback={<LoaderComponent />}>
          {pages.demoPageCollection?.items.map((page) => (
            <li className={styles.pageListItem} key={page.sys.id}>
              <a
                className={styles.pageLink}
                href={`/ssr-cache-streaming/${page.slug}`}
              >
                {`${page.slug} (${page.internalName})`}
              </a>
            </li>
          ))}
        </Suspense>
      </ul>
    </div>
  );
}
