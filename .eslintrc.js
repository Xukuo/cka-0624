module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    '@cybozu/eslint-config/globals/kintone',
    'plugin:vue/recommended',
    'airbnb-base',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {},
  settings: {
    webpack: {
      config: 'config/webpack.common.js', // 这是你设置alias的配置文件路径
    },
  },
}
