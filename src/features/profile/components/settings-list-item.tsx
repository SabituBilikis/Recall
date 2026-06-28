import type { ReactNode } from "react";
import { XStack, YStack } from "tamagui";

import { ChevronRightIcon } from "@/components/ui/icons";
import { Typography } from "@/components/ui/typography";
import { colorValues } from "@/theme/tokens/color";

type SettingsListItemProps = {
  label: string;
  description: string;
  // Trailing control: a chevron (navigation) by default, or a custom node (toggle).
  right?: ReactNode;
  onPress?: () => void;
};

// One row in the Settings card: label + description, with a trailing chevron or
// custom control. Navigation rows pass onPress; toggle rows pass `right`.
export function SettingsListItem({ label, description, right, onPress }: SettingsListItemProps) {
  return (
    <XStack
      items="center"
      justify="space-between"
      gap="$3"
      py="$3"
      pressStyle={onPress ? { opacity: 0.6 } : undefined}
      onPress={onPress}
    >
      <YStack flex={1} gap="$1">
        <Typography color="$onboardingTextPrimary" variant="body2">
          {label}
        </Typography>
        <Typography color="$onboardingTextSecondary" variant="caption1">
          {description}
        </Typography>
      </YStack>
      {right ?? <ChevronRightIcon color={colorValues.grey500} size={20} />}
    </XStack>
  );
}
