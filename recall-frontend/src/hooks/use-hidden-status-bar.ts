import { useEffect } from "react";
import { setStatusBarHidden } from "expo-status-bar";

export function useHiddenStatusBar() {
  useEffect(() => {
    setStatusBarHidden(true, "fade");

    return () => {
      setStatusBarHidden(false, "fade");
    };
  }, []);
}
