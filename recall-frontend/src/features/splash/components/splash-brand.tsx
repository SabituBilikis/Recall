import { MotiView } from "moti";
import type { Easing } from "react-native-reanimated";
import { Circle, XStack, YStack } from "tamagui";

import { AppText } from "@/components/ui/typography";
import { splashLayoutTokens, splashMotionTokens } from "../constants/splash-tokens";

import { splashFrame } from "../constants/splash-frame";
import type { SplashMotionFactory } from "../hooks/use-splash-animation";

export function BrandLockup() {
  return (
    <YStack
      items="center"
      left={splashFrame.brand.left}
      position="absolute"
      top={splashFrame.brand.top}
      width={splashFrame.brand.width}
    >
      <AppText color="$splashBrandTitle" textAlign="center" variant="h1">
        Recall
      </AppText>
      <AppText color="$splashBrandSubtitle" marginTop={splashFrame.brand.subtitleMarginTop} textAlign="center" variant="subtitle1">
        Find it Instantly
      </AppText>
    </YStack>
  );
}

function LoadingDots({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  return (
    <XStack
      bottom={splashFrame.loadingDots.bottom}
      gap={splashFrame.loadingDots.gap}
      items="center"
      justify="center"
      left={(splashLayoutTokens.canvasWidth - splashFrame.loadingDots.width) / 2}
      position="absolute"
      width={splashFrame.loadingDots.width}
    >
      {[0, 1, 2].map((index) => (
        <MotiView
          key={`loading-dot-${index}`}
          animate={
            shouldReduceMotion
              ? { opacity: 0.5, scale: 1 }
              : { opacity: [0.28, 0.92, 0.28], scale: [0.92, 1.12, 0.92], translateY: [0, -2, 0] }
          }
          from={{ opacity: 0, scale: 0.8, translateY: 0 }}
          transition={
            shouldReduceMotion
              ? { delay: 0, duration: 0, type: "timing" }
              : {
                  delay: splashMotionTokens.loadingDotsStart + index * splashMotionTokens.loadingDotsStagger,
                  duration: splashMotionTokens.loadingDotsDuration,
                  loop: true,
                  repeatReverse: false,
                  type: "timing"
                }
          }
        >
          <Circle
            backgroundColor="$splashSearchDot"
            height={splashFrame.loadingDots.size}
            opacity={0.9}
            width={splashFrame.loadingDots.size}
          />
        </MotiView>
      ))}
    </XStack>
  );
}

export function AnimatedLoadingDots({
  easeSoft,
  motion,
  shouldReduceMotion
}: {
  easeSoft: ReturnType<typeof Easing.bezier>;
  motion: SplashMotionFactory;
  shouldReduceMotion: boolean;
}) {
  return (
    <MotiView
      {...motion({
        animate: { opacity: 1, translateY: 0 },
        delay: splashMotionTokens.loadingDotsStart,
        duration: 320,
        easing: easeSoft,
        from: { opacity: 0, translateY: 10 }
      })}
    >
      <LoadingDots shouldReduceMotion={shouldReduceMotion} />
    </MotiView>
  );
}
