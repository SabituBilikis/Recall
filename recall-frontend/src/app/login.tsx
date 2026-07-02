import { router } from "expo-router";

import { LoginScreen } from "@/features/auth";

export default function LoginRoute() {
  return (
    <LoginScreen
      onBack={() => router.back()}
      onForgotPassword={() => router.push("/forgot-password")}
      onSignUpPress={() => router.push("/signup")}
      onSubmitSuccess={() => router.replace("/home")}
    />
  );
}
