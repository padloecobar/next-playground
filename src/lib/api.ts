import { BaseComponent, COMMON_AND_CHILDREN } from '@/components/BaseComponent';
import DemoPage from '@/components/DemoPage/Model';

async function fetchGraphQL(query: string, preview = false): Promise<any> {
  console.log(`Fetching ${preview ? 'preview' : ''}, query = `, query);
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      cache: 'force-cache',
      //next: {tags: ["posts"]},
    }
  ).then((response) => response.json());
}

export async function getPageBySlug(slug: string): Promise<DemoPage> {
  return fetchGraphQL(`
    query DemoPageCollection {
    demoPageCollection(where: { slug: "${slug}" }, limit: 1) {
        items {
            ${COMMON_AND_CHILDREN}
            }
        }
    }
    `).then((json) => {
    const pageData = json?.data?.demoPageCollection?.items?.[0];
    return BaseComponent.createComponent<DemoPage>(pageData);
  });
}

export async function getComponentByID<T extends BaseComponent>(
  component: T
): Promise<T> {
  const {
    __typename,
    sys: { id: sysId },
  } = component;
  const typeNameCamelCase =
    __typename.charAt(0).toLowerCase() + __typename.slice(1);
  console.log('getComponentByID', Reflect.getPrototypeOf(component));
  return fetchGraphQL(`
    query {
        ${typeNameCamelCase}(id: "${sysId}") {
            ${component?.getComponentSpecificFieldsGQL?.() ?? ''}
            ${COMMON_AND_CHILDREN}
        }
    }
    `).then((json) => {
    const cmpData = json?.data?.[typeNameCamelCase];
    return BaseComponent.createComponent<T>(cmpData);
  });
}

// export async function

export async function getComponentViewModel(component: BaseComponent) {
  // const { __typename, sys: { id: sysId } } = component;
}
