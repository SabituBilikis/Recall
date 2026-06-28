import { useSafeAreaInsets } from "react-native-safe-area-context";
import { XStack, YStack } from "tamagui";

import { EditIcon, TrashIcon } from "@/components/ui/icons";
import { Typography } from "@/components/ui/typography";
import { colorValues } from "@/theme/tokens/color";
import { nativeShadowTokens } from "@/theme/tokens";

import { itemDetailsContent } from "../constants/item-details-content";

type ItemActionMenuProps = {
  onClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
  visible: boolean;
};

function MenuRow({ Icon, label, onPress }: { Icon: typeof EditIcon; label: string; onPress: () => void }) {
  return (
    <XStack gap="$3" items="center" pressStyle={{ backgroundColor: "$backgroundHover" }} px="$3" py="$3" onPress={onPress}>
      <Icon color={colorValues.grey900} size={24} />
      <Typography color="$onboardingTextPrimary" variant="body1">
        {label}
      </Typography>
    </XStack>
  );
}

// Edit/Delete popover anchored under the header's more button.
export function ItemActionMenu({ onClose, onDelete, onEdit, visible }: ItemActionMenuProps) {
  const insets = useSafeAreaInsets();

  if (!visible) {
    return null;
  }

  return (
    <YStack bottom={0} left={0} position="absolute" right={0} top={0} zIndex={100}>
      <YStack flex={1} onPress={onClose} />
      <YStack
        {...nativeShadowTokens[500]}
        backgroundColor="$surfacePrimary"
        overflow="hidden"
        position="absolute"
        py="$2"
        right="$4"
        rounded="$xs"
        top={insets.top + 48}
        width={240}
      >
        <MenuRow Icon={EditIcon} label={itemDetailsContent.menu.edit} onPress={onEdit} />
        <MenuRow Icon={TrashIcon} label={itemDetailsContent.menu.delete} onPress={onDelete} />
      </YStack>
    </YStack>
  );
}
