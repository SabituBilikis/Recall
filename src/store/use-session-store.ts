import type { Session } from "@supabase/supabase-js";
import { create } from "zustand";

// Holds the Supabase auth session. Populated on sign-in and by the auth-state
// listener; null when signed out / on mock.
type SessionState = {
  session: Session | null;
  userId: string | null;
  // False until the initial getSession() restore completes — guards against
  // redirecting a signed-in user during the brief null-session cold-start window.
  bootstrapped: boolean;
  setSession: (session: Session | null) => void;
  markBootstrapped: () => void;
};

export const useSessionStore = create<SessionState>()((set) => ({
  session: null,
  userId: null,
  bootstrapped: false,
  setSession: (session) => set({ session, userId: session?.user?.id ?? null }),
  markBootstrapped: () => set({ bootstrapped: true })
}));
