import { useSafeAreaInsets } from "react-native-safe-area-context";
import { XStack, YStack } from "tamagui";

import { CollectionsFilledIcon, CollectionsIcon, HomeIcon, HomeOutlineIcon } from "@/components/ui/icons";
import type { HomeTab } from "@/store/use-home-store";
import { colorValues } from "@/theme/tokens/color";
import { nativeShadowTokens } from "@/theme/tokens";

import { FloatingActionButton } from "./floating-action-button";

// Each tab swaps a filled (active) and outline (inactive) glyph, per Figma.
const tabs = [
  { ActiveIcon: HomeIcon, InactiveIcon: HomeOutlineIcon, name: "home" as const },
  { ActiveIcon: CollectionsFilledIcon, InactiveIcon: CollectionsIcon, name: "collections" as const }
];

type BottomNavigationProps = {
  activeIndex: number;
  onCapturePress: () => void;
  onTabPress: (tab: HomeTab) => void;
};

export function BottomNavigation({ activeIndex, onCapturePress, onTabPress }: BottomNavigationProps) {
  const insets = useSafeAreaInsets();

  return (
    <XStack gap="$8" items="center" justify="center" pb={insets.bottom + 8} pt="$3" px="$5" width="100%">
      <XStack
        {...nativeShadowTokens[200]}
        backgroundColor="$surfacePrimary"
        borderColor="$accentPrimarySoft"
        borderWidth={2}
        gap="$10"
        height={64}
        items="center"
        justify="center"
        px="$8"
        rounded={50}
      >
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;
          const Icon = isActive ? tab.ActiveIcon : tab.InactiveIcon;

          return (
            <YStack
              gap="$0.5"
              items="center"
              key={tab.name}
              pressStyle={{ opacity: 0.6 }}
              onPress={() => onTabPress(tab.name)}
            >
              <Icon color={isActive ? colorValues.primary900 : colorValues.grey500} size={24} />
              <YStack
                backgroundColor={isActive ? "$buttonFilledBg" : "$transparent"}
                height={2}
                rounded="$xs"
                width={18}
              />
            </YStack>
          );
        })}
      </XStack>

      <FloatingActionButton onPress={onCapturePress} />
    </XStack>
  );
}
