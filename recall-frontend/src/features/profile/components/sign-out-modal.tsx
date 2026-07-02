import { Modal } from "react-native";
import { XStack, YStack } from "tamagui";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

import { profileContent } from "../constants/profile-content";

// Sign-out confirmation. Mirrors the delete-collection modal pattern; danger
// confirm matches the Sign Out button styling.
export function SignOutModal({
  visible,
  onCancel,
  onConfirm
}: {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onCancel}>
      <YStack backgroundColor="$black50" flex={1} items="center" justify="center" px="$6" onPress={onCancel}>
        <YStack backgroundColor="$surfacePrimary" gap="$5" p="$6" rounded="$xl" width="100%" onPress={() => undefined}>
          <YStack gap="$2">
            <Typography color="$onboardingTextPrimary" variant="subtitle1">
              {profileContent.signOut.modalTitle}
            </Typography>
            <Typography color="$onboardingTextSecondary" variant="body3">
              {profileContent.signOut.modalDescription}
            </Typography>
          </YStack>

          <XStack gap="$3" width="100%">
            <YStack flex={1}>
              <Button appearance="outline" rounded="$xxl" size="large" width="100%" onPress={onCancel}>
                {profileContent.signOut.cancel}
              </Button>
            </YStack>
            <YStack
              accessibilityRole="button"
              accessibilityLabel={profileContent.signOut.confirm}
              backgroundColor="$danger"
              flex={1}
              height="$12"
              items="center"
              justify="center"
              pressStyle={{ opacity: 0.85 }}
              rounded="$xxl"
              onPress={onConfirm}
            >
              <Typography color="$textInverse" variant="buttonLarge">
                {profileContent.signOut.confirm}
              </Typography>
            </YStack>
          </XStack>
        </YStack>
      </YStack>
    </Modal>
  );
}
