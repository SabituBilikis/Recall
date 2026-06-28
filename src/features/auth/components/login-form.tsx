import { YStack } from "tamagui";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";

import { loginContent } from "../constants/login-content";
import { useLoginForm } from "../hooks/use-login-form";
import { PasswordInput } from "./password-input";

type LoginFormProps = {
  onForgotPassword: () => void;
  onSubmitSuccess: () => void;
};

export function LoginForm({ onForgotPassword, onSubmitSuccess }: LoginFormProps) {
  const {
    values,
    showPassword,
    formErrors,
    submitError,
    isFormValid,
    isLoading,
    setField,
    toggleShowPassword,
    handleEmailBlur,
    handleSubmit
  } = useLoginForm({ onSuccess: onSubmitSuccess });

  return (
    <YStack gap="$4" width="100%">
      <Input
        appearance="filled"
        autoCapitalize="none"
        autoCorrect={false}
        containerWidth="100%"
        helperText={formErrors.email ?? undefined}
        keyboardType="email-address"
        placeholder={loginContent.fields.email}
        size="large"
        status={formErrors.email ? "error" : "default"}
        value={values.email}
        onBlur={handleEmailBlur}
        onChangeText={(text) => setField("email", text)}
      />

      <YStack gap="$2" width="100%">
        <PasswordInput
          appearance="filled"
          containerWidth="100%"
          placeholder={loginContent.fields.password}
          showPassword={showPassword}
          size="large"
          value={values.password}
          onChangeText={(text) => setField("password", text)}
          onToggleShowPassword={toggleShowPassword}
        />
        <Typography
          color="$textAccent"
          pressStyle={{ opacity: 0.6 }}
          text="right"
          variant="subtitle2"
          width="100%"
          onPress={onForgotPassword}
        >
          {loginContent.forgotPasswordLink}
        </Typography>
      </YStack>

      {submitError ? (
        <Typography color="$danger" text="center" variant="body3">
          {submitError}
        </Typography>
      ) : null}

      <Button
        appearance="filled"
        disabled={!isFormValid}
        loading={isLoading}
        size="giant"
        width="100%"
        onPress={handleSubmit}
      >
        {loginContent.submitLabel}
      </Button>
    </YStack>
  );
}
