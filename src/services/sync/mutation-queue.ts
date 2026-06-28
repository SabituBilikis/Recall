import NetInfo from "@react-native-community/netinfo";

import { allOps, bumpTries, enqueueRaw, removeOp } from "@/services/cache/outbox";
import { useSyncStore } from "@/store/use-sync-store";
import * as collectionsService from "@/services/collections.service";
import type { NewCollection } from "@/services/collections.service";
import * as itemsService from "@/services/items.service";
import type { ItemPatch } from "@/services/items.service";
import type { CollectionColor, CollectionIcon } from "@/types/collection";
import type { SavedItemType } from "@/types/saved-item";

// Serializable mutations. Each carries everything needed to replay against the
// backend (entity ids are client-generated → replay is idempotent).
export type OutboxOp =
  | { kind: "collection.create"; payload: { id: string } & NewCollection }
  | { kind: "collection.update"; payload: { id: string; patch: Partial<NewCollection> } }
  | { kind: "collection.delete"; payload: { id: string } }
  | {
      kind: "item.create";
      payload: {
        id: string;
        type: SavedItemType;
        title: string;
        url: string | null;
        content: string;
        description: string;
        collectionId: string | null;
      };
    }
  | { kind: "item.update"; payload: { id: string; patch: ItemPatch } }
  | { kind: "item.archive"; payload: { id: string } }
  | { kind: "favorite.set"; payload: { id: string; on: boolean } };

function opId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

async function isOnline(): Promise<boolean> {
  try {
    return (await NetInfo.fetch()).isConnected ?? true;
  } catch {
    return true;
  }
}

async function dispatch(op: OutboxOp): Promise<void> {
  switch (op.kind) {
    case "collection.create":
      await collectionsService.createCollection(
        { name: op.payload.name, description: op.payload.description, color: op.payload.color as CollectionColor, icon: op.payload.icon as CollectionIcon },
        op.payload.id
      );
      return;
    case "collection.update":
      await collectionsService.updateCollection(op.payload.id, op.payload.patch);
      return;
    case "collection.delete":
      await collectionsService.deleteCollection(op.payload.id);
      return;
    case "item.create":
      await itemsService.createItem(
        {
          type: op.payload.type,
          title: op.payload.title,
          url: op.payload.url,
          content: op.payload.content,
          description: op.payload.description,
          collectionId: op.payload.collectionId
        },
        op.payload.id
      );
      return;
    case "item.update":
      await itemsService.updateItem(op.payload.id, op.payload.patch);
      return;
    case "item.archive":
      await itemsService.archiveItem(op.payload.id);
      return;
    case "favorite.set":
      await itemsService.setFavorite(op.payload.id, op.payload.on);
      return;
    default:
      return;
  }
}

// Online → run now (caller handles errors). Offline → durably queue for replay.
export async function runOrQueue(op: OutboxOp, run: () => Promise<unknown>): Promise<void> {
  if (await isOnline()) {
    await run();
    return;
  }
  await enqueueRaw(opId(), JSON.stringify(op));
  void useSyncStore.getState().refreshPending();
}

const MAX_TRIES = 5;

// A failure the server will reject every time → no point retrying. Drop the op
// instead of letting it block the queue forever.
function isPermanent(error: unknown): boolean {
  const err = error as { status?: number; statusCode?: number; code?: string };
  // Unique violation: the row already landed (idempotent replay) → treat as done.
  if (err?.code === "23505") {
    return true;
  }
  const status = err?.status ?? err?.statusCode;
  if (typeof status === "number") {
    // 4xx is a bad request (RLS, validation, not-found); keep 408/429 retryable.
    return status >= 400 && status < 500 && status !== 408 && status !== 429;
  }
  return false;
}

// Replay queued ops in order. Permanent failures are dropped so they can't wedge
// the queue; transient failures (offline / 5xx) pause the flush to retry later,
// and any op that exhausts its retry budget is abandoned.
export async function flushOutbox(): Promise<void> {
  if (!(await isOnline())) {
    return;
  }
  try {
    for (const stored of await allOps()) {
      try {
        await dispatch(JSON.parse(stored.op) as OutboxOp);
        await removeOp(stored.id);
      } catch (error) {
        if (isPermanent(error)) {
          console.warn("[outbox] dropping rejected op", stored.id, error);
          await removeOp(stored.id);
          continue;
        }
        if (stored.tries + 1 >= MAX_TRIES) {
          console.warn("[outbox] op exhausted retries, dropping", stored.id, error);
          await removeOp(stored.id);
          continue;
        }
        console.warn("[outbox] flush paused (will retry)", error);
        await bumpTries(stored.id);
        return;
      }
    }
  } finally {
    void useSyncStore.getState().refreshPending();
  }
}
