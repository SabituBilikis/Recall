import { MotiView } from "moti";

import { useReducedMotionFlag } from "@/hooks/use-reduced-motion-flag";
import { RecentItemCard } from "@/features/home/components/recent-item-card";
import { animationTokens } from "@/theme/tokens";
import type { SavedItem } from "@/types/saved-item";

const STAGGER_MS = 40;
const MAX_STAGGER_INDEX = 8;

// Reuses the saved-item card with a calm, staggered entrance.
export function SearchResultCard({
  index,
  item,
  onPress
}: {
  index: number;
  item: SavedItem;
  onPress: () => void;
}) {
  const reduceMotion = useReducedMotionFlag();
  const delay = reduceMotion ? 0 : Math.min(index, MAX_STAGGER_INDEX) * STAGGER_MS;

  return (
    <MotiView
      animate={{ opacity: 1, translateY: 0 }}
      from={{ opacity: reduceMotion ? 1 : 0, translateY: reduceMotion ? 0 : 8 }}
      transition={{ delay, duration: animationTokens.durationBase, type: "timing" }}
    >
      <RecentItemCard item={item} onPress={onPress} />
    </MotiView>
  );
}
