import type { SavedItemType } from "@/types/saved-item";

// Profile flow domain types. Mock-backed for now; shaped so a future service
// (getProfile / getStorageUsage / updateProfile) can populate them unchanged.

// Aggregate storage figure shown on the Storage summary card.
export type StorageUsage = {
  usedBytes: number;
  totalBytes: number;
};

// Per-type contribution to storage, rendered as the breakdown list.
export type StorageBreakdownEntry = {
  type: SavedItemType;
  label: string;
  bytes: number;
  itemCount: number;
};

// Editable account fields (the Account screen form).
export type ProfileFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
};

// Usage statistics surfaced on the Profile stats card (alongside storage %).
export type ProfileStats = {
  savedItems: number;
  collections: number;
};
