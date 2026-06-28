import Svg, { Path } from "react-native-svg";

import { colorValues } from "@/theme/tokens/color";

import type { IconProps } from "./types";

export function CloseIcon({ color = colorValues.grey900, size = 16 }: IconProps) {
  return (
    <Svg fill="none" height={size} viewBox="0 0 16 16" width={size}>
      <Path
        d="M4.50551 11.4951L8.0006 8M11.4957 4.50491L8.0006 8M8.0006 8L4.50551 4.50491M8.0006 8L11.4957 11.4951"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </Svg>
  );
}
