import { XStack, YStack } from "tamagui";

import { Typography } from "@/components/ui/typography";

import { authContent } from "../constants/auth-content";

export function AuthDivider() {
  return (
    <XStack gap="$3" items="center" width="100%">
      <YStack backgroundColor="$borderSubtle" flex={1} height={1} />
      <Typography color="$onboardingTextSecondary" variant="body3">
        {authContent.dividerLabel}
      </Typography>
      <YStack backgroundColor="$borderSubtle" flex={1} height={1} />
    </XStack>
  );
}
