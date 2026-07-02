import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

import { getSupabaseEnv } from "@/config/env";
import { USE_BACKEND } from "@/lib/config/backend-flag";

import type { Database } from "./generated/database.types";
import { decryptString, encryptString } from "./crypto/secure-crypto";

// Encrypted session storage: the auth token is AES-encrypted at rest, keyed from
// the OS keystore. Unreadable values (e.g. a legacy plaintext token) decrypt to
// null → treated as "no session" so the user simply re-authenticates once.
const encryptedStorage = {
  getItem: async (key: string): Promise<string | null> => {
    const stored = await AsyncStorage.getItem(key);
    return stored ? await decryptString(stored) : null;
  },
  setItem: async (key: string, value: string): Promise<void> => {
    await AsyncStorage.setItem(key, await encryptString(value));
  },
  removeItem: (key: string): Promise<void> => AsyncStorage.removeItem(key)
};

// createClient rejects an empty URL ("supabaseUrl is required"), so a
// syntactically valid dummy keeps construction from throwing at import; real
// backend calls against it simply fail into the stores' error states.
const FALLBACK = { supabaseUrl: "https://unconfigured.invalid", supabasePublishableKey: "unconfigured" };

// Backend on → validate env. On failure we DON'T throw at module load (that would
// be an uncatchable native startup crash); instead we record the error and let the
// BackendEnvGate surface it during render, where the root ErrorBoundary can show a
// graceful screen. Backend off → the mock app never calls the client.
export let supabaseEnvError: string | null = null;

function resolveEnv() {
  if (!USE_BACKEND) {
    return FALLBACK;
  }
  try {
    return getSupabaseEnv();
  } catch (error) {
    supabaseEnvError = error instanceof Error ? error.message : String(error);
    return FALLBACK;
  }
}

const { supabaseUrl, supabasePublishableKey } = resolveEnv();

export const supabase = createClient<Database>(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: encryptedStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
    // PKCE so the OAuth redirect returns a `code` we exchange for a session.
    flowType: "pkce"
  }
});
