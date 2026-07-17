/**
 * Shared component prop contracts.
 *
 * These are the semantic APIs of the design system, the vocabulary every
 * platform agrees on. They are intentionally free of React and DOM types: the
 * web package extends each contract with `HTMLAttributes` and `onClick`, and the
 * future native package will extend the same contract with its own primitives
 * and `onPress`. The contract is shared; the rendering is not.
 */

export type Variant = "solid" | "outline" | "ghost";
export type Size = "sm" | "md" | "lg";
export type Tone = "ocean" | "coral" | "neutral";

/** Wind intensity tones, also used directly by the wind badge. */
export type WindTone = "light" | "good" | "moderate" | "strong";
export type BadgeTone = WindTone | "neutral" | "ocean";

export interface ButtonContract {
  variant?: Variant;
  size?: Size;
  tone?: Tone;
  disabled?: boolean;
  fullWidth?: boolean;
}

export interface CardContract {
  /** Raised affordance for cards that behave like links or buttons. */
  interactive?: boolean;
}

export interface BadgeContract {
  tone?: BadgeTone;
}

export interface ChipContract {
  selected?: boolean;
}

export interface InputContract {
  size?: Size;
  invalid?: boolean;
}

export interface ListItemContract {
  interactive?: boolean;
}
