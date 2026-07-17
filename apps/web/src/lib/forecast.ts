import type { Spot } from "./types";

export interface ForecastPoint {
  hour: number;
  speedKnots: number;
}

/** Tiny deterministic string hash, so forecasts vary per spot without Math.random. */
function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/**
 * Deterministic mock hourly forecast, 6h to 18h, modeling a typical thermal
 * wind day: builds through the morning, peaks in the early afternoon, eases
 * off before evening. The spot's own `wind.speedKnots` anchors the peak, so
 * this chart always agrees with the badge shown elsewhere for the same spot.
 * Being deterministic (not random) matters here: it keeps server and client
 * render identical, so there's no hydration mismatch.
 */
export function getHourlyForecast(spot: Spot): ForecastPoint[] {
  const hash = hashSlug(spot.slug);
  const peakHour = 12 + (hash % 3); // 12, 13, or 14
  const peak = spot.wind.speedKnots;
  const base = peak * 0.55;

  const points: ForecastPoint[] = [];
  for (let hour = 6; hour <= 18; hour += 1) {
    const distance = hour - peakHour;
    const bell = Math.exp(-(distance * distance) / 18);
    const wobble = ((hash >> (hour % 8)) % 5) - 2; // deterministic -2..2 jitter
    const speed = base + (peak - base) * bell + wobble * 0.4;
    points.push({ hour, speedKnots: Math.max(4, Math.round(speed * 10) / 10) });
  }
  return points;
}
