import { useMemo, useState } from "react";

import { evaluatePassword, isPasswordValid } from "@/lib/validation";

import { setNewPasswordContent } from "../constants/set-new-password-content";
import type { SetNewPasswordErrors, SetNewPasswordField, SetNewPasswordValues } from "../types/reset.types";

const MOCK_SUBMIT_DELAY = 1200;

const initialValues: SetNewPasswordValues = { password: "", confirmPassword: "" };

type UseSetNewPasswordFormParams = {
  // Navigation placeholder — the single seam where real auth plugs in later.
  onSuccess?: () => void;
};

export function useSetNewPasswordForm({ onSuccess }: UseSetNewPasswordFormParams = {}) {
  const [values, setValues] = useState<SetNewPasswordValues>(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const passwordRules = useMemo(() => evaluatePassword(values.password), [values.password]);
  const passwordValid = useMemo(() => isPasswordValid(passwordRules), [passwordRules]);

  const confirmMismatch = values.confirmPassword.length > 0 && values.confirmPassword !== values.password;
  const confirmError = confirmTouched && confirmMismatch ? setNewPasswordContent.confirmMismatch : null;

  const formErrors: SetNewPasswordErrors = { confirmPassword: confirmError };

  const isFormValid = passwordValid && values.confirmPassword === values.password;

  function setField(field: SetNewPasswordField, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  function toggleShowConfirmPassword() {
    setShowConfirmPassword((prev) => !prev);
  }

  function handleConfirmBlur() {
    setConfirmTouched(true);
  }

  function handleSubmit() {
    setConfirmTouched(true);

    if (!isFormValid || isLoading) {
      return;
    }

    // Mock submit — no backend yet. Swap this block for the auth service later.
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess?.();
    }, MOCK_SUBMIT_DELAY);
  }

  return {
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
  };
}
