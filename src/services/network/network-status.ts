import NetInfo from "@react-native-community/netinfo";

export type NetworkStatus = {
  isConnected: boolean;
  isInternetReachable: boolean | null;
};

export function subscribeToNetworkStatus(
  listener: (status: NetworkStatus) => void
) {
  return NetInfo.addEventListener((state) => {
    listener({
      isConnected: state.isConnected ?? false,
      isInternetReachable: state.isInternetReachable
    });
  });
}

export async function getNetworkStatus(): Promise<NetworkStatus> {
  const state = await NetInfo.fetch();

  return {
    isConnected: state.isConnected ?? false,
    isInternetReachable: state.isInternetReachable
  };
}
