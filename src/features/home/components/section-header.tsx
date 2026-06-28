import { XStack } from "tamagui";

import { Typography } from "@/components/ui/typography";

type SectionHeaderProps = {
  actionLabel?: string;
  onActionPress?: () => void;
  title: string;
};

export function SectionHeader({ actionLabel, onActionPress, title }: SectionHeaderProps) {
  return (
    <XStack items="center" justify="space-between" width="100%">
      <Typography color="$onboardingTextPrimary" variant="subtitle2">
        {title}
      </Typography>
      {actionLabel ? (
        <Typography color="$primary500" pressStyle={{ opacity: 0.6 }} variant="subtitle2" onPress={onActionPress}>
          {actionLabel}
        </Typography>
      ) : null}
    </XStack>
  );
}
