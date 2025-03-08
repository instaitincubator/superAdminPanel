import {dirname} from "path";
import {fileURLToPath} from "url";
import {FlatCompat} from "@eslint/eslintrc";
import perfectionist from "eslint-plugin-perfectionist";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        plugins: {
            perfectionist,
        },
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            'no-console': 'off',
            'react-hooks/rules-of-hooks': 'off',
            'arrow-parens': 'off',
            'consistent-return': 'off',
            curly: ['error', 'all'],
            'import/extensions': [
                'error',
                {css: 'always', json: 'always', scss: 'always', svg: 'always'},
            ],
            'import/no-duplicates': 'off',
            'import/order': 'off',
            'import/prefer-default-export': 'off',
            'max-lines': ['error', 300],
            'no-debugger': 'off',
            'no-duplicate-imports': 'error',
            'no-empty-pattern': 'off',
            'no-nested-ternary': 'error',
            'no-undef': 'warn',
            'no-unused-vars': 'off',
            'no-var': 'error',
            'padding-line-between-statements': [
                'error',
                {blankLine: 'always', next: 'return', prev: '*'},
                {blankLine: 'always', next: '*', prev: ['const', 'let', 'var']},
                {
                    blankLine: 'any',
                    next: ['const', 'let', 'var'],
                    prev: ['const', 'let', 'var'],
                },
            ],
            'perfectionist/sort-imports': [
                'error',
                {
                    'customGroups': {
                        type: {
                            react: 'react',
                        },
                        value: {
                            react: ['react', 'react-*'],
                        },
                    },
                    groups: [
                        'type',
                        'react',
                        'builtin',
                        'external',
                        'internal-type',
                        'internal',
                        'side-effect',
                        'style',
                    ],
                    'newlinesBetween': 'always',
                    order: 'asc',
                    type: 'natural',
                },
            ],
            'prefer-const': 'error',
            'react/button-has-type': 'error',
            'react/display-name': 'off',
            'react/jsx-boolean-value': ['error'],
            'react/jsx-curly-brace-presence': [
                'error',
                {children: 'ignore', propElementValues: 'always', props: 'always'},
            ],
            'react/jsx-fragments': ['error'],
            'react/prop-types': 'off',
            'react/void-dom-elements-no-children': ['error'],
        },
        settings: {
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx'],
            },
            'import/resolver': {
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                    paths: ['src'],
                },
                typescript: {
                    alwaysTryTypes: true,
                },
            },
            react: {
                version: 'detect',
            }
        }
    }
];

export default eslintConfig;


