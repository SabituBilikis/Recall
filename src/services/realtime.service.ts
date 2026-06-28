import type { RealtimeChannel } from "@supabase/supabase-js";

import { getCurrentUserId } from "./auth.service";
import { supabase } from "./supabase-client";

export type RealtimeHandlers = {
  // Fired (debounced) when the user's saved_items or favorites change.
  onItemsChanged: () => void;
  // Fired (debounced) when the user's collections change.
  onCollectionsChanged: () => void;
  // Fired (debounced) when the user's notifications change.
  onNotificationsChanged: () => void;
};

// Subscribe to row changes for the signed-in user across saved_items, favorites
// and collections. Returns an unsubscribe fn. RLS scopes the stream server-side;
// the user_id filter narrows it further. Callbacks are debounced so a burst of
// changes triggers a single reload.
export async function subscribeToUserData(handlers: RealtimeHandlers): Promise<() => void> {
  const userId = await getCurrentUserId();
  const filter = `user_id=eq.${userId}`;

  const debounce = (fn: () => void, ms = 250) => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(fn, ms);
    };
  };

  const itemsChanged = debounce(handlers.onItemsChanged);
  const collectionsChanged = debounce(handlers.onCollectionsChanged);
  const notificationsChanged = debounce(handlers.onNotificationsChanged);

  const channel: RealtimeChannel = supabase
    .channel(`user-data:${userId}`)
    .on("postgres_changes", { event: "*", schema: "public", table: "saved_items", filter }, itemsChanged)
    .on("postgres_changes", { event: "*", schema: "public", table: "favorites", filter }, itemsChanged)
    .on("postgres_changes", { event: "*", schema: "public", table: "collections", filter }, collectionsChanged)
    .on("postgres_changes", { event: "*", schema: "public", table: "notifications", filter }, notificationsChanged)
    .subscribe();

  return () => {
    void supabase.removeChannel(channel);
  };
}
