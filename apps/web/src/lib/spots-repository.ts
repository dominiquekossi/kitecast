import type { Spot } from "./types";
import { spots } from "./spots-data";

/**
 * The data seam. Screens depend only on these async accessors, never on the
 * mock array directly. To go live, replace the bodies with `fetch` calls to a
 * weather API and map the response into `Spot`; nothing else has to change.
 */

export async function getSpots(): Promise<Spot[]> {
  return spots;
}

export async function getSpot(slug: string): Promise<Spot | null> {
  return spots.find((spot) => spot.slug === slug) ?? null;
}

export async function getSpotSlugs(): Promise<string[]> {
  return spots.map((spot) => spot.slug);
}
