import type { Spot } from "./types";

/**
 * Static mock dataset. This is the only file that knows the data is not live.
 * The repository (`spots-repository.ts`) reads from here today and can read from
 * a weather API tomorrow without any screen changing.
 */
export const spots: Spot[] = [
  {
    slug: "cumbuco",
    name: "Cumbuco",
    region: "Ceara",
    country: "Brazil",
    summary: "Steady side-onshore trade winds and a long flatwater lagoon.",
    description:
      "One of the most reliable kite destinations on the planet. From August through December the trade winds blow almost every afternoon, and the Cauipe lagoon a short buggy ride away is glassy, waist-deep, and perfect for freestyle progression.",
    bestMonths: "August to December",
    rating: 4.8,
    waterType: "Flat",
    level: "Beginner",
    wind: { speedKnots: 22, gustKnots: 26, directionDeg: 110, cardinal: "E" },
  },
  {
    slug: "jericoacoara",
    name: "Jericoacoara",
    region: "Ceara",
    country: "Brazil",
    summary: "World-famous dunes, downwinders, and warm cross-shore wind.",
    description:
      "Jeri is a bucket-list downwind playground. Ride from lagoon to lagoon along the dunes, finish with the sunset climb up Duna do Por do Sol. The wind is warm, consistent, and strong enough to keep advanced riders grinning.",
    bestMonths: "July to January",
    rating: 4.9,
    waterType: "Chop",
    level: "Intermediate",
    wind: { speedKnots: 24, gustKnots: 29, directionDeg: 100, cardinal: "E" },
  },
  {
    slug: "prea",
    name: "Prea",
    region: "Ceara",
    country: "Brazil",
    summary: "Flat water inside the sandbar, small waves outside.",
    description:
      "Just up the coast from Jeri, Prea offers a bit of everything: butter-flat riding close to shore at low tide, playful waves further out, and the same dependable Ceara wind machine without the crowds.",
    bestMonths: "August to January",
    rating: 4.7,
    waterType: "Flat",
    level: "Beginner",
    wind: { speedKnots: 21, gustKnots: 25, directionDeg: 105, cardinal: "E" },
  },
  {
    slug: "icarai-de-amontada",
    name: "Icarai de Amontada",
    region: "Ceara",
    country: "Brazil",
    summary: "A quiet fishing village with vast, empty flatwater.",
    description:
      "For riders who want space, Icarai delivers kilometres of shallow flatwater and a laid-back village pace. The wind is textbook Ceara, side-onshore and steady, and the lack of crowds makes it a favourite for long downwinders.",
    bestMonths: "August to December",
    rating: 4.6,
    waterType: "Flat",
    level: "Intermediate",
    wind: { speedKnots: 20, gustKnots: 24, directionDeg: 95, cardinal: "E" },
  },
  {
    slug: "taiba",
    name: "Taiba",
    region: "Ceara",
    country: "Brazil",
    summary: "A famous lagoon and a mellow point break down the beach.",
    description:
      "Taiba pairs a stunning freshwater lagoon with an easygoing right-hand point break. Mornings are for flatwater carving; afternoons the wind fills in for waves. A well-rounded spot that grows with you.",
    bestMonths: "September to January",
    rating: 4.5,
    waterType: "Flat",
    level: "Intermediate",
    wind: { speedKnots: 19, gustKnots: 23, directionDeg: 100, cardinal: "E" },
  },
  {
    slug: "tarifa",
    name: "Tarifa",
    region: "Andalusia",
    country: "Spain",
    summary: "Europe's kite capital where two winds funnel through the strait.",
    description:
      "The Levante from the east and the Poniente from the west accelerate through the Strait of Gibraltar, making Tarifa windy on a scale few places match. The Levante can be strong and gusty, so pick your day and your kite size carefully.",
    bestMonths: "April to October",
    rating: 4.6,
    waterType: "Chop",
    level: "Advanced",
    wind: { speedKnots: 27, gustKnots: 34, directionDeg: 90, cardinal: "E" },
  },
  {
    slug: "cabarete",
    name: "Cabarete",
    region: "Puerto Plata",
    country: "Dominican Republic",
    summary: "Thermal afternoon wind and a friendly reef-protected bay.",
    description:
      "The Caribbean sun heats the land and pulls in a reliable thermal breeze most afternoons. Kite Beach is protected by a reef, giving you flat sections inside and waves on the reef for when you want to play.",
    bestMonths: "June to September",
    rating: 4.4,
    waterType: "Waves",
    level: "Intermediate",
    wind: { speedKnots: 18, gustKnots: 22, directionDeg: 70, cardinal: "E" },
  },
  {
    slug: "dakhla",
    name: "Dakhla",
    region: "Western Sahara",
    country: "Morocco",
    summary: "A huge flatwater lagoon between desert and Atlantic.",
    description:
      "A 40km lagoon of flat, shallow, turquoise water hemmed by desert dunes. The wind is remarkably consistent and the lagoon is beginner-safe on the inside while still delivering speed runs for the experienced.",
    bestMonths: "March to October",
    rating: 4.7,
    waterType: "Flat",
    level: "Beginner",
    wind: { speedKnots: 23, gustKnots: 27, directionDeg: 30, cardinal: "NE" },
  },
  {
    slug: "le-morne",
    name: "Le Morne",
    region: "Mauritius",
    country: "Mauritius",
    summary: "Lagoon flatwater under a mountain, with One Eye out back.",
    description:
      "A postcard lagoon sits beneath the Le Morne mountain, offering protected flatwater for all levels. Beyond the reef, the legendary One Eye wave draws advanced riders when the swell and wind line up.",
    bestMonths: "June to September",
    rating: 4.8,
    waterType: "Waves",
    level: "Advanced",
    wind: { speedKnots: 22, gustKnots: 28, directionDeg: 135, cardinal: "SE" },
  },
  {
    slug: "boa-vista",
    name: "Boa Vista",
    region: "Cape Verde",
    country: "Cape Verde",
    summary: "Warm Atlantic trade winds and empty golden beaches.",
    description:
      "Off the coast of West Africa, Boa Vista serves warm water, dependable trade winds, and long stretches of empty beach. Waves and chop on the exposed coast keep it interesting for intermediate and advanced riders.",
    bestMonths: "November to May",
    rating: 4.5,
    waterType: "Waves",
    level: "Intermediate",
    wind: { speedKnots: 25, gustKnots: 30, directionDeg: 45, cardinal: "NE" },
  },
];
