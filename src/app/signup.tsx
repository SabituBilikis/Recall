import { router } from "expo-router";

import { SignupScreen } from "@/features/auth";

export default function SignupRoute() {
  return (
    <SignupScreen
      onBack={() => router.back()}
      onConfirmEmail={(email) => router.replace({ pathname: "/confirm-email", params: { email } })}
      onSignInPress={() => router.push("/login")}
      onSubmitSuccess={() => router.replace("/home")}
      onTermsPress={() => {
        // TODO: open Terms screen / external link.
      }}
    />
  );
}
