import { XStack, YStack } from "tamagui";

import { Typography } from "@/components/ui/typography";

import type { QuickCaptureAction } from "../types/quick-capture.types";
import { SavedTypeIcon } from "./saved-type-icon";

type QuickCaptureCardProps = {
  action: QuickCaptureAction;
  onPress: () => void;
};

export function QuickCaptureCard({ action, onPress }: QuickCaptureCardProps) {
  return (
    <YStack
      backgroundColor="$surfacePrimary"
      flex={1}
      pressStyle={{ opacity: 0.7 }}
      px="$3"
      py="$2"
      rounded="$sm"
      onPress={onPress}
    >
      <XStack gap="$3" items="center">
        <SavedTypeIcon size={34} type={action.type} />
        <Typography color="$onboardingTextPrimary" variant="body2">
          {action.label}
        </Typography>
      </XStack>
    </YStack>
  );
}
