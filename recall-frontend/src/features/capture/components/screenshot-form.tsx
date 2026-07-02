import { YStack } from "tamagui";

import { Input } from "@/components/ui/input";
import { FIELD_LIMITS } from "@/lib/constants/field-limits";

import { captureContent } from "../constants/capture-content";
import type { CaptureFormApi } from "../hooks/use-capture-form";
import { useFileUpload } from "../hooks/use-file-upload";
import { CollectionSelector } from "./collection-selector";
import { ImagePreview } from "./image-preview";
import { UploadCard } from "./upload-card";

export function ScreenshotForm({ form }: { form: CaptureFormApi }) {
  const upload = useFileUpload("image");

  return (
    <YStack gap="$10" width="100%">
      {upload.asset ? (
        <ImagePreview uri={upload.asset.uri} onPress={upload.pick} />
      ) : (
        <UploadCard title={captureContent.screenshotUpload.title} type="screenshot" onPress={upload.pick} />
      )}

      <YStack gap="$4" width="100%">
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
        <CollectionSelector value={form.draft.itemCollection} onChange={(name) => form.setField("itemCollection", name)} />
      </YStack>
    </YStack>
  );
}
