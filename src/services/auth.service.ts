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

// Re-send the signup confirmation email.
export function resendConfirmation(email: string) {
  return supabase.auth.resend({ type: "signup", email });
}

type EmailOtpType = "signup" | "email" | "magiclink" | "recovery" | "invite" | "email_change";

// Read auth params from both the query string and the hash fragment of a link.
function parseAuthParams(url: string): Map<string, string> {
  const params = new Map<string, string>();
  const collect = (segment?: string) => {
    if (!segment) {
      return;
    }
    for (const [key, value] of new URLSearchParams(segment)) {
      params.set(key, value);
    }
  };
  const hashIndex = url.indexOf("#");
  const queryIndex = url.indexOf("?");
  if (queryIndex >= 0) {
    collect(url.slice(queryIndex + 1, hashIndex >= 0 ? hashIndex : undefined));
  }
  if (hashIndex >= 0) {
    collect(url.slice(hashIndex + 1));
  }
  return params;
}

// True when a link carries something we can complete auth with (confirmation /
// magic link / OAuth code). Lets callers branch before doing the async work.
export function isAuthDeepLink(url: string): boolean {
  const params = parseAuthParams(url);
  return params.has("token_hash") || params.has("code") || params.has("access_token");
}

// Handle an incoming auth deep link (recall://...) from a confirmation / magic
// link. Completes auth via whichever credential the link carries. Returns
// ok=false (no-op) when the URL has no auth params, so it's safe to call for
// every incoming link.
export async function handleAuthDeepLink(url: string): Promise<{ ok: boolean; isSignup: boolean }> {
  const params = parseAuthParams(url);
  const type = params.get("type") ?? "";
  const isSignup = type === "signup" || type === "email" || type === "magiclink";

  try {
    const tokenHash = params.get("token_hash");
    if (tokenHash && type) {
      const { error } = await supabase.auth.verifyOtp({ type: type as EmailOtpType, token_hash: tokenHash });
      return { ok: !error, isSignup };
    }
    const code = params.get("code");
    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      return { ok: !error, isSignup };
    }
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    if (accessToken && refreshToken) {
      const { error } = await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
      return { ok: !error, isSignup };
    }
  } catch {
    return { ok: false, isSignup };
  }
  return { ok: false, isSignup };
}

export function onAuthStateChange(handler: (session: Session | null) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => handler(session));
}
