import { useCallback, useRef, useState } from "react";
import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import type { ScrollView } from "tamagui";

type UseOnboardingCarouselParams = {
  onComplete: () => void;
  slideCount: number;
  slideWidth: number;
};

export function useOnboardingCarousel({ onComplete, slideCount, slideWidth }: UseOnboardingCarouselParams) {
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const lastIndex = slideCount - 1;

  const goToIndex = useCallback(
    (nextIndex: number) => {
      const clampedIndex = Math.min(Math.max(nextIndex, 0), lastIndex);
      setActiveIndex(clampedIndex);
      scrollRef.current?.scrollTo({ animated: true, x: clampedIndex * slideWidth, y: 0 });
    },
    [lastIndex, slideWidth]
  );

  const handlePrimaryPress = useCallback(() => {
    if (activeIndex >= lastIndex) {
      onComplete();
      return;
    }

    goToIndex(activeIndex + 1);
  }, [activeIndex, goToIndex, lastIndex, onComplete]);

  const handleMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const nextIndex = Math.round(event.nativeEvent.contentOffset.x / slideWidth);
      setActiveIndex(Math.min(Math.max(nextIndex, 0), lastIndex));
    },
    [lastIndex, slideWidth]
  );

  return {
    activeIndex,
    handleMomentumScrollEnd,
    handlePrimaryPress,
    scrollRef
  };
}
