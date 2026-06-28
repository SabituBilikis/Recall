import type { ComponentProps } from "react";
import { YStack } from "tamagui";

import { tileBorderWidths } from "@/theme/tokens";

// White card with the shared grey border used by every detail section.
export function DetailCard(props: ComponentProps<typeof YStack>) {
  return (
    <YStack
      backgroundColor="$surfacePrimary"
      borderColor="$borderSubtle"
      borderWidth={tileBorderWidths.card}
      width="100%"
      {...props}
    />
  );
}
