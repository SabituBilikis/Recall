import { YStack } from "tamagui";

import { Typography } from "@/components/ui/typography";

import { searchContent } from "../constants/search-content";

export function SearchSummary({ count }: { count: number }) {
  return (
    <YStack gap="$1" width="100%">
      <Typography color="$textTertiary" variant="subtitle2">
        {count} {searchContent.resultsSuffix}
      </Typography>
      <Typography color="$textTertiary" variant="body3">
        {searchContent.scopeHint}
      </Typography>
    </YStack>
  );
}
