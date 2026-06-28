import { useSafeAreaInsets } from "react-native-safe-area-context";
import { YStack } from "tamagui";

import { Button } from "@/components/ui/button";
import { RecallMark } from "@/components/ui/icons";
import { Typography } from "@/components/ui/typography";
import { useCaptureStore } from "@/store/use-capture-store";

import { captureContent } from "../constants/capture-content";
import { SaveSuccessPreviewCard } from "./save-success-preview-card";

export type SaveSuccessScreenProps = {
  onSaveAnother: () => void;
  onViewItem: () => void;
};

export function SaveSuccessScreen({ onSaveAnother, onViewItem }: SaveSuccessScreenProps) {
  const insets = useSafeAreaInsets();
  const savedItem = useCaptureStore((state) => state.savedItem);

  return (
    <YStack backgroundColor="$surfaceSubtle" flex={1} justify="space-between" pb={insets.bottom + 12} pt={insets.top} px="$4">
      <YStack gap="$10" items="center" pt="$12">
        <YStack backgroundColor="$accentPrimarySoft" height={120} items="center" justify="center" rounded={60} width={120}>
          <RecallMark size={64} />
        </YStack>

        <YStack gap="$2" items="center">
          <Typography color="$onboardingTextPrimary" text="center" variant="h5">
            {captureContent.success.title}
          </Typography>
          <Typography color="$onboardingTextSecondary" text="center" variant="body1">
            {captureContent.success.subtitle}
          </Typography>
        </YStack>

        {savedItem ? <SaveSuccessPreviewCard item={savedItem} /> : null}
      </YStack>

      <YStack gap="$6" width="100%">
        <Button appearance="filled" rounded="$xxl" size="large" width="100%" onPress={onViewItem}>
          {captureContent.success.viewItem}
        </Button>
        <Button appearance="outline" rounded="$xxl" size="large" width="100%" onPress={onSaveAnother}>
          {captureContent.success.saveAnother}
        </Button>
      </YStack>
    </YStack>
  );
}
