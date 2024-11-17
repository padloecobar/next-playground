import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';

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

export async function fetchGraphQL<
  TResult,
  TVariables extends { preview?: boolean | null },
>(
  query: TypedDocumentString<TResult, TVariables>,
  variables: TVariables,
  options: any
): Promise<TResult> {
  const body = JSON.stringify({
    query: query,
    variables,
  });
  console.log(`fetchUrl ${fetchConfig.endpoint}`, body, variables);
  const response = await fetch(fetchConfig.endpoint as string, {
    method: 'POST',
    ...(variables?.preview ? fetchConfig.previewParams : fetchConfig.params),
    body,
    ...options,
  });

  const json = await response.json();

  console.log('response = ', json);

  if (json.errors) {
    //throw new Error(json.errors.map((err: any) => err.message).join('\n'));
    throw new Error(json.errors[0].message);
  }

  return json.data;
}


export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any> | undefined) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
