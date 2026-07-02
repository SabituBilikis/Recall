import type { DetailItem } from "../types/item.types";
import { EmptyContentFallback } from "./empty-content-fallback";
import { FilePreviewCard } from "./file-preview-card";
import { LinkContentCard } from "./link-content-card";
import { NoteContentCard } from "./note-content-card";
import { ScreenshotPreview } from "./screenshot-preview";

// Switches to the type-specific content renderer (variants kept separate).
export function ItemContentRenderer({ item }: { item: DetailItem }) {
  switch (item.type) {
    case "screenshot":
      return <ScreenshotPreview item={item} />;
    case "link":
      return <LinkContentCard item={item} />;
    case "note":
      return item.content ? <NoteContentCard item={item} /> : <EmptyContentFallback />;
    case "file":
      return <FilePreviewCard item={item} />;
    default:
      return <EmptyContentFallback />;
  }
}
