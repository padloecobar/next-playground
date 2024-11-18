// BaseComponent.ts - Defines the base component structure
abstract class BaseComponent {
  public readonly __typename: string;
  public sys: Sys;

  protected constructor(__typename: string, sys: Sys) {
    if (new.target === BaseComponent) {
      throw new TypeError('Cannot instantiate BaseComponent directly.');
    }
    this.__typename = __typename;
    this.sys = sys;
  }

  // Abstract method to be implemented by subclasses
  abstract getChildren(): BaseComponent[];
  abstract getComponentSpecificFieldsGQL(): string;

  // Asynchronous factory method to create an instance based on __typename
  static async createComponent<T extends BaseComponent>(
    data: ComponentData
  ): Promise<T> {
    const { __typename } = data;

    try {
      // Dynamically import the component module based on __typename
      console.log('Import module', __typename);
      const componentModelModule = await import(
        `@/components/${__typename}/Model`
      );
      const ComponentClass = componentModelModule.default as {
        new (data: ComponentData): T;
      };

      return new ComponentClass(data);
    } catch (error) {
      console.error(`Unknown component type: ${__typename}`, error);
    }
    return new Promise(() => null);
  }

  //static async toComponent(baseComponent: BaseComponent) :
}

// Define the shape of data expected in the factory method
export interface ComponentData {
  __typename: string;
  sys: Sys;

  [key: string]: any;
}

export const COMMON_AND_CHILDREN = `
    __typename
    sys {
          id
          locale
        }
        contentListCollection {
            total
            skip
            limit
            items {
            __typename
                sys {
                    id
                    locale
                }
            }
        }
`;