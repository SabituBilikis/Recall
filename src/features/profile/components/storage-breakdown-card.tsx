import { XStack, YStack } from "tamagui";

import { Typography } from "@/components/ui/typography";
import { SavedTypeIcon } from "@/features/home/components/saved-type-icon";
import { tileBorderWidths } from "@/theme/tokens";

import { profileContent } from "../constants/profile-content";
import type { StorageBreakdownEntry } from "../types/profile.types";
import { formatBytes } from "../utils/format-bytes";

// One breakdown row: type icon, label + item count, size on the right.
export function StorageBreakdownCard({ entry }: { entry: StorageBreakdownEntry }) {
  return (
    <XStack
      backgroundColor="$surfacePrimary"
      borderColor="$borderSubtle"
      borderWidth={tileBorderWidths.card}
      gap="$3"
      items="center"
      p="$3"
      rounded="$sm"
      width="100%"
    >
      <SavedTypeIcon size={40} type={entry.type} />
      <YStack flex={1} gap="$1">
        <Typography color="$onboardingTextPrimary" variant="body2">
          {entry.label}
        </Typography>
        <Typography color="$onboardingTextSecondary" variant="caption1">
          {entry.itemCount} {profileContent.storage.savedItemsSuffix}
        </Typography>
      </YStack>
      <Typography color="$onboardingTextSecondary" variant="caption1">
        {formatBytes(entry.bytes)}
      </Typography>
    </XStack>
  );
}
