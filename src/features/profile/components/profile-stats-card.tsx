import { XStack, YStack } from "tamagui";

import { Typography } from "@/components/ui/typography";
import { tileBorderWidths } from "@/theme/tokens";

import { profileContent } from "../constants/profile-content";

function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <YStack
      backgroundColor="$surfacePrimary"
      borderColor="$borderSubtle"
      borderWidth={tileBorderWidths.card}
      flex={1}
      gap="$2"
      items="center"
      py="$4"
      rounded="$sm"
    >
      <Typography color="$blue600" variant="h5">
        {value}
      </Typography>
      <Typography color="$onboardingTextPrimary" variant="caption1">
        {label}
      </Typography>
    </YStack>
  );
}

// Three usage tiles: storage %, saved items, collections.
export function ProfileStatsCard({
  storagePercent,
  savedItems,
  collections
}: {
  storagePercent: number;
  savedItems: number;
  collections: number;
}) {
  return (
    <XStack gap="$3" width="100%">
      <StatTile value={`${storagePercent} %`} label={profileContent.stats.storageUsed} />
      <StatTile value={`${savedItems}`} label={profileContent.stats.savedItems} />
      <StatTile value={`${collections}`} label={profileContent.stats.collections} />
    </XStack>
  );
}
