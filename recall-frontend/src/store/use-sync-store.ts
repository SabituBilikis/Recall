import { create } from "zustand";

import { countOps } from "@/services/cache/outbox";

// Tracks how many writes are waiting in the offline outbox. The mutation queue
// nudges `refreshPending` after every enqueue/flush so the sync banner stays
// in step with the durable queue.
type SyncState = {
  pending: number;
  refreshPending: () => Promise<void>;
};

export const useSyncStore = create<SyncState>()((set) => ({
  pending: 0,
  refreshPending: async () => {
    set({ pending: await countOps() });
  }
}));
