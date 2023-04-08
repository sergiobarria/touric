module.exports = {
    env: {
        es2021: true,
        node: true
    },
    extends: ['standard-with-typescript', 'eslint-config-prettier'],
    overrides: [],
    parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/no-confusing-void-expression': 'off'
    }
}
