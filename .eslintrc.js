module.exports = {
    env: {
        es2021: true,
        node: true
    },
    extends: ['standard-with-typescript', 'eslint-config-prettier'],
    overrides: [
        {
            env: {
                node: true
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script'
            }
        }
    ],
    ignorePatterns: ['**/dist/**', '**/node_modules/**', '.eslintrc.js'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'off'
    }
};