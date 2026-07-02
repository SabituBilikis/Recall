import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, YStack } from "tamagui";

import { Typography } from "@/components/ui/typography";

import { authContent } from "../constants/auth-content";
import { setNewPasswordContent } from "../constants/set-new-password-content";
import { AuthFooter } from "./auth-footer";
import { AuthHeader } from "./auth-header";
import { SetNewPasswordForm } from "./set-new-password-form";

export type SetNewPasswordScreenProps = {
  onBack: () => void;
  onBackToLogin: () => void;
  onSignUpPress: () => void;
  onSubmitSuccess: () => void;
};

export function SetNewPasswordScreen({ onBack, onBackToLogin, onSignUpPress, onSubmitSuccess }: SetNewPasswordScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <YStack backgroundColor="$background" flex={1}>
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <YStack gap="$6" pb="$12" pt={insets.top} px="$5">
          <YStack pt="$4">
            <AuthHeader onBack={onBack} />
          </YStack>

          <YStack gap="$2" items="center">
            <Typography color="$onboardingTextPrimary" text="center" variant="h3" width="100%">
              {setNewPasswordContent.title}
            </Typography>
            <Typography color="$onboardingTextSecondary" text="center" variant="body2" width="100%">
              {setNewPasswordContent.subtitle}
            </Typography>
          </YStack>

          <SetNewPasswordForm onBackToLogin={onBackToLogin} onSubmitSuccess={onSubmitSuccess} />

          <AuthFooter
            linkLabel={authContent.signUpFooter.link}
            prompt={authContent.signUpFooter.prompt}
            onLinkPress={onSignUpPress}
          />
        </YStack>
      </ScrollView>
    </YStack>
  );
}
