import { useState } from "react";
import { AnimatePresence } from "moti";
import { YStack } from "tamagui";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";

import { signupContent } from "../constants/signup-content";
import { useSignupForm } from "../hooks/use-signup-form";
import { PasswordInput } from "./password-input";
import { PasswordRequirementsCard } from "./password-requirements-card";
import { TermsText } from "./terms-text";

type SignupFormProps = {
  onSubmitSuccess: () => void;
  onConfirmEmail: (email: string) => void;
  onTermsPress: () => void;
};

export function SignupForm({ onSubmitSuccess, onConfirmEmail, onTermsPress }: SignupFormProps) {
  const {
    values,
    showPassword,
    passwordRules,
    formErrors,
    submitError,
    isLoading,
    setField,
    toggleShowPassword,
    handleEmailBlur,
    handleSubmit
  } = useSignupForm({ onSuccess: onSubmitSuccess, onConfirmEmail });

  const [passwordFocused, setPasswordFocused] = useState(false);
  const showRequirements = passwordFocused || values.password.length > 0;

  return (
    <YStack gap="$4" width="100%">
      <Input
        appearance="filled"
        autoCapitalize="words"
        containerWidth="100%"
        placeholder={signupContent.fields.firstName}
        size="large"
        value={values.firstName}
        onChangeText={(text) => setField("firstName", text)}
      />

      <Input
        appearance="filled"
        autoCapitalize="words"
        containerWidth="100%"
        placeholder={signupContent.fields.lastName}
        size="large"
        value={values.lastName}
        onChangeText={(text) => setField("lastName", text)}
      />

      <Input
        appearance="filled"
        autoCapitalize="none"
        autoCorrect={false}
        containerWidth="100%"
        helperText={formErrors.email ?? undefined}
        keyboardType="email-address"
        placeholder={signupContent.fields.email}
        size="large"
        status={formErrors.email ? "error" : "default"}
        value={values.email}
        onBlur={handleEmailBlur}
        onChangeText={(text) => setField("email", text)}
      />

      <PasswordInput
        appearance="filled"
        containerWidth="100%"
        placeholder={signupContent.fields.password}
        showPassword={showPassword}
        size="large"
        value={values.password}
        onBlur={() => setPasswordFocused(false)}
        onChangeText={(text) => setField("password", text)}
        onFocus={() => setPasswordFocused(true)}
        onToggleShowPassword={toggleShowPassword}
      />

      <AnimatePresence>{showRequirements ? <PasswordRequirementsCard rules={passwordRules} /> : null}</AnimatePresence>

      <TermsText onTermsPress={onTermsPress} />

      {submitError ? (
        <Typography color="$danger" text="center" variant="body3">
          {submitError}
        </Typography>
      ) : null}

      <Button appearance="filled" loading={isLoading} size="giant" width="100%" onPress={handleSubmit}>
        {signupContent.submitLabel}
      </Button>
    </YStack>
  );
}
