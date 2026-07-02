import type { SearchItem } from "@/features/search/types/search.types";

// Reusable, case-insensitive client-side search. Pure + testable. The single
// seam to replace with Supabase FTS / vector / AI retrieval later.
export function searchItems(query: string, items: SearchItem[]): SearchItem[] {
  const needle = query.trim().toLowerCase();
  if (needle.length === 0) {
    return [];
  }

  return items.filter((item) => {
    const haystack = [item.title, item.description, item.collectionName, item.fileName ?? "", item.url ?? ""]
      .join(" ")
      .toLowerCase();
    return haystack.includes(needle);
  });
}
