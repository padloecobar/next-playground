export const fetchConfig = {
  endpoint: `https://graphql.contentful.com/content/v1/spaces/${String(
    process.env.CONTENTFUL_SPACE_ID,
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

export function customFetcher<TData, TVariables extends { preview?: boolean | null }>(
  query: string,
  variables?: TVariables,
  options?: RequestInit['headers'],
) {
  return async (): Promise<TData> => {
    let requestBody = {
      method: 'POST',
      ...options,
      ...(variables?.preview ? fetchConfig.previewParams : fetchConfig.params),
      body: JSON.stringify({ query, variables }),
    };
    const res = await fetch(fetchConfig.endpoint as string, requestBody);

    const json = await res.json();
    console.log(`fetchUrl ${fetchConfig.endpoint}`, query, variables)
    console.log("response = ", json);
    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
}
