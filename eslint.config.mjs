import tseslint from 'typescript-eslint';

export default [
  { ignores: ['dist/*', '*.js'] },
  ...tseslint.configs.recommended,
  {
    ignores: ['dist/*'],
    rules: {
      semi: 'error',
      quotes: ['error', 'single'],
      'comma-dangle': ['error', 'always-multiline'],
    },
  },
  {
    files: ['test/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
