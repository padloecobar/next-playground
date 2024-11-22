import styles from '../page.module.css';
import { fetchGraphQL } from '@/graphql/fetchGraphQL';
import {
  DemoPagesDocument,
  DemoPagesQuery,
  DemoPagesQueryVariables,
} from '@/graphql/graphql';
import React from 'react';

export default async function Home() {
  const pages = await fetchGraphQL<DemoPagesQuery, DemoPagesQueryVariables>(
    DemoPagesDocument,
    {},
    {
      preview: false,
      delay: false,
    }
  );
  return (
    <div className={styles.pageListContainer}>
      <h1 className={styles.pageListTitle}>Explore Pages</h1>
      <ul className={styles.pageList}>
        {pages.demoPageCollection?.items.map((page) => (
          <li className={styles.pageListItem} key={page.sys.id}>
            <a className={styles.pageLink} href={`/ssr-cache/${page.slug}`}>
              {`${page.slug} (${page.internalName})`}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
