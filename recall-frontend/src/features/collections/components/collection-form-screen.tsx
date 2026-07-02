import { KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, YStack } from "tamagui";

import { Button } from "@/components/ui/button";
import type { Collection } from "@/types/collection";

import { collectionsContent } from "../constants/collections-content";
import { useCollectionForm, type CollectionFormMode } from "../hooks/use-collection-form";
import { CollectionForm } from "./collection-form";
import { CollectionHeader } from "./collection-header";

export type CollectionFormScreenProps = {
  collection?: Collection;
  mode: "create" | "edit";
  onBack: () => void;
  onDone: () => void;
};

const flexStyle = { flex: 1 } as const;

export function CollectionFormScreen({ collection, mode, onBack, onDone }: CollectionFormScreenProps) {
  const insets = useSafeAreaInsets();
  const formMode: CollectionFormMode = mode === "edit" && collection ? { type: "edit", collection } : { type: "create" };
  const form = useCollectionForm({ mode: formMode, onDone });

  const title = mode === "edit" ? collectionsContent.editTitle : collectionsContent.createTitle;
  const cta = mode === "edit" ? collectionsContent.saveCta : collectionsContent.createCta;

  return (
    <YStack backgroundColor="$surfaceSubtle" flex={1}>
      <YStack pb="$3" pt={insets.top + 8} px="$4">
        <CollectionHeader title={title} onBack={onBack} />
      </YStack>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={flexStyle}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <YStack pb="$6" pt="$2" px="$4">
            <CollectionForm form={form} />
          </YStack>
        </ScrollView>

        <YStack backgroundColor="$surfaceSubtle" pb={insets.bottom + 12} pt="$3" px="$4">
          <Button
            appearance="filled"
            disabled={!form.isValid}
            rounded="$xxl"
            size="large"
            width="100%"
            onPress={form.handleSubmit}
          >
            {cta}
          </Button>
        </YStack>
      </KeyboardAvoidingView>
    </YStack>
  );
}
