import { BaseComponent } from '@/components/BaseComponent';

export default class DemoPage extends BaseComponent {
  private contentListCollection: { items: BaseComponent[] } | null = null;
  private children: Promise<BaseComponent[]> = [];
  constructor({ __typename, sys, ...rest }: { __typename: string; sys: Sys }) {
    super(__typename, sys);
    Object.assign(this, rest);
    //create child components
    this.children = Promise.all(
      this?.contentListCollection?.items?.map((item) =>
        BaseComponent.createComponent(item)
      ) || []
    );
  }

  getChildren(): Promise<BaseComponent[]> {
    return this.children;
  }

  getComponentSpecificFieldsGQL(): string {
    return ``;
  }
}
