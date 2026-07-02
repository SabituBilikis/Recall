import { AnimatePresence, MotiView } from "moti";
import { YStack } from "tamagui";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { animationTokens } from "@/theme/tokens";

import { forgotPasswordContent } from "../constants/forgot-password-content";
import { useForgotPasswordForm } from "../hooks/use-forgot-password-form";

type ForgotPasswordFormProps = {
  onBackToLogin: () => void;
};

export function ForgotPasswordForm({ onBackToLogin }: ForgotPasswordFormProps) {
  const { values, formErrors, isFormValid, isLoading, isSubmitted, setEmail, handleEmailBlur, handleSubmit } =
    useForgotPasswordForm();

  return (
    <YStack gap="$6" width="100%">
      <Input
        appearance="filled"
        autoCapitalize="none"
        autoCorrect={false}
        containerWidth="100%"
        helperText={formErrors.email ?? undefined}
        keyboardType="email-address"
        placeholder={forgotPasswordContent.fields.email}
        size="large"
        status={formErrors.email ? "error" : "default"}
        value={values.email}
        onBlur={handleEmailBlur}
        onChangeText={setEmail}
      />

      <YStack gap="$5" width="100%">
        <Button
          appearance="filled"
          disabled={!isFormValid}
          loading={isLoading}
          size="giant"
          width="100%"
          onPress={handleSubmit}
        >
          {forgotPasswordContent.submitLabel}
        </Button>

        <Button appearance="outline" size="giant" width="100%" onPress={onBackToLogin}>
          {forgotPasswordContent.backToLoginLabel}
        </Button>
      </YStack>

      <AnimatePresence>
        {isSubmitted ? (
          <MotiView
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 6 }}
            from={{ opacity: 0, translateY: 6 }}
            transition={{ duration: animationTokens.durationBase, type: "timing" }}
          >
            <Alert
              status="success"
              title={forgotPasswordContent.successTitle}
              description={forgotPasswordContent.successDescription}
            />
          </MotiView>
        ) : null}
      </AnimatePresence>
    </YStack>
  );
}
