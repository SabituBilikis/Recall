import { useCallback, useEffect, useState } from "react";

import { USE_BACKEND } from "@/lib/config/backend-flag";
import { selectUnreadCount, useNotificationsStore } from "@/store/use-notifications-store";

// Screen logic for Notifications: list + unread count from the store, first-load
// status (loading/error), refresh, and mark-read actions.
export function useNotifications() {
  const notifications = useNotificationsStore((state) => state.notifications);
  const unreadCount = useNotificationsStore(selectUnreadCount);
  const loadNotifications = useNotificationsStore((state) => state.loadNotifications);
  const markRead = useNotificationsStore((state) => state.markRead);
  const markAllRead = useNotificationsStore((state) => state.markAllRead);

  const [loading, setLoading] = useState(USE_BACKEND && notifications.length === 0);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    setError(false);
    try {
      await loadNotifications();
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [loadNotifications]);

  useEffect(() => {
    void Promise.resolve().then(load);
  }, [load]);

  return { notifications, unreadCount, loading, error, refresh: load, markRead, markAllRead };
}
