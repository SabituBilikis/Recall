import aesjs from "aes-js";
import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";
import { sha256 } from "js-sha256";

// At-rest encryption for locally-persisted data (session token, SQLite cache,
// outbox). A single 256-bit key lives in the OS keystore (SecureStore); payloads
// are AES-256-CTR with a random per-message IV, then authenticated with
// HMAC-SHA256 (encrypt-then-MAC) so tampering or corruption is rejected rather
// than silently decrypting to garbage. Protects note content + tokens if device
// storage is read directly (rooted / stolen device).
//
// Wire format: `<ivHex>:<cipherHex>:<tagHex>`. Values not in this exact shape
// (e.g. legacy 2-part ciphertext or pre-encryption plaintext) decrypt to null so
// callers treat them as a cache miss / re-auth once.

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

// Separate MAC key derived from the encryption key (domain-separated) so the same
// keystore secret isn't reused verbatim for both encryption and authentication.
function macKey(key: number[]): number[] {
  return sha256.array([...key, 0x6d, 0x61, 0x63]); // "mac"
}

function tagFor(key: number[], body: string): string {
  return sha256.hmac.hex(macKey(key), body);
}

// Constant-time hex compare — avoids leaking the tag via timing.
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function encryptString(text: string): Promise<string> {
  const key = await getKey();
  const iv = Array.from(Crypto.getRandomBytes(16));
  const cipher = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(iv));
  // TextEncoder gives correct UTF-8 for all code points (incl. 4-byte emoji),
  // which aes-js's utf8 helper mangles.
  const encrypted = cipher.encrypt(new TextEncoder().encode(text));
  const ivHex = aesjs.utils.hex.fromBytes(iv);
  const cipherHex = aesjs.utils.hex.fromBytes(encrypted);
  const body = `${ivHex}:${cipherHex}`;
  return `${body}:${tagFor(key, body)}`;
}

export async function decryptString(payload: string): Promise<string | null> {
  const parts = payload.split(":");
  if (parts.length !== 3) {
    return null;
  }
  const [ivHex, cipherHex, tag] = parts;
  try {
    const key = await getKey();
    // Verify integrity before touching the ciphertext.
    if (!timingSafeEqual(tag, tagFor(key, `${ivHex}:${cipherHex}`))) {
      return null;
    }
    const iv = aesjs.utils.hex.toBytes(ivHex);
    const cipher = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(Array.from(iv)));
    const decrypted = cipher.decrypt(aesjs.utils.hex.toBytes(cipherHex));
    return new TextDecoder().decode(Uint8Array.from(decrypted));
  } catch {
    return null;
  }
}
