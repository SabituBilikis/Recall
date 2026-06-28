import { YStack } from "tamagui";

import { Typography } from "@/components/ui/typography";
import { SavedTypeIcon } from "@/features/home/components/saved-type-icon";
import { tileBorderWidths } from "@/theme/tokens";

import type { CaptureItemType } from "../types/capture.types";

type UploadCardProps = {
  onPress: () => void;
  subtitle?: string;
  title: string;
  type: CaptureItemType;
};

// Empty upload placeholder — tap to pick. Shows the type glyph + prompt.
export function UploadCard({ onPress, subtitle, title, type }: UploadCardProps) {
  return (
    <YStack
      backgroundColor="$surfacePrimary"
      borderColor="$borderSubtle"
      borderWidth={tileBorderWidths.card}
      gap="$6"
      items="center"
      pressStyle={{ opacity: 0.7 }}
      px="$4"
      py="$6"
      rounded="$sm"
      width="100%"
      onPress={onPress}
    >
      <SavedTypeIcon size={40} type={type} />
      <YStack gap="$1" items="center">
        <Typography color="$onboardingTextPrimary" text="center" variant="subtitle1">
          {title}
        </Typography>
        {subtitle ? (
          <Typography color="$onboardingTextSecondary" text="center" variant="caption2">
            {subtitle}
          </Typography>
        ) : null}
      </YStack>
    </YStack>
  );
}
