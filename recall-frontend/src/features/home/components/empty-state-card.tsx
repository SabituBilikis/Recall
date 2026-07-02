import { YStack } from "tamagui";

import { RecallMark } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

import { homeContent } from "../constants/home-content";

export function EmptyStateCard({ onSaveFirst }: { onSaveFirst: () => void }) {
  return (
    <YStack backgroundColor="$surfacePrimary" gap="$6" items="center" px="$4" py="$6" rounded="$sm" width="100%">
      <YStack backgroundColor="$accentPrimarySoft" height={96} items="center" justify="center" rounded={48} width={96}>
        <RecallMark size={56} />
      </YStack>

      <YStack gap="$2" items="center">
        <Typography color="$onboardingTextPrimary" text="center" variant="subtitle1">
          {homeContent.empty.title}
        </Typography>
        <Typography color="$onboardingTextSecondary" text="center" variant="body3">
          {homeContent.empty.description}
        </Typography>
      </YStack>

      <Button appearance="filled" rounded="$xxl" size="large" width="100%" onPress={onSaveFirst}>
        {homeContent.empty.cta}
      </Button>
    </YStack>
  );
}
