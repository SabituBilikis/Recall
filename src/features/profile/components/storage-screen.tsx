import { FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Spinner, YStack } from "tamagui";

import { StateMessage } from "@/components/ui/state-message";
import { Typography } from "@/components/ui/typography";
import { LibraryHeader } from "@/features/library/components/library-header";

import { profileContent } from "../constants/profile-content";
import { useStorage } from "../hooks/use-storage";
import { StorageBreakdownCard } from "./storage-breakdown-card";
import { StorageSummaryCard } from "./storage-summary-card";

const listContentStyle = { gap: 12, paddingBottom: 40, paddingHorizontal: 16, paddingTop: 8 } as const;

export function StorageScreen({ onBack }: { onBack: () => void }) {
  const insets = useSafeAreaInsets();
  const { data, loading, error, reload } = useStorage();

  return (
    <YStack backgroundColor="$surfaceSubtle" flex={1}>
      <YStack pb="$3" pt={insets.top + 8} px="$4">
        <LibraryHeader onBack={onBack} title={profileContent.titles.storage} />
      </YStack>

      {loading && !data ? (
        <YStack flex={1} items="center" justify="center">
          <Spinner color="$primary500" size="large" />
        </YStack>
      ) : error && !data ? (
        <YStack flex={1} items="center" justify="center" px="$4">
          <StateMessage
            actionLabel="Retry"
            description="We couldn't load your storage usage. Check your connection and try again."
            title="Something went wrong"
            onAction={() => void reload()}
          />
        </YStack>
      ) : (
        <FlatList
          contentContainerStyle={listContentStyle}
          data={data?.breakdown ?? []}
          keyExtractor={(entry) => entry.type}
          ListHeaderComponent={
            data ? (
              <YStack gap="$4" pb="$2" width="100%">
                <StorageSummaryCard usage={data.usage} />
                <Typography color="$onboardingTextPrimary" variant="subtitle1">
                  {profileContent.storage.breakdownHeading}
                </Typography>
              </YStack>
            ) : null
          }
          renderItem={({ item }) => <StorageBreakdownCard entry={item} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </YStack>
  );
}
