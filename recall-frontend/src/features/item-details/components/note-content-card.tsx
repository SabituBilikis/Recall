import { Typography } from "@/components/ui/typography";

import type { DetailItem } from "../types/item.types";
import { DetailCard } from "./detail-card";

export function NoteContentCard({ item }: { item: DetailItem }) {
  return (
    <DetailCard gap="$4" p="$6" rounded="$sm">
      <Typography color="$onboardingTextPrimary" variant="h5">
        {item.title}
      </Typography>
      <Typography color="$onboardingTextSecondary" variant="body3">
        {item.content}
      </Typography>
    </DetailCard>
  );
}
