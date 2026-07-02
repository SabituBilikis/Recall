import { AnimatePresence, MotiView } from "moti";
import { XStack, YStack } from "tamagui";

import { AlertCircleIcon, CheckCircleIcon } from "@/components/ui/icons";
import { Typography } from "@/components/ui/typography";
import type { PasswordRuleResult } from "@/lib/validation";
import { animationTokens } from "@/theme/tokens";
import { colorValues } from "@/theme/tokens/color";

const ICON_SIZE = 18;

function RuleRow({ result }: { result: PasswordRuleResult }) {
  return (
    <XStack gap="$2" items="center">
      <AnimatePresence exitBeforeEnter>
        <MotiView
          key={result.met ? "met" : "unmet"}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          from={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: animationTokens.durationFast, type: "timing" }}
        >
          {result.met ? (
            <CheckCircleIcon color={colorValues.primary500} size={ICON_SIZE} />
          ) : (
            <AlertCircleIcon color={colorValues.red500} size={ICON_SIZE} />
          )}
        </MotiView>
      </AnimatePresence>
      <Typography color={result.met ? "$onboardingTextPrimary" : "$inputHelperError"} variant="body3">
        {result.label}
      </Typography>
    </XStack>
  );
}

export function PasswordChecklist({ rules }: { rules: PasswordRuleResult[] }) {
  return (
    <YStack gap="$2.5">
      {rules.map((rule) => (
        <RuleRow key={rule.id} result={rule} />
      ))}
    </YStack>
  );
}
