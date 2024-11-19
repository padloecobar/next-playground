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
    entry: BasicProps;
    delay?: boolean;
    streaming?: boolean;
  }> = dynamic(() => import(`@/components/${entry.__typename}/ViewModel`));
  console.log(`ComponentResolver: delay: ${delay}, streaming: ${streaming}, entry=`, entry.__typename);
  return (
    <>
      {Component ? (
        streaming ? (
          <Suspense fallback={<LoaderComponent />}>
            {<Component entry={entry} delay={delay} streaming={streaming} />}
          </Suspense>
        ) : (
          <Component entry={entry} delay={delay} />
        )
      ) : null}
    </>
  );
}
