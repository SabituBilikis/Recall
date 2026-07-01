import { router } from "expo-router";

import { HomeScreen } from "@/features/home";

export default function HomeTabRoute() {
  return (
    <HomeScreen
      onBrowseCollections={() => router.push("/collections")}
      onCollectionPress={(collection) => router.push({ pathname: "/collection/[id]", params: { id: collection.id } })}
      onNotificationsPress={() => router.push("/notifications")}
      onQuickCapture={(action) => router.push({ pathname: "/capture/[type]", params: { type: action.type } })}
      onRecentItemPress={(item) => router.push({ pathname: "/item/[id]", params: { id: item.id } })}
      onProfilePress={() => router.push("/profile")}
      onSaveFirstItem={() => router.push({ pathname: "/capture/[type]", params: { type: "new" } })}
      onSearch={() => router.push("/search")}
    />
  );
}
