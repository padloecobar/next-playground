import { fetchGraphQL } from '@/graphql/fetchGraphQL';
import {
  DemoPageBySlugDocument,
  DemoPageBySlugQuery,
  DemoPageBySlugQueryVariables,
} from '@/graphql/__generated/graphql-operations';
import styles from './DemoPage.module.css';
import { ComponentResolver } from '@/components/ComponentResolver/ComponentResolver';

export default async function DemoPageCmp({
  slug,
  delay,
  streaming,
}: {
  slug: string;
  delay?: boolean;
  streaming?: boolean;
}) {
  const page = await fetchGraphQL<
    DemoPageBySlugQuery,
    DemoPageBySlugQueryVariables
  >(DemoPageBySlugDocument, { slug: slug, preview: false, delay }, {});

  const childComponents =
    page.demoPageCollection?.items[0]?.contentListCollection?.items ?? [];

  return (
    <>
      <p>Page slug : {slug}</p>
      <p>Page internalName : {page.demoPageCollection?.items[0]?.internalName}</p>
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
              <ComponentResolver
                entry={item}
                streaming={streaming}
                delay={delay}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
