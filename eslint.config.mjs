import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';

export default [
  {
    ignores: ['node_modules/', '.next/', '.vercel/', '.log-api/'],
  },
  // Base ESLint recommended rules
  js.configs.recommended,
  {
    env: {
      browser: true,
      es2021: true,
    }
  },
  // Common environment globals
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        // Node.js globals
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        // React globals
        React: 'readonly',
        // TypeScript globals
        RequestInit: 'readonly',
      },
    },
    rules: {
      // Allow console for development
      'no-console': 'off',
      // Allow debugger during development
      'no-debugger': 'off',
    },
  },
  // TypeScript files
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': tseslint,
    },
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      // Allow unused vars with underscore prefix and specific variables
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_$',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  // React files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: reactPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'ignore' }],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
  // Test files
  {
    files: ['__tests__/**/*', '**/*.test.ts'],
    languageOptions: {
      globals: {
        jest: true,
        describe: true,
        it: true,
        expect: true,
        beforeEach: true,
        afterEach: true,
        beforeAll: true,
        afterAll: true,
      },
    },
  },
];
