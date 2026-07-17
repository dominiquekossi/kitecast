/**
 * Spacing scale in pixels. A single 4px-based ramp shared by every platform so
 * rhythm stays identical between web and native.
 */
export const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,
  "3xl": 48,
  "4xl": 64,
} as const;

/** Border radius scale in pixels. */
export const radius = {
  none: 0,
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

export type Spacing = typeof spacing;
export type Radius = typeof radius;
