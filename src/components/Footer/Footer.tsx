import LoaderComponent from '@/components/LoaderComponent/LoaderComponent';
import { Suspense } from 'react';

export const Footer = async () => {
  const data = await fetch(
    'https://www.autodesk.com/content/experience-fragments/autodesk/en/universal-footer/master.content.html',
    //{ cache: 'no-store' }
  );
  const htmlContent = await data.text();

  return (
    <Suspense fallback={<LoaderComponent />}>
      <footer
        dangerouslySetInnerHTML={{
          __html: htmlContent,
        }}
      ></footer>
    </Suspense>
  );
};
