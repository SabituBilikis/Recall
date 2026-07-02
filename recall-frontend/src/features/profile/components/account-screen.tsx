import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { YStack } from "tamagui";

import { LibraryHeader } from "@/features/library/components/library-header";

import { profileContent } from "../constants/profile-content";
import { useAccountForm } from "../hooks/use-account-form";
import { AccountForm } from "./account-form";

const scrollContentStyle = { paddingBottom: 32 } as const;

export function AccountScreen({ onBack }: { onBack: () => void }) {
  const insets = useSafeAreaInsets();
  const form = useAccountForm(onBack);

  return (
    <YStack backgroundColor="$surfaceSubtle" flex={1}>
      <YStack pb="$3" pt={insets.top + 8} px="$4">
        <LibraryHeader onBack={onBack} title={profileContent.titles.account} />
      </YStack>

      <ScrollView contentContainerStyle={scrollContentStyle} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <YStack px="$4" pt="$6">
          <AccountForm form={form} />
        </YStack>
      </ScrollView>
    </YStack>
  );
}
