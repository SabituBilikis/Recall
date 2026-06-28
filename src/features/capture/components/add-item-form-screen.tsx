import { KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, YStack } from "tamagui";

import { Button } from "@/components/ui/button";

import { captureContent } from "../constants/capture-content";
import { useCaptureForm } from "../hooks/use-capture-form";
import type { CaptureItemType } from "../types/capture.types";
import { AddItemHeader } from "./add-item-header";
import { FileForm } from "./file-form";
import { LinkForm } from "./link-form";
import { NoteForm } from "./note-form";
import { ScreenshotForm } from "./screenshot-form";

export type AddItemFormScreenProps = {
  onBack: () => void;
  onClose: () => void;
  onSaved: () => void;
  type: CaptureItemType;
};

const flexStyle = { flex: 1 } as const;

export function AddItemFormScreen({ onBack, onClose, onSaved, type }: AddItemFormScreenProps) {
  const insets = useSafeAreaInsets();
  const form = useCaptureForm({ type, onSuccess: onSaved });

  return (
    <YStack backgroundColor="$surfaceSubtle" flex={1}>
      <YStack pb="$3" pt={insets.top + 8} px="$4">
        <AddItemHeader title={captureContent.headerTitles[type]} onBack={onBack} onClose={onClose} />
      </YStack>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={flexStyle}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <YStack gap="$6" pb="$6" pt="$2" px="$4">
            {type === "screenshot" ? <ScreenshotForm form={form} /> : null}
            {type === "link" ? <LinkForm form={form} /> : null}
            {type === "note" ? <NoteForm form={form} /> : null}
            {type === "file" ? <FileForm form={form} /> : null}
          </YStack>
        </ScrollView>

        <YStack backgroundColor="$surfaceSubtle" pb={insets.bottom + 12} pt="$3" px="$4">
          <Button
            appearance="filled"
            disabled={!form.isValid}
            loading={form.isSaving}
            rounded="$xxl"
            size="large"
            width="100%"
            onPress={form.handleSave}
          >
            {captureContent.saveLabel}
          </Button>
        </YStack>
      </KeyboardAvoidingView>
    </YStack>
  );
}
