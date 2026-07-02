import { XStack, YStack } from "tamagui";

import { ChevronLeftIcon, CloseIcon } from "@/components/ui/icons";
import { Typography } from "@/components/ui/typography";
import { colorValues } from "@/theme/tokens/color";

type AddItemHeaderProps = {
  onBack: () => void;
  onClose: () => void;
  title: string;
};

export function AddItemHeader({ onBack, onClose, title }: AddItemHeaderProps) {
  return (
    <XStack items="center" justify="space-between" width="100%">
      <YStack
        accessibilityRole="button"
        accessibilityLabel="Go back"
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

      <Typography color="$onboardingTextPrimary" variant="subtitle2">
        {title}
      </Typography>

      <YStack
        accessibilityRole="button"
        accessibilityLabel="Close"
        backgroundColor="$surfaceMuted"
        height={32}
        items="center"
        justify="center"
        pressStyle={{ opacity: 0.6 }}
        rounded="$md"
        width={32}
        onPress={onClose}
      >
        <CloseIcon color={colorValues.grey900} size={16} />
      </YStack>
    </XStack>
  );
}
