import { colorValues } from "@/theme/tokens/color";
import type { CollectionColor } from "@/types/collection";

// Each color: a light swatch (token) for the picker circle + a saturated accent
// (token for the dot bg, literal hex for the SVG folder fill). Exact hexes from
// the Figma color ellipses map to the palette *200 / accent shades. `as const`
// keeps the literal token types so they stay assignable to Tamagui style props.
export const collectionColorOptions = [
  { id: "purple", swatchToken: "$primary200", accentToken: "$primary600", accentHex: colorValues.primary600 },
  { id: "blue", swatchToken: "$blue200", accentToken: "$blue500", accentHex: colorValues.blue500 },
  { id: "grey", swatchToken: "$grey200", accentToken: "$grey400", accentHex: colorValues.grey400 },
  { id: "green", swatchToken: "$green200", accentToken: "$green500", accentHex: colorValues.green500 },
  { id: "yellow", swatchToken: "$yellow200", accentToken: "$yellow500", accentHex: colorValues.yellow500 },
  { id: "red", swatchToken: "$red200", accentToken: "$red500", accentHex: colorValues.red500 }
] as const satisfies readonly {
  id: CollectionColor;
  swatchToken: string;
  accentToken: string;
  accentHex: string;
}[];

export type CollectionColorOption = (typeof collectionColorOptions)[number];

export const collectionColorById = Object.fromEntries(
  collectionColorOptions.map((option) => [option.id, option])
) as Record<CollectionColor, CollectionColorOption>;
