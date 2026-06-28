import { useState } from "react";

import { USE_BACKEND } from "@/lib/config/backend-flag";
import { signInWithGoogle } from "@/services/auth.service";
import { useSessionStore } from "@/store/use-session-store";

// Drives the Google button: runs the OAuth flow (backend) or just navigates (mock).
export function useGoogleSignIn(onSuccess?: () => void) {
  const setSession = useSessionStore((state) => state.setSession);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function signIn() {
    if (!USE_BACKEND) {
      onSuccess?.();
      return;
    }
    setIsLoading(true);
    setError(null);
    void signInWithGoogle()
      .then(({ session, error: oauthError }) => {
        setIsLoading(false);
        if (oauthError) {
          setError(oauthError);
          return;
        }
        if (session) {
          setSession(session);
          onSuccess?.();
        }
      })
      .catch((caught: unknown) => {
        setIsLoading(false);
        setError(caught instanceof Error ? caught.message : "Google sign-in failed.");
      });
  }

  return { signIn, isLoading, error };
}
