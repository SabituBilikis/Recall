import { useReducedMotion } from "react-native-reanimated";

/**
 * Boolean wrapper over Reanimated's `useReducedMotion` so components can gate
 * looping/ambient motion without importing animation internals directly.
 * Returns `true` when the OS requests reduced motion (loops should be skipped).
 */
export function useReducedMotionFlag(): boolean {
  return useReducedMotion();
}
