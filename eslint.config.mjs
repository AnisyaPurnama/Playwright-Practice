import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import eslintPlaywrightPlugin from "eslint-plugin-playwright";

export default defineConfig([
  {
    ignores: ["node_modules", "playwright-report", "dist"],
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "no-unused-vars": ["warn"],
    },
  },
  {
    files: ["tests/**/*.js"],
    plugins: {
      playwright: eslintPlaywrightPlugin,
    },
    languageOptions: {
      globals: {
        page: "readonly",
        expect: "readonly",
        test: "readonly",
      },
    },
    rules: {
      ...eslintPlaywrightPlugin.configs.recommended.rules,
    },
  },
]);
