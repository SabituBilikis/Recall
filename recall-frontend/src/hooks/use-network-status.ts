import { useEffect, useState } from "react";

import {
  getNetworkStatus,
  type NetworkStatus,
  subscribeToNetworkStatus
} from "@/services/network/network-status";

const initialStatus: NetworkStatus = {
  isConnected: true,
  isInternetReachable: null
};

export function useNetworkStatus() {
  const [status, setStatus] = useState<NetworkStatus>(initialStatus);

  useEffect(() => {
    getNetworkStatus().then(setStatus).catch(() => setStatus(initialStatus));

    return subscribeToNetworkStatus(setStatus);
  }, []);

  return status;
}
