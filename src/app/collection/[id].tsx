import { router, useLocalSearchParams } from "expo-router";

import { CollectionDetailsScreen } from "@/features/collections";

export default function CollectionDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <CollectionDetailsScreen
      collectionId={id}
      onBack={() => router.back()}
      onEdit={() => router.push({ pathname: "/collection/edit/[id]", params: { id } })}
      onItemPress={(item) => router.push({ pathname: "/item/[id]", params: { id: item.id } })}
    />
  );
}
