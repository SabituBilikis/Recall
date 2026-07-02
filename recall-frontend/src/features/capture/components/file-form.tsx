import { YStack } from "tamagui";

import { Input } from "@/components/ui/input";
import { FIELD_LIMITS } from "@/lib/constants/field-limits";

import { captureContent } from "../constants/capture-content";
import type { CaptureFormApi } from "../hooks/use-capture-form";
import { useFileUpload } from "../hooks/use-file-upload";
import { CollectionSelector } from "./collection-selector";
import { FilePreviewCard } from "./file-preview-card";
import { UploadCard } from "./upload-card";
import { UploadProgress } from "./upload-progress";

export function FileForm({ form }: { form: CaptureFormApi }) {
  const upload = useFileUpload("file");

  return (
    <YStack gap="$10" width="100%">
      <UploadCard
        subtitle={captureContent.fileUpload.subtitle}
        title={captureContent.fileUpload.title}
        type="file"
        onPress={upload.pick}
      />

      <YStack gap="$4" width="100%">
        {upload.asset ? (
          <YStack gap="$4" width="100%">
            <FilePreviewCard asset={upload.asset} />
            {upload.status === "uploading" ? <UploadProgress progress={upload.progress} /> : null}
          </YStack>
        ) : null}

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
