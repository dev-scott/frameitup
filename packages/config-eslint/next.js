/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...require('./index.js'),
  extends: [
    ...require('./index.js').extends,
    'next/core-web-vitals',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    ...require('./index.js').rules,
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
};
