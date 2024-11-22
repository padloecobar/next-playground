import Row from '@/components/DemoComponentLevelA/views/Row';
import Col from '@/components/DemoComponentLevelA/views/Col';
import { fetchGraphQL } from '@/graphql/fetchGraphQL';
import {
  DemoComponentLevelAByIdDocument,
  DemoComponentLevelAByIdQuery,
  DemoComponentLevelAByIdQueryVariables,
  Entry,
} from '@/graphql/graphql';

const ViewModel = async ({
  entry,
  delay,
  streaming,
}: {
  entry: Entry;
  delay?: boolean;
  streaming?: boolean;
}) => {
  const data = await fetchGraphQL<
    DemoComponentLevelAByIdQuery,
    DemoComponentLevelAByIdQueryVariables
  >(
    DemoComponentLevelAByIdDocument,
    { id: entry.sys.id },
    {
      delay,
      next: {
        tags: [entry.sys.id],
      },
    }
  );
  const cmpData = data.demoComponentLevelA;
  return (
    <div style={{ borderStyle: 'dashed' }}>
      <div>{data.__typename}</div>
      {cmpData.viewConfig === 'row' ? (
        <Row cmpData={cmpData} delay={delay} streaming={streaming} />
      ) : (
        <Col cmpData={cmpData} delay={delay} streaming={streaming} />
      )}
    </div>
  );
};

export default ViewModel;
