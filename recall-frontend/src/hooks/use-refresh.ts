import { useCallback, useState } from "react";

// Drives a RefreshControl: tracks the spinner while `refresh` runs, regardless
// of success/failure. Pair with the list's `refreshControl` prop.
export function useRefresh(refresh: () => Promise<unknown>) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    void Promise.resolve(refresh()).finally(() => setRefreshing(false));
  }, [refresh]);

  return { refreshing, onRefresh };
}
