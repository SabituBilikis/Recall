import { XStack, YStack } from "tamagui";

import { Typography } from "@/components/ui/typography";
import { tileBorderWidths } from "@/theme/tokens";

import type { DetailItem } from "../types/item.types";
import { DetailCard } from "./detail-card";

// File preview — a small document thumbnail mock (PDF badge + doc lines).
export function FilePreviewCard({ item }: { item: DetailItem }) {
  return (
    <DetailCard gap="$3" items="center" px="$4" py="$6" rounded={20}>
      <YStack
        backgroundColor="$surfacePrimary"
        borderColor="$borderSubtle"
        borderWidth={tileBorderWidths.card}
        height={180}
        opacity={0.9}
        overflow="hidden"
        rounded="$md"
        width={160}
      >
        <YStack gap="$4" pl={18} pt={20} width={89}>
          <XStack
            borderColor="$borderSubtle"
            borderWidth={tileBorderWidths.card}
            items="center"
            justify="center"
            px="$3"
            py="$0.5"
            rounded="$sm"
            self="flex-start"
          >
            <Typography color="$onboardingTextSecondary" variant="buttonTiny">
              {item.fileType ?? "FILE"}
            </Typography>
          </XStack>
          <YStack gap="$2" width="100%">
            <YStack backgroundColor="$textTertiary" height={8} rounded="$sm" width="100%" />
            <YStack borderColor="$borderSubtle" borderWidth={tileBorderWidths.card} height={8} rounded="$sm" width={71} />
            <YStack borderColor="$borderSubtle" borderWidth={tileBorderWidths.card} height={8} rounded="$sm" width="100%" />
          </YStack>
        </YStack>
      </YStack>

      <Typography color="$textDisabled" text="center" variant="body1">
        {item.fileName ?? item.title}
      </Typography>
    </DetailCard>
  );
}
