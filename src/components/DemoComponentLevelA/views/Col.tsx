import { DemoComponentLevelAFieldsFragment } from '@/graphql/__generated/graphql-operations';
import { ComponentResolver } from '@/components/ComponentResolver/ComponentResolver';

export default function Col(props: {
  cmpData: DemoComponentLevelAFieldsFragment;
}) {
  const { cmpData } = props;
  const children = cmpData.contentListCollection?.items ?? [];
  return (
    <>
      <div>A Column View</div>
      uniqueTitle : {cmpData.uniqueTitle}
      {children.map((item) => (
        <div key={item.sys.id}>
          <ComponentResolver entry={item} />
        </div>
      ))}
    </>
  );
}
