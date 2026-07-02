import { XStack, YStack } from "tamagui";

import { ChevronLeftIcon, RecallMark } from "@/components/ui/icons";
import { Typography } from "@/components/ui/typography";
import { colorValues } from "@/theme/tokens/color";

import { authContent } from "../constants/auth-content";

export function AuthHeader({ onBack }: { onBack: () => void }) {
  return (
    <XStack height="$10" items="center" justify="center" position="relative" width="100%">
      <YStack
        accessibilityRole="button"
        accessibilityLabel="Go back"
        backgroundColor="$accentPrimarySoft"
        height="$10"
        items="center"
        justify="center"
        left={0}
        position="absolute"
        pressStyle={{ opacity: 0.7 }}
        rounded="$sm"
        width="$10"
        onPress={onBack}
      >
        <ChevronLeftIcon color={colorValues.grey900} size={20} />
      </YStack>

      <XStack gap="$2" items="center">
        <RecallMark size={32} />
        <Typography color="$buttonTextAccent" variant="subtitle1">
          {authContent.brandName}
        </Typography>
      </XStack>
    </XStack>
  );
}
