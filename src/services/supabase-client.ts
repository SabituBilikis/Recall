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

// Backend on → validate env and fail fast (getSupabaseEnv throws, caught by the
// root ErrorBoundary). Backend off → the mock app runs with empty creds; the
// client is constructed but never called.
const { supabaseUrl, supabasePublishableKey } = USE_BACKEND
  ? getSupabaseEnv()
  : { supabaseUrl: "", supabasePublishableKey: "" };

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
