import type { ReactNode } from "react";
import { XStack, YStack } from "tamagui";

import { ChevronLeftIcon } from "@/components/ui/icons";
import { Typography } from "@/components/ui/typography";
import { colorValues } from "@/theme/tokens/color";

type CollectionHeaderProps = {
  onBack: () => void;
  right?: ReactNode;
  title: string;
};

export function CollectionHeader({ onBack, right, title }: CollectionHeaderProps) {
  return (
    <XStack gap="$2" items="center" width="100%">
      <YStack
        backgroundColor="$surfacePrimary"
        height={32}
        items="center"
        justify="center"
        pressStyle={{ opacity: 0.6 }}
        rounded="$md"
        width={32}
        onPress={onBack}
      >
        <ChevronLeftIcon color={colorValues.grey900} size={16} />
      </YStack>

      <Typography color="$onboardingTextPrimary" flex={1} text="center" variant="subtitle2">
        {title}
      </Typography>

      <XStack height={32} items="center" justify="flex-end" minWidth={32}>
        {right}
      </XStack>
    </XStack>
  );
}
