import * as SQLite from "expo-sqlite";

export const OFFLINE_DATABASE_NAME = "recall.db";

export type OfflineDatabase = SQLite.SQLiteDatabase;

export function openOfflineDatabase(): Promise<OfflineDatabase> {
  return SQLite.openDatabaseAsync(OFFLINE_DATABASE_NAME);
}
