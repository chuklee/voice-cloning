module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'src/components/ui/*'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'react', 'import', 'import-newlines', 'prettier'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    camelcase: 'error',
    'prettier/prettier': 'error',

    // JSX
    'react/react-in-jsx-scope': 'off',
    // 'react/jsx-boolean-value': 'error',
    // 'react/jsx-closing-bracket-location': 'error',
    // 'react/jsx-equals-spacing': 'error',
    // 'react/jsx-first-prop-new-line': 'error',
    // 'react/jsx-handler-names': 'error',
    // 'react/jsx-indent-props': ['error', 2],
    // 'react/jsx-indent': ['error', 2],
    // 'react/jsx-key': 'error',
    // 'react/jsx-max-props-per-line': ['error', { maximum: 3 }],
    // 'react/jsx-tag-spacing': 'error',
    // 'react/jsx-curly-spacing': 'error',
    'object-curly-spacing': ['error', 'always'],

    // imports
    'import/no-duplicates': 'error',
    'import/no-useless-path-segments': 'error',
    'import/prefer-default-export': 'off',
    'import/no-anonymous-default-export': 'warn',
    'import/named': 'off',
    'import/namespace': 'off',
    'import/default': 'off',
    'import/no-named-as-default': 'off',
    'import/no-cycle': 'error',
    'import/no-unused-modules': 'off',
    'import/no-deprecated': 'off',
  },
};
