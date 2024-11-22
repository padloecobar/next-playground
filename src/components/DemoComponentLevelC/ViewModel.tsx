import { fetchGraphQL } from '@/graphql/fetchGraphQL';
import Image from 'next/image';

import {
  DemoComponentLevelCByIdDocument,
  DemoComponentLevelCByIdQuery,
  DemoComponentLevelCByIdQueryVariables,
  DemoComponentLevelCFieldsFragment,
  Entry,
} from '@/graphql/graphql';

const ViewModel = async ({
  entry,
  delay,
}: {
  entry: Entry;
  delay?: boolean;
  streaming?: boolean;
}) => {
  const data = await fetchGraphQL<
    DemoComponentLevelCByIdQuery,
    DemoComponentLevelCByIdQueryVariables
  >(
    DemoComponentLevelCByIdDocument,
    { id: entry.sys.id },
    {
      delay,
      next: {
        tags: [entry.sys.id],
      },
    }
  );
  const cmpData = data.demoComponentLevelC as DemoComponentLevelCFieldsFragment;
  //console.log('cmpData C =', cmpData);
  return (
    <div style={{ borderStyle: 'dashed' }}>
      title C: {cmpData.title}
      <Image src={cmpData.image?.url} width={50} height={50} alt={'x'} />
    </div>
  );
};

export default ViewModel;
