# Recall Design System

This folder translates the Figma `Recall Platform` design-system page into production Tamagui foundations.

## Token Categories

`tokens/color.ts` stores the raw Figma color ramps: black/white alpha scales, primary, grey, success, danger, warning, info, surface, and text colors.

`themes/light.ts` maps raw colors into semantic roles such as `surfacePrimary`, `textSecondary`, `borderSubtle`, `accentPrimary`, `success`, `danger`, `warning`, and `info`. Components should consume these semantic names instead of palette names.

`themes/dark.ts` intentionally mirrors light values for now. It exists to lock the theme shape, but dark mode should not diverge until Figma provides approved dark values.

`tokens/typography.ts` stores the Figma text and button type ramp using Plus Jakarta Sans.

`tokens/space.ts`, `tokens/size.ts`, and `tokens/radius.ts` provide reusable layout primitives. The confirmed Figma radii are `xs = 8`, `sm = 12`, and `xl = 24`.

`tokens/shadow.ts` stores the Figma shadow layers from `100` to `800`. React Native supports one native shadow layer, so `nativeShadowTokens` approximates each Figma stack while preserving the full multi-layer source data.

`tokens/z-index.ts` and `tokens/animation.ts` are foundation-only contracts. Figma does not currently define these values, so keep them isolated and revisit when motion/overlay specs are added.

## Naming

Primitive palette tokens use source names from Figma, for example `primary500` and `grey200`.

Semantic theme tokens describe intent, for example `textPrimary`, `surfaceSubtle`, `borderFocus`, and `dangerSoft`.

Components should use semantic tokens first. Use primitive palette tokens only inside theme files or low-level token documentation.

## Component Rules

Screens should stay thin and import shared primitives from `src/components/primitives`.

Reusable UI should use Tamagui props and tokens only. Do not add inline styles, NativeWind classes, raw React Native styles, or one-off hex values in components.

Feature components may introduce variants later, but the design values still belong in `src/theme`.
