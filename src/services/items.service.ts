import type { SavedItem, SavedItemType } from "@/types/saved-item";

import { getCurrentUserId } from "./auth.service";
import { toSavedItem } from "./mappers";
import { supabase } from "./supabase-client";

export type NewItem = {
  type: SavedItemType;
  title: string;
  collectionId?: string | null;
  description?: string;
  content?: string;
  url?: string | null;
  fileType?: string | null;
};

async function collectionNameMap(): Promise<Map<string, string>> {
  const { data } = await supabase.from("collections").select("id,name");
  return new Map((data ?? []).map((row) => [row.id, row.name]));
}

function nameFor(names: Map<string, string>, collectionId: string | null): string {
  return collectionId ? (names.get(collectionId) ?? "Unsorted") : "Unsorted";
}

export async function listRecentItems(limit = 50): Promise<SavedItem[]> {
  const { data, error } = await supabase
    .from("saved_items")
    .select("*")
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    throw error;
  }
  const names = await collectionNameMap();
  return (data ?? []).map((row) => toSavedItem(row, nameFor(names, row.collection_id)));
}

export type ItemsPage = { items: SavedItem[]; nextCursor: string | null };

// Keyset pagination on created_at (desc). `cursor` is the created_at of the last
// row already seen; a full page implies more rows remain.
export async function listRecentItemsPage(limit = 20, cursor?: string | null): Promise<ItemsPage> {
  let query = supabase
    .from("saved_items")
    .select("*")
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (cursor) {
    query = query.lt("created_at", cursor);
  }
  const { data, error } = await query;
  if (error) {
    throw error;
  }
  const rows = data ?? [];
  const names = await collectionNameMap();
  const items = rows.map((row) => toSavedItem(row, nameFor(names, row.collection_id)));
  const nextCursor = rows.length === limit ? rows[rows.length - 1].created_at : null;
  return { items, nextCursor };
}

export async function listItemsByCollection(collectionId: string): Promise<SavedItem[]> {
  const { data, error } = await supabase
    .from("saved_items")
    .select("*")
    .eq("collection_id", collectionId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
  const names = await collectionNameMap();
  return (data ?? []).map((row) => toSavedItem(row, nameFor(names, row.collection_id)));
}

export async function listItemsByCollectionPage(
  collectionId: string,
  limit = 20,
  cursor?: string | null
): Promise<ItemsPage> {
  let query = supabase
    .from("saved_items")
    .select("*")
    .eq("collection_id", collectionId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (cursor) {
    query = query.lt("created_at", cursor);
  }
  const { data, error } = await query;
  if (error) {
    throw error;
  }
  const rows = data ?? [];
  const names = await collectionNameMap();
  const items = rows.map((row) => toSavedItem(row, nameFor(names, row.collection_id)));
  const nextCursor = rows.length === limit ? rows[rows.length - 1].created_at : null;
  return { items, nextCursor };
}

export async function getItem(id: string): Promise<SavedItem | null> {
  const { data, error } = await supabase.from("saved_items").select("*").eq("id", id).maybeSingle();
  if (error) {
    throw error;
  }
  if (!data) {
    return null;
  }
  const names = await collectionNameMap();
  return toSavedItem(data, nameFor(names, data.collection_id));
}

export async function createItem(input: NewItem, id?: string): Promise<SavedItem> {
  const userId = await getCurrentUserId();
  const { data, error } = await supabase
    .from("saved_items")
    .insert({
      ...(id ? { id } : {}),
      user_id: userId,
      type: input.type,
      title: input.title,
      description: input.description ?? "",
      content: input.content ?? "",
      url: input.url ?? null,
      file_type: input.fileType ?? null,
      collection_id: input.collectionId ?? null
    })
    .select()
    .single();
  if (error) {
    throw error;
  }
  return toSavedItem(data);
}

export type ItemPatch = {
  title?: string;
  description?: string;
  content?: string;
  url?: string | null;
  collectionId?: string | null;
};

export async function updateItem(id: string, patch: ItemPatch): Promise<SavedItem> {
  const { data, error } = await supabase
    .from("saved_items")
    .update({
      title: patch.title,
      description: patch.description,
      content: patch.content,
      url: patch.url,
      collection_id: patch.collectionId
    })
    .eq("id", id)
    .select()
    .single();
  if (error) {
    throw error;
  }
  const names = await collectionNameMap();
  return toSavedItem(data, nameFor(names, data.collection_id));
}

// Soft delete (archive / sync tombstone) via the RPC.
export async function archiveItem(id: string): Promise<void> {
  const { error } = await supabase.rpc("archive_saved_item", { p_id: id });
  if (error) {
    throw error;
  }
}

export async function isFavorite(itemId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("favorites")
    .select("saved_item_id")
    .eq("saved_item_id", itemId)
    .maybeSingle();
  if (error) {
    throw error;
  }
  return data !== null;
}

export async function listFavorites(): Promise<SavedItem[]> {
  const { data: favs, error: favError } = await supabase.from("favorites").select("saved_item_id");
  if (favError) {
    throw favError;
  }
  const ids = (favs ?? []).map((row) => row.saved_item_id);
  if (ids.length === 0) {
    return [];
  }
  const { data, error } = await supabase
    .from("saved_items")
    .select("*")
    .in("id", ids)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
  const names = await collectionNameMap();
  return (data ?? []).map((row) => toSavedItem(row, nameFor(names, row.collection_id)));
}

export async function listArchivedItems(): Promise<SavedItem[]> {
  const { data, error } = await supabase
    .from("saved_items")
    .select("*")
    .not("deleted_at", "is", null)
    .order("updated_at", { ascending: false });
  if (error) {
    throw error;
  }
  const names = await collectionNameMap();
  return (data ?? []).map((row) => toSavedItem(row, nameFor(names, row.collection_id)));
}

export async function restoreItem(id: string): Promise<void> {
  const { error } = await supabase.from("saved_items").update({ deleted_at: null }).eq("id", id);
  if (error) {
    throw error;
  }
}

export async function setFavorite(itemId: string, on: boolean): Promise<void> {
  if (on) {
    const userId = await getCurrentUserId();
    const { error } = await supabase.from("favorites").insert({ user_id: userId, saved_item_id: itemId });
    if (error) {
      throw error;
    }
    return;
  }
  const { error } = await supabase.from("favorites").delete().eq("saved_item_id", itemId);
  if (error) {
    throw error;
  }
}
