import { XStack, YStack } from "tamagui";

import { ChevronLeftIcon } from "@/components/ui/icons";
import { Typography } from "@/components/ui/typography";
import { colorValues } from "@/theme/tokens/color";

export function SearchHeader({ onBack }: { onBack: () => void }) {
  return (
    <XStack gap="$2" items="center" width="100%">
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

      <Typography color="$onboardingTextPrimary" flex={1} text="center" variant="subtitle2">
        Search
      </Typography>

      <YStack width={32} />
    </XStack>
  );
}
