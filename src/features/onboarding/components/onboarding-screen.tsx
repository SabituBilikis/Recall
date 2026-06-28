import { ScrollView, XStack, YStack } from "tamagui";

import { Button } from "@/components/ui/button";
import { SoftGlow } from "@/components/ui/soft-glow";
import { Typography } from "@/components/ui/typography";
import { useHiddenStatusBar } from "@/hooks/use-hidden-status-bar";
import { colorValues } from "@/theme/tokens/color";
import { onboardingLayoutTokens, onboardingSlideLayoutTokens } from "../constants/onboarding-tokens";

import { onboardingSlides, type OnboardingSlideId } from "../constants/onboarding-slides";
import { useOnboardingCarousel } from "../hooks/use-onboarding-carousel";
import { useScaledOnboardingCanvas } from "../hooks/use-scaled-onboarding-canvas";
import { OrganizeIllustration, SaveEverythingIllustration, SearchIllustration } from "./onboarding-illustrations";
import { ProgressDots } from "./progress-dots";

type OnboardingScreenProps = {
  onSignUpPress: () => void;
  onSkipPress: () => void;
};

const illustrationBySlide: Record<OnboardingSlideId, React.ReactNode> = {
  organize: <OrganizeIllustration />,
  save: <SaveEverythingIllustration />,
  search: <SearchIllustration />
};

const contentTopBySlide: Record<OnboardingSlideId, number> = {
  organize: onboardingSlideLayoutTokens.organizeContentTop,
  save: onboardingSlideLayoutTokens.saveContentTop,
  search: onboardingSlideLayoutTokens.searchContentTop
};

function TopGlow() {
  return (
    <YStack
      height={onboardingLayoutTokens.topGlowSize}
      left={onboardingLayoutTokens.topGlowLeft}
      position="absolute"
      top={onboardingLayoutTokens.topGlowTop}
      width={onboardingLayoutTokens.topGlowSize}
    >
      <SoftGlow
        color={colorValues.primary100}
        opacity={onboardingLayoutTokens.topGlowOpacity}
        size={onboardingLayoutTokens.topGlowSize}
      />
    </YStack>
  );
}

function SlideContent({
  activeIndex,
  index,
  onPrimaryPress
}: {
  activeIndex: number;
  index: number;
  onPrimaryPress: () => void;
}) {
  const slide = onboardingSlides[index];
  const contentTop = contentTopBySlide[slide.id];

  return (
    <YStack height={onboardingLayoutTokens.canvasHeight} position="relative" width={onboardingLayoutTokens.canvasWidth}>
      <YStack
        gap={onboardingSlideLayoutTokens.illustrationToTextGap}
        items="center"
        left={onboardingLayoutTokens.contentLeft}
        position="absolute"
        top={contentTop}
        width={onboardingLayoutTokens.contentWidth}
      >
        {illustrationBySlide[slide.id]}
        <YStack gap={onboardingSlideLayoutTokens.textBlockToButtonGap} items="center" width="100%">
          <YStack gap={onboardingLayoutTokens.textToProgressGap} items="center" width="100%">
            <YStack gap={onboardingLayoutTokens.textGap} items="center" width="100%">
              <Typography color="$onboardingTextPrimary" text="center" variant="h3" width="100%">
                {slide.title}
              </Typography>
              <Typography
                color="$onboardingTextSecondary"
                text="center"
                variant="body2"
                width={onboardingLayoutTokens.subtitleWidth}
              >
                {slide.body}
              </Typography>
            </YStack>
            <ProgressDots activeIndex={activeIndex} />
          </YStack>
          <Button appearance="filled" onPress={onPrimaryPress} size="giant" width={onboardingLayoutTokens.actionWidth}>
            {slide.cta}
          </Button>
        </YStack>
      </YStack>
    </YStack>
  );
}

export function OnboardingScreen({ onSignUpPress, onSkipPress }: OnboardingScreenProps) {
  const { left, scale, top } = useScaledOnboardingCanvas();
  const { activeIndex, handleMomentumScrollEnd, handlePrimaryPress, scrollRef } = useOnboardingCarousel({
    onComplete: onSignUpPress,
    slideCount: onboardingSlides.length,
    slideWidth: onboardingLayoutTokens.canvasWidth
  });

  useHiddenStatusBar();

  return (
    <YStack backgroundColor="$onboardingBackground" flex={1} overflow="hidden">
      <YStack
        height={onboardingLayoutTokens.canvasHeight}
        left={left}
        overflow="hidden"
        position="absolute"
        scale={scale}
        top={top}
        transformOrigin="left top"
        width={onboardingLayoutTokens.canvasWidth}
      >
        <TopGlow />
        <Typography
          color="$onboardingTextSecondary"
          onPress={onSkipPress}
          position="absolute"
          right={onboardingLayoutTokens.skipRight}
          top={onboardingLayoutTokens.skipTop}
          variant="subtitle2"
          z={onboardingLayoutTokens.skipZIndex}
        >
          Skip
        </Typography>
        <ScrollView
          height={onboardingLayoutTokens.canvasHeight}
          horizontal
          onMomentumScrollEnd={handleMomentumScrollEnd}
          pagingEnabled
          ref={scrollRef}
          scrollEventThrottle={onboardingLayoutTokens.scrollEventThrottle}
          showsHorizontalScrollIndicator={false}
          width={onboardingLayoutTokens.canvasWidth}
        >
          <XStack width={onboardingLayoutTokens.canvasWidth * onboardingSlides.length}>
            {onboardingSlides.map((slide, index) => (
              <SlideContent activeIndex={activeIndex} index={index} key={slide.id} onPrimaryPress={handlePrimaryPress} />
            ))}
          </XStack>
        </ScrollView>
      </YStack>
    </YStack>
  );
}
