import { router } from "expo-router";

import { ProfileScreen } from "@/features/profile";

export default function ProfileRoute() {
  return (
    <ProfileScreen
      onAccount={() => router.push("/profile/account")}
      onBack={() => router.back()}
      onPrivacy={() => router.push("/profile/privacy")}
      onSignedOut={() => router.replace("/login")}
      onStorage={() => router.push("/profile/storage")}
      onTrash={() => router.push("/profile/trash")}
    />
  );
}
