import config from 'eslint-config-standard';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
    pluginJs.configs.recommended,
    {
        rules: {
            'no-console': 'warn',
            'no-undef': '1',
            'no-unused-vars': 'error',
            console: '1',
        },
    },
    ...[].concat(config),
];
