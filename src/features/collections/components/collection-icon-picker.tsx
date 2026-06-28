import { XStack, YStack } from "tamagui";

import { Typography } from "@/components/ui/typography";
import { colorValues } from "@/theme/tokens/color";
import type { CollectionColor, CollectionIcon } from "@/types/collection";

import { collectionColorById } from "../constants/collection-colors";
import { collectionIconOptions } from "../constants/collection-icons";
import { collectionsContent } from "../constants/collections-content";
import { CollectionGlyph } from "./collection-glyphs";

type CollectionIconPickerProps = {
  color: CollectionColor;
  onChange: (icon: CollectionIcon) => void;
  value: CollectionIcon;
};

export function CollectionIconPicker({ color, onChange, value }: CollectionIconPickerProps) {
  const accentHex = collectionColorById[color].accentHex;

  return (
    <YStack gap="$4" items="center" width="100%">
      <Typography color="$onboardingTextPrimary" variant="body2" width="100%">
        {collectionsContent.fields.icon}
      </Typography>

      <XStack items="center" justify="space-between" width="100%">
        {collectionIconOptions.map((id) => (
          <YStack key={id} pressStyle={{ opacity: 0.7 }} onPress={() => onChange(id)}>
            <CollectionGlyph color={value === id ? accentHex : colorValues.grey300} id={id} size={24} />
          </YStack>
        ))}
      </XStack>
    </YStack>
  );
}
