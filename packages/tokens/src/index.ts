export * from "./colors";
export * from "./spacing";
export * from "./typography";
export * from "./contracts";

import { colors } from "./colors";
import { spacing, radius } from "./spacing";
import { fontFamily, fontSize, lineHeight, fontWeight } from "./typography";

/** The full token set as one object, handy for a theme provider or a Tailwind config. */
export const tokens = {
  colors,
  spacing,
  radius,
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
} as const;

export type Tokens = typeof tokens;
