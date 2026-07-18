/**
 * NativeWind handles layout utilities here (spacing, flex, rounded corners,
 * type scale). Actual brand colors come from `@kitecast/tokens` applied via
 * the `style` prop in `packages/ui-native` components, not a Tailwind theme:
 * Metro (which runs this app) transpiles TS fine at runtime, but a plain
 * Node `require()` of the token package's ESM/TS source from this config
 * file is a different, riskier problem, so color stays token-driven at the
 * component level instead of duplicated into a parallel Tailwind theme.
 */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "../../packages/ui-native/src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
