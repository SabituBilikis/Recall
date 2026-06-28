import { YStack } from "tamagui";

import { Typography } from "@/components/ui/typography";

import type { DetailItem } from "../types/item.types";
import { buildMetadataRows } from "../utils/item-metadata";
import { DetailCard } from "./detail-card";
import { MetadataRow } from "./metadata-row";

export function ItemMetadataCard({ item }: { item: DetailItem }) {
  const rows = buildMetadataRows(item);

  return (
    <DetailCard gap="$6" p="$6" rounded="$sm">
      <YStack gap="$4" width="100%">
        <Typography color="$onboardingTextPrimary" variant="subtitle1">
          {item.title}
        </Typography>
        {item.type === "link" && item.description ? (
          <Typography color="$onboardingTextSecondary" variant="body3">
            {item.description}
          </Typography>
        ) : null}
      </YStack>

      <YStack gap="$4" width="100%">
        {rows.map((row) => (
          <MetadataRow key={row.label} label={row.label} value={row.value} />
        ))}
      </YStack>
    </DetailCard>
  );
}
