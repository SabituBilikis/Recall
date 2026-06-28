import { YStack } from "tamagui";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useScaledCanvas } from "@/hooks/use-scaled-canvas";

import { getStartedLayoutTokens } from "../constants/get-started-tokens";
import { HeroIllustration } from "./hero-illustration";
import { TopGlow } from "./top-glow";

type GetStartedScreenProps = {
  onBeginPress: () => void;
  onLoginPress: () => void;
};

export function GetStartedScreen({ onBeginPress, onLoginPress }: GetStartedScreenProps) {
  const { left, scale, top } = useScaledCanvas(getStartedLayoutTokens.canvasWidth, getStartedLayoutTokens.canvasHeight);

  return (
    <YStack backgroundColor="$getStartedBackground" flex={1} overflow="hidden">
      <YStack
        height={getStartedLayoutTokens.canvasHeight}
        left={left}
        overflow="hidden"
        position="absolute"
        scale={scale}
        top={top}
        transformOrigin="left top"
        width={getStartedLayoutTokens.canvasWidth}
      >
        <TopGlow />
        <YStack
          gap={getStartedLayoutTokens.illustrationGap}
          items="center"
          left={getStartedLayoutTokens.screenHorizontalInset}
          position="absolute"
          top={getStartedLayoutTokens.contentTop}
          width={getStartedLayoutTokens.contentWidth}
        >
          <HeroIllustration />
          <YStack gap={getStartedLayoutTokens.actionsTopGap} items="center" width="100%">
            <YStack gap={getStartedLayoutTokens.titleGap} items="center" width="100%">
              <Typography color="$getStartedTitle" text="center" variant="h3">
                Hey there!{"\n"}Welcome to Recall
              </Typography>
              <Typography color="$getStartedSubtitle" text="center" variant="body2" width={getStartedLayoutTokens.subtitleWidth}>
                Save Everything Important. Find It Instantly.
              </Typography>
            </YStack>
            <YStack gap={getStartedLayoutTokens.actionGap} width={getStartedLayoutTokens.actionWidth}>
              <Button appearance="filled" onPress={onBeginPress} size="giant" width="100%">
                New here? Let&apos;s begin
              </Button>
              <Button appearance="outline" onPress={onLoginPress} size="giant" width="100%">
                I have been here before
              </Button>
            </YStack>
          </YStack>
        </YStack>
      </YStack>
    </YStack>
  );
}
