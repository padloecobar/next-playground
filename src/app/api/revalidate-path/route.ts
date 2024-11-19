
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Revalidation request body:', body);
    const { slug } = body;

    if (!slug) {
      return NextResponse.json({ message: 'slug is required' }, { status: 400 });
    }

    // Revalidate pages by tag
    console.log('Page webhook handler for: ', slug);
    revalidatePath("/ssr-cache");
    revalidatePath(`/ssr-cache/${slug}` );
    revalidatePath("/ssr-cache-streaming");
    revalidatePath(`/ssr-cache-streaming/${slug}`);
    revalidatePath("/ssr-cache-streaming-fast");
    revalidatePath(`/ssr-cache-streaming-fast/${slug}`);
    revalidatePath("/isr");
    revalidatePath(`/isr/${slug}`);

    return new Response('Success!', {
      status: 200,
    });
  } catch (err) {
    console.error('Revalidation error:', err);
    return NextResponse.json(
      { message: 'Error revalidating tag', error: err.message },
      { status: 500 }
    );
  }
}
