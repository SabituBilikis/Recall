export type SyncOperation = "create" | "update" | "delete";

export type PendingSyncRecord = {
  createdAt: string;
  entityId: string;
  entityType: string;
  id: string;
  operation: SyncOperation;
  payload: unknown;
};

export type SyncAdapter = {
  enqueue(record: PendingSyncRecord): Promise<void>;
  flush(): Promise<void>;
};
