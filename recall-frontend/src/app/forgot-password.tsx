import { router } from "expo-router";

import { ForgotPasswordScreen } from "@/features/auth";

export default function ForgotPasswordRoute() {
  return (
    <ForgotPasswordScreen
      onBack={() => router.back()}
      onBackToLogin={() => router.back()}
      onSignUpPress={() => router.push("/signup")}
    />
  );
}
