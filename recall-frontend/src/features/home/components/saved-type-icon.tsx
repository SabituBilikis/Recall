import { YStack } from "tamagui";

import type { SavedItemType } from "@/types/saved-item";

import { savedTypeVisuals } from "../constants/saved-type-visuals";

// Renders a saved-item type glyph, wrapping it in a soft tile when the type
// defines one (e.g. notes). Shared by Quick Capture and Recently Saved cards.
export function SavedTypeIcon({ size, type }: { size: number; type: SavedItemType }) {
  const visual = savedTypeVisuals[type];
  const { Icon, iconColor } = visual;
  const tileBg = "tileBg" in visual ? visual.tileBg : undefined;

  if (tileBg) {
    return (
      <YStack backgroundColor={tileBg} height={size} items="center" justify="center" rounded="$xs" width={size}>
        <Icon color={iconColor} size={Math.round(size * 0.55)} />
      </YStack>
    );
  }

  return <Icon color={iconColor} size={size} />;
}
