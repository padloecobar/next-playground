import { DemoComponentLevelAFieldsFragment } from '@/graphql/__generated/graphql-operations';
import { ComponentResolver } from '@/components/ComponentResolver/ComponentResolver';
import styles from './Row.module.css';

export default function Row(
  props: {
    cmpData: DemoComponentLevelAFieldsFragment;
    delay?: boolean,
    streaming?: boolean
  }

) {
  const { cmpData, delay, streaming } = props;
  const children = cmpData.contentListCollection?.items ?? [];
  return (
    <>
      <div>B Row View</div>
      uniqueTitle : {cmpData.uniqueTitle}
      {/*row view*/}
      <div className={styles.rowContainer}>
        {children.map((item) => (
          <div key={item.sys.id}>
            <ComponentResolver
              entry={item}
              delay={delay}
              streaming={streaming}
            />
          </div>
        ))}
      </div>
    </>
  );
}
