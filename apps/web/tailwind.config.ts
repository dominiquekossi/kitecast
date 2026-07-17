import type { Config } from "tailwindcss";
import { colors, radius } from "@kitecast/tokens";

/**
 * The Tailwind theme is derived directly from the shared design tokens, so the
 * web app and the token package can never drift. The future native app consumes
 * the same `colors` and `radius` objects through its own StyleSheet.
 */
const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/ui-web/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: colors.ink, soft: colors.inkSoft },
        muted: colors.muted,
        surface: colors.surface,
        card: colors.card,
        line: colors.line,
        ocean: { DEFAULT: colors.ocean, deep: colors.oceanDeep, soft: colors.oceanSoft },
        coral: { DEFAULT: colors.coral, deep: colors.coralDeep, soft: colors.coralSoft },
        wind: {
          light: colors.wind.light,
          good: colors.wind.good,
          moderate: colors.wind.moderate,
          strong: colors.wind.strong,
        },
      },
      borderRadius: {
        sm: `${radius.sm}px`,
        md: `${radius.md}px`,
        lg: `${radius.lg}px`,
        xl: `${radius.xl}px`,
        pill: `${radius.pill}px`,
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        // Dash pattern slides along its own line; actual speed comes from an
        // inline animation-duration set per instance from real wind speed.
        "wind-flow": {
          "0%": { strokeDashoffset: "0" },
          "100%": { strokeDashoffset: "-28" },
        },
      },
      animation: {
        "wind-flow": "wind-flow linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
