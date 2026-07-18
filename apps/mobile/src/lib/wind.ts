import type { BadgeTone } from "@kitecast/tokens";
import type { Cardinal } from "./types";

export interface WindLevel {
  tone: BadgeTone;
  label: string;
}

/**
 * Maps a sustained wind speed in knots to an intensity level. Thresholds are
 * tuned for kitesurfing (not general sailing): under 12kt most kites won't
 * plane, 12 to 18 is the friendly learning zone, 18 to 27 is the prime
 * powered-up range, and above 27 is expert-only, small-kite territory.
 *
 * Duplicated from apps/web/src/lib/wind.ts (see README "Status" section).
 */
export function getWindLevel(speedKnots: number): WindLevel {
  if (speedKnots < 12) return { tone: "light", label: "Light" };
  if (speedKnots < 18) return { tone: "good", label: "Good" };
  if (speedKnots < 27) return { tone: "moderate", label: "Strong" };
  return { tone: "strong", label: "Very strong" };
}

const CARDINAL_ROTATION: Record<Cardinal, number> = {
  N: 0,
  NE: 45,
  E: 90,
  SE: 135,
  S: 180,
  SW: 225,
  W: 270,
  NW: 315,
};

/**
 * Rotation, in degrees, for an arrow icon that points "up" by default, so it
 * visually points in the direction the wind is blowing toward (the reciprocal
 * of the meteorological "from" direction riders read off a forecast).
 */
export function getWindArrowRotation(cardinal: Cardinal): number {
  return (CARDINAL_ROTATION[cardinal] + 180) % 360;
}

/**
 * A simple 0 to 1 "how good is this session, right now" score: wind speed
 * peaking in the powered-but-comfortable range, blended with the spot's own
 * rating. Used to pick the featured spot (P1), not shown to users as a number.
 */
export function getConditionScore(speedKnots: number, rating: number): number {
  const idealMid = 21;
  const windScore = Math.max(0, 1 - Math.abs(speedKnots - idealMid) / 15);
  return windScore * 0.6 + (rating / 5) * 0.4;
}
