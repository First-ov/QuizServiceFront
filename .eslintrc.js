module.exports = {
  'env': {
    'amd': true,
    'node': true,
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/recommended',
    'prettier'
  ],
  'overrides': [],
  'parser': 'vue-eslint-parser',
  'parserOptions': {
    'sourceType': 'module',
    'ecmaVersion': 2021
  },
  'plugins': [
    'vue',
    'regex'
  ],
  'rules': {
    'prefer-const': ['error', {
      'destructuring': 'any',
      'ignoreReadBeforeAssign': true
    }],
    'no-console':
      process.env.NODE_ENV === 'production'
        ? ['error', {'allow': ['info', 'warn', 'error']}]
        : ['off', {'allow': ['info', 'warn', 'error']}],
    'quotes': [2, 'single', 'avoid-escape'],
    'semi': ['error', 'never'],
    'no-underscore-dangle': 0,
    'no-var': 2,
    'no-unused-vars': ['error', {'varsIgnorePattern': '[iI]gnored|next'}],
    'camelcase': [2],
    'indent': ['error', 2],
    'comma-dangle': 1,
    'max-len': 0,
    'no-multi-str': 1,
    'global-require': 2,
    'no-mixed-operators': 1,
    'no-duplicate-imports': 1,
    'vue/no-reserved-keys': 0,
    'vue/no-v-text-v-html-on-component': 2,
    'vue/multi-word-component-names': 2,
    'vue/no-reserved-component-names': 2,
    'vue/order-in-components': 2,
    'vue/require-prop-types': 2,
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        registeredComponentsOnly: true
      }
    ],
    'regex/invalid': [
      'error', [{
        'regex': 'IndexBD',
        'message': 'IndexDB, а  не IndexBD '
      }]
    ],
    'vue/max-len': ['error', {
      'code': 80,
      'template': 120,
      'tabWidth': 2,
      'comments': 80,
      'ignorePattern': '',
      'ignoreComments': false,
      'ignoreTrailingComments': false,
      'ignoreUrls': false,
      'ignoreStrings': true,
      'ignoreTemplateLiterals': false,
      'ignoreRegExpLiterals': false,
      'ignoreHTMLAttributeValues': false,
      'ignoreHTMLTextContents': false
    }]
  }
}
