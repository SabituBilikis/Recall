import * as Linking from "expo-linking";
import { router, useLocalSearchParams } from "expo-router";

import { ConfirmEmailScreen, useResendConfirmation } from "@/features/auth";

export default function ConfirmEmailRoute() {
  const { email } = useLocalSearchParams<{ email?: string }>();
  const address = typeof email === "string" ? email : "";
  const { state, cooldown, resend } = useResendConfirmation(address);

  return (
    <ConfirmEmailScreen
      cooldown={cooldown}
      email={address}
      resendState={state}
      onBackToLogin={() => router.replace("/login")}
      onOpenMail={() => {
        void Linking.openURL("mailto:");
      }}
      onResend={() => void resend()}
    />
  );
}
