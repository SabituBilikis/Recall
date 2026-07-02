import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { XStack, YStack } from "tamagui";

import { Typography } from "@/components/ui/typography";
import { LibraryHeader } from "@/features/library/components/library-header";
import { useRefresh } from "@/hooks/use-refresh";
import { colorValues } from "@/theme/tokens/color";

import { useNotifications } from "../hooks/use-notifications";
import { NotificationCard } from "./notification-card";

const listContentStyle = { gap: 12, paddingBottom: 40, paddingHorizontal: 16, paddingTop: 8 } as const;

export function NotificationsScreen({ onBack }: { onBack: () => void }) {
  const insets = useSafeAreaInsets();
  const { notifications, unreadCount, loading, error, refresh, markRead, markAllRead } = useNotifications();
  const { refreshing, onRefresh } = useRefresh(refresh);

  return (
    <YStack backgroundColor="$surfaceSubtle" flex={1}>
      <YStack pb="$3" pt={insets.top + 8} px="$4">
        <LibraryHeader onBack={onBack} title="Notifications" />
      </YStack>

      {loading ? (
        <YStack flex={1} items="center" justify="center">
          <ActivityIndicator color={colorValues.primary500} />
        </YStack>
      ) : (
        <FlatList
          contentContainerStyle={listContentStyle}
          data={notifications}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colorValues.primary500} colors={[colorValues.primary500]} />
          }
          ListHeaderComponent={
            unreadCount > 0 ? (
              <XStack justify="flex-end" pb="$1">
                <Typography color="$textAccent" pressStyle={{ opacity: 0.6 }} variant="buttonSmall" onPress={markAllRead}>
                  Mark all read
                </Typography>
              </XStack>
            ) : null
          }
          ListEmptyComponent={
            <YStack gap="$2" items="center" py="$10">
              <Typography color="$onboardingTextPrimary" text="center" variant="subtitle1">
                {error ? "Couldn't load notifications" : "No notifications yet"}
              </Typography>
              <Typography color="$onboardingTextSecondary" text="center" variant="body3">
                {error ? "Pull down to retry." : "Updates about your saves and collections will appear here."}
              </Typography>
            </YStack>
          }
          renderItem={({ item }) => <NotificationCard notification={item} onPress={() => markRead(item.id)} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </YStack>
  );
}
