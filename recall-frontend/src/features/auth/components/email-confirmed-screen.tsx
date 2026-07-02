import { useSafeAreaInsets } from "react-native-safe-area-context";
import { YStack } from "tamagui";

import { Button } from "@/components/ui/button";
import { CheckCircleIcon } from "@/components/ui/icons";
import { Typography } from "@/components/ui/typography";
import { colorValues } from "@/theme/tokens/color";

import { confirmEmailContent } from "../constants/confirm-email-content";

export type EmailConfirmedScreenProps = {
  onContinue: () => void;
};

const content = confirmEmailContent.confirmed;

export function EmailConfirmedScreen({ onContinue }: EmailConfirmedScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <YStack
      backgroundColor="$surfaceSubtle"
      flex={1}
      justify="space-between"
      pb={insets.bottom + 12}
      pt={insets.top}
      px="$4"
    >
      <YStack gap="$8" items="center" pt="$12">
        <YStack backgroundColor="$accentPrimarySoft" height={120} items="center" justify="center" rounded={60} width={120}>
          <CheckCircleIcon color={colorValues.primary500} size={64} />
        </YStack>

        <YStack gap="$2" items="center">
          <Typography color="$onboardingTextPrimary" text="center" variant="h5">
            {content.title}
          </Typography>
          <Typography color="$onboardingTextSecondary" text="center" variant="body1">
            {content.body}
          </Typography>
        </YStack>
      </YStack>

      <Button appearance="filled" rounded="$xxl" size="large" width="100%" onPress={onContinue}>
        {content.continue}
      </Button>
    </YStack>
  );
}
