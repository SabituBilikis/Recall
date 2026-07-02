import { YStack } from "tamagui";

import { Input } from "@/components/ui/input";
import { FIELD_LIMITS } from "@/lib/constants/field-limits";

import { captureContent } from "../constants/capture-content";
import type { CaptureFormApi } from "../hooks/use-capture-form";
import { CollectionSelector } from "./collection-selector";
import { RichTextEditor } from "./rich-text-editor";

export function NoteForm({ form }: { form: CaptureFormApi }) {
  return (
    <YStack gap="$8" width="100%">
      <CollectionSelector value={form.draft.itemCollection} onChange={(name) => form.setField("itemCollection", name)} />

      <YStack gap="$5" width="100%">
        <Input
          appearance="outline"
          containerWidth="100%"
          label={captureContent.fields.title.label}
          maxLength={FIELD_LIMITS.title}
          placeholder={captureContent.fields.title.placeholder}
          rounded="$xs"
          value={form.draft.itemTitle}
          onChangeText={(text) => form.setField("itemTitle", text)}
        />
        <RichTextEditor
          placeholder={captureContent.fields.description.placeholder}
          value={form.draft.itemContent}
          onChangeText={(text) => form.setField("itemContent", text)}
        />
      </YStack>
    </YStack>
  );
}
