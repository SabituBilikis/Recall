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
      const top = segments[0];
      if (top && top !== "(tabs)") {
        router.replace("/home");
        return true;
      }
      return false;
    };

    const sub = BackHandler.addEventListener("hardwareBackPress", onBack);
    return () => sub.remove();
  }, [segments]);

  return null;
}
