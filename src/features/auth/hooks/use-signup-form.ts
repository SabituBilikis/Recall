import { useMemo, useState } from "react";

import { useIsMounted } from "@/hooks/use-is-mounted";
import { USE_BACKEND } from "@/lib/config/backend-flag";
import { evaluatePassword, isPasswordValid, validateEmail } from "@/lib/validation";
import { signUpWithEmail } from "@/services/auth.service";
import { authErrorMessage } from "@/services/auth-errors";
import { useSessionStore } from "@/store/use-session-store";

import type { SignupField, SignupFormErrors, SignupFormValues } from "../types/signup.types";

const MOCK_SUBMIT_DELAY = 1200;

const initialValues: SignupFormValues = { firstName: "", lastName: "", email: "", password: "" };

type UseSignupFormParams = {
  // Navigation placeholder — the single seam where real auth plugs in later.
  onSuccess?: () => void;
};

export function useSignupForm({ onSuccess }: UseSignupFormParams = {}) {
  const [values, setValues] = useState<SignupFormValues>(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const setSession = useSessionStore((state) => state.setSession);
  const isMounted = useIsMounted();

  const passwordRules = useMemo(() => evaluatePassword(values.password), [values.password]);
  const passwordValid = useMemo(() => isPasswordValid(passwordRules), [passwordRules]);
  const emailError = useMemo(() => validateEmail(values.email), [values.email]);

  const formErrors: SignupFormErrors = { email: emailTouched ? emailError : null };

  const allFilled =
    values.firstName.trim().length > 0 &&
    values.lastName.trim().length > 0 &&
    values.email.trim().length > 0 &&
    values.password.length > 0;
  const isFormValid = allFilled && emailError === null && passwordValid;

  function setField(field: SignupField, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  function handleEmailBlur() {
    setEmailTouched(true);
  }

  function handleSubmit() {
    setEmailTouched(true);
    setSubmitError(null);

    if (!isFormValid || isLoading) {
      return;
    }

    setIsLoading(true);

    if (!USE_BACKEND) {
      // Mock submit — no backend.
      setTimeout(() => {
        if (!isMounted.current) {
          return;
        }
        setIsLoading(false);
        onSuccess?.();
      }, MOCK_SUBMIT_DELAY);
      return;
    }

    void signUpWithEmail({
      email: values.email.trim(),
      password: values.password,
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim()
    })
      .then(({ data, error }) => {
        if (!isMounted.current) {
          return;
        }
        setIsLoading(false);
        if (error) {
          setSubmitError(authErrorMessage(error));
          return;
        }
        setSession(data.session);
        onSuccess?.();
      })
      .catch((error: unknown) => {
        if (!isMounted.current) {
          return;
        }
        setIsLoading(false);
        setSubmitError(error instanceof Error ? error.message : "Something went wrong.");
      });
  }

  return {
    values,
    showPassword,
    passwordRules,
    formErrors,
    submitError,
    isFormValid,
    isLoading,
    setField,
    toggleShowPassword,
    handleEmailBlur,
    handleSubmit
  };
}
