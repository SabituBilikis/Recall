import type { DetailItem } from "../types/item.types";

export type MetadataRow = { label: string; value: string };

// Pure builder — the metadata rows + the type-specific last row. No layout here.
export function buildMetadataRows(item: DetailItem): MetadataRow[] {
  const rows: MetadataRow[] = [
    { label: "Collection", value: item.collection || "Unsorted" },
    { label: "Date Saved", value: item.dateSavedLabel }
  ];

  switch (item.type) {
    case "screenshot":
    case "file":
      rows.push({ label: "File Type", value: item.fileType ?? "—" });
      break;
    case "link":
      rows.push({ label: "URL", value: item.url ?? "—" });
      break;
    case "note":
      rows.push({ label: "Item Type", value: "Text note" });
      break;
  }

  return rows;
}
