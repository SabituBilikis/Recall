import { router } from "expo-router";

import { SearchScreen } from "@/features/search";

export default function SearchRoute() {
  return (
    <SearchScreen
      onBack={() => router.back()}
      onItemPress={(item) => router.push({ pathname: "/item/[id]", params: { id: item.id } })}
    />
  );
}
