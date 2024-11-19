import styles from '../page.module.css';
import { fetchGraphQL } from '@/graphql/fetchGraphQL';
import {
  DemoPagesDocument,
  DemoPagesQuery,
  DemoPagesQueryVariables,
  Exact,
} from '@/graphql/__generated/graphql-operations';
import React from 'react';

/* ISR ENABLER START */
export async function generateStaticParams() {
  const pages = await fetchGraphQL<DemoPagesQuery, DemoPagesQueryVariables>(
    DemoPagesDocument,
    {},
    {}
  );
  console.log('pages =', pages.demoPageCollection?.items);
  return pages.demoPageCollection?.items.map((page) => ({
    slug: String(page?.slug),
  }));
}

export const dynamic = 'force-static'
//export const dynamicParams = true;
/* ISR ENABLER END */

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
        {pages.demoPageCollection?.items.map((page: any) => (
          <li className={styles.pageListItem} key={page.sys.id}>
            <a className={styles.pageLink} href={`/isr/${page.slug}`}>
              {page.slug}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
