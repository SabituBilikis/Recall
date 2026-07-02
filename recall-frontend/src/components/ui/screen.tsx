import type { PropsWithChildren } from "react";
import { ScrollView } from "tamagui";

import { AppStack } from "@/components/primitives";

export function Screen({ children }: PropsWithChildren) {
  return (
    <ScrollView
      background="$surfacePrimary"
      contentInsetAdjustmentBehavior="automatic"
      flex={1}
    >
      <AppStack flex={1} gap="$6" p="$6">
        {children}
      </AppStack>
    </ScrollView>
  );
}
