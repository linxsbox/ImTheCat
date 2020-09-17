// ESLint Configuration
module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
  ],
  plugins: ['typescript', '@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: true,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'indent': ['error', 2, { 'SwitchCase': 1 }], // 缩进2个空格
    'semi': ['error', 'always'], // 强制使用分号
    'eqeqeq': 'error', // 强制使用全等操作符
    'curly': 'error', // 强制使用大括号
    'guard-for-in': 'error', // 强制使用 for in 约束
    'default-case': 'error', // 强制 Switch 语句中有 Default 分支
    'quotes': ['error', 'single', {
      avoidEscape: true,
      allowTemplateLiterals: true
    }], // 尽量使用单引号
    // 'quote-props': ['error', 'consistent-as-needed'], // 对象字面量属性名称用引号括起来
    'object-curly-newline': ['error', { 'consistent': true }], // 对象括号换行规则
    'array-bracket-newline': ['error', 'consistent'], // 数组括号换行规则
    'space-before-function-paren': 'error', // 函数参数前强制空格
    'spaced-comment': ['error', 'always'], // 注释体内强制使用空格
    'no-var': 'error', // 禁止使用 var
    'no-eval': 'error', // 禁止使用 eval()
    'no-empty': 'error', // 禁止使用空的块
    'no-empty-function': 'error', // 禁止使用空函数
    // 'no-empty-interface': 'error', // 禁止使用空接口
    'no-trailing-spaces': 'error', // 禁止结尾出现空格
    'no-whitespace-before-property': 'error', // 禁止属性前出现空白
    'no-multiple-empty-lines': 'error', // 禁止使用多个空行
    'no-tabs': 'error', // 禁止在代码中使用 tabs 制表
    'no-use-before-define': 'error', // 禁止在声明前使用
    'no-undefined': 'error', // 禁止使用 undefined 作为声明标识符
    'no-label-var': 'error', // 禁止声明与变量同名的标签
    'no-shadow': 'error', // 禁止声明影子变量 // 7.9.0 版本定义 enum 会意外触发此规则
    'no-multi-assign': 'error', // 禁止连续赋值
    '@typescript-eslint/no-var-requires': 0, // 允许 requires 指定包
    '@typescript-eslint/no-explicit-any': 'off', // 允许显示使用 any
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 显式定义模块边界类型，强制使用 return
    '@typescript-eslint/no-empty-interface': 'error', // 禁止结尾出现空格
    '@typescript-eslint/no-unused-vars': 'off',
    // '@typescript-eslint/no-empty': 'error', // 禁止使用空函数
    // '@typescript-eslint/no-empty-function': 'error', // 禁止使用空接口
    // '@typescript-eslint/class-name': 'error', // 类名与接口名必须为驼峰式
    // '@typescript-eslint/no-unsafe-finally': 'error', // 禁止在 finally 语句块中出现控制流语句
    // '@typescript-eslint/no-mergeable-namespace': 'error', // 禁止合并相同的命名空间
    // '@typescript-eslint/no-trailing-whitespace': 'error',  // 禁止属性前出现空白
    // '@typescript-eslint/no-irregular-whitespace': 'error', // 禁止不规则的空格
  }
};
