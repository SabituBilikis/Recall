import { router, useSegments } from "expo-router";
import { useEffect } from "react";

import { USE_BACKEND } from "@/lib/config/backend-flag";
import { useSessionStore } from "@/store/use-session-store";

// Auth-area segments that a signed-out user is allowed to be on. The index route
// (no segment) gates itself in app/index.tsx.
const AUTH_SEGMENTS = new Set([
  "get-started",
  "onboarding",
  "login",
  "signup",
  "forgot-password",
  "set-new-password"
]);

// Redirects a signed-out user off any gated screen (e.g. a deep link to
// recall://profile). Waits for the session restore (bootstrapped) so it never
// bounces a signed-in user during cold start. No-op on the mock build.
export function AuthGuard() {
  const segments = useSegments();
  const session = useSessionStore((state) => state.session);
  const bootstrapped = useSessionStore((state) => state.bootstrapped);

  useEffect(() => {
    if (!USE_BACKEND || !bootstrapped) {
      return;
    }
    const top = segments[0];
    if (!top || AUTH_SEGMENTS.has(top)) {
      return;
    }
    if (!session) {
      router.replace("/get-started");
    }
  }, [segments, session, bootstrapped]);

  return null;
}
