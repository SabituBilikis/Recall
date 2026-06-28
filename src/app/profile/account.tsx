import { router } from "expo-router";

import { AccountScreen } from "@/features/profile";

export default function AccountRoute() {
  return <AccountScreen onBack={() => router.back()} />;
}
