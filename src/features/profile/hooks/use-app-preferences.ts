import { useAppSettingsStore } from "@/store/use-app-settings-store";

// Wraps the local preference flags as simple toggles for the Profile settings
// rows. UI-only for now — no real offline/push wiring (per spec).
export function useAppPreferences() {
  const offlineModeEnabled = useAppSettingsStore((state) => state.offlineModeEnabled);
  const setOfflineModeEnabled = useAppSettingsStore((state) => state.setOfflineModeEnabled);
  const notificationsEnabled = useAppSettingsStore((state) => state.notificationsEnabled);
  const setNotificationsEnabled = useAppSettingsStore((state) => state.setNotificationsEnabled);

  return {
    offlineModeEnabled,
    notificationsEnabled,
    toggleOfflineMode: () => setOfflineModeEnabled(!offlineModeEnabled),
    toggleNotifications: () => setNotificationsEnabled(!notificationsEnabled)
  };
}
