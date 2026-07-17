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
- **Mobile app** (`apps/mobile`): planned, not started yet.

## Monorepo layout

```
kitecast/
  apps/
    web/            Next.js (App Router) + TypeScript + Tailwind
    mobile/         reserved for the Expo app (added next)
  packages/
    tokens/         design tokens + prop contracts, pure TypeScript, no React
    ui-web/         web UI components (Button, Card, Badge, Input, ListItem, Chip)
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

## Getting started

```bash
npm install
npm run dev        # runs the web app via Turborepo
npm run build      # builds every workspace
npm run typecheck  # type-checks every workspace
```

The web app runs at http://localhost:3000.

## Data layer

`apps/web/src/lib` holds the data seam:

- `types.ts` the domain types (`Spot`, `WindCondition`, ...)
- `spots-data.ts` the static mock dataset (Ceara and international destinations)
- `spots-repository.ts` async accessors (`getSpots`, `getSpot`) that stand in for a real
  API. Swap the body of these for `fetch` calls and the screens stay unchanged.
- `wind.ts` maps a wind speed in knots to an intensity level and its token color.
