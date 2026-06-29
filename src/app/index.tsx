import * as Linking from "expo-linking";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { YStack } from "tamagui";

import { SplashScreen } from "@/features/splash";
import { USE_BACKEND } from "@/lib/config/backend-flag";
import { isAuthDeepLink } from "@/services/auth.service";
import { useSessionStore } from "@/store/use-session-store";

export default function IndexRoute() {
  // "deciding" until we know whether this cold start came from an auth deep link
  // (email confirm / magic link). If it did, skip the splash entirely and let the
  // deep-link handler in AppProviders route to /email-confirmed.
  const [mode, setMode] = useState<"deciding" | "splash" | "deeplink">("deciding");

  useEffect(() => {
    let active = true;
    void Linking.getInitialURL().then((url) => {
      if (active) {
        setMode(url && isAuthDeepLink(url) ? "deeplink" : "splash");
      }
    });
    return () => {
      active = false;
    };
  }, []);

  if (mode !== "splash") {
    // Plain brand background while deciding, or while AppProviders routes the link.
    return <YStack backgroundColor="$splashBackground" flex={1} />;
  }

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
