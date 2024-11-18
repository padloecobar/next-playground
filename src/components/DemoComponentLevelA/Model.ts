// // components/ComponentA.ts - Example of a specific component
// // import { BaseComponent, COMMON_AND_CHILDREN } from '../BaseComponent';
// // import { FragmentType, graphql } from '@/graphql';
// import { gqlFetch } from '@/graphql/gqlFetch';
// import fetchGraphQL from '@/graphql/fetchGraphQL';
// import {
//   DemoComponentLevelAByIdDocument,
//   DemoComponentLevelAByIdQuery,
//   DemoComponentLevelAByIdQueryVariables,
// } from '@/components/DemoComponentLevelA/__generated/queries.generated';
// // import { DemoComponentLevelAFieldsFragment } from '@/graphql/graphql';
//
// class DemoComponentLevelA extends BaseComponent {
//   private uniqueTitle: string | null = null;
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
//         uniqueTitle
//         ${COMMON_AND_CHILDREN}
//         `;
//   }
//
//   testFetch(){
//
//   }
//
//   getQuery() {
//
//     // const DemoComponentLevelAQuery = graphql(`
//     //     query DemoComponentLevelA($id: String!) {
//     //         demoComponentLevelA(id: $id){
//     //             uniqueTitle
//     //             __typename
//     //             sys {
//     //                 id
//     //                 locale
//     //             }
//     //             contentListCollection {
//     //                 total
//     //                 skip
//     //                 limit
//     //                 items {
//     //                     __typename
//     //                     sys {
//     //                         id
//     //                         locale
//     //                     }
//     //                 }
//     //             }
//     //         }
//     //     }`);
//     //
//     // execute(DemoComponentLevelAQuery, {id : "1"})
//     //   .then(data => console.log(data));
//   }
// }
//
// // export const DemoComponentLevelAFields = graphql(`
// //     fragment DemoComponentLevelAFields on DemoComponentLevelA{
// //         uniqueTitle
// //         __typename
// //         sys {
// //             id
// //             locale
// //         }
// //         contentListCollection {
// //             total
// //             skip
// //             limit
// //             items {
// //                 __typename
// //                 sys {
// //                     id
// //                     locale
// //                 }
// //             }
// //         }
// //     }
// // `);
// //
// // export function qeq(item: DemoComponentLevelAFieldsFragment) {
// //   console.log(item.uniqueTitle);
// // }
// //
// // export function qeq2(item: FragmentType<typeof DemoComponentLevelAFields>)