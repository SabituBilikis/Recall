import NetInfo from "@react-native-community/netinfo";
import { QueryClientProvider } from "@tanstack/react-query";
import { AppState } from "react-native";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold
} from "@expo-google-fonts/plus-jakarta-sans";
import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import { TamaguiProvider, Theme } from "tamagui";

import { ErrorBoundary } from "@/components/ui/error-boundary";
import { identifyUser, resetAnalytics } from "@/lib/analytics/analytics";
import { initAnalytics } from "@/lib/analytics/init-analytics";
import { USE_BACKEND } from "@/lib/config/backend-flag";
import { initMonitoring } from "@/lib/monitoring/sentry";
import { getSession, handleAuthDeepLink, isAuthDeepLink, onAuthStateChange } from "@/services/auth.service";
import { queryClient } from "@/services/query/query-client";
import { registerQueryOnlineManager } from "@/services/network/register-online-manager";
import { subscribeToUserData } from "@/services/realtime.service";
import { supabase, supabaseEnvError } from "@/services/supabase-client";
import { flushOutbox } from "@/services/sync/mutation-queue";
import { useCollectionsStore } from "@/store/use-collections-store";
import { useNotificationsStore } from "@/store/use-notifications-store";
import { useSavedItemsStore } from "@/store/use-saved-items-store";
import { useSessionStore } from "@/store/use-session-store";
import { useSyncStore } from "@/store/use-sync-store";
import { tamaguiConfig } from "@/theme";

void SplashScreen.preventAutoHideAsync();
initMonitoring();

// Surfaces a backend env misconfiguration during render (not at import time), so
// the root ErrorBoundary shows a graceful screen instead of an uncatchable native
// startup crash. No-op when env is valid.
function BackendEnvGate() {
  if (supabaseEnvError) {
    throw new Error(supabaseEnvError);
  }
  return null;
}

export function AppProviders({ children }: PropsWithChildren) {
  const themeName = "light";
  const userId = useSessionStore((state) => state.userId);
  const [fontsLoaded, fontError] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold
  });
  // Never let a font failure hold the app on a blank screen — fall back to the
  // system font once fonts either load or error out.
  const fontsReady = fontsLoaded || !!fontError;

  useEffect(() => {
    registerQueryOnlineManager();
    initAnalytics();
  }, []);

  // Tie analytics identity to the session: identify on sign-in, reset on sign-out.
  useEffect(() => {
    if (userId) {
      identifyUser(userId);
    } else {
      resetAnalytics();
    }
  }, [userId]);

  // Keep the JWT fresh. RN needs AppState wiring for autoRefreshToken to run —
  // without it the token expires, auth.uid() goes null and RLS denies (42501).
  useEffect(() => {
    if (!USE_BACKEND) {
      return;
    }
    if (AppState.currentState === "active") {
      supabase.auth.startAutoRefresh();
    }
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        supabase.auth.startAutoRefresh();
      } else {
        supabase.auth.stopAutoRefresh();
      }
    });
    return () => sub.remove();
  }, []);

  // Restore + track the auth session (backend only).
  useEffect(() => {
    if (!USE_BACKEND) {
      return;
    }
    const setSession = useSessionStore.getState().setSession;
    void getSession()
      .then(({ data }) => setSession(data.session))
      .finally(() => useSessionStore.getState().markBootstrapped());
    const { data } = onAuthStateChange((session) => setSession(session));
    return () => data.subscription.unsubscribe();
  }, []);

  // Email-confirmation / magic-link deep links: completing auth from the link
  // (the onAuthStateChange listener above picks up the new session), then show
  // the confirmed screen.
  useEffect(() => {
    if (!USE_BACKEND) {
      return;
    }
    const onUrl = (url: string | null) => {
      if (!url || !isAuthDeepLink(url)) {
        return;
      }
      void handleAuthDeepLink(url).then((result) => {
        // Always route off the (possibly blank) launch screen for an auth link.
        router.replace(result.ok ? "/email-confirmed" : "/login");
      });
    };
    void Linking.getInitialURL().then(onUrl);
    const sub = Linking.addEventListener("url", (event) => onUrl(event.url));
    return () => sub.remove();
  }, []);

  // Replay offline writes: once on startup, then whenever the network returns.
  useEffect(() => {
    if (!USE_BACKEND) {
      return;
    }
    void useSyncStore.getState().refreshPending();
    void flushOutbox();
    let wasConnected = true;
    const unsubscribe = NetInfo.addEventListener((state) => {
      const connected = state.isConnected ?? false;
      if (connected && !wasConnected) {
        void flushOutbox();
      }
      wasConnected = connected;
    });
    return unsubscribe;
  }, []);

  // Live updates: resubscribe whenever the signed-in user changes. Any change to
  // the user's data reloads the affected store (cross-device + post-flush sync).
  useEffect(() => {
    if (!USE_BACKEND || !userId) {
      return;
    }
    let unsubscribe: (() => void) | null = null;
    let cancelled = false;
    void subscribeToUserData({
      onItemsChanged: () => void useSavedItemsStore.getState().loadItems(),
      onCollectionsChanged: () => void useCollectionsStore.getState().loadCollections(),
      onNotificationsChanged: () => void useNotificationsStore.getState().loadNotifications()
    })
      .then((fn) => {
        if (cancelled) {
          fn();
        } else {
          unsubscribe = fn;
        }
      })
      .catch((error: unknown) => console.warn("[realtime] subscribe failed", error));
    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, [userId]);

  useEffect(() => {
    if (fontsReady) {
      void SplashScreen.hideAsync();
    }
  }, [fontsReady]);

  if (!fontsReady) {
    return null;
  }

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={themeName}>
      <Theme name={themeName}>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary>
            <BackendEnvGate />
            {children}
          </ErrorBoundary>
          <StatusBar style="dark" />
        </QueryClientProvider>
      </Theme>
    </TamaguiProvider>
  );
}
