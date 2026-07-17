/**
 * Typographic tokens. Font families are named by role; the concrete faces are
 * wired per platform (web loads them via next/font, native via its own font
 * loader). Sizes are in pixels with matching line heights.
 */
export const fontFamily = {
  display: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif",
  body: "Instrument Sans, ui-sans-serif, system-ui, sans-serif",
  mono: "ui-monospace, SFMono-Regular, Menlo, monospace",
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 22,
  "2xl": 28,
  "3xl": 36,
  "4xl": 48,
  "5xl": 64,
} as const;

export const lineHeight = {
  tight: 1.1,
  snug: 1.25,
  normal: 1.5,
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export type FontSize = typeof fontSize;
