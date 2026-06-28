import type { Collection, CollectionColor, CollectionIcon } from "@/types/collection";

import { getCurrentUserId } from "./auth.service";
import { toCollection } from "./mappers";
import { supabase } from "./supabase-client";

export type NewCollection = {
  name: string;
  description?: string;
  color: CollectionColor;
  icon: CollectionIcon;
};

async function collectionCounts(): Promise<Map<string, number>> {
  const { data } = await supabase.from("collection_item_counts").select("*");
  return new Map((data ?? []).flatMap((row) => (row.collection_id ? [[row.collection_id, row.item_count ?? 0]] : [])));
}

export async function listCollections(): Promise<Collection[]> {
  const { data, error } = await supabase
    .from("collections")
    .select("*")
    .is("deleted_at", null)
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
  const counts = await collectionCounts();
  return (data ?? []).map((row) => toCollection(row, counts.get(row.id) ?? 0));
}

export async function createCollection(input: NewCollection, id?: string): Promise<Collection> {
  const userId = await getCurrentUserId();
  const { data, error } = await supabase
    .from("collections")
    .insert({
      ...(id ? { id } : {}),
      user_id: userId,
      name: input.name,
      description: input.description ?? "",
      color: input.color,
      icon: input.icon
    })
    .select()
    .single();
  if (error) {
    throw error;
  }
  return toCollection(data);
}

export async function updateCollection(id: string, patch: Partial<NewCollection>): Promise<Collection> {
  const { data, error } = await supabase.from("collections").update(patch).eq("id", id).select().single();
  if (error) {
    throw error;
  }
  return toCollection(data);
}

export async function deleteCollection(id: string): Promise<void> {
  const { error } = await supabase.from("collections").delete().eq("id", id);
  if (error) {
    throw error;
  }
}
