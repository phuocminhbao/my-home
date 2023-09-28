/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["@remix-run/eslint-config", "@remix-run/eslint-config/node"],
  rules: {
    "@typescript-eslint/strict-boolean-expressions": "off",
    "max-len": [
      "error",
      {
        code: 150,
        ignoreRegExpLiterals: true,
      },
    ],
    "@typescript-eslint/semi": ["error", "always"],
    "@typescript-eslint/triple-slash-reference": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never",
        asyncArrow: "always",
      },
    ],
  },
};
