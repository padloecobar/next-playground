import { fetchGraphQL } from '@/graphql/fetchGraphQL';
import {
  DemoPagesDocument,
  DemoPagesQuery,
  DemoPagesQueryVariables,
} from '@/graphql/__generated/graphql-operations';
import DemoPageCmp from '@/components/DemoPage/DemoPageCmp';

/* ISR ENABLER START */
export async function generateStaticParams() {
  const pages = await fetchGraphQL<DemoPagesQuery, DemoPagesQueryVariables>(
    DemoPagesDocument,
    {},
    {cache: 'no-store'}
  );
  console.log('ISR pages =', pages.demoPageCollection?.items);
  return pages.demoPageCollection?.items.map((page) => ({
    slug: String(page?.slug),
  }));
}

export const dynamicParams = true;
/* ISR ENABLER END */

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  console.log('slug =', slug);
  return <DemoPageCmp slug={slug} />;
}
