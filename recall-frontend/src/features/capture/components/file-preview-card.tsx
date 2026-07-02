import { XStack, YStack } from "tamagui";

import { Typography } from "@/components/ui/typography";
import { tileBorderWidths } from "@/theme/tokens";

import { formatFileMeta } from "../mock/mock-upload-examples";
import type { UploadedAsset } from "../types/capture.types";
import { PdfIcon } from "./pdf-icon";

// Selected file row (Figma: primary-500 border).
export function FilePreviewCard({ asset }: { asset: UploadedAsset }) {
  return (
    <YStack
      backgroundColor="$surfacePrimary"
      borderColor="$accentPrimary"
      borderWidth={tileBorderWidths.card}
      p="$3"
      rounded="$sm"
      width="100%"
    >
      <XStack gap="$3" items="center" width="100%">
        <PdfIcon size={40} />
        <YStack flex={1} gap="$1">
          <Typography color="$onboardingTextPrimary" numberOfLines={1} variant="body4">
            {asset.name}
          </Typography>
          <Typography color="$onboardingTextSecondary" variant="caption2">
            {formatFileMeta(asset)}
          </Typography>
        </YStack>
      </XStack>
    </YStack>
  );
}
