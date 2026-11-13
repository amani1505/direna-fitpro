// @ts-check
const eslint = require("@eslint/js");
const { defineConfig } = require("eslint/config");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const unusedImports = require("eslint-plugin-unused-imports");

module.exports = defineConfig([
  // Build output and caches are not source code.
  { ignores: ["dist/**", ".angular/**", "coverage/**"] },
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    plugins: { "unused-imports": unusedImports },
    rules: {
      // Selectors here don't use a shared prefix (e.g. `blog`, `Modal`,
      // `[orders-table-row]`), so prefix rules would only produce noise.
      "@angular-eslint/directive-selector": "off",
      "@angular-eslint/component-selector": "off",
      // Existing components deliberately keep Eager change detection after
      // the Angular 22 upgrade; new components get OnPush by default.
      "@angular-eslint/prefer-on-push-component-change-detection": "off",
      // Project conventions: `onX` output names and constructor injection.
      "@angular-eslint/no-output-on-prefix": "off",
      "@angular-eslint/prefer-inject": "off",
      // The codebase is free of `any`; keep it that way. Use `unknown` or a
      // real type instead.
      "@typescript-eslint/no-explicit-any": "error",
      // Unused imports are removed by `--fix`; other unused variables are
      // reported. Prefix intentionally unused ones with `_`.
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrors: "none" },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
    ],
    rules: {},
  },
]);
