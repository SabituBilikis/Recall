import { Modal } from "react-native";
import { XStack, YStack } from "tamagui";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

import { itemDetailsContent } from "../constants/item-details-content";

type DeleteItemModalProps = {
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  visible: boolean;
};

export function DeleteItemModal({ loading, onCancel, onConfirm, visible }: DeleteItemModalProps) {
  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onCancel}>
      <YStack backgroundColor="$black50" flex={1} items="center" justify="center" px="$6" onPress={onCancel}>
        <YStack backgroundColor="$surfacePrimary" gap="$5" p="$6" rounded="$xl" width="100%" onPress={() => undefined}>
          <YStack gap="$2">
            <Typography color="$onboardingTextPrimary" variant="subtitle1">
              {itemDetailsContent.deleteModal.title}
            </Typography>
            <Typography color="$onboardingTextSecondary" variant="body3">
              {itemDetailsContent.deleteModal.description}
            </Typography>
          </YStack>

          <XStack gap="$3" width="100%">
            <YStack flex={1}>
              <Button appearance="outline" rounded="$xxl" size="large" width="100%" onPress={onCancel}>
                {itemDetailsContent.deleteModal.cancel}
              </Button>
            </YStack>
            <YStack
              backgroundColor="$danger"
              flex={1}
              height="$12"
              items="center"
              justify="center"
              opacity={loading ? 0.7 : 1}
              pressStyle={{ opacity: 0.85 }}
              rounded="$xxl"
              onPress={onConfirm}
            >
              <Typography color="$textInverse" variant="buttonLarge">
                {itemDetailsContent.deleteModal.confirm}
              </Typography>
            </YStack>
          </XStack>
        </YStack>
      </YStack>
    </Modal>
  );
}
