/** @type {import('@eslint/eslintrc').Linter.Config} */
module.exports = {
  extends: ['antomic/recommended'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  rules: {
    "import/no-unresolved": "off",
  },
  overrides: [
    {
      files: ['.eslintrc.cjs'],
      rules: {
        'node/no-unpublished-require': 'off',
        'unicorn/filename-case': 'off',
      },
    }
  ],
}
