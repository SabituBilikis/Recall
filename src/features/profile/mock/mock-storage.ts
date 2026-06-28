import type { StorageBreakdownEntry, StorageUsage } from "../types/profile.types";

// Mock storage figures (no real calculation per spec), matched to the Figma
// Storage frame. Swap for a getStorageUsage() service later — shapes unchanged.
const GB = 1024 * 1024 * 1024;
const MB = 1024 * 1024;

export const mockStorageUsage: StorageUsage = {
  usedBytes: 4.2 * GB,
  totalBytes: 10 * GB
};

export const mockStorageBreakdown: StorageBreakdownEntry[] = [
  { type: "screenshot", label: "Screenshots", bytes: 1.4 * GB, itemCount: 12 },
  { type: "link", label: "Links", bytes: 200 * MB, itemCount: 100 },
  { type: "note", label: "Notes", bytes: 30 * MB, itemCount: 12 },
  { type: "file", label: "Files", bytes: 100 * MB, itemCount: 12 }
];
