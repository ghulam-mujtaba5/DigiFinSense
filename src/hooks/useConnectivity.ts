import { useEffect, useState } from 'react';

// Graceful optional dependency on @react-native-community/netinfo
// If the package is not installed, we assume connected (no offline badge)
// When installed, this hook will reflect real connectivity state.
export function useConnectivity() {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    let unsubscribe: undefined | (() => void);

    let NetInfo: any;
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      NetInfo = require('@react-native-community/netinfo');
    } catch {
      NetInfo = null;
    }

    if (NetInfo && NetInfo.addEventListener) {
      unsubscribe = NetInfo.addEventListener((state: any) => {
        if (typeof state.isConnected === 'boolean') {
          setIsConnected(state.isConnected);
        }
      });
      // Also fetch initial state
      if (NetInfo.fetch) {
        NetInfo.fetch().then((state: any) => {
          if (typeof state.isConnected === 'boolean') {
            setIsConnected(state.isConnected);
          }
        }).catch(() => {});
      }
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { isConnected } as const;
}
