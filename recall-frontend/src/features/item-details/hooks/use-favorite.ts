import { useEffect, useState } from "react";

import { track } from "@/lib/analytics/analytics";
import { USE_BACKEND } from "@/lib/config/backend-flag";
import { isFavorite, setFavorite } from "@/services/items.service";
import { runOrQueue } from "@/services/sync/mutation-queue";

// Favorite state for an item + optimistic toggle (backend only; mock = local).
export function useFavorite(itemId: string) {
  const [favorite, setFavoriteState] = useState(false);

  useEffect(() => {
    if (!USE_BACKEND) {
      return;
    }
    let active = true;
    void isFavorite(itemId)
      .then((value) => {
        if (active) {
          setFavoriteState(value);
        }
      })
      .catch((error: unknown) => console.warn("[favorite] load failed", error));
    return () => {
      active = false;
    };
  }, [itemId]);

  function toggle() {
    const next = !favorite;
    setFavoriteState(next);
    if (next) {
      track("favorite_added");
    }
    if (!USE_BACKEND) {
      return;
    }
    void runOrQueue({ kind: "favorite.set", payload: { id: itemId, on: next } }, () =>
      setFavorite(itemId, next)
    ).catch((error: unknown) => {
      console.warn("[favorite] toggle failed", error);
      setFavoriteState(!next);
    });
  }

  return { favorite, toggle };
}
