import { ComponentResolver } from '@/components/ComponentResolver/ComponentResolver';
import { fetchGraphQL } from '@/graphql/fetchGraphQL';
import {
  DemoComponentLevelBByIdDocument,
  DemoComponentLevelBByIdQuery,
  DemoComponentLevelBByIdQueryVariables,
  DemoComponentLevelBFieldsFragment,
  Entry,
} from '@/graphql/__generated/graphql-operations';

const ViewModel = async ({ entry }: { entry: Entry }) => {
  // console.log('B entry = ', entry);
  const data = await fetchGraphQL<
    DemoComponentLevelBByIdQuery,
    DemoComponentLevelBByIdQueryVariables
  >(
    DemoComponentLevelBByIdDocument,
    { id: entry.sys.id },
    {
      next: {
        tags: [entry.sys.id],
      },
    }
  );
  const cmpData = data.demoComponentLevelB as DemoComponentLevelBFieldsFragment;
  const children = cmpData.contentListCollection?.items ?? [];
  return (
    <div style={{borderStyle: 'dashed'}}>
      title B: {cmpData.title}
      {children.map((item) => item && (
        <div key={item.sys.id}>
          <ComponentResolver entry={item} />
        </div>
      ))}
    </div>
  );
};

export default ViewModel;
