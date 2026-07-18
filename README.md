# Kitecast

A kitesurf wind and spots app. Browse spots, read current wind conditions, save
favorites. Built as a Turborepo monorepo with a shared design system so the same
visual language can drive a web app today and a native app next.

> Wind data is mocked (a static TypeScript dataset) behind an async repository, so
> swapping in a real weather API later is a one-file change and does not touch the UI.

## Status

- **Web app** (`apps/web`): complete and functional. Spots list, spot detail, and
  favorites all work end to end, built on the shared design system in
  `packages/tokens`.
- **Mobile app** (`apps/mobile`): P0 complete and verified (Expo + Expo Router,
  three screens: Spots, spot detail, Favorites, tab navigation, per-spot mood
  gradient card backgrounds, working favorite toggle via Context). P1 partial:
  see "Mobile: P0 vs P1" below for exactly what's in and what's out.

## Monorepo layout

```
kitecast/
  apps/
    web/            Next.js (App Router) + TypeScript + Tailwind
    mobile/         Expo (Expo Router) + TypeScript + NativeWind
  packages/
    tokens/         design tokens + prop contracts, pure TypeScript, no React
    ui-web/         web UI components (Button, Card, Badge, Input, ListItem, Chip)
    ui-native/      native UI components (Button, Card, Badge, FavoriteButton)
    config/         shared TypeScript and ESLint configuration
```

## The key architecture decision

**Share the tokens and the prop contract, not the component code.**

Trying to run one component implementation across web and native (React Native) is a
well-known trap: the primitives differ (`div` vs `View`, CSS vs `StyleSheet`, hover vs
press), and the shared abstraction that hides those differences usually ends up worse
than two focused implementations.

So Kitecast shares the two things that genuinely should be identical across platforms:

1. **Design tokens** (`packages/tokens`) are plain TypeScript values, colors, spacing,
   radii, and type scale, with no dependency on React or the DOM. Web consumes them
   through the Tailwind theme; the future native app will consume the same values in
   `StyleSheet`.
2. **Prop contracts** (`packages/tokens/src/contracts.ts`) are the semantic component
   APIs, `variant`, `size`, `tone`, and so on. Both platforms implement the same
   contract with platform-appropriate primitives and events.

The rendering is deliberately platform-specific: `packages/ui-web` implements the
contract with Tailwind on real DOM elements. The native app will implement the same
contract with React Native primitives. Same identity, right tool per platform.

## Design direction

Wind and water. A deep ocean ink, an off-white surface, and a coral accent reserved for
favorites and strong-wind alerts. Wind intensity is color coded on every spot card
(good, moderate, strong), paired with a direction arrow. No purple-blue gradients, no
glassmorphism.

## Mobile: P0 vs P1

Built under a hard time limit, split into a required P0 and a nice-to-have P1, in
priority order. Reporting honestly rather than blurring the line:

**P0, done and verified** (typecheck clean, screenshots in `.artifacts/mobile-*.png`,
favoriting tested end to end including in-app tab navigation):

- Expo + TypeScript + Expo Router, tab navigation between Spots and Favorites
- `packages/ui-native` with NativeWind: `Button`, `Card`, `Badge`, `FavoriteButton`
- Three screens: spots list, spot detail, favorites
- Each card's hero uses a two-color gradient from that spot's mood
  (`getSpotArt` from `packages/tokens`, unmodified)
- Favoriting works via Context (in-memory, resets on reload, as specified for P0)

**P1, in priority order, done so far: item 1 only**

1. ✅ **SVG wave layers in the card hero** — done, `react-native-svg`, same three-layer
   look as the web version's `SpotHero`.
2. ❌ **AsyncStorage persistence for favorites** — not done. Favorites reset on reload.
3. ❌ **Featured/highlight treatment for the best-condition spot** — not done. All
   cards in the list render at the same size; `getConditionScore` (duplicated from
   web, see below) is not yet wired into the mobile list.
4. ❌ **Favorite animation** — not done. The heart swaps fill/color instantly, no
   pop or particle animation like the web version.

## Data layer

`apps/web/src/lib` holds the data seam:

- `types.ts` the domain types (`Spot`, `WindCondition`, ...)
- `spots-data.ts` the static mock dataset (Ceara and international destinations)
- `spots-repository.ts` async accessors (`getSpots`, `getSpot`) that stand in for a real
  API. Swap the body of these for `fetch` calls and the screens stay unchanged.
- `wind.ts` maps a wind speed in knots to an intensity level and its token color.

**Temporary duplication:** `apps/mobile/src/lib` currently has its own copies of
`types.ts`, `spots-data.ts`, `wind.ts`, and `spots-repository.ts`, kept by hand in sync
with `apps/web/src/lib`. This was a deliberate time trade-off, not an oversight: moving
this into a shared `packages/data` (or similar) is the right long-term fix and should
happen before the two copies drift.

## Getting started

```bash
npm install
npm run dev        # runs the web app via Turborepo
npm run build      # builds every workspace
npm run typecheck  # type-checks every workspace

cd apps/mobile
npm run web         # Expo web (http://localhost:8081)
npm run start        # Expo dev server (scan the QR code with Expo Go)
```

The web app runs at http://localhost:3000.
