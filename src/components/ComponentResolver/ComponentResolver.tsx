import dynamic from 'next/dynamic';
import React from 'react';

type BasicProps = {
  __typename: string;
  sys: { id: string };
};

export function ComponentResolver({ entry }: { entry: BasicProps }) {
  const Component: React.ComponentType<{
    entry: BasicProps;
  }> = dynamic(() => import(`@/components/${entry.__typename}/ViewModel`));
  return <>{Component ? <Component entry={entry} /> : null}</>;
}
