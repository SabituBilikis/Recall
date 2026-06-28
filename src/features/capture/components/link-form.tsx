import { YStack } from "tamagui";

import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";

import { FIELD_LIMITS } from "@/lib/constants/field-limits";

import { captureContent } from "../constants/capture-content";
import type { CaptureFormApi } from "../hooks/use-capture-form";
import { useLinkPreview } from "../hooks/use-link-preview";
import { CollectionSelector } from "./collection-selector";
import { LinkPreviewCard } from "./link-preview-card";

export function LinkForm({ form }: { form: CaptureFormApi }) {
  const { preview, loading } = useLinkPreview(form.draft.itemUrl);

  return (
    <YStack gap="$8" width="100%">
      <YStack gap="$4" width="100%">
        <Input
          appearance="outline"
          autoCapitalize="none"
          autoCorrect={false}
          containerWidth="100%"
          helperText={form.urlError ?? undefined}
          keyboardType="url"
          label={captureContent.fields.url.label}
          maxLength={FIELD_LIMITS.url}
          placeholder={captureContent.fields.url.placeholder}
          rounded="$xs"
          status={form.urlError ? "error" : "default"}
          value={form.draft.itemUrl}
          onChangeText={(text) => form.setField("itemUrl", text)}
        />

        {preview || loading ? (
          <YStack gap="$2" width="100%">
            <Typography color="$inputLabel" variant="body2">
              {captureContent.fields.linkPreview.label}
            </Typography>
            {preview ? <LinkPreviewCard preview={preview} /> : <LinkPreviewCard.Skeleton />}
          </YStack>
        ) : null}
      </YStack>

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
        <Input
          appearance="outline"
          containerWidth="100%"
          label={captureContent.fields.description.label}
          maxLength={FIELD_LIMITS.description}
          minHeight={140}
          multiline
          placeholder={captureContent.fields.description.placeholder}
          rounded="$xs"
          value={form.draft.itemDescription}
          onChangeText={(text) => form.setField("itemDescription", text)}
        />
      </YStack>

      <CollectionSelector value={form.draft.itemCollection} onChange={(name) => form.setField("itemCollection", name)} />
    </YStack>
  );
}
