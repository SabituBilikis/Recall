import { Stack } from "expo-router";

import { SyncBanner } from "@/components/ui/sync-banner";
import { AndroidBackHandler } from "@/providers/android-back-handler";
import { AppProviders } from "@/providers/app-providers";
import { AuthGuard } from "@/providers/auth-guard";

export default function RootLayout() {
  return (
    <AppProviders>
      <AuthGuard />
      <AndroidBackHandler />
      <SyncBanner />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="get-started" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="login" />
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="set-new-password" />
        <Stack.Screen name="confirm-email" />
        <Stack.Screen name="email-confirmed" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="profile/account" />
        <Stack.Screen name="profile/storage" />
        <Stack.Screen name="profile/trash" />
        <Stack.Screen name="profile/privacy" />
        <Stack.Screen name="archive" />
        <Stack.Screen name="search" />
        <Stack.Screen name="collection/[id]" />
        <Stack.Screen name="collection/create" />
        <Stack.Screen name="collection/edit/[id]" />
        <Stack.Screen name="item/[id]" />
        <Stack.Screen name="item/edit/[id]" />
        <Stack.Screen name="capture/[type]" />
        <Stack.Screen name="capture/success" />
      </Stack>
    </AppProviders>
  );
}
