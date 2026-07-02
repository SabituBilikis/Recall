# CLAUDE.md

Guidance for working in this repo. Keep it lean — production-ready React Native + Expo + TypeScript.

## Repo layout

Monorepo. The Expo app lives in **`recall-frontend/`** (all source, `app.json`, `package.json`,
`eas.json`, `metro`/`babel`/`tsconfig`, etc.). The Supabase project is in `recall-backend/`;
hostable legal pages in `website/`. **Run all `npm` / `expo` / `eas` commands from
`recall-frontend/`.** Paths below (`src/`, etc.) are relative to `recall-frontend/`.

## Product

**Recall** — personal knowledge workspace to save (screenshots, links, notes, PDFs, files, ideas) and retrieve instantly. Core promise: capture in seconds, retrieve in milliseconds. MVP excludes AI/OCR/extensions/collaboration.

## Stack

RN + Expo (Expo Router) · Tamagui (styling) · Zustand (global state) · TanStack Query · Supabase + Postgres (`saved_items`, `collections`, `tags`, `saved_item_tags`, `favorites`, `files`) · Supabase Storage · SQLite (local cache) · Reanimated + Moti (animation) · Storybook.

## Commands

```bash
npm run typecheck   # tsc --noEmit — run after every change
npm run lint        # expo lint
npm start           # expo dev server
npm run android | ios
npm run storybook:ios | storybook:android
```

## Architecture

Layered, one-way: **UI → hooks → services → Supabase**. Never call Supabase (or any backend) inside screens/components.

```
src/
  app/        Expo Router routes (thin; delegate to features)
  features/   <feature>/{components,hooks,constants,services,types}
  components/ primitives/ + ui/ (reusable, design-system)
  services/   backend calls
  hooks/      shared screen/business logic
  store/      Zustand
  lib/ types/ theme/
```

- Feature-based folders. Screens < 200 lines, components small.
- Separate UI, business logic, API calls, and types.
- Hooks hold screen logic; services hold backend calls.
- Reuse components and logic — no duplication. Search for an existing util/component before adding one.
- Strict TypeScript; no loose typing.

## Styling

- Tamagui tokens **only**. No inline styles. No hardcoded colors, spacing, font sizes, or radii.
- Use semantic color tokens (`theme/tokens/color.ts` → themes); typography variants (`theme/tokens/typography.ts`); shared spacing/radius/shadow tokens.
- SVG fills can't take Tamagui tokens — source the literal hex from `colorValues` (never hardcode).

## State handling

Every data surface handles **loading, empty, error, success, offline**. Offline-first: cached items, offline note creation, local search cache, deferred sync. Recovery: retry, graceful fallback, toast, inline errors.

## Motion

Calm, premium, purposeful — no bounce, no overshoot, no excessive scale. Transform/opacity only (UI thread, target 60fps). Reuse the shared primitives in `components/ui/motion` (`FloatingLayer`, `BreathingLayer`, `PulseRing`) + `SoftGlow`; gate ambient loops with `useReducedMotionFlag`. Animation config lives in tokens, not literals. Seamless (closed-cycle) loops.

## Non-negotiables

- Privacy-first; row-level security; validate file ownership.
- Search < 300ms; lists virtualized; images compressed; memoize; lazy-load.
- Handle edge cases and failed uploads (retry + progress).

## Workflow rules

- **Never add yourself (Claude / AI) as a co-author** anywhere — not in commits (`Co-Authored-By`), PR bodies, code comments, authors fields, or docs.
- Commit/push only when asked.
