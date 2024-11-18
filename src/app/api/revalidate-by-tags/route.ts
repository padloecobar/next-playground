// app/api/revalidate-by-tag/route.js

import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Revalidation request body:', body);
    const { sys : {id : id } } = body;
    // const tag = id + locale;
    const tag = id;
    if (!tag) {
      return NextResponse.json({ message: 'Tag is required' }, { status: 400 });
    }

    // Revalidate pages by tag
    console.log('Revalidating tag:', tag);
    revalidateTag(tag);

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
