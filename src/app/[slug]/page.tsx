import styles from './page.module.css';
import { ComponentResolver } from '@/components/ComponentResolver/ComponentResolver';

import { fetchGraphQL } from '@/graphql/fetchGraphQL';

import {
  DemoPageBySlugDocument,
  DemoPageBySlugQuery,
  DemoPageBySlugQueryVariables,
} from '@/components/DemoPage/__generated/queries.generated';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  //const page = await getPageBySlug(slug);
  const page = await fetchGraphQL<
    DemoPageBySlugQuery,
    DemoPageBySlugQueryVariables
  >(DemoPageBySlugDocument, { slug: slug, preview: false }, {});
  console.log('page=', page.demoPageCollection);

  // const childComponents = await Promise.all(
  //   page?.contentListCollection?.items?.map((item) =>
  //     BaseComponent.createComponent(item)
  //   ) || []
  // );
  //const childComponents = page?.contentListCollection?.items || [];
  const childComponents = []; //await page.getChildren();

  return (
    <>
      <p>Page slug : {slug}</p>
      <div
        style={{
          height: '500px',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem',
        }}
      >
        <div>Component list:</div>
        <div className={styles.container}>
          {childComponents.map((item, i) => (
            <div key={i} className={styles.item}>
              <div>{item.__typename}</div>
              <ComponentResolver entry={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
