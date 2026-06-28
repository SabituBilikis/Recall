import type { Notification } from "@/types/notification";

// Mock notifications for the flag-off path (mirrors the seeded backend rows).
export const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    type: "welcome",
    title: "Welcome to Recall",
    body: "Save everything important and find it instantly. Capture your first item to get started.",
    createdAtLabel: "Today",
    read: false
  },
  {
    id: "notif-2",
    type: "collection",
    title: "New collection",
    body: "You created the Design Inspiration collection.",
    createdAtLabel: "Today",
    read: false
  },
  {
    id: "notif-3",
    type: "item",
    title: "Item saved",
    body: "Pricing Research was added to Research.",
    createdAtLabel: "Yesterday",
    read: true
  }
];
