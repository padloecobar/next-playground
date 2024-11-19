import 'server-only';
import { TypedDocumentString } from '@/graphql/__generated/graphql-operations';

export const fetchConfig = {
  endpoint: `https://graphql.contentful.com/content/v1/spaces/${String(
    process.env.CONTENTFUL_SPACE_ID
  )}`,
  params: {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    },
  },
  previewParams: {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN}`,
    },
  },
};

// Utility function to introduce a randomized delay 1
function randomDelay(maxMs: number) {
  const delayTime = Math.floor(Math.random() * maxMs);
  // const delayTime = maxMs
  return new Promise((resolve) => setTimeout(resolve, delayTime));
}

export async function fetchGraphQL<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  variables: TVariables & { preview?: boolean | null; delay?: boolean | null },
  options: object
): Promise<TResult> {
  const body = JSON.stringify({
    query: query,
    variables,
  });
  const startTime = Date.now();
  if (variables.delay) {
    await randomDelay(5000);
  }
  console.log(`fetchUrl ${fetchConfig.endpoint}`, variables);
  const response = await fetch(fetchConfig.endpoint as string, {
    method: 'POST',
    ...(variables?.preview ? fetchConfig.previewParams : fetchConfig.params),
    body,
    cache: 'force-cache',
    ...options,
  });

  const json = await response.json();

  const endTime = Date.now();
  console.log('response for', variables, `took ${endTime - startTime} ms`);

  if (json.errors) {
    //throw new Error(json.errors.map((err: any) => err.message).join('\n'));
    throw new Error(json.errors[0].message);
  }

  return json.data as TResult;
}
