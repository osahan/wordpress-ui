import js from '@eslint/js';
import path from 'node:path';
import globals from 'globals';
import react from 'eslint-plugin-react';
import { fileURLToPath } from 'node:url';
import _import from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import { FlatCompat } from '@eslint/eslintrc';
import tsParser from '@typescript-eslint/parser';
import { fixupPluginRules } from '@eslint/compat';
import unusedImports from 'eslint-plugin-unused-imports';
import { defineConfig, globalIgnores } from 'eslint/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    allConfig: js.configs.all,
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
});

export default defineConfig([
    globalIgnores(['**/coverage', '**/dist', 'demo/']),
    {
        extends: compat.extends(
            'plugin:@typescript-eslint/recommended',
            'plugin:jsx-a11y/recommended',
            'plugin:testing-library/react',
            'plugin:perfectionist/recommended-alphabetical-legacy',
            'plugin:prettier/recommended',
        ),
        ignores: ['.prettierrc.js','eslint.config.mjs','jest.setup.ts'],
        languageOptions: {
            ecmaVersion: 'latest',
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                project: './tsconfig.json',
            },
            sourceType: 'module',
        },
        plugins: {
            import: fixupPluginRules(_import),
            prettier,
            react,
            'unused-imports': unusedImports,
        },
        rules: {
            '@typescript-eslint/class-methods-use-this': 'off',

            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    fixStyle: 'inline-type-imports',
                },
            ],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-import-type-side-effects': 'error',
            '@typescript-eslint/no-unused-vars': 'off',
            'import/no-extraneous-dependencies': [
                'error',
                {
                    devDependencies: ['**/*.test.ts', '**/*.test.tsx', '**/mocks/**', 'jest.setup.ts'],
                },
            ],

            'perfectionist/sort-classes': 'off',
            'perfectionist/sort-enums': [0],

            'perfectionist/sort-exports': [
                'warn',
                {
                    order: 'asc',
                    type: 'line-length',
                },
            ],
            'perfectionist/sort-imports': [
                'warn',
                {
                    groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index'], 'unknown'],
                    newlinesBetween: 1,
                    order: 'asc',
                    type: 'line-length',
                },
            ],
            'perfectionist/sort-named-exports': [
                'warn',
                {
                    order: 'asc',
                    type: 'line-length',
                },
            ],
            // perfectionist
            // https://perfectionist.dev
            'perfectionist/sort-named-imports': [
                'warn',
                {
                    order: 'asc',
                    type: 'line-length',
                },
            ],
            'perfectionist/sort-switch-case': 'off',
            'react/function-component-definition': [
                'error',
                {
                    namedComponents: 'arrow-function',
                    unnamedComponents: 'arrow-function',
                },
            ],
            'react/jsx-filename-extension': [
                2,
                {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                },
            ],

            'react/jsx-props-no-spreading': 0,
            'react/no-is-mounted': 0,
            'react/require-default-props': 0,
            'testing-library/no-container': 'warn',
            'testing-library/no-node-access': 'warn',

            // unused-imports
            // https://www.npmjs.com/package/eslint-plugin-unused-imports
            'unused-imports/no-unused-imports': 1,
            'unused-imports/no-unused-vars': [
                0,
                {
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                    vars: 'all',
                    varsIgnorePattern: '^_',
                },
            ],
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
]);
