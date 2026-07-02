import { router } from "expo-router";

import { SetNewPasswordScreen } from "@/features/auth";

export default function SetNewPasswordRoute() {
  return (
    <SetNewPasswordScreen
      onBack={() => router.back()}
      onBackToLogin={() => router.replace("/login")}
      onSignUpPress={() => router.push("/signup")}
      onSubmitSuccess={() => router.replace("/login")}
    />
  );
}
