import { router } from "expo-router";

import { NotificationsScreen } from "@/features/notifications";

export default function NotificationsRoute() {
  return <NotificationsScreen onBack={() => router.back()} />;
}
