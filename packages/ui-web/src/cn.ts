import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Conditional className joiner used by every web component. `twMerge` is not
 * optional here: every component in this package sets base positioning/sizing
 * classes and expects a caller-supplied `className` to be able to override
 * them (e.g. FavoriteButton's base `relative` vs. a caller's `absolute`).
 * Plain clsx concatenates both classes and lets Tailwind's stylesheet
 * generation order silently decide the winner; twMerge makes "last one wins"
 * actually true.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
