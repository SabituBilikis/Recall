import { useSafeAreaInsets } from "react-native-safe-area-context";
import { YStack } from "tamagui";

import { Typography } from "./typography";

// Lightweight stand-in for routes not yet built (placeholder navigation targets).
export function PlaceholderScreen({ title }: { title: string }) {
  const insets = useSafeAreaInsets();

  return (
    <YStack
      backgroundColor="$surfaceSubtle"
      flex={1}
      gap="$2"
      items="center"
      justify="center"
      pt={insets.top}
      px="$5"
    >
      <Typography color="$onboardingTextPrimary" text="center" variant="h4">
        {title}
      </Typography>
      <Typography color="$onboardingTextSecondary" text="center" variant="body2">
        Coming soon
      </Typography>
    </YStack>
  );
}
