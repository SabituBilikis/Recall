import { Modal } from "react-native";
import { XStack, YStack } from "tamagui";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

import { profileContent } from "../constants/profile-content";

// Destructive account-deletion confirmation. Mirrors the sign-out modal; the
// confirm is disabled while the deletion request is in flight, and an inline
// error shows if it fails.
export function DeleteAccountModal({
  visible,
  deleting,
  error,
  onCancel,
  onConfirm
}: {
  visible: boolean;
  deleting: boolean;
  error: string | null;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const copy = profileContent.deleteAccount;

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onCancel}>
      <YStack backgroundColor="$black50" flex={1} items="center" justify="center" px="$6" onPress={onCancel}>
        <YStack backgroundColor="$surfacePrimary" gap="$5" p="$6" rounded="$xl" width="100%" onPress={() => undefined}>
          <YStack gap="$2">
            <Typography color="$onboardingTextPrimary" variant="subtitle1">
              {copy.modalTitle}
            </Typography>
            <Typography color="$onboardingTextSecondary" variant="body3">
              {copy.modalDescription}
            </Typography>
          </YStack>

          {error ? (
            <Typography color="$danger" variant="body3">
              {error}
            </Typography>
          ) : null}

          <XStack gap="$3" width="100%">
            <YStack flex={1}>
              <Button appearance="outline" disabled={deleting} rounded="$xxl" size="large" width="100%" onPress={onCancel}>
                {copy.cancel}
              </Button>
            </YStack>
            <YStack
              accessibilityRole="button"
              accessibilityState={{ busy: deleting }}
              accessibilityLabel={copy.confirm}
              backgroundColor="$danger"
              flex={1}
              height="$12"
              items="center"
              justify="center"
              opacity={deleting ? 0.7 : 1}
              pressStyle={{ opacity: 0.85 }}
              rounded="$xxl"
              onPress={deleting ? undefined : onConfirm}
            >
              <Typography color="$textInverse" variant="buttonLarge">
                {copy.confirm}
              </Typography>
            </YStack>
          </XStack>
        </YStack>
      </YStack>
    </Modal>
  );
}
