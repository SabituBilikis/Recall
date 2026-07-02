import { memo } from "react";
import { MotiView } from "moti";

import { useReducedMotionFlag } from "@/hooks/use-reduced-motion-flag";
import { RecentItemCard } from "@/features/home/components/recent-item-card";
import { animationTokens } from "@/theme/tokens";
import type { SavedItem } from "@/types/saved-item";

const STAGGER_MS = 40;
const MAX_STAGGER_INDEX = 8;

type SearchResultCardProps = {
  index: number;
  item: SavedItem;
  // Item-aware so the list can pass a single stable handler (keeps memo effective).
  onPress: (item: SavedItem) => void;
};

// Reuses the saved-item card with a calm, staggered entrance. Memoized so rows
// don't re-render as the result set or parent state changes.
export const SearchResultCard = memo(function SearchResultCard({
  index,
  item,
  onPress
}: SearchResultCardProps) {
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
});
