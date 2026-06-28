import { memo } from "react";
import { XStack, YStack } from "tamagui";

import { Typography } from "@/components/ui/typography";
import type { SavedItem } from "@/types/saved-item";

import { SavedTypeIcon } from "./saved-type-icon";

type RecentItemCardProps = {
  item: SavedItem;
  // Receives the item so callers can pass a stable handler (keeps memo effective).
  onPress: (item: SavedItem) => void;
};

function typeLabel(type: SavedItem["type"]) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

// Memoized: skips re-render when its item + onPress are unchanged (cuts churn on
// realtime/store updates across long lists).
export const RecentItemCard = memo(function RecentItemCard({ item, onPress }: RecentItemCardProps) {
  return (
    <YStack
      backgroundColor="$surfacePrimary"
      pressStyle={{ opacity: 0.7 }}
      p="$3"
      rounded="$sm"
      width="100%"
      onPress={() => onPress(item)}
    >
      <XStack gap="$3" items="center" width="100%">
        <SavedTypeIcon size={48} type={item.type} />

        <YStack flex={1} gap="$2">
          <Typography color="$onboardingTextPrimary" numberOfLines={1} variant="body2">
            {item.title}
          </Typography>

          <XStack gap="$2" items="center" justify="space-between">
            <Typography color="$textTertiary" flex={1} numberOfLines={1} variant="caption2">
              {typeLabel(item.type)} · {item.collectionName}
            </Typography>
            <Typography color="$textTertiary" variant="caption2">
              {item.savedAtLabel}
            </Typography>
          </XStack>
        </YStack>
      </XStack>
    </YStack>
  );
});
