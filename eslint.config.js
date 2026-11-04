/* eslint-disable @typescript-eslint/no-require-imports */

const js = require("@eslint/js");
const esX = require("eslint-plugin-es-x");
const prettierRecommended = require("eslint-plugin-prettier/recommended");
const { defineConfig } = require("eslint/config");
const globals = require("globals");
const tseslint = require("typescript-eslint");

module.exports = defineConfig([
  {
    ignores: ["**/dist/**"],
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  prettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    // The builds target ES2015 and tsdown lowers newer syntax, but built-ins
    // aren't polyfilled, so package source must not use any newer than
    // ES2015.
    files: ["packages/*/src/**/*.ts"],
    ignores: ["**/*.test.ts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    ...esX.configs["flat/restrict-to-es2015"],
    rules: {
      ...esX.configs["flat/restrict-to-es2015"].rules,
      // Syntax that tsdown lowers to ES2015.
      "es-x/no-async-functions": "off",
      "es-x/no-async-iteration": "off",
      "es-x/no-class-instance-fields": "off",
      "es-x/no-class-private-fields": "off",
      "es-x/no-class-private-methods": "off",
      "es-x/no-class-static-block": "off",
      "es-x/no-class-static-fields": "off",
      "es-x/no-exponential-operators": "off",
      "es-x/no-logical-assignment-operators": "off",
      "es-x/no-nullish-coalescing-operators": "off",
      "es-x/no-numeric-separators": "off",
      "es-x/no-optional-catch-binding": "off",
      "es-x/no-optional-chaining": "off",
      "es-x/no-rest-spread-properties": "off",
      "es-x/no-trailing-function-commas": "off",
    },
  },
]);
