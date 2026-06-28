import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, YStack } from "tamagui";

import { Typography } from "@/components/ui/typography";

import { authContent } from "../constants/auth-content";
import { loginContent } from "../constants/login-content";
import { useGoogleSignIn } from "../hooks/use-google-sign-in";
import { AuthDivider } from "./auth-divider";
import { AuthFooter } from "./auth-footer";
import { AuthHeader } from "./auth-header";
import { LoginForm } from "./login-form";
import { SocialAuthButton } from "./social-auth-button";

export type LoginScreenProps = {
  onBack: () => void;
  onForgotPassword: () => void;
  onSignUpPress: () => void;
  onSubmitSuccess: () => void;
};

export function LoginScreen({ onBack, onForgotPassword, onSignUpPress, onSubmitSuccess }: LoginScreenProps) {
  const insets = useSafeAreaInsets();
  const google = useGoogleSignIn(onSubmitSuccess);

  return (
    <YStack backgroundColor="$background" flex={1}>
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <YStack gap="$6" pb="$12" pt={insets.top} px="$5">
          <YStack pt="$4">
            <AuthHeader onBack={onBack} />
          </YStack>

          <YStack gap="$2" items="center">
            <Typography color="$onboardingTextPrimary" text="center" variant="h3" width="100%">
              {loginContent.title}
            </Typography>
            <Typography color="$onboardingTextSecondary" text="center" variant="body2" width="100%">
              {loginContent.subtitle}
            </Typography>
          </YStack>

          <SocialAuthButton label={authContent.googleLoginLabel} onPress={google.signIn} />
          {google.error ? (
            <Typography color="$danger" text="center" variant="body3">
              {google.error}
            </Typography>
          ) : null}
          <AuthDivider />

          <LoginForm onForgotPassword={onForgotPassword} onSubmitSuccess={onSubmitSuccess} />

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
