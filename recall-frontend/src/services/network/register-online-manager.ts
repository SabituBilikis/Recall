import NetInfo from "@react-native-community/netinfo";
import { onlineManager } from "@tanstack/react-query";

let isRegistered = false;

export function registerQueryOnlineManager() {
  if (isRegistered) {
    return;
  }

  isRegistered = true;

  onlineManager.setEventListener((setOnline) =>
    NetInfo.addEventListener((state) => {
      const hasConnection = state.isConnected ?? false;
      const canReachInternet = state.isInternetReachable ?? hasConnection;

      setOnline(hasConnection && canReachInternet);
    })
  );
}
