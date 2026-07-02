import { Image } from "react-native";
import { XStack, YStack } from "tamagui";

import { Typography } from "@/components/ui/typography";
import { SavedTypeIcon } from "@/features/home/components/saved-type-icon";
import { tileBorderWidths } from "@/theme/tokens";
import type { SavedItem } from "@/types/saved-item";

const thumbStyle = { height: 56, width: 56 } as const;

function typeLabel(type: SavedItem["type"]) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

// Preview of the just-saved item — shows the real image for screenshots, the
// type tile otherwise.
export function SaveSuccessPreviewCard({ item }: { item: SavedItem }) {
  return (
    <XStack
      backgroundColor="$surfacePrimary"
      borderColor="$borderSubtle"
      borderWidth={tileBorderWidths.card}
      gap="$3"
      items="center"
      p="$3"
      rounded="$sm"
      width="100%"
    >
      {item.type === "screenshot" && item.thumbnailUri ? (
        <YStack height={56} overflow="hidden" rounded="$xs" width={56}>
          <Image resizeMode="cover" source={{ uri: item.thumbnailUri }} style={thumbStyle} />
        </YStack>
      ) : (
        <SavedTypeIcon size={48} type={item.type} />
      )}

      <YStack flex={1} gap="$1">
        <Typography color="$onboardingTextPrimary" numberOfLines={1} variant="body4">
          {item.title}
        </Typography>
        <Typography color="$onboardingTextSecondary" numberOfLines={1} variant="caption1">
          {typeLabel(item.type)} · {item.collectionName}
        </Typography>
      </YStack>
    </XStack>
  );
}
