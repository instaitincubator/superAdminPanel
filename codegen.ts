import type {CodegenConfig} from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: 'https://inctagram.work/api/v1/graphql',
    documents: ['./src/queries/**/*.ts'],
    ignoreNoDocuments: true,
    generates: {
        'src/types.ts': {plugins: ['typescript']},
        'src/': {
            preset: 'near-operation-file',
            presetConfig: {
                extension: 'generated.tsx',
                baseTypesPath: 'types.ts'
            },
            plugins: ['typescript-operations', 'typescript-react-apollo'],
            config: {
                withHooks: true
            }
        }
    }
}

export default config
