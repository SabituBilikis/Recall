import { XStack, YStack } from "tamagui";

import { Typography } from "@/components/ui/typography";
import { tileBorderWidths } from "@/theme/tokens";
import type { Collection } from "@/types/collection";

import { collectionColorById } from "../constants/collection-colors";
import { collectionsContent } from "../constants/collections-content";
import { CollectionGlyph } from "./collection-glyphs";

export function CollectionCard({ collection, onPress }: { collection: Collection; onPress: () => void }) {
  const accent = collectionColorById[collection.color];

  return (
    <YStack
      accessibilityRole="button"
      accessibilityLabel={`Collection ${collection.name}, ${collection.itemCount} ${collectionsContent.itemsSuffix}`}
      backgroundColor="$surfacePrimary"
      borderColor="$surfaceMuted"
      borderWidth={tileBorderWidths.card}
      flex={1}
      gap="$3"
      p="$4"
      pressStyle={{ opacity: 0.7 }}
      rounded="$md"
      onPress={onPress}
    >
      <XStack items="flex-start" justify="space-between" width="100%">
        <CollectionGlyph color={accent.accentHex} id={collection.icon} size={24} />
        <YStack backgroundColor={accent.accentToken} height={10} rounded="$xxl" width={10} />
      </XStack>

      <YStack gap="$4">
        <Typography color="$onboardingTextPrimary" numberOfLines={1} variant="body2">
          {collection.name}
        </Typography>
        <YStack gap="$1">
          <Typography color="$textTertiary" variant="caption2">
            {collection.itemCount} {collectionsContent.itemsSuffix}
          </Typography>
          <Typography color="$textDisabled" variant="caption3">
            Updated {collection.lastUpdatedLabel}
          </Typography>
        </YStack>
      </YStack>
    </YStack>
  );
}
