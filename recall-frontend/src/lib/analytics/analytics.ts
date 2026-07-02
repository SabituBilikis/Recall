// Product analytics (PRD §32). Provider-agnostic: call `track(...)` anywhere; the
// events flow to whatever provider is registered at startup (PostHog / Firebase /
// Segment). No provider registered → no-op (safe). The event names + call sites are
// the durable part; swapping providers is a small adapter implementing the
// AnalyticsProvider interface + one setAnalyticsProvider() call.

export type AnalyticsEventName =
  | "item_saved"
  | "collection_created"
  | "search_used"
  | "favorite_added"
  | "file_uploaded"
  | "item_archived";

export type AnalyticsProps = Record<string, string | number | boolean>;

export type AnalyticsProvider = {
  track: (event: AnalyticsEventName, props?: AnalyticsProps) => void;
  identify?: (userId: string) => void;
  reset?: () => void;
};

let provider: AnalyticsProvider | null = null;

export function setAnalyticsProvider(next: AnalyticsProvider | null): void {
  provider = next;
}

// Fire-and-forget; never let analytics throw into product code.
export function track(event: AnalyticsEventName, props?: AnalyticsProps): void {
  try {
    provider?.track(event, props);
  } catch {
    // swallow — analytics must never break a user flow
  }
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[analytics]", event, props ?? {});
  }
}

export function identifyUser(userId: string): void {
  try {
    provider?.identify?.(userId);
  } catch {
    // swallow
  }
}

export function resetAnalytics(): void {
  try {
    provider?.reset?.();
  } catch {
    // swallow
  }
}
