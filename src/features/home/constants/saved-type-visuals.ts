import type { ComponentType } from "react";

import { FileIcon, LinkIcon, NoteIcon, ScreenshotIcon, type IconProps } from "@/components/ui/icons";
import { colorValues } from "@/theme/tokens/color";
import type { SavedItemType } from "@/types/saved-item";

// `iconColor` is a literal hex for the SVG fill/stroke (SVG can't take Tamagui
// tokens); `tileBg` is a Tamagui color token for the optional soft tile.
// `satisfies` keeps the literal token types so they stay assignable to style props.
export const savedTypeVisuals = {
  screenshot: { Icon: ScreenshotIcon, iconColor: colorValues.primary500, tileBg: "$primary50" },
  link: { Icon: LinkIcon, iconColor: colorValues.blue500, tileBg: "$blue50" },
  note: { Icon: NoteIcon, iconColor: colorValues.yellow600, tileBg: "$yellow50" },
  file: { Icon: FileIcon, iconColor: colorValues.green600, tileBg: "$green50" }
} as const satisfies Record<SavedItemType, { Icon: ComponentType<IconProps>; iconColor: string; tileBg?: string }>;
