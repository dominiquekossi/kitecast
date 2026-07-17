/**
 * Kitecast color tokens. Wind and water: a deep ocean ink, an off-white surface,
 * and a coral accent held back for favorites and strong-wind alerts. Wind
 * intensity has its own semantic ramp (good / moderate / strong) used on every
 * spot badge. UI chrome itself stays flat, no gradient buttons or panels; the
 * one place gradients belong is the literal sky in each spot's hero art below,
 * where they represent something real instead of decorating an accent.
 */
export const colors = {
  // Core surfaces and text
  ink: "#0A2A38", // deep ocean, primary text and dark UI
  inkSoft: "#3D5966", // secondary text
  muted: "#5F7784", // captions, metadata
  surface: "#EEF3F5", // app background (cool off-white)
  card: "#FFFFFF",
  line: "#D7E2E6", // hairlines and borders
  white: "#FFFFFF",

  // Brand blues (water)
  ocean: "#1B7A9E",
  oceanDeep: "#0E5A78",
  oceanSoft: "#E1EEF3", // tinted fills, hover backgrounds

  // Accent (favorites, alerts)
  coral: "#F2624C",
  coralDeep: "#D0472F",
  coralSoft: "#FCE4DE",

  // Wind intensity ramp
  wind: {
    light: "#7C93A0", // too light to ride
    good: "#1F9D6B", // clean, rideable
    moderate: "#D79A24", // strong, gusty
    strong: "#D6483B", // expert / caution
  },
} as const;

export type Colors = typeof colors;

/**
 * Spot hero art. Five named sky moods, not one gradient per spot, that
 * would be a pile of one-offs rather than a system. Each spot is assigned
 * the mood that matches how it is actually described (Tarifa's strait wind
 * reads cold and clear, Cumbuco's trades read warm and low-sun), and every
 * mood's wave ramp is built from the same ocean/oceanDeep family used
 * everywhere else in the palette, just tinted, so hero art stays tethered
 * to the app instead of floating off as its own rainbow.
 */
export type SkyMood = "sunset" | "coolBlue" | "lagoon" | "dawn" | "tropical";

export interface SpotArtPalette {
  skyTop: string;
  skyBottom: string;
  /** Back-to-front wave layers, each a touch lighter and warmer than the last. */
  waves: readonly [string, string, string];
  /**
   * The mood's UI accent: a deepened, on-white-legible version of the sky
   * hue, used anywhere the mood needs to show up outside the hero art itself
   * (tag text, rating star, the favorite button's idle state). Chosen for
   * contrast on a white card, not just lifted from the sky gradient.
   */
  accent: string;
}

export const skyMoods: Record<SkyMood, SpotArtPalette> = {
  sunset: {
    skyTop: "#E8935F",
    skyBottom: "#FBDCA6",
    waves: ["#0E5A78", "#1B7A9E", "#E8935F"],
    accent: "#C85A2B",
  },
  coolBlue: {
    skyTop: "#123A52",
    skyBottom: "#8FC1DE",
    waves: ["#0B3A52", "#1B7A9E", "#A9D2E8"],
    accent: "#123A52",
  },
  lagoon: {
    skyTop: "#1F8C8C",
    skyBottom: "#BFE8E0",
    waves: ["#0E5A78", "#2FA6A6", "#BFE8E0"],
    accent: "#147A7A",
  },
  dawn: {
    skyTop: "#C7D6DE",
    skyBottom: "#FBE0C8",
    waves: ["#3D5966", "#7FB2D6", "#FBE0C8"],
    accent: "#A9724A",
  },
  tropical: {
    skyTop: "#0E7C86",
    skyBottom: "#8FEADA",
    waves: ["#0E5A78", "#0E7C86", "#9FEDE0"],
    accent: "#0F7A72",
  },
} as const;

/** Which mood each spot's hero art uses. Keyed by `Spot.slug`. */
export const spotSkyMood: Record<string, SkyMood> = {
  cumbuco: "sunset",
  jericoacoara: "sunset",
  "boa-vista": "sunset",
  tarifa: "coolBlue",
  "le-morne": "coolBlue",
  prea: "lagoon",
  dakhla: "lagoon",
  "icarai-de-amontada": "dawn",
  taiba: "tropical",
  cabarete: "tropical",
} as const;

export function getSpotArt(slug: string): SpotArtPalette {
  const mood = spotSkyMood[slug] ?? "coolBlue";
  return skyMoods[mood];
}
