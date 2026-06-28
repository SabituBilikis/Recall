import { YStack } from "tamagui";

import { Input } from "@/components/ui/input";
import { FIELD_LIMITS } from "@/lib/constants/field-limits";

import { collectionsContent } from "../constants/collections-content";
import type { CollectionFormApi } from "../hooks/use-collection-form";
import { CollectionColorPicker } from "./collection-color-picker";
import { CollectionIconPicker } from "./collection-icon-picker";

export function CollectionForm({ form }: { form: CollectionFormApi }) {
  return (
    <YStack gap="$6" width="100%">
      <YStack gap="$5" width="100%">
        <Input
          appearance="outline"
          containerWidth="100%"
          label={collectionsContent.fields.name.label}
          maxLength={FIELD_LIMITS.collectionName}
          placeholder={collectionsContent.fields.name.placeholder}
          rounded="$xs"
          value={form.name}
          onChangeText={form.setName}
        />
        <Input
          appearance="outline"
          containerWidth="100%"
          label={collectionsContent.fields.description.label}
          maxLength={FIELD_LIMITS.collectionDescription}
          minHeight={140}
          multiline
          placeholder={collectionsContent.fields.description.placeholder}
          rounded="$xs"
          value={form.description}
          onChangeText={form.setDescription}
        />
      </YStack>

      <YStack gap="$6" width="100%">
        <CollectionColorPicker value={form.color} onChange={form.setColor} />
        <CollectionIconPicker color={form.color} value={form.icon} onChange={form.setIcon} />
      </YStack>
    </YStack>
  );
}
