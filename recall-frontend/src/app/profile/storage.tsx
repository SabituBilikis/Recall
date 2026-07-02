import { router } from "expo-router";

import { StorageScreen } from "@/features/profile";

export default function StorageRoute() {
  return <StorageScreen onBack={() => router.back()} />;
}
