import { useMemo, useState } from "react";

import { useIsMounted } from "@/hooks/use-is-mounted";
import { USE_BACKEND } from "@/lib/config/backend-flag";
import { validateEmail } from "@/lib/validation";
import { signInWithEmail } from "@/services/auth.service";
import { authErrorMessage } from "@/services/auth-errors";
import { useSessionStore } from "@/store/use-session-store";

import type { LoginField, LoginFormErrors, LoginFormValues } from "../types/login.types";

const MOCK_SUBMIT_DELAY = 1200;

const initialValues: LoginFormValues = { email: "", password: "" };

type UseLoginFormParams = {
  // Navigation placeholder — the single seam where real auth plugs in later.
  onSuccess?: () => void;
};

export function useLoginForm({ onSuccess }: UseLoginFormParams = {}) {
  const [values, setValues] = useState<LoginFormValues>(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const setSession = useSessionStore((state) => state.setSession);
  const isMounted = useIsMounted();

  const emailError = useMemo(() => validateEmail(values.email), [values.email]);

  const formErrors: LoginFormErrors = { email: emailTouched ? emailError : null };

  const isFormValid = emailError === null && values.password.length > 0;

  function setField(field: LoginField, value: string) {
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
      const timer = setTimeout(() => {
        if (!isMounted.current) {
          return;
        }
        setIsLoading(false);
        onSuccess?.();
      }, MOCK_SUBMIT_DELAY);
      void timer;
      return;
    }

    void signInWithEmail(values.email.trim(), values.password)
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
