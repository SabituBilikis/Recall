import { router } from "expo-router";

import { GetStartedScreen } from "@/features/get-started";

export default function GetStartedRoute() {
  return (
    <GetStartedScreen
      onBeginPress={() => router.push("/onboarding")}
      onLoginPress={() => router.push("/login")}
    />
  );
}
