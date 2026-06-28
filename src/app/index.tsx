import { router } from "expo-router";

import { SplashScreen } from "@/features/splash";
import { USE_BACKEND } from "@/lib/config/backend-flag";
import { useSessionStore } from "@/store/use-session-store";

export default function IndexRoute() {
  return (
    <SplashScreen
      onComplete={() => {
        // Backend + a restored session → straight to the app; otherwise onboarding.
        const signedIn = USE_BACKEND && useSessionStore.getState().session !== null;
        router.replace(signedIn ? "/home" : "/get-started");
      }}
    />
  );
}
