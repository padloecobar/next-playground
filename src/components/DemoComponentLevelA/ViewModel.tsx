import {
  DemoComponentLevelAByIdDocument,
  DemoComponentLevelAByIdQuery,
  DemoComponentLevelAByIdQueryVariables,
  DemoComponentLevelAFieldsFragment,
  Entry,
} from '@/graphql/__generated/graphql-operations';
import { fetchGraphQL } from '@/graphql/fetchGraphQL';
import Row from '@/components/DemoComponentLevelA/views/Row';
import Col from '@/components/DemoComponentLevelA/views/Col';

const ViewModel = async ({ entry }: { entry: Entry }) => {
  // console.log('ViewModel entry = ', entry);
  const data = await fetchGraphQL<
    DemoComponentLevelAByIdQuery,
    DemoComponentLevelAByIdQueryVariables
  >(
    DemoComponentLevelAByIdDocument,
    { id: entry.sys.id },
    {
      next: {
        tags: [entry.sys.id],
      },
    }
  );
  // console.log('ViewModel data = ', data);
  const cmpData = data.demoComponentLevelA as DemoComponentLevelAFieldsFragment;
  return (
    <div style={{borderStyle: 'dashed'}}>
      <div>{cmpData.__typename}</div>
      {cmpData.viewConfig === 'row' ? (
        <Row cmpData={cmpData} />
      ) : (
        <Col cmpData={cmpData} />
      )}
    </div>
  );
};

export default ViewModel;
