// In-memory keystore (mock-prefixed so jest allows it inside the factory).
const mockStore = new Map<string, string>();
jest.mock("expo-secure-store", () => ({
  getItemAsync: jest.fn(async (k: string) => mockStore.get(k) ?? null),
  setItemAsync: jest.fn(async (k: string, v: string) => {
    mockStore.set(k, v);
  })
}));

// Real randomness via the Node global webcrypto — exercises the actual cipher.
jest.mock("expo-crypto", () => ({
  getRandomBytes: (n: number) => crypto.getRandomValues(new Uint8Array(n))
}));

import { decryptString, encryptString } from "./secure-crypto";

describe("secure-crypto", () => {
  it("round-trips a string (encrypt → decrypt returns the original)", async () => {
    const plain = "user note: buy milk + token=eyJhbGci.abc.def-_123";
    const cipher = await encryptString(plain);
    expect(cipher).not.toContain(plain);
    expect(await decryptString(cipher)).toBe(plain);
  });

  it("produces a different ciphertext each call (random IV)", async () => {
    const a = await encryptString("same");
    const b = await encryptString("same");
    expect(a).not.toBe(b);
    expect(await decryptString(a)).toBe("same");
    expect(await decryptString(b)).toBe("same");
  });

  it("returns null for a non-conforming payload (e.g. legacy plaintext)", async () => {
    expect(await decryptString("plain-legacy-value")).toBeNull();
    expect(await decryptString("")).toBeNull();
  });

  it("returns null when the IV is corrupted", async () => {
    const cipher = await encryptString("secret");
    const [, body] = cipher.split(":");
    expect(await decryptString(`zzzz:${body}`)).toBeNull();
  });

  it("generates the keystore key only once (cached + persisted)", async () => {
    await encryptString("first");
    await encryptString("second");
    const secureStore = require("expo-secure-store");
    expect(secureStore.setItemAsync).toHaveBeenCalledTimes(1);
  });
});
