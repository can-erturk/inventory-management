module.exports = {
  globals: {
    __dirname: true,
  },
  root: true,
  env: { node: true },
  extends: ['eslint:recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  rules: {
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
  },
};
