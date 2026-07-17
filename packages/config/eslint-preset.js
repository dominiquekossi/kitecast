/**
 * Shared ESLint preset for Kitecast packages. Kept intentionally small: the web
 * app layers `eslint-config-next` on top of this for its own rules. Extend it
 * from a package with:
 *
 *   { "extends": ["@kitecast/config/eslint-preset"] }
 */
module.exports = {
  root: false,
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: 2022, sourceType: "module" },
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/consistent-type-imports": "warn",
  },
  ignorePatterns: ["dist", ".next", "node_modules"],
};
