import { router } from "expo-router";

import { ArchiveScreen } from "@/features/library";

export default function ArchiveRoute() {
  return (
    <ArchiveScreen
      onBack={() => router.back()}
      onItemPress={(item) => router.push({ pathname: "/item/[id]", params: { id: item.id } })}
    />
  );
}
