import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import reactRefresh from 'eslint-plugin-react-refresh';
import pluginReactHooks from 'eslint-plugin-react-hooks';

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  reactRefresh.configs.recommended,

  // https://github.com/facebook/react/issues/28313
  {
    plugins: {
      'react-hooks': pluginReactHooks,
      rules: pluginReactHooks.configs.recommended.rules,
    },
  },

  // It's mad: https://github.com/eslint/eslint/issues/19093
  // { ignores: ['dist', 'node_modules', 'coverage'] },

  { files: ['**/*.{ts,tsx}'] },
  { settings: { react: { version: 'detect' } } },
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      'react-refresh/only-export-components': [
        'error',
        {
          allowConstantExport: true,
        },
      ],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'react/react-in-jsx-scope': ['off'],
      'react/prop-types': ['off'],
      'object-shorthand': ['error', 'properties'],
    },
  },
];
