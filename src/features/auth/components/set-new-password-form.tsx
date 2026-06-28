import { useState } from "react";
import { AnimatePresence } from "moti";
import { YStack } from "tamagui";

import { Button } from "@/components/ui/button";

import { setNewPasswordContent } from "../constants/set-new-password-content";
import { useSetNewPasswordForm } from "../hooks/use-set-new-password-form";
import { PasswordInput } from "./password-input";
import { PasswordRequirementsCard } from "./password-requirements-card";

type SetNewPasswordFormProps = {
  onBackToLogin: () => void;
  onSubmitSuccess: () => void;
};

export function SetNewPasswordForm({ onBackToLogin, onSubmitSuccess }: SetNewPasswordFormProps) {
  const {
    values,
    showPassword,
    showConfirmPassword,
    passwordRules,
    formErrors,
    isFormValid,
    isLoading,
    setField,
    toggleShowPassword,
    toggleShowConfirmPassword,
    handleConfirmBlur,
    handleSubmit
  } = useSetNewPasswordForm({ onSuccess: onSubmitSuccess });

  const [passwordFocused, setPasswordFocused] = useState(false);
  const showRequirements = passwordFocused || values.password.length > 0;

  return (
    <YStack gap="$6" width="100%">
      <YStack gap="$4" width="100%">
        <PasswordInput
          appearance="filled"
          containerWidth="100%"
          placeholder={setNewPasswordContent.fields.password}
          showPassword={showPassword}
          size="large"
          value={values.password}
          onBlur={() => setPasswordFocused(false)}
          onChangeText={(text) => setField("password", text)}
          onFocus={() => setPasswordFocused(true)}
          onToggleShowPassword={toggleShowPassword}
        />

        <PasswordInput
          appearance="filled"
          containerWidth="100%"
          helperText={formErrors.confirmPassword ?? undefined}
          placeholder={setNewPasswordContent.fields.confirmPassword}
          showPassword={showConfirmPassword}
          size="large"
          status={formErrors.confirmPassword ? "error" : "default"}
          value={values.confirmPassword}
          onBlur={handleConfirmBlur}
          onChangeText={(text) => setField("confirmPassword", text)}
          onToggleShowPassword={toggleShowConfirmPassword}
        />

        <AnimatePresence>{showRequirements ? <PasswordRequirementsCard rules={passwordRules} /> : null}</AnimatePresence>
      </YStack>

      <YStack gap="$5" width="100%">
        <Button
          appearance="filled"
          disabled={!isFormValid}
          loading={isLoading}
          size="giant"
          width="100%"
          onPress={handleSubmit}
        >
          {setNewPasswordContent.submitLabel}
        </Button>

        <Button appearance="outline" size="giant" width="100%" onPress={onBackToLogin}>
          {setNewPasswordContent.backToLoginLabel}
        </Button>
      </YStack>
    </YStack>
  );
}
