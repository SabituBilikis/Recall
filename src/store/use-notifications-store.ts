import { create } from "zustand";

import { mockNotifications } from "@/features/notifications/mock/mock-notifications";
import { USE_BACKEND } from "@/lib/config/backend-flag";
import { cacheGet, cacheSet } from "@/services/cache/local-cache";
import * as notificationsService from "@/services/notifications.service";
import type { Notification } from "@/types/notification";

const CACHE_KEY = "notifications";

// Notifications. Mock (flag off): seeded list. Backend (flag on): hydrated from
// cache then the service; mark-read writes through optimistically. `unreadCount`
// is derived from the list (consumers select it) — no separate query.
type NotificationsState = {
  notifications: Notification[];
  loadNotifications: () => Promise<void>;
  markRead: (id: string) => void;
  markAllRead: () => void;
};

export const useNotificationsStore = create<NotificationsState>()((set, get) => ({
  notifications: USE_BACKEND ? [] : mockNotifications,

  loadNotifications: async () => {
    if (!USE_BACKEND) {
      return;
    }
    if (get().notifications.length === 0) {
      const cached = await cacheGet<Notification[]>(CACHE_KEY);
      if (cached && get().notifications.length === 0) {
        set({ notifications: cached });
      }
    }
    try {
      const notifications = await notificationsService.listNotifications();
      set({ notifications });
      void cacheSet(CACHE_KEY, notifications);
    } catch (error) {
      console.warn("[notifications] load failed (serving cache)", error);
    }
  },

  markRead: (id) => {
    const previous = get().notifications;
    set((state) => ({
      notifications: state.notifications.map((item) => (item.id === id ? { ...item, read: true } : item))
    }));
    if (!USE_BACKEND) {
      return;
    }
    void notificationsService.markRead(id).catch((error: unknown) => {
      console.warn("[notifications] mark read failed", error);
      set({ notifications: previous });
    });
  },

  markAllRead: () => {
    const previous = get().notifications;
    set((state) => ({ notifications: state.notifications.map((item) => ({ ...item, read: true })) }));
    if (!USE_BACKEND) {
      return;
    }
    void notificationsService.markAllRead().catch((error: unknown) => {
      console.warn("[notifications] mark all read failed", error);
      set({ notifications: previous });
    });
  }
}));

// Derived unread count selector for the bell badge.
export const selectUnreadCount = (state: NotificationsState): number =>
  state.notifications.reduce((total, item) => (item.read ? total : total + 1), 0);
