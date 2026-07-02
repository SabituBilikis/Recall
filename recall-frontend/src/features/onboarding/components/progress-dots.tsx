import { MotiView } from "moti";
import { XStack, YStack } from "tamagui";

import { onboardingLayoutTokens, onboardingMotionTokens } from "../constants/onboarding-tokens";

import { onboardingSlides } from "../constants/onboarding-slides";

type ProgressDotsProps = {
  activeIndex: number;
};

export function ProgressDots({ activeIndex }: ProgressDotsProps) {
  return (
    <XStack gap={onboardingLayoutTokens.progressDotGap} items="center">
      {onboardingSlides.map((slide, index) => {
        const isActive = index === activeIndex;

        return (
          <MotiView
            key={slide.id}
            animate={{
              opacity: isActive ? 1 : onboardingMotionTokens.inactiveDotOpacity,
              width: isActive ? onboardingLayoutTokens.progressPillWidth : onboardingLayoutTokens.progressDotSize
            }}
            transition={{ duration: onboardingMotionTokens.dotDuration, type: "timing" }}
          >
            <YStack
              backgroundColor={isActive ? "$onboardingProgressActive" : "$onboardingProgressInactive"}
              height={onboardingLayoutTokens.progressDotSize}
              rounded={onboardingLayoutTokens.progressRadius}
              width="100%"
            />
          </MotiView>
        );
      })}
    </XStack>
  );
}
