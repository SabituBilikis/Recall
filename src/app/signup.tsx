import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";

import { signupContent } from "@/features/auth/constants/signup-content";
import { SignupScreen } from "@/features/auth";

export default function SignupRoute() {
  return (
    <SignupScreen
      onBack={() => router.back()}
      onConfirmEmail={(email) => router.replace({ pathname: "/confirm-email", params: { email } })}
      onSignInPress={() => router.push("/login")}
      onSubmitSuccess={() => router.replace("/home")}
      onTermsPress={() => void WebBrowser.openBrowserAsync(signupContent.termsUrl)}
    />
  );
}
