import styles from '../page.module.css';
import { fetchGraphQL } from '@/graphql/fetchGraphQL';
import {
  DemoPagesDocument,
  DemoPagesQuery,
  DemoPagesQueryVariables,
  Exact,
} from '@/graphql/__generated/graphql-operations';
import React, { Suspense } from 'react';
import LoaderComponent from '@/components/LoaderComponent/LoaderComponent';

export default async function Home() {
  const pages = await fetchGraphQL<DemoPagesQuery, DemoPagesQueryVariables>(
    DemoPagesDocument,
    { preview: false as boolean, delay: false as boolean } as Exact<{
      [key: string]: never;
    }> & {
      preview?: boolean;
      delay?: boolean;
    },
    { cache: 'force-cache' }
  );

  return (
    <div className={styles.pageListContainer}>
      <h1 className={styles.pageListTitle}>Explore Pages</h1>
      <ul className={styles.pageList}>
        <Suspense fallback={<LoaderComponent />}>
          {pages.demoPageCollection?.items.map((page: any) => (
            <li className={styles.pageListItem} key={page.sys.id}>
              <a className={styles.pageLink} href={`/ssr-cache-streaming-fast/${page.slug}`}>
                {`${page.slug} (${page.internalName})` }
              </a>
            </li>
          ))}
        </Suspense>
      </ul>
    </div>
  );
}