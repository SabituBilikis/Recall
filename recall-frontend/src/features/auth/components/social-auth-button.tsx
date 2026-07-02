import { XStack } from "tamagui";

import { GoogleIcon } from "@/components/ui/icons";
import { Typography } from "@/components/ui/typography";
import { tileBorderWidths } from "@/theme/tokens";

// Outline pill social button. Provider-agnostic shell, Google by default.
export function SocialAuthButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <XStack
      backgroundColor="$surfacePrimary"
      borderColor="$borderSubtle"
      borderWidth={tileBorderWidths.card}
      gap="$3"
      height="$14"
      items="center"
      justify="center"
      pressStyle={{ backgroundColor: "$backgroundHover" }}
      rounded="$xxl"
      width="100%"
      onPress={onPress}
    >
      <GoogleIcon size={20} />
      <Typography color="$onboardingTextPrimary" variant="subtitle2">
        {label}
      </Typography>
    </XStack>
  );
}
