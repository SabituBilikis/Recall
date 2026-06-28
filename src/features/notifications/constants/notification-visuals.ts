import type { ComponentType } from "react";

import {
  AlertCircleIcon,
  BellIcon,
  CollectionsIcon,
  NoteIcon,
  RecallMark,
  type IconProps
} from "@/components/ui/icons";
import { colorValues } from "@/theme/tokens/color";
import type { NotificationType } from "@/types/notification";

// Per-type glyph + soft tile. `iconColor` is a literal hex (SVG can't take
// Tamagui tokens); `tileBg` is a Tamagui color token.
export const notificationVisuals = {
  welcome: { Icon: RecallMark, iconColor: colorValues.primary500, tileBg: "$primary50" },
  reminder: { Icon: BellIcon, iconColor: colorValues.yellow600, tileBg: "$yellow50" },
  system: { Icon: AlertCircleIcon, iconColor: colorValues.blue500, tileBg: "$blue50" },
  item: { Icon: NoteIcon, iconColor: colorValues.green600, tileBg: "$green50" },
  collection: { Icon: CollectionsIcon, iconColor: colorValues.primary500, tileBg: "$primary50" }
} as const satisfies Record<NotificationType, { Icon: ComponentType<IconProps>; iconColor: string; tileBg: string }>;
