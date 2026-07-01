jest.mock("@/lib/config/backend-flag", () => ({ USE_BACKEND: true }));
jest.mock("@/services/cache/local-cache", () => ({ cacheGet: jest.fn(), cacheSet: jest.fn() }));
jest.mock("@/services/items.service", () => ({
  archiveItem: jest.fn(),
  listRecentItemsPage: jest.fn()
}));
const mockRunOrQueue = jest.fn();
jest.mock("@/services/sync/mutation-queue", () => ({ runOrQueue: (...a: unknown[]) => mockRunOrQueue(...a) }));

import type { SavedItem } from "@/types/saved-item";
import { useSavedItemsStore } from "./use-saved-items-store";

const item = (id: string): SavedItem =>
  ({ id, type: "note", title: `t-${id}` }) as unknown as SavedItem;

const flush = () => new Promise((r) => setTimeout(r, 0));

beforeEach(() => {
  mockRunOrQueue.mockReset();
  useSavedItemsStore.setState({ items: [item("a"), item("b"), item("c")], nextCursor: null });
});

describe("useSavedItemsStore.deleteItem", () => {
  it("removes the item optimistically and enqueues the archive", () => {
    mockRunOrQueue.mockResolvedValue(undefined);
    useSavedItemsStore.getState().deleteItem("b");
    expect(useSavedItemsStore.getState().items.map((i) => i.id)).toEqual(["a", "c"]);
    expect(mockRunOrQueue).toHaveBeenCalledTimes(1);
  });

  it("restores the item when the archive fails (rollback)", async () => {
    mockRunOrQueue.mockRejectedValue(new Error("network"));
    useSavedItemsStore.getState().deleteItem("b");
    // Optimistically gone…
    expect(useSavedItemsStore.getState().items.map((i) => i.id)).toEqual(["a", "c"]);
    await flush();
    // …then rolled back to the original set on failure.
    expect(useSavedItemsStore.getState().items.map((i) => i.id)).toEqual(["a", "b", "c"]);
  });
});

describe("useSavedItemsStore.addItem", () => {
  it("prepends the new item", () => {
    useSavedItemsStore.getState().addItem(item("z"));
    expect(useSavedItemsStore.getState().items[0].id).toBe("z");
  });
});
