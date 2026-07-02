// Static copy for the Item Details flow.
export const itemDetailsContent = {
  title: "Item",
  previewLabel: "Preview",
  emptyContent: {
    title: "No preview available",
    description: "There's nothing to preview for this item yet."
  },
  menu: { edit: "Edit", delete: "Delete" },
  deleteModal: {
    title: "Delete Item",
    description: "This item will be removed from your saved items. This can't be undone.",
    confirm: "Delete",
    cancel: "Cancel"
  }
} as const;
