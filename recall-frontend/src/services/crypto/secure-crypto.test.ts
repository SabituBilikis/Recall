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
  it("round-trips a string incl. 4-byte unicode (emoji)", async () => {
    const plain = "note: buy milk 🥛 café — token=eyJ.abc.def";
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

  it("uses the authenticated 3-part wire format (iv:cipher:tag)", async () => {
    expect((await encryptString("x")).split(":")).toHaveLength(3);
  });

  it("returns null for non-conforming payloads (legacy plaintext / 2-part)", async () => {
    expect(await decryptString("plain-legacy-value")).toBeNull();
    expect(await decryptString("")).toBeNull();
    expect(await decryptString("deadbeef:cafe")).toBeNull(); // old 2-part format
  });

  it("rejects a tampered ciphertext (HMAC fails → null)", async () => {
    const [iv, body, tag] = (await encryptString("secret")).split(":");
    const flipped = body.slice(0, -1) + (body.at(-1) === "0" ? "1" : "0");
    expect(await decryptString(`${iv}:${flipped}:${tag}`)).toBeNull();
  });

  it("rejects a forged/altered tag", async () => {
    const [iv, body] = (await encryptString("secret")).split(":");
    expect(await decryptString(`${iv}:${body}:${"0".repeat(64)}`)).toBeNull();
  });

  it("generates the keystore key only once (cached + persisted)", async () => {
    await encryptString("first");
    await encryptString("second");
    const secureStore = require("expo-secure-store");
    expect(secureStore.setItemAsync).toHaveBeenCalledTimes(1);
  });

  it("recovers after a transient keystore failure (rejection not cached)", async () => {
    // Fresh module registry → fresh keyPromise and fresh mocks for this case.
    jest.resetModules();
    const secureStore = require("expo-secure-store");
    secureStore.getItemAsync.mockRejectedValueOnce(new Error("keystore busy"));
    const isolated = require("./secure-crypto") as typeof import("./secure-crypto");
    await expect(isolated.encryptString("x")).rejects.toThrow("keystore busy");
    // Next call must retry the keystore (not replay a cached rejection).
    const cipher = await isolated.encryptString("x");
    expect(await isolated.decryptString(cipher)).toBe("x");
  });
});
