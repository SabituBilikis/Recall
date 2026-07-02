import { router } from "expo-router";

import { TrashScreen } from "@/features/profile";

export default function TrashRoute() {
  return <TrashScreen onBack={() => router.back()} />;
}
