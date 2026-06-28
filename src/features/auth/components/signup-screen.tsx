import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, YStack } from "tamagui";

import { Typography } from "@/components/ui/typography";

import { authContent } from "../constants/auth-content";
import { signupContent } from "../constants/signup-content";
import { useGoogleSignIn } from "../hooks/use-google-sign-in";
import { AuthDivider } from "./auth-divider";
import { AuthFooter } from "./auth-footer";
import { AuthHeader } from "./auth-header";
import { SignupForm } from "./signup-form";
import { SocialAuthButton } from "./social-auth-button";

export type SignupScreenProps = {
  onBack: () => void;
  onSignInPress: () => void;
  onSubmitSuccess: () => void;
  onTermsPress: () => void;
};

export function SignupScreen({ onBack, onSignInPress, onSubmitSuccess, onTermsPress }: SignupScreenProps) {
  const insets = useSafeAreaInsets();
  const google = useGoogleSignIn(onSubmitSuccess);

  return (
    <YStack backgroundColor="$background" flex={1}>
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <YStack gap="$6" pb="$12" pt={insets.top} px="$5">
          <YStack pt="$4">
            <AuthHeader onBack={onBack} />
          </YStack>

          <YStack gap="$2">
            <Typography color="$onboardingTextPrimary" variant="h3">
              {signupContent.title}
            </Typography>
            <Typography color="$onboardingTextSecondary" variant="body2">
              {signupContent.subtitle}
            </Typography>
          </YStack>

          <SocialAuthButton label={authContent.googleSignupLabel} onPress={google.signIn} />
          {google.error ? (
            <Typography color="$danger" text="center" variant="body3">
              {google.error}
            </Typography>
          ) : null}
          <AuthDivider />

          <SignupForm onSubmitSuccess={onSubmitSuccess} onTermsPress={onTermsPress} />

          <AuthFooter linkLabel={signupContent.footerLink} prompt={signupContent.footerPrompt} onLinkPress={onSignInPress} />
        </YStack>
      </ScrollView>
    </YStack>
  );
}
