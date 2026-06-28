import { YStack } from "tamagui";

import { Button } from "@/components/ui/button";
import { CollectionsIcon } from "@/components/ui/icons";
import { Typography } from "@/components/ui/typography";
import { colorValues } from "@/theme/tokens/color";

import { collectionsContent } from "../constants/collections-content";

export function EmptyCollectionsState({ onCreate }: { onCreate: () => void }) {
  return (
    <YStack gap="$6" items="center" px="$4" py="$10" width="100%">
      <YStack backgroundColor="$accentPrimarySoft" height={96} items="center" justify="center" rounded={48} width={96}>
        <CollectionsIcon color={colorValues.primary600} size={40} />
      </YStack>

      <YStack gap="$2" items="center">
        <Typography color="$onboardingTextPrimary" text="center" variant="subtitle1">
          {collectionsContent.empty.title}
        </Typography>
        <Typography color="$onboardingTextSecondary" text="center" variant="body3">
          {collectionsContent.empty.description}
        </Typography>
      </YStack>

      <Button appearance="filled" rounded="$xxl" size="large" width="100%" onPress={onCreate}>
        {collectionsContent.empty.cta}
      </Button>
    </YStack>
  );
}
