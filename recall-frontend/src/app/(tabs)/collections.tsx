import { router } from "expo-router";

import { CollectionsListScreen } from "@/features/collections";

export default function CollectionsTabRoute() {
  return (
    <CollectionsListScreen
      onBack={() => router.back()}
      onCreate={() => router.push("/collection/create")}
      onOpen={(collection) => router.push({ pathname: "/collection/[id]", params: { id: collection.id } })}
    />
  );
}
