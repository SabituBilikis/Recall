import { XStack } from "tamagui";

import { Typography } from "@/components/ui/typography";

export function MetadataRow({ label, value }: { label: string; value: string }) {
  return (
    <XStack gap="$4" items="center" justify="space-between" width="100%">
      <Typography color="$onboardingTextPrimary" variant="body2">
        {label}
      </Typography>
      <Typography color="$onboardingTextSecondary" flex={1} numberOfLines={1} text="right" variant="body3">
        {value}
      </Typography>
    </XStack>
  );
}
