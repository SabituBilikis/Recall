import { XStack, YStack } from "tamagui";

import { Typography } from "@/components/ui/typography";

import { homeContent } from "../constants/home-content";
import type { QuickCaptureAction } from "../types/quick-capture.types";
import { chunkPairs } from "../utils/chunk-pairs";
import { QuickCaptureCard } from "./quick-capture-card";

type QuickCaptureSectionProps = {
  actions: QuickCaptureAction[];
  onActionPress: (action: QuickCaptureAction) => void;
};

export function QuickCaptureSection({ actions, onActionPress }: QuickCaptureSectionProps) {
  return (
    <YStack gap="$4" width="100%">
      <Typography color="$onboardingTextPrimary" variant="subtitle2">
        {homeContent.quickCaptureTitle}
      </Typography>

      <YStack gap="$4" width="100%">
        {chunkPairs(actions).map((row) => (
          <XStack gap="$4" key={row[0].id} width="100%">
            {row.map((action) => (
              <QuickCaptureCard action={action} key={action.id} onPress={() => onActionPress(action)} />
            ))}
          </XStack>
        ))}
      </YStack>
    </YStack>
  );
}
