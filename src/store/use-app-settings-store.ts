import { create } from "zustand";

export type ColorSchemePreference = "dark" | "light" | "system";

// App-wide local preferences. `offlineModeEnabled` / `notificationsEnabled` are
// UI-only flags for the Profile settings toggles — no real offline/push
// integration yet (per spec), just persisted intent the backend can read later.
type AppSettingsState = {
  colorSchemePreference: ColorSchemePreference;
  setColorSchemePreference: (preference: ColorSchemePreference) => void;
  offlineModeEnabled: boolean;
  setOfflineModeEnabled: (enabled: boolean) => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
};

export const useAppSettingsStore = create<AppSettingsState>()((set) => ({
  colorSchemePreference: "system",
  setColorSchemePreference: (colorSchemePreference) => set({ colorSchemePreference }),
  offlineModeEnabled: false,
  setOfflineModeEnabled: (offlineModeEnabled) => set({ offlineModeEnabled }),
  notificationsEnabled: true,
  setNotificationsEnabled: (notificationsEnabled) => set({ notificationsEnabled })
}));
