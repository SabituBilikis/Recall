import { router, useLocalSearchParams } from "expo-router";

import { ItemDetailsScreen } from "@/features/item-details";

export default function ItemDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ItemDetailsScreen
      itemId={id}
      onBack={() => router.back()}
      onDeleted={() => router.back()}
      onEdit={() => router.push({ pathname: "/item/edit/[id]", params: { id } })}
    />
  );
}
