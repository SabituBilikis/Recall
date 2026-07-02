import PostHog from "posthog-react-native";

import type { AnalyticsProvider } from "./analytics";

// Wraps a PostHog client in the app's provider-agnostic AnalyticsProvider shape.
// Kept separate from analytics.ts so swapping vendors touches only this file +
// init-analytics.ts.
export function createPostHogProvider(client: PostHog): AnalyticsProvider {
  return {
    track: (event, props) => client.capture(event, props),
    identify: (userId) => client.identify(userId),
    reset: () => client.reset()
  };
}

export function createPostHogClient(apiKey: string, host: string): PostHog {
  return new PostHog(apiKey, { host });
}
