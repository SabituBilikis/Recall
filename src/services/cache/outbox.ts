import * as SQLite from "expo-sqlite";

import { decryptString, encryptString } from "@/services/crypto/secure-crypto";

// Durable mutation queue (SQLite). Holds writes made while offline; flushed in
// order on reconnect. Best-effort persistence — failures are logged, not thrown.
let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync("recall-outbox.db").then(async (db) => {
      await db.execAsync(
        "create table if not exists outbox (id text primary key not null, op text not null, created_at integer not null, tries integer not null default 0);"
      );
      // Migrate older tables that predate the `tries` column (best-effort).
      try {
        await db.execAsync("alter table outbox add column tries integer not null default 0;");
      } catch {
        // Column already exists — expected on every run after the first.
      }
      return db;
    });
  }
  return dbPromise;
}

export type StoredOp = { id: string; op: string; tries: number };

export async function enqueueRaw(id: string, opJson: string): Promise<void> {
  try {
    const db = await getDb();
    const op = await encryptString(opJson);
    await db.runAsync("insert or replace into outbox (id, op, created_at) values (?, ?, ?);", id, op, Date.now());
  } catch (error) {
    console.warn("[outbox] enqueue failed", error);
  }
}

export async function allOps(): Promise<StoredOp[]> {
  try {
    const db = await getDb();
    const rows = await db.getAllAsync<StoredOp>("select id, op, tries from outbox order by created_at asc;");
    const decrypted = await Promise.all(
      rows.map(async (row) => ({ ...row, op: (await decryptString(row.op)) ?? "" }))
    );
    // Drop any row we can't decrypt (corrupt / pre-encryption) so flush won't choke.
    return decrypted.filter((row) => row.op.length > 0);
  } catch (error) {
    console.warn("[outbox] read failed", error);
    return [];
  }
}

export async function removeOp(id: string): Promise<void> {
  try {
    const db = await getDb();
    await db.runAsync("delete from outbox where id = ?;", id);
  } catch (error) {
    console.warn("[outbox] remove failed", error);
  }
}

export async function countOps(): Promise<number> {
  try {
    const db = await getDb();
    const row = await db.getFirstAsync<{ n: number }>("select count(*) as n from outbox;");
    return row?.n ?? 0;
  } catch (error) {
    console.warn("[outbox] count failed", error);
    return 0;
  }
}

export async function bumpTries(id: string): Promise<void> {
  try {
    const db = await getDb();
    await db.runAsync("update outbox set tries = tries + 1 where id = ?;", id);
  } catch (error) {
    console.warn("[outbox] bump failed", error);
  }
}

export async function clearOutbox(): Promise<void> {
  try {
    const db = await getDb();
    await db.runAsync("delete from outbox;");
  } catch (error) {
    console.warn("[outbox] clear failed", error);
  }
}
