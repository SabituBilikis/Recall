import { AnimatePresence, MotiView } from "moti";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { XStack } from "tamagui";

import { USE_BACKEND } from "@/lib/config/backend-flag";
import { useReducedMotionFlag } from "@/hooks/use-reduced-motion-flag";
import { useNetworkStatus } from "@/hooks/use-network-status";
import { useSyncStore } from "@/store/use-sync-store";
import { animationTokens } from "@/theme/tokens";

import { Typography } from "./typography";

type BannerTone = {
  bg: "$badgeChipWarningSoftBg" | "$badgeChipInfoSoftBg";
  border: "$badgeChipWarningBorder" | "$badgeChipInfoBorder";
  text: "$badgeChipWarningText" | "$badgeChipInfoText";
};

const offlineTone: BannerTone = {
  bg: "$badgeChipWarningSoftBg",
  border: "$badgeChipWarningBorder",
  text: "$badgeChipWarningText"
};

const syncingTone: BannerTone = {
  bg: "$badgeChipInfoSoftBg",
  border: "$badgeChipInfoBorder",
  text: "$badgeChipInfoText"
};

function pendingLabel(pending: number): string {
  return pending === 1 ? "1 change" : `${pending} changes`;
}

// Floating status pill for offline-first feedback. Surfaces the outbox state:
// offline (writes are being queued) or online-with-pending (replay in flight).
// Hidden when connected and the queue is empty.
export function SyncBanner() {
  const insets = useSafeAreaInsets();
  const reduceMotion = useReducedMotionFlag();
  const { isConnected } = useNetworkStatus();
  const pending = useSyncStore((state) => state.pending);

  if (!USE_BACKEND) {
    return null;
  }

  const offline = !isConnected;
  const visible = offline || pending > 0;
  const tone = offline ? offlineTone : syncingTone;
  const message = offline
    ? pending > 0
      ? `Offline · ${pendingLabel(pending)} will sync`
      : "Offline"
    : `Syncing ${pendingLabel(pending)}…`;

  return (
    <XStack
      position="absolute"
      top={insets.top + 8}
      left={0}
      right={0}
      justify="center"
      pointerEvents="none"
      zIndex={1000}
    >
      <AnimatePresence>
        {visible ? (
          <MotiView
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -6 }}
            from={reduceMotion ? { opacity: 1, translateY: 0 } : { opacity: 0, translateY: -6 }}
            transition={{ duration: animationTokens.durationBase, type: "timing" }}
          >
            <XStack
              bg={tone.bg}
              borderColor={tone.border}
              borderWidth={1}
              gap="$2"
              items="center"
              px="$3"
              py="$2"
              rounded="$xxl"
            >
              <Typography color={tone.text} variant="caption2">
                {message}
              </Typography>
            </XStack>
          </MotiView>
        ) : null}
      </AnimatePresence>
    </XStack>
  );
}
