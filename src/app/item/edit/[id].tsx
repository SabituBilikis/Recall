import { router, useLocalSearchParams } from "expo-router";

import { EditItemScreen } from "@/features/item-details";

export default function EditItemRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <EditItemScreen itemId={id} onBack={() => router.back()} onSaved={() => router.back()} />;
}
