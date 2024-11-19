import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
import LoaderComponent from '@/components/LoaderComponent/LoaderComponent';

type BasicProps = {
  __typename: string;
  sys: { id: string };
};

export function ComponentResolver({
  entry,
  streaming,
  delay,
}: {
  entry: BasicProps;
  streaming?: boolean;
  delay?: boolean;
}) {
  const Component: React.ComponentType<{
    entry: BasicProps,
    delay?: boolean,
  }> = dynamic(() => import(`@/components/${entry.__typename}/ViewModel`));
  return (
    <>
      {streaming ? (
        <Suspense fallback={<LoaderComponent />}>
          {Component ? <Component entry={entry} delay={delay}/> : null}
        </Suspense>
      ) : Component ? (
        <Component entry={entry} delay={delay}/>
      ) : null}
    </>
  );
}
