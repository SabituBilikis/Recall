import { XStack } from "tamagui";

import { Typography } from "@/components/ui/typography";

// Reusable "<prompt> <link>" footer shared across auth screens.
type AuthFooterProps = {
  linkLabel: string;
  onLinkPress: () => void;
  prompt: string;
};

export function AuthFooter({ linkLabel, onLinkPress, prompt }: AuthFooterProps) {
  return (
    <XStack items="center" justify="center">
      <Typography color="$onboardingTextPrimary" variant="body3">
        {prompt}
      </Typography>
      <Typography color="$textAccent" pressStyle={{ opacity: 0.6 }} variant="body3" onPress={onLinkPress}>
        {linkLabel}
      </Typography>
    </XStack>
  );
}
