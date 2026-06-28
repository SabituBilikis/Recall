import { useEffect } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, XStack, YStack } from "tamagui";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import { CollectionSelector } from "@/features/capture/components/collection-selector";
import { RichTextEditor } from "@/features/capture/components/rich-text-editor";
import { FIELD_LIMITS } from "@/lib/constants/field-limits";
import { useCollectionsStore } from "@/store/use-collections-store";
import { colorValues } from "@/theme/tokens/color";

import { useEditItemForm } from "../hooks/use-edit-item-form";
import { useItemDetail } from "../hooks/use-item-detail";
import type { DetailItem } from "../types/item.types";

export type EditItemScreenProps = {
  itemId: string;
  onBack: () => void;
  onSaved: () => void;
};

const flexStyle = { flex: 1 } as const;

export function EditItemScreen({ itemId, onBack, onSaved }: EditItemScreenProps) {
  const insets = useSafeAreaInsets();
  const { item } = useItemDetail(itemId);
  const loadCollections = useCollectionsStore((state) => state.loadCollections);

  useEffect(() => {
    void loadCollections();
  }, [loadCollections]);

  return (
    <YStack backgroundColor="$surfaceSubtle" flex={1}>
      <YStack pb="$3" pt={insets.top + 8} px="$4">
        <XStack gap="$2" items="center" width="100%">
          <YStack
            backgroundColor="$surfacePrimary"
            height={32}
            items="center"
            justify="center"
            pressStyle={{ opacity: 0.6 }}
            rounded="$md"
            width={32}
            onPress={onBack}
          >
            <ChevronLeftIcon color={colorValues.grey900} size={16} />
          </YStack>
          <Typography color="$onboardingTextPrimary" flex={1} text="center" variant="subtitle2">
            Edit Item
          </Typography>
          <YStack width={32} />
        </XStack>
      </YStack>

      {item ? <EditItemBody item={item} onSaved={onSaved} /> : null}
    </YStack>
  );
}

function EditItemBody({ item, onSaved }: { item: DetailItem; onSaved: () => void }) {
  const insets = useSafeAreaInsets();
  const form = useEditItemForm({ item, onDone: onSaved });

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={flexStyle}>
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <YStack gap="$5" pb="$6" pt="$2" px="$4">
          <Input
            appearance="outline"
            containerWidth="100%"
            label="Title"
            maxLength={FIELD_LIMITS.title}
            placeholder="Give it a name"
            rounded="$xs"
            value={form.title}
            onChangeText={form.setTitle}
          />

          {item.type === "link" ? (
            <>
              <Input
                appearance="outline"
                autoCapitalize="none"
                autoCorrect={false}
                containerWidth="100%"
                helperText={form.urlError ?? undefined}
                keyboardType="url"
                label="URL"
                maxLength={FIELD_LIMITS.url}
                placeholder="https://recall.com"
                rounded="$xs"
                status={form.urlError ? "error" : "default"}
                value={form.url}
                onChangeText={form.setUrl}
              />
              <Input
                appearance="outline"
                containerWidth="100%"
                label="Description"
                maxLength={FIELD_LIMITS.description}
                minHeight={120}
                multiline
                placeholder="Add a description"
                rounded="$xs"
                value={form.description}
                onChangeText={form.setDescription}
              />
            </>
          ) : null}

          {item.type === "note" ? (
            <RichTextEditor placeholder="Edit your note…" value={form.content} onChangeText={form.setContent} />
          ) : null}

          <CollectionSelector value={form.collection} onChange={form.setCollection} />
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
          Save Changes
        </Button>
      </YStack>
    </KeyboardAvoidingView>
  );
}
