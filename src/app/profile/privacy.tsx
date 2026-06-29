import { router } from "expo-router";

import { PrivacyPolicyScreen } from "@/features/profile";

export default function PrivacyRoute() {
  return <PrivacyPolicyScreen onBack={() => router.back()} />;
}
