import * as SQLite from "expo-sqlite";

import { decryptString, encryptString } from "@/services/crypto/secure-crypto";

// Tiny key-value cache backed by SQLite. Stores AES-encrypted JSON blobs so the
// app can hydrate instantly + serve last-synced data offline without leaving note
// content readable on disk. Best-effort: every op swallows errors so a cache miss
// never breaks the UI.
let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync("recall-cache.db").then(async (db) => {
      await db.execAsync("create table if not exists cache (key text primary key not null, value text not null);");
      return db;
    });
  }
  return dbPromise;
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  try {
    const db = await getDb();
    const row = await db.getFirstAsync<{ value: string }>("select value from cache where key = ?;", key);
    if (!row) {
      return null;
    }
    const decrypted = await decryptString(row.value);
    return decrypted ? (JSON.parse(decrypted) as T) : null;
  } catch (error) {
    console.warn("[cache] read failed", error);
    return null;
  }
}

export async function cacheSet(key: string, value: unknown): Promise<void> {
  try {
    const db = await getDb();
    const encrypted = await encryptString(JSON.stringify(value));
    await db.runAsync("insert or replace into cache (key, value) values (?, ?);", key, encrypted);
  } catch (error) {
    console.warn("[cache] write failed", error);
  }
}

export async function cacheClear(): Promise<void> {
  try {
    const db = await getDb();
    await db.runAsync("delete from cache;");
  } catch (error) {
    console.warn("[cache] clear failed", error);
  }
}
