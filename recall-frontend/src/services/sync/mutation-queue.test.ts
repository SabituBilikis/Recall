// Isolate the pure retry/drop decision from the module's side-effecting deps.
jest.mock("@react-native-community/netinfo", () => ({ fetch: jest.fn() }));
jest.mock("@/services/cache/outbox", () => ({
  allOps: jest.fn(),
  bumpTries: jest.fn(),
  enqueueRaw: jest.fn(),
  removeOp: jest.fn()
}));
jest.mock("@/store/use-sync-store", () => ({
  useSyncStore: { getState: () => ({ refreshPending: jest.fn() }) }
}));
jest.mock("@/services/collections.service", () => ({}));
jest.mock("@/services/items.service", () => ({}));

import { isPermanent } from "./mutation-queue";

describe("isPermanent (retry vs drop decision)", () => {
  it("treats a unique-violation (23505) as permanent — the row already landed", () => {
    expect(isPermanent({ code: "23505" })).toBe(true);
  });

  it("drops 4xx client errors (RLS/validation/not-found)", () => {
    expect(isPermanent({ status: 400 })).toBe(true);
    expect(isPermanent({ status: 403 })).toBe(true);
    expect(isPermanent({ statusCode: 404 })).toBe(true);
    expect(isPermanent({ status: 422 })).toBe(true);
  });

  it("keeps 408 (timeout) and 429 (rate limit) retryable", () => {
    expect(isPermanent({ status: 408 })).toBe(false);
    expect(isPermanent({ status: 429 })).toBe(false);
  });

  it("keeps 5xx server errors retryable", () => {
    expect(isPermanent({ status: 500 })).toBe(false);
    expect(isPermanent({ status: 503 })).toBe(false);
  });

  it("treats unknown/networkless errors as transient (retry)", () => {
    expect(isPermanent(new Error("Network request failed"))).toBe(false);
    expect(isPermanent(null)).toBe(false);
    expect(isPermanent(undefined)).toBe(false);
    expect(isPermanent({})).toBe(false);
  });
});
