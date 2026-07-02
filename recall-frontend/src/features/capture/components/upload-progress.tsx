import { YStack } from "tamagui";

import { Typography } from "@/components/ui/typography";

import { captureContent } from "../constants/capture-content";

export function UploadProgress({ progress }: { progress: number }) {
  return (
    <YStack gap="$2" width="100%">
      <YStack backgroundColor="$borderSubtle" height={6} overflow="hidden" rounded="$sm" width="100%">
        <YStack backgroundColor="$accentPrimary" height={6} rounded="$sm" width={`${progress}%`} />
      </YStack>
      <Typography color="$onboardingTextPrimary" variant="caption2">
        {captureContent.uploadingLabel(progress)}
      </Typography>
    </YStack>
  );
}
