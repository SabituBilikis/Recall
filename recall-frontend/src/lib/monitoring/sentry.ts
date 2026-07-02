import * as Sentry from "@sentry/react-native";

// Crash + error reporting. The DSN is a public ingest key (safe to ship, like the
// Supabase publishable key) — it only lets the client SEND events. Disabled in dev
// so local errors don't pollute the dashboard; reports only from release builds.
const DSN = "https://d43b93fc1dc09dc285b023aa9747f236@o4511667861061632.ingest.us.sentry.io/4511667887603712";

export function initMonitoring(): void {
  Sentry.init({
    dsn: DSN,
    enabled: !__DEV__,
    // Keep performance tracing light for launch; raise later if needed.
    tracesSampleRate: 0.2,
    // Don't send PII (emails/tokens live in encrypted storage; never in events).
    sendDefaultPii: false
  });
}

// Single reporting seam used by the root ErrorBoundary + any manual capture.
export function reportError(error: unknown, context?: Record<string, unknown>): void {
  if (__DEV__) {
    return;
  }
  Sentry.captureException(error, context ? { extra: context } : undefined);
}
