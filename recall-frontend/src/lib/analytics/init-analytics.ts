import { setAnalyticsProvider } from "./analytics";
import { createPostHogClient, createPostHogProvider } from "./posthog-provider";

const DEFAULT_HOST = "https://us.i.posthog.com";

// Registers the analytics provider at startup. Gated on EXPO_PUBLIC_POSTHOG_KEY:
// with a key → PostHog; without one → stays no-op (events still fire through
// track(), just nowhere). Safe to call once from the root provider.
export function initAnalytics(): void {
  const key = process.env.EXPO_PUBLIC_POSTHOG_KEY;
  if (!key) {
    return;
  }
  try {
    const host = process.env.EXPO_PUBLIC_POSTHOG_HOST ?? DEFAULT_HOST;
    const client = createPostHogClient(key, host);
    setAnalyticsProvider(createPostHogProvider(client));
  } catch {
    // never let analytics init break startup
  }
}
