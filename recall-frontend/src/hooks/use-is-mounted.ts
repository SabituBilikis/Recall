import { useEffect, useRef } from "react";

// Tracks whether the component is still mounted, so async callbacks can skip
// setState after unmount (avoids the "update on unmounted component" warning +
// wasted work when the user navigates away mid-request).
export function useIsMounted() {
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return mounted;
}
