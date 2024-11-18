import styles from './page.module.css';
import { ComponentResolver } from '@/components/ComponentResolver/ComponentResolver';

import { fetchGraphQL } from '@/graphql/fetchGraphQL';
import {
  DemoPageBySlugDocument,
  DemoPageBySlugQuery,
  DemoPageBySlugQueryVariables,
} from '@/graphql/__generated/graphql-operations';


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
  const childComponents = page.demoPageCollection?.items[0]?.contentListCollection?.items ?? []
  console.log('page items =', childComponents);

  // const childComponents = await Promise.all(
  //   page?.contentListCollection?.items?.map((item) =>
  //     BaseComponent.createComponent(item)
  //   ) || []
  // );
  //const childComponents = page?.contentListCollection?.items || [];

  return (
    <>
      <p>Page slug : {slug}</p>
      <div
        style={{
          height: 'auto',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem',
        }}
      >
        <div>Component list:</div>
        <div className={styles.container}>
          {childComponents.map((item) => (
            <div key={item.sys.id} className={styles.item}>
              <ComponentResolver entry={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
