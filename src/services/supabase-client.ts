import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

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

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
// Supabase's "publishable" key (formerly "anon") — the only key safe in the client.
// RLS is the real authorization.
const publishableKey =
  process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Missing env warns (not throws) so the mock app keeps running until wired.
if (!url || !publishableKey) {
  console.warn("[supabase] EXPO_PUBLIC_SUPABASE_URL / EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY not set — backend calls will fail until configured.");
}

export const supabase = createClient<Database>(url ?? "", publishableKey ?? "", {
  auth: {
    storage: encryptedStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
    // PKCE so the OAuth redirect returns a `code` we exchange for a session.
    flowType: "pkce"
  }
});
