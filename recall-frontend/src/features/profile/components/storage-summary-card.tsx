import { XStack, YStack } from "tamagui";

import { StorageIcon } from "@/components/ui/icons";
import { Typography } from "@/components/ui/typography";
import { colorValues } from "@/theme/tokens/color";

import { profileContent } from "../constants/profile-content";
import type { StorageUsage } from "../types/profile.types";
import { formatBytes, storagePercent } from "../utils/format-bytes";

// "Your Storage" summary: icon, title, usage progress bar, used-of-total label.
export function StorageSummaryCard({ usage }: { usage: StorageUsage }) {
  const percent = storagePercent(usage.usedBytes, usage.totalBytes);

  return (
    <XStack backgroundColor="$primary200" gap="$3" items="center" p="$4" rounded="$xl" width="100%">
      <YStack backgroundColor="$primary900" height={48} items="center" justify="center" rounded="$sm" width={48}>
        <StorageIcon color={colorValues.white100} size={24} />
      </YStack>

      <YStack flex={1} gap="$2">
        <Typography color="$onboardingTextPrimary" variant="subtitle2">
          {profileContent.storage.cardTitle}
        </Typography>
        <YStack backgroundColor="$white60" height={6} overflow="hidden" rounded="$xxl" width="100%">
          <YStack backgroundColor="$primary700" height={6} rounded="$xxl" width={`${percent}%`} />
        </YStack>
        <Typography color="$onboardingTextPrimary" variant="caption1">
          {formatBytes(usage.usedBytes)} of {formatBytes(usage.totalBytes)} {profileContent.storage.usedSuffix}
        </Typography>
      </YStack>
    </XStack>
  );
}
