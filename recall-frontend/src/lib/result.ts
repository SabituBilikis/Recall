export type Result<TData, TError = Error> =
  | { data: TData; error: null; ok: true }
  | { data: null; error: TError; ok: false };
