import { useMemo, useState } from "react";

import { validateEmail } from "@/lib/validation";

import type { ForgotPasswordErrors, ForgotPasswordValues } from "../types/reset.types";

const MOCK_SUBMIT_DELAY = 1200;

const initialValues: ForgotPasswordValues = { email: "" };

type UseForgotPasswordFormParams = {
  // Navigation placeholder — the single seam where real auth plugs in later.
  onSuccess?: () => void;
};

export function useForgotPasswordForm({ onSuccess }: UseForgotPasswordFormParams = {}) {
  const [values, setValues] = useState<ForgotPasswordValues>(initialValues);
  const [emailTouched, setEmailTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const emailError = useMemo(() => validateEmail(values.email), [values.email]);

  const formErrors: ForgotPasswordErrors = { email: emailTouched ? emailError : null };

  const isFormValid = emailError === null;

  function setEmail(value: string) {
    setValues({ email: value });
    setIsSubmitted(false);
  }

  function handleEmailBlur() {
    setEmailTouched(true);
  }

  function handleSubmit() {
    setEmailTouched(true);

    if (!isFormValid || isLoading) {
      return;
    }

    // Mock submit — no backend yet. Reveals the inline success alert.
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      onSuccess?.();
    }, MOCK_SUBMIT_DELAY);
  }

  return {
    values,
    formErrors,
    isFormValid,
    isLoading,
    isSubmitted,
    setEmail,
    handleEmailBlur,
    handleSubmit
  };
}
