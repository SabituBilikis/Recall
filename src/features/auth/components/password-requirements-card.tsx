import { MotiView } from "moti";
import { YStack } from "tamagui";

import { Typography } from "@/components/ui/typography";
import type { PasswordRuleResult } from "@/lib/validation";
import { animationTokens } from "@/theme/tokens";

import { signupContent } from "../constants/signup-content";
import { PasswordChecklist } from "./password-checklist";

// Animated requirements block — fades/slides in like a tooltip when shown.
// Parent wraps in <AnimatePresence> so the exit animation runs on hide.
export function PasswordRequirementsCard({ rules }: { rules: PasswordRuleResult[] }) {
  return (
    <MotiView
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: 6 }}
      from={{ opacity: 0, translateY: 6 }}
      transition={{ duration: animationTokens.durationBase, type: "timing" }}
    >
      <YStack gap="$3">
        <Typography color="$onboardingTextPrimary" variant="body4">
          {signupContent.passwordRequirementsTitle}
        </Typography>
        <PasswordChecklist rules={rules} />
      </YStack>
    </MotiView>
  );
}
