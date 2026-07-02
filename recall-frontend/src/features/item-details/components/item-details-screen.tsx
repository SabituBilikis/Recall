import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, YStack } from "tamagui";

import { useFavorite } from "../hooks/use-favorite";
import { useItemDetail } from "../hooks/use-item-detail";
import { DeleteItemModal } from "./delete-item-modal";
import { EmptyContentFallback } from "./empty-content-fallback";
import { ItemActionMenu } from "./item-action-menu";
import { ItemContentRenderer } from "./item-content-renderer";
import { ItemDetailsHeader } from "./item-details-header";
import { ItemMetadataCard } from "./item-metadata-card";

export type ItemDetailsScreenProps = {
  itemId: string;
  onBack: () => void;
  onDeleted: () => void;
  onEdit: () => void;
};

const scrollContentStyle = { gap: 24, paddingBottom: 40, paddingHorizontal: 16, paddingTop: 8 } as const;

export function ItemDetailsScreen({ itemId, onBack, onDeleted, onEdit }: ItemDetailsScreenProps) {
  const insets = useSafeAreaInsets();
  const { deleteItem, isDeleting, item } = useItemDetail(itemId);
  const { favorite, toggle: toggleFavorite } = useFavorite(itemId);
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <YStack backgroundColor="$surfaceSubtle" flex={1}>
      <YStack pb="$3" pt={insets.top + 8} px="$4">
        <ItemDetailsHeader
          favorite={favorite}
          onBack={onBack}
          onMore={() => setMenuOpen(true)}
          onToggleFavorite={toggleFavorite}
        />
      </YStack>

      <ScrollView contentContainerStyle={scrollContentStyle} showsVerticalScrollIndicator={false}>
        {item ? (
          <>
            <ItemContentRenderer item={item} />
            <ItemMetadataCard item={item} />
          </>
        ) : (
          <EmptyContentFallback />
        )}
      </ScrollView>

      <ItemActionMenu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        onDelete={() => {
          setMenuOpen(false);
          setDeleteOpen(true);
        }}
        onEdit={() => {
          setMenuOpen(false);
          onEdit();
        }}
      />

      <DeleteItemModal
        loading={isDeleting}
        visible={deleteOpen}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={() => {
          setDeleteOpen(false);
          deleteItem(onDeleted);
        }}
      />
    </YStack>
  );
}
