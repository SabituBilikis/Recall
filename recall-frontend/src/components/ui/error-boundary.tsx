import { Component, type ErrorInfo, type ReactNode } from "react";
import { YStack } from "tamagui";

import { StateMessage } from "@/components/ui/state-message";
import { reportError as reportToSentry } from "@/lib/monitoring/sentry";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

// Top-level safety net: catches render-time crashes anywhere in the tree so a
// thrown error shows a recoverable fallback instead of unmounting the whole app
// to a blank screen. "Try again" remounts the subtree. Errors are surfaced to the
// crash reporter via reportError (wire Sentry/Crashlytics there).
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // Single reporting seam — replace with the crash reporter when integrated.
    reportError(error, info);
  }

  private handleReset = (): void => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <YStack backgroundColor="$surfaceSubtle" flex={1} justify="center" p="$4">
          <StateMessage
            actionLabel="Try again"
            description="Something went wrong. Please try again."
            title="Unexpected error"
            onAction={this.handleReset}
          />
        </YStack>
      );
    }

    return this.props.children;
  }
}

function reportError(error: Error, info: ErrorInfo): void {
  if (__DEV__) {
    console.error("[ErrorBoundary]", error, info.componentStack);
    return;
  }
  reportToSentry(error, { componentStack: info.componentStack });
}
