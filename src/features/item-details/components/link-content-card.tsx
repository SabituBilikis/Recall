import { YStack } from "tamagui";

import { RecallMark } from "@/components/ui/icons";
import { Typography } from "@/components/ui/typography";

import type { DetailItem } from "../types/item.types";
import { DetailCard } from "./detail-card";

export function LinkContentCard({ item }: { item: DetailItem }) {
  return (
    <DetailCard gap="$4" px="$4" py="$6" rounded={20}>
      <YStack
        backgroundColor="$surfaceInverse"
        height={171}
        items="center"
        justify="center"
        overflow="hidden"
        rounded="$md"
        width="100%"
      >
        <RecallMark size={56} />
      </YStack>

      <YStack gap="$4" width="100%">
        <YStack gap="$2">
          <Typography color="$onboardingTextPrimary" numberOfLines={1} variant="body2">
            {item.previewTitle ?? item.title}
          </Typography>
          {item.previewSubtitle ? (
            <Typography color="$onboardingTextSecondary" variant="body3">
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
