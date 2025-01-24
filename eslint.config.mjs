import pluginJs from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';
import globals from 'globals';
import tseslint from 'typescript-eslint';
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended'); 


export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },

  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      eqeqeq: 'off',
      'no-unused-vars': 'error',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
    },
  },
  {
    ignores: ['.node_modules/*'],
  },
  {
    files: ['**/*.js'],
    plugins: {
      jsdoc: jsdoc,
    },
    rules: {
      'jsdoc/require-description': 'error',
      'jsdoc/check-values': 'error',
    },
  },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  ...tseslint.configs.recommended,
];
