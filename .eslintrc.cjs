module.exports = {
    env: {
        browser: true,
        es2021: true,
        'jest/globals': true,
    },
    extends: ['airbnb-base', 'prettier'],
    plugins: ['jest'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'max-classes-per-file': ['error', 7],
        'import/prefer-default-export': 'off',
    },
};
