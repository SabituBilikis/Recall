import { router } from "expo-router";

import { EmailConfirmedScreen } from "@/features/auth";

export default function EmailConfirmedRoute() {
  return <EmailConfirmedScreen onContinue={() => router.replace("/home")} />;
}
