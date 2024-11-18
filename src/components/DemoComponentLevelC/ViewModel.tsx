import { fetchGraphQL } from '@/graphql/fetchGraphQL';
import Image from 'next/image';

import {
  DemoComponentLevelCByIdDocument,
  DemoComponentLevelCByIdQuery,
  DemoComponentLevelCByIdQueryVariables,
  DemoComponentLevelCFieldsFragment,
  Entry,
} from '@/graphql/__generated/graphql-operations';

const ViewModel = async ({ entry }: { entry: Entry }) => {
  // console.log('C entry = ', entry);
  const data = await fetchGraphQL<
    DemoComponentLevelCByIdQuery,
    DemoComponentLevelCByIdQueryVariables
  >(
    DemoComponentLevelCByIdDocument,
    { id: entry.sys.id },
    {
      next: {
        tags: [entry.sys.id],
      },
    }
  );
  const cmpData = data.demoComponentLevelC as DemoComponentLevelCFieldsFragment;
  return (
    <div style={{borderStyle: 'dashed'}}>
      title C: {cmpData.title}
      <Image src={cmpData.image?.url} width={50} height={50} alt={"x"} />
    </div>
  );
};

export default ViewModel;
