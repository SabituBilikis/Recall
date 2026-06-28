import { YStack } from "tamagui";

import { BreathingLayer } from "@/components/ui/motion";
import { SoftGlow } from "@/components/ui/soft-glow";
import { useReducedMotionFlag } from "@/hooks/use-reduced-motion-flag";
import { colorValues } from "@/theme/tokens/color";

import { getStartedIllustrationTokens, getStartedLoopTokens } from "../constants/get-started-tokens";

export function ReadyGlow() {
  const reduceMotion = useReducedMotionFlag();

  return (
    <YStack
      height={getStartedIllustrationTokens.readyGlowSize}
      left={201}
      position="absolute"
      top={-3}
      width={getStartedIllustrationTokens.readyGlowSize}
    >
      <BreathingLayer
        disabled={reduceMotion}
        duration={getStartedLoopTokens.breatheDuration}
        easing={getStartedLoopTokens.easingInOut}
        scaleTo={getStartedLoopTokens.breatheScaleTo}
      >
        <SoftGlow color={colorValues.primary200} opacity={0.4} size={getStartedIllustrationTokens.readyGlowSize} />
      </BreathingLayer>
    </YStack>
  );
}
