/** @type {import('eslint').Linter.Config} */
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        '@remix-run/eslint-config',
        '@remix-run/eslint-config/node',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'prettier'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname
    },
    plugins: ['react', 'jsx-a11y', 'prettier'],
    rules: {
        '@typescript-eslint/strict-boolean-expressions': 'off',
        'max-len': [
            'error',
            {
                code: 150,
                ignoreRegExpLiterals: true
            }
        ],
        '@typescript-eslint/semi': ['error', 'always'],
        '@typescript-eslint/triple-slash-reference': 'off',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'always',
                named: 'never',
                asyncArrow: 'always'
            }
        ],
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto'
            }
        ]
    }
};
