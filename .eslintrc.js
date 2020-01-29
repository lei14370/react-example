module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  "parser": "babel-eslint",
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
    "require-jsdoc" : 0,
    "no-invalid-this": 0,
  },
};
