// import { BaseComponent, COMMON_AND_CHILDREN } from '@/components/BaseComponent';
//
// export default class DemoComponentLevelB extends BaseComponent {
//   public title: string | null = null;
//   private contentListCollection: { items: BaseComponent[] } | null = null;
//
//   constructor({ __typename, sys, ...rest }: { __typename: string; sys: Sys }) {
//     super(__typename, sys);
//     Object.assign(this, rest);
//   }
//
//   getChildren(): BaseComponent[] {
//     return this?.contentListCollection?.items || [];
//   }
//
//   getComponentSpecificFieldsGQL(): string {
//     return `
//         title
//         ${COMMON_AND_CHILDREN}
//         `;
//   }
// }
