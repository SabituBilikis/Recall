import { useEffect } from "react";

import { mockUser } from "@/features/home/mock/mock-user";
import { USE_BACKEND } from "@/lib/config/backend-flag";
import { useCollectionsStore } from "@/store/use-collections-store";
import { useProfileStore } from "@/store/use-profile-store";
import { useSavedItemsStore } from "@/store/use-saved-items-store";
import { useSessionStore } from "@/store/use-session-store";
import type { User } from "@/types/user";

import { getStorageUsage } from "../data/storage-source";
import { mockProfileStats } from "../mock/mock-profile-stats";
import { storagePercent } from "../utils/format-bytes";
import { useStorage } from "./use-storage";

// Neutral placeholder for a backend user whose profile hasn't loaded or has no
// name yet — never the mock identity.
const EMPTY_USER: User = { id: "", firstName: "", lastName: "" };

// Derive a display name from the email local-part as a last resort.
function nameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "";
  return local.length > 0 ? local : "Add your name";
}

// Read model for the Profile hub: current user, usage stats, storage summary.
// Backend: self-hydrates the profile, reads real counts (zero for new accounts).
// Mock (flag off): mock identity + stats.
export function useProfileData() {
  const profile = useProfileStore((state) => state.profile);
  const loadProfile = useProfileStore((state) => state.loadProfile);
  const email = useSessionStore((state) => state.session?.user?.email ?? "");
  const savedItems = useSavedItemsStore((state) => state.items.length);
  const collections = useCollectionsStore((state) => state.collections.length);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  const { data: storageData } = useStorage();

  const user = profile ?? (USE_BACKEND ? EMPTY_USER : mockUser);
  const composedName = `${user.firstName} ${user.lastName}`.trim();
  const fullName = composedName || (USE_BACKEND ? nameFromEmail(email) : "Guest");
  // Real usage once loaded; fall back to the sync default until then.
  const storage = storageData?.usage ?? getStorageUsage();
  const stats = USE_BACKEND ? { savedItems, collections } : mockProfileStats;

  return {
    user,
    fullName,
    email,
    stats,
    storage,
    storagePercent: storagePercent(storage.usedBytes, storage.totalBytes)
  };
}
