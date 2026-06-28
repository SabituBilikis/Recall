import { create } from "zustand";

import { USE_BACKEND } from "@/lib/config/backend-flag";
import { getProfile } from "@/services/profiles.service";
import type { User } from "@/types/user";

// Real signed-in profile (backend). Null on mock / signed out.
type ProfileState = {
  profile: User | null;
  loadProfile: () => Promise<void>;
  setProfile: (profile: User) => void;
  clear: () => void;
};

export const useProfileStore = create<ProfileState>()((set) => ({
  profile: null,

  loadProfile: async () => {
    if (!USE_BACKEND) {
      return;
    }
    try {
      set({ profile: await getProfile() });
    } catch (error) {
      console.warn("[profile] load failed", error);
    }
  },

  setProfile: (profile) => set({ profile }),

  clear: () => set({ profile: null })
}));
