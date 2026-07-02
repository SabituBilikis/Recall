import { MotiView } from "moti";
import { YStack } from "tamagui";

import { RecallMark } from "@/components/ui/icons";
import { Typography } from "@/components/ui/typography";
import { useReducedMotionFlag } from "@/hooks/use-reduced-motion-flag";
import { animationTokens } from "@/theme/tokens";

import { searchContent } from "../constants/search-content";

export function EmptySearchState() {
  const reduceMotion = useReducedMotionFlag();

  return (
    <MotiView
      animate={{ opacity: 1 }}
      from={{ opacity: reduceMotion ? 1 : 0 }}
      transition={{ duration: animationTokens.durationSlow, type: "timing" }}
    >
      <YStack gap="$6" items="center" px="$4" py="$6" width="100%">
        <YStack backgroundColor="$accentPrimarySoft" height={100} items="center" justify="center" rounded={50} width={100}>
          <RecallMark size={56} />
        </YStack>
        <YStack gap="$2" items="center">
          <Typography color="$onboardingTextPrimary" text="center" variant="h5">
            {searchContent.empty.title}
          </Typography>
          <Typography color="$textTertiary" text="center" variant="body1">
            {searchContent.empty.description}
          </Typography>
        </YStack>
      </YStack>
    </MotiView>
  );
}
