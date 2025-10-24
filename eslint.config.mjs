
import globals from "globals";
import pluginJsdoc from "eslint-plugin-jsdoc";
import pluginN from "eslint-plugin-n";
import pluginTs from '@typescript-eslint/eslint-plugin';
import pluginPromise from "eslint-plugin-promise";
import { defineConfig } from "eslint/config";

export default defineConfig({
  languageOptions: {
    parser: '@typescript-eslint/parser',
    globals: globals.node,
    parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2024,
    sourceType: 'module',
  }
  },
  plugins: {         
    '@typescript-eslint': pluginTs,
    jsdoc: pluginJsdoc,
    promise: pluginPromise,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    "plugin:prettier/recommended",
  ],
  rules: {
    // Общие правила
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "no-console": "off",
    "no-undef": "error",
    "eqeqeq": ["error", "always"],
    "curly": ["error", "all"],

    // Node.js
    "n/no-missing-require": "error",
    "n/no-extraneous-require": "error",
    "n/no-deprecated-api": "warn",
    "n/no-unsupported-features/es-syntax": "off",

    // Promise
    "promise/always-return": "off",
    "promise/no-return-wrap": "error",
    "promise/param-names": "error",
    "promise/catch-or-return": "warn",
    "promise/no-nesting": "warn",
    "require-await": "warn",       // Предупреждает, если функция async не использует await
    "no-return-await": "warn",     // Предупреждает лишний return await

    // JSDoc
    "jsdoc/check-alignment": "warn",
    "jsdoc/check-indentation": "warn",
    "jsdoc/check-param-names": "warn",
    "jsdoc/require-param": "warn",
    "jsdoc/require-param-description": "warn",
    "jsdoc/require-param-type": "warn",
    "jsdoc/require-returns": "warn",
    "jsdoc/require-returns-type": "warn",
    "jsdoc/check-tag-names": "warn",
    "jsdoc/require-jsdoc": [
      "warn",
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
        },
      },
    ],
  },
});
