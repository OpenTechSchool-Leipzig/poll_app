module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb', 'plugin:prettier/recommended', '@vue/prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': 'off',
    'arrow-parens': 'off',
    radix: 'off',
    'no-else-return': 'off',
    'no-plusplus': 'off',
    'prefer-template': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
