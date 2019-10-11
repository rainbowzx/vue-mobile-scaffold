module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    commonjs: true,//require和module都属于common.js里面的东西，webpack打包的时候能识别，但是假如我把环境只设定为浏览器的话就不能识别了，所以得在环境添加上common.js配置项
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // 'plugin:vue/recommended',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    "one-var": 0,
    "no-tabs":"off",
    'indent': 'off',
    // 首行缩进
    'vue/script-indent': [
      'error',4,
      {
        'baseIndent': 1
      }
    ],
    "eqeqeq":0,
    "new-cap":0,
    "vue/require-default-prop":0,
    "vue/require-valid-default-prop":"off",
    "no-useless-escape":0,
    "no-unused-expressions":0,
    "semi": [2, "always"],
    "comma-dangle": 0,
    "quotes": [ 0, "single" ],
    "no-undef": 0,
    "global-strict": 0,
    "no-extra-parens": 0,
    "no-extra-semi": 0,
    "no-underscore-dangle": 0,
    "no-console": 0,
    "no-unused-vars": 0,
    "no-trailing-spaces": [0, { "skipBlankLines": true }],
    "no-unreachable": 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}

