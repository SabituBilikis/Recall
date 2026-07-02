import { MotiView } from "moti";
import { YStack } from "tamagui";

import { useReducedMotionFlag } from "@/hooks/use-reduced-motion-flag";
import { colorValues } from "@/theme/tokens/color";
import { animationTokens } from "@/theme/tokens";

const TRACK_WIDTH = 44;
const TRACK_HEIGHT = 26;
const KNOB = 20;
const PADDING = 3;

// Settings switch. Knob translates on the UI thread (transform only); track color
// crossfades. Honors reduced-motion by snapping. Local-state only (per spec).
export function SettingsToggle({ value, onToggle }: { value: boolean; onToggle: () => void }) {
  const reduceMotion = useReducedMotionFlag();
  const offset = TRACK_WIDTH - KNOB - PADDING * 2;

  return (
    <YStack
      backgroundColor={value ? "$primary900" : "$grey300"}
      height={TRACK_HEIGHT}
      justify="center"
      px={PADDING}
      pressStyle={{ opacity: 0.85 }}
      rounded="$xxl"
      width={TRACK_WIDTH}
      onPress={onToggle}
    >
      <MotiView
        animate={{ translateX: value ? offset : 0 }}
        transition={reduceMotion ? { type: "timing", duration: 0 } : { type: "timing", duration: animationTokens.durationBase }}
        style={{ height: KNOB, width: KNOB, borderRadius: KNOB / 2, backgroundColor: colorValues.white100 }}
      />
    </YStack>
  );
}
