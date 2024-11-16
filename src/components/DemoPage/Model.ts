import { BaseComponent } from '@/components/BaseComponent';

export default class DemoPage extends BaseComponent {
  private contentListCollection: { items: BaseComponent[] } | null = null;
  constructor({ __typename, sys, ...rest }: { __typename: string; sys: Sys }) {
    super(__typename, sys);
    Object.assign(this, rest);
  }

  getChildren(): BaseComponent[] {
    return this?.contentListCollection?.items || [];
  }

  getComponentSpecificFieldsGQL(): string {
    return ``;
  }
}
