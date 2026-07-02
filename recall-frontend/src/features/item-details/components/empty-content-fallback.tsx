import { Typography } from "@/components/ui/typography";

import { itemDetailsContent } from "../constants/item-details-content";
import { DetailCard } from "./detail-card";

export function EmptyContentFallback() {
  return (
    <DetailCard gap="$2" items="center" p="$6" rounded="$sm">
      <Typography color="$onboardingTextPrimary" text="center" variant="subtitle1">
        {itemDetailsContent.emptyContent.title}
      </Typography>
      <Typography color="$onboardingTextSecondary" text="center" variant="body3">
        {itemDetailsContent.emptyContent.description}
      </Typography>
    </DetailCard>
  );
}
