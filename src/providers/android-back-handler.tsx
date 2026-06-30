import { router, useSegments } from "expo-router";
import { useEffect } from "react";
import { BackHandler } from "react-native";

// Android hardware back: go back when there's history; otherwise send dead-end
// screens (entered via router.replace, so they have no back-stack) to Home
// instead of exiting the app. Only the tabs/home root falls through to the
// default exit. No-op on iOS (BackHandler has no effect there).
export function AndroidBackHandler() {
  const segments = useSegments();

  useEffect(() => {
    const onBack = () => {
      if (router.canGoBack()) {
        router.back();
        return true;
      }
      // Non-tab screen with no back history → send to home
      if (segments[0] && segments[0] !== "(tabs)") {
        router.replace("/home");
        return true;
      }
      // On a tab other than home → go to home tab instead of exiting
      if (segments[0] === "(tabs)" && segments[1] !== "home") {
        router.replace("/(tabs)/home");
        return true;
      }
      // On home tab → allow app exit
      return false;
    };

    const sub = BackHandler.addEventListener("hardwareBackPress", onBack);
    return () => sub.remove();
  }, [segments]);

  return null;
}
