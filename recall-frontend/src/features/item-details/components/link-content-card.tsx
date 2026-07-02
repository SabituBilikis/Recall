import { Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { YStack } from "tamagui";

import { RecallMark } from "@/components/ui/icons";
import { Typography } from "@/components/ui/typography";

import type { DetailItem } from "../types/item.types";
import { DetailCard } from "./detail-card";

const heroStyle = { height: 171, width: "100%" } as const;

export function LinkContentCard({ item }: { item: DetailItem }) {
  const canOpen = !!item.url;

  return (
    <DetailCard
      accessibilityRole={canOpen ? "link" : undefined}
      accessibilityLabel={canOpen ? `Open ${item.previewTitle ?? item.title}` : undefined}
      gap="$4"
      px="$4"
      py="$6"
      rounded={20}
      pressStyle={canOpen ? { opacity: 0.85 } : undefined}
      onPress={canOpen ? () => void WebBrowser.openBrowserAsync(item.url as string) : undefined}
    >
      <YStack
        backgroundColor="$surfaceInverse"
        height={171}
        items="center"
        justify="center"
        overflow="hidden"
        rounded="$md"
        width="100%"
      >
        {item.previewImageUrl ? (
          <Image resizeMode="cover" source={{ uri: item.previewImageUrl }} style={heroStyle} />
        ) : (
          <RecallMark size={56} />
        )}
      </YStack>

      <YStack gap="$4" width="100%">
        <YStack gap="$2">
          <Typography color="$onboardingTextPrimary" numberOfLines={1} variant="body2">
            {item.previewTitle ?? item.title}
          </Typography>
          {item.previewSubtitle ? (
            <Typography color="$onboardingTextSecondary" numberOfLines={2} variant="body3">
              {item.previewSubtitle}
            </Typography>
          ) : null}
        </YStack>
        {item.url ? (
          <Typography color="$onboardingTextPrimary" variant="body1">
            {item.url}
          </Typography>
        ) : null}
      </YStack>
    </DetailCard>
  );
}
