import DemoPageCmp from '@/components/DemoPage/DemoPageCmp';

export default async function Page({
                                     params,
                                   }: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  console.log('slug =', slug);
  return <DemoPageCmp slug={slug} delay={true} streaming={true}/>;
}
