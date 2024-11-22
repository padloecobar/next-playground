// codegen.ts
import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://graphql.contentful.com/content/v1/spaces/scjk1gmz0ksd?access_token=IBOp50UqTwnYuBubAdhlhRn3egJcPyr5VJ6qRJRfhIs',
  documents: ['src/graphql/shared.graphql', 'src/**/*.graphql'],
  ignoreNoDocuments: true,
  generates: {
    './src/graphql/graphql.schema.json': {
      plugins: ['introspection'],
    },
    './src/graphql/schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
    },
    './src/graphql/': {
      documents: ['src/graphql/shared.graphql'],
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
        inlineFragmentTypes: 'combine',
      },
      config: {
        documentMode: 'string',
        inlineFragmentTypes: 'combine',
        dedupeFragments: true,
      },
    },
  },
};
export default config;
