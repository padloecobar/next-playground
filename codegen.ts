// codegen.ts

import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema:
    'https://graphql.contentful.com/content/v1/spaces/scjk1gmz0ksd?access_token=IBOp50UqTwnYuBubAdhlhRn3egJcPyr5VJ6qRJRfhIs',
  ignoreNoDocuments: true,
  overwrite: true,
  generates: {
    // Generate global fragments, queries, and types in a single location with the `client` preset
    './src/graphql/__generated/graphql.schema.json': {
      plugins: ['introspection'],
    },
    './src/graphql/__generated/graphql.schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
        dedupeFragments: true,
      }
    },
    './src/graphql/__generated/graphql-operations.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      documents: ['./src/**/*.graphql'],
      config: {
        dedupeFragments: true,
        documentMode: 'string',
      }
    },
    // Generate types for each query/fragment near its file with the `near-operation-file` preset
    // 'src/components/': {
    //   documents: ['./src/components/**/*.graphql'],
    //   preset: 'near-operation-file',
    //   presetConfig: {
    //     extension: '.generated.ts', // Output generated files with this extension next to each query
    //     baseTypesPath: '../graphql/__generated/graphql.types.ts', // Base types path relative to each generated file
    //     folder: '__generated'
    //   },
    //   plugins: ['typescript-operations', 'typed-document-node'],
    //   config: {
    //     dedupeFragments: true,
    //     addOperationExport: false,
    //     documentMode: 'string',
    //     importDocumentNodeExternallyFrom: "@/src/graphql/fetchGraphQL.ts",
    //     // documentMode: 'external',
    //     //importDocumentNodeExternallyFrom: "../graphql/fetchGraphQL.ts"
    //     //importDocumentNodeExternallyFrom: 'near-operation-file'
    //   },
    // },
  },
};

// const config: CodegenConfig = {
//
// }
export default config;
