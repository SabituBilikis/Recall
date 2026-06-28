import { Image } from "react-native";
import { XStack, YStack } from "tamagui";

import { RecallMark } from "@/components/ui/icons";
import { Typography } from "@/components/ui/typography";
import { tileBorderWidths } from "@/theme/tokens";

import type { LinkPreview } from "../mock/mock-link-previews";

const thumbStyle = { height: 64, width: 90 } as const;

// Link preview: real OG image when available, brand mark as the fallback.
export function LinkPreviewCard({ preview }: { preview: LinkPreview }) {
  return (
    <XStack
      backgroundColor="$surfacePrimary"
      borderColor="$borderSubtle"
      borderWidth={tileBorderWidths.card}
      gap="$3"
      items="center"
      p="$3"
      rounded="$xs"
      width="100%"
    >
      <YStack
        backgroundColor="$accentPrimarySoft"
        height={64}
        items="center"
        justify="center"
        overflow="hidden"
        rounded="$xs"
        width={90}
      >
        {preview.imageUrl ? (
          <Image resizeMode="cover" source={{ uri: preview.imageUrl }} style={thumbStyle} />
        ) : (
          <RecallMark size={36} />
        )}
      </YStack>
      <YStack flex={1} gap="$2">
        <Typography color="$onboardingTextPrimary" numberOfLines={1} variant="body4">
          {preview.title}
        </Typography>
        <Typography color="$onboardingTextSecondary" numberOfLines={2} variant="caption1">
          {preview.description}
        </Typography>
      </YStack>
    </XStack>
  );
}

// Placeholder shown while the preview is being fetched.
LinkPreviewCard.Skeleton = function LinkPreviewSkeleton() {
  return (
    <XStack
      backgroundColor="$surfacePrimary"
      borderColor="$borderSubtle"
      borderWidth={tileBorderWidths.card}
      gap="$3"
      items="center"
      p="$3"
      rounded="$xs"
      width="100%"
    >
      <YStack backgroundColor="$surfaceMuted" height={64} rounded="$xs" width={90} />
      <YStack flex={1} gap="$2">
        <YStack backgroundColor="$surfaceMuted" height={12} rounded="$xs" width="70%" />
        <YStack backgroundColor="$surfaceMuted" height={10} rounded="$xs" width="90%" />
      </YStack>
    </XStack>
  );
};
