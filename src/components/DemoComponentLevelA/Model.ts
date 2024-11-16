// components/ComponentA.ts - Example of a specific component
import { BaseComponent, COMMON_AND_CHILDREN } from '../BaseComponent';

export default class DemoComponentLevelA extends BaseComponent {
  private uniqueTitle: string | null = null;
  private contentListCollection: { items: BaseComponent[] } | null = null;

  constructor({ __typename, sys, ...rest }: { __typename: string; sys: Sys }) {
    super(__typename, sys);
    Object.assign(this, rest);
  }

  getChildren(): BaseComponent[] {
    return this?.contentListCollection?.items || [];
  }

  getComponentSpecificFieldsGQL(): string {
    return `
        uniqueTitle
        ${COMMON_AND_CHILDREN}
        `;
  }
}
