import { router } from "expo-router";

import { SavedItemsScreen } from "@/features/saved-items";

export default function SavedItemsRoute() {
  return (
    <SavedItemsScreen
      onBack={() => router.back()}
      onItemPress={(item) => router.push({ pathname: "/item/[id]", params: { id: item.id } })}
    />
  );
}
