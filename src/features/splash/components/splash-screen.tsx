import { Easing } from "react-native-reanimated";
import { XStack, YStack } from "tamagui";

import { useHiddenStatusBar } from "@/hooks/use-hidden-status-bar";
import { useScaledCanvas } from "@/hooks/use-scaled-canvas";
import { splashLayoutTokens } from "../constants/splash-tokens";

import { AmbientGlow, FloatingParticles, SavedTiles } from "./splash-ambient";
import { AnimatedLoadingDots, BrandLockup } from "./splash-brand";
import { AnimatedLogoMark, FinalLogoMark } from "./splash-logo-mark";
import { useSplashAnimation, type SplashAnimationOptions } from "../hooks/use-splash-animation";

const easeSoft = Easing.bezier(0.33, 1, 0.68, 1);
const easeSettle = Easing.bezier(0.22, 1, 0.36, 1);
const easeSearch = Easing.bezier(0.22, 0.8, 0.26, 1);

type SplashScreenProps = SplashAnimationOptions;

export function SplashScreen({ autoPlay, onComplete, reduceMotion }: SplashScreenProps) {
  const { left, scale, top } = useScaledCanvas(splashLayoutTokens.canvasWidth, splashLayoutTokens.canvasHeight);
  const { brandPhaseReady, dotPhaseReady, flashPhaseReady, linePhaseReady, logoPhaseReady, motion, shouldReduceMotion } = useSplashAnimation({
    autoPlay,
    onComplete,
    reduceMotion
  });

  useHiddenStatusBar();

  return (
    <XStack backgroundColor="$splashBackground" flex={1} items="center" justify="center" overflow="hidden">
      <YStack
        height={splashLayoutTokens.canvasHeight}
        left={left}
        overflow="hidden"
        position="absolute"
        scale={scale}
        top={top}
        transformOrigin="left top"
        width={splashLayoutTokens.canvasWidth}
      >
        <AmbientGlow easeSoft={easeSoft} motion={motion} />

        {!logoPhaseReady ? (
          <>
            <FloatingParticles easeSoft={easeSoft} motion={motion} />
            <SavedTiles easeSoft={easeSoft} motion={motion} />
          </>
        ) : null}

        {logoPhaseReady ? (
          <FinalLogoMark />
        ) : (
          <AnimatedLogoMark
            dotPhaseReady={dotPhaseReady}
            easeSearch={easeSearch}
            easeSettle={easeSettle}
            easeSoft={easeSoft}
            flashPhaseReady={flashPhaseReady}
            linePhaseReady={linePhaseReady}
            motion={motion}
            shouldReduceMotion={shouldReduceMotion}
          />
        )}

        {brandPhaseReady ? (
          <BrandLockup />
        ) : null}

        <AnimatedLoadingDots easeSoft={easeSoft} motion={motion} shouldReduceMotion={shouldReduceMotion} />
      </YStack>
    </XStack>
  );
}
