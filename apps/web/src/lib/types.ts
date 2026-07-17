export type Cardinal = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";

export interface WindCondition {
  /** Sustained wind speed in knots. */
  speedKnots: number;
  /** Gust speed in knots. */
  gustKnots: number;
  /** Meteorological direction in degrees (the direction the wind comes from). */
  directionDeg: number;
  cardinal: Cardinal;
}

export type WaterType = "Flat" | "Chop" | "Waves";
export type SkillLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Spot {
  slug: string;
  name: string;
  region: string;
  country: string;
  summary: string;
  description: string;
  bestMonths: string;
  /** 0 to 5, one decimal. */
  rating: number;
  waterType: WaterType;
  level: SkillLevel;
  wind: WindCondition;
}
