import { useCallback, useEffect, useRef, useState } from "react";

import { useIsMounted } from "@/hooks/use-is-mounted";
import { resendConfirmation } from "@/services/auth.service";

export type ResendState = "idle" | "sending" | "sent" | "error";

const COOLDOWN_SECONDS = 30;

// Resends the signup confirmation email with a cooldown so users can't spam it.
export function useResendConfirmation(email: string) {
  const [state, setState] = useState<ResendState>("idle");
  const [cooldown, setCooldown] = useState(0);
  const isMounted = useIsMounted();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, []);

  const resend = useCallback(async () => {
    if (state === "sending" || cooldown > 0 || email.length === 0) {
      return;
    }
    setState("sending");
    const { error } = await resendConfirmation(email);
    if (!isMounted.current) {
      return;
    }
    if (error) {
      setState("error");
      return;
    }
    setState("sent");
    setCooldown(COOLDOWN_SECONDS);
    timer.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          if (timer.current) {
            clearInterval(timer.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [state, cooldown, email, isMounted]);

  return { state, cooldown, resend };
}
