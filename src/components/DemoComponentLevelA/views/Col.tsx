import { DemoComponentLevelAFieldsFragment } from '@/graphql/graphql';
import { ComponentResolver } from '@/components/ComponentResolver/ComponentResolver';

export default function Col(props: {
  cmpData: DemoComponentLevelAFieldsFragment;
  delay?: boolean;
  streaming?: boolean;
}) {
  const { cmpData, delay, streaming } = props;
  const children = cmpData.contentListCollection?.items ?? [];
  return (
    <>
      <div>A Column View</div>
      uniqueTitle : {cmpData.uniqueTitle}
      <div style={{ display: 'flex', flexDirection:"column", alignItems: 'center' }}>
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
