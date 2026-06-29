import { useSafeAreaInsets } from "react-native-safe-area-context";
import { YStack } from "tamagui";

import { Button } from "@/components/ui/button";
import { MailIcon } from "@/components/ui/icons";
import { Typography } from "@/components/ui/typography";
import { colorValues } from "@/theme/tokens/color";

import { confirmEmailContent } from "../constants/confirm-email-content";
import type { ResendState } from "../hooks/use-resend-confirmation";

export type ConfirmEmailScreenProps = {
  email: string;
  resendState: ResendState;
  cooldown: number;
  onResend: () => void;
  onOpenMail: () => void;
  onBackToLogin: () => void;
};

const content = confirmEmailContent.pending;

function resendLabel(state: ResendState, cooldown: number): string {
  if (cooldown > 0) {
    return `${content.resend} (${cooldown}s)`;
  }
  if (state === "sending") {
    return content.resending;
  }
  if (state === "sent") {
    return content.resent;
  }
  if (state === "error") {
    return content.resendError;
  }
  return content.resend;
}

export function ConfirmEmailScreen({
  email,
  resendState,
  cooldown,
  onResend,
  onOpenMail,
  onBackToLogin
}: ConfirmEmailScreenProps) {
  const insets = useSafeAreaInsets();
  const resendDisabled = resendState === "sending" || cooldown > 0;

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
          <MailIcon color={colorValues.primary500} size={56} />
        </YStack>

        <YStack gap="$2" items="center">
          <Typography color="$onboardingTextPrimary" text="center" variant="h5">
            {content.title}
          </Typography>
          <Typography color="$onboardingTextSecondary" text="center" variant="body1">
            {content.body}
          </Typography>
          <Typography color="$onboardingTextPrimary" text="center" variant="subtitle1">
            {email.length > 0 ? email : content.bodyFallback}
          </Typography>
          <Typography color="$onboardingTextSecondary" text="center" variant="body1">
            {content.suffix}
          </Typography>
        </YStack>

        <Typography
          color="$onboardingTextSecondary"
          opacity={0.9}
          text="center"
          variant="caption1"
        >
          {content.spam}
        </Typography>
      </YStack>

      <YStack gap="$4" items="center" width="100%">
        <Button appearance="filled" rounded="$xxl" size="large" width="100%" onPress={onOpenMail}>
          {content.openMail}
        </Button>

        <Typography
          color={resendDisabled ? "$onboardingTextSecondary" : "$primary500"}
          pressStyle={{ opacity: 0.6 }}
          text="center"
          variant="body2"
          onPress={resendDisabled ? undefined : onResend}
        >
          {resendLabel(resendState, cooldown)}
        </Typography>

        <Typography
          color="$onboardingTextSecondary"
          pressStyle={{ opacity: 0.6 }}
          text="center"
          variant="body2"
          onPress={onBackToLogin}
        >
          {content.backToLogin}
        </Typography>
      </YStack>
    </YStack>
  );
}
