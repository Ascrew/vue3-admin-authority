module.exports = {
  parser: '@typescript-eslint/parser', // ESLint的解析器换成 @typescript-eslint/parser 用于解析ts文件
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  extends: ['standard', 'plugin:@typescript-eslint/recommended'], // 让ESLint继承 @typescript-eslint/recommended 定义的规则
  env: { node: true },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off' // 去除没有return的提示
  }

}
