import type { SavedItem } from "@/types/saved-item";

import { toSavedItem } from "./mappers";
import { supabase } from "./supabase-client";

// Server-side full-text search via the RPC. Same scope as the client searchItems
// util (title/description/url/content/filename), but ranked + indexed in Postgres.
export async function searchSavedItems(query: string): Promise<SavedItem[]> {
  if (query.trim().length === 0) {
    return [];
  }
  const { data, error } = await supabase.rpc("search_saved_items", { query });
  if (error) {
    throw error;
  }
  return (data ?? []).map((row) => toSavedItem(row));
}
