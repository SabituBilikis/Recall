import { Image, Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { YStack } from "tamagui";

import { CloseIcon } from "@/components/ui/icons";
import { colorValues } from "@/theme/tokens/color";

// Full-screen image viewer (contain on a black backdrop). Tap the close control
// or use the system back gesture to dismiss.
export function ImageViewerModal({
  uri,
  visible,
  onClose
}: {
  uri: string;
  visible: boolean;
  onClose: () => void;
}) {
  const insets = useSafeAreaInsets();

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <YStack backgroundColor="$black100" flex={1}>
        <YStack
          accessibilityRole="button"
          accessibilityLabel="Close image"
          items="center"
          justify="center"
          height={40}
          position="absolute"
          rounded="$xxl"
          t={insets.top + 8}
          r={16}
          width={40}
          zIndex={10}
          backgroundColor="$black50"
          pressStyle={{ opacity: 0.6 }}
          onPress={onClose}
        >
          <CloseIcon color={colorValues.white100} size={22} />
        </YStack>
        <Image resizeMode="contain" source={{ uri }} style={{ flex: 1, width: "100%" }} />
      </YStack>
    </Modal>
  );
}
