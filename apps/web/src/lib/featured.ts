import { getConditionScore } from "./wind";
import type { Spot } from "./types";

/** Splits spots into the single best-condition-right-now spot and the rest. */
export function splitFeatured(spots: Spot[]): { featured: Spot; rest: Spot[] } {
  const ranked = [...spots].sort(
    (a, b) =>
      getConditionScore(b.wind.speedKnots, b.rating) - getConditionScore(a.wind.speedKnots, a.rating),
  );
  const [featured, ...rest] = ranked;
  return { featured, rest };
}
