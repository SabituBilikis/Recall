import type { ReactNode } from "react";
import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";

import { onboardingMotionTokens } from "../constants/onboarding-tokens";

const naturalEntranceEasing = Easing.bezier(...onboardingMotionTokens.easingNatural);

type AnimatedIllustrationProps = {
  children: ReactNode;
};

export function AnimatedIllustration({ children }: AnimatedIllustrationProps) {
  return (
    <MotiView
      animate={{ opacity: 1, scale: 1, translateY: 0 }}
      from={{
        opacity: onboardingMotionTokens.hiddenOpacity,
        scale: onboardingMotionTokens.pressScale,
        translateY: onboardingMotionTokens.enterTranslateY
      }}
      transition={{
        duration: onboardingMotionTokens.enterDuration,
        easing: naturalEntranceEasing,
        type: "timing"
      }}
    >
      {children}
    </MotiView>
  );
}
