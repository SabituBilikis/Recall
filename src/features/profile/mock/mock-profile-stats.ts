import type { ProfileStats } from "../types/profile.types";

// Mock usage statistics for the Profile stats card. Replaced by real counts
// (saved_items / collections / favorites) once the stats service is wired.
export const mockProfileStats: ProfileStats = {
  savedItems: 248,
  collections: 12
};
