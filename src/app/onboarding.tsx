import { router } from "expo-router";

import { OnboardingScreen } from "@/features/onboarding";

export default function OnboardingRoute() {
  return <OnboardingScreen onSignUpPress={() => router.replace("/signup")} onSkipPress={() => router.replace("/signup")} />;
}
