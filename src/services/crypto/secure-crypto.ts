import aesjs from "aes-js";
import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";

// At-rest encryption for locally-persisted data (session token, SQLite cache,
// outbox). A single 256-bit key lives in the OS keystore (SecureStore); payloads
// are AES-256-CTR with a random per-message IV. Protects note content + tokens if
// the device storage is read directly (rooted / stolen device).

const KEY_NAME = "recall-data-key-v1";
let keyPromise: Promise<number[]> | null = null;

async function getKey(): Promise<number[]> {
  if (!keyPromise) {
    keyPromise = (async () => {
      const existing = await SecureStore.getItemAsync(KEY_NAME);
      if (existing) {
        return existing.split(",").map(Number);
      }
      const bytes = Array.from(Crypto.getRandomBytes(32));
      await SecureStore.setItemAsync(KEY_NAME, bytes.join(","));
      return bytes;
    })();
  }
  return keyPromise;
}

export async function encryptString(text: string): Promise<string> {
  const key = await getKey();
  const iv = Array.from(Crypto.getRandomBytes(16));
  const cipher = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(iv));
  const encrypted = cipher.encrypt(aesjs.utils.utf8.toBytes(text));
  return `${aesjs.utils.hex.fromBytes(iv)}:${aesjs.utils.hex.fromBytes(encrypted)}`;
}

// Returns null if the payload isn't our format (e.g. a pre-encryption plaintext
// value) so callers can treat it as a cache miss rather than crash.
export async function decryptString(payload: string): Promise<string | null> {
  const parts = payload.split(":");
  if (parts.length !== 2) {
    return null;
  }
  try {
    const key = await getKey();
    const iv = aesjs.utils.hex.toBytes(parts[0]);
    const cipher = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(Array.from(iv)));
    return aesjs.utils.utf8.fromBytes(cipher.decrypt(aesjs.utils.hex.toBytes(parts[1])));
  } catch {
    return null;
  }
}
