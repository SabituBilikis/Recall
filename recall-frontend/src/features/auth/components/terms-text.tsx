import { XStack } from "tamagui";

import { Typography } from "@/components/ui/typography";

import { signupContent } from "../constants/signup-content";

export function TermsText({ onTermsPress }: { onTermsPress: () => void }) {
  return (
    <XStack items="center" justify="center">
      <Typography color="$onboardingTextPrimary" variant="body3">
        {signupContent.termsPrefix}
      </Typography>
      <Typography color="$textAccent" pressStyle={{ opacity: 0.6 }} variant="body3" onPress={onTermsPress}>
        {signupContent.termsLink}
      </Typography>
    </XStack>
  );
}
