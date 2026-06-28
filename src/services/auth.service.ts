import type { Session } from "@supabase/supabase-js";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

import { authErrorMessage } from "./auth-errors";
import { supabase } from "./supabase-client";

// Lets the in-app browser dismiss itself after the OAuth redirect.
WebBrowser.maybeCompleteAuthSession();

type SignUpParams = { email: string; firstName: string; lastName: string; password: string };

export async function getCurrentUserId(): Promise<string> {
  // Read the id from the local session (auto-refreshed in the background). NOT
  // getUser(): that makes a network call that signs the user out on a stale/failed
  // token — which was logging users out on every save.
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session?.user) {
    throw new Error("Not authenticated");
  }
  return data.session.user.id;
}

export function getSession() {
  return supabase.auth.getSession();
}

export function signUpWithEmail({ email, firstName, lastName, password }: SignUpParams) {
  return supabase.auth.signUp({
    email,
    password,
    options: { data: { first_name: firstName, last_name: lastName } }
  });
}

export function signInWithEmail(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

// Full mobile OAuth: open the provider in an auth session, catch the recall://
// redirect, exchange the PKCE code for a session.
export async function signInWithGoogle(): Promise<{ session: Session | null; error: string | null }> {
  const redirectTo = Linking.createURL("auth-callback");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo, skipBrowserRedirect: true }
  });
  if (error || !data.url) {
    return { session: null, error: error ? authErrorMessage(error) : "Could not start Google sign-in." };
  }

  const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
  if (result.type !== "success") {
    // "cancel"/"dismiss" → user backed out; not an error to surface.
    return { session: null, error: null };
  }

  const code = Linking.parse(result.url).queryParams?.code;
  if (typeof code !== "string") {
    return { session: null, error: "No authorization code returned." };
  }

  const exchange = await supabase.auth.exchangeCodeForSession(code);
  if (exchange.error) {
    return { session: null, error: exchange.error.message };
  }
  return { session: exchange.data.session, error: null };
}

export function signOut() {
  return supabase.auth.signOut();
}

export function onAuthStateChange(handler: (session: Session | null) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => handler(session));
}
