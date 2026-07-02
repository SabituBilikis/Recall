import Svg, { Path } from "react-native-svg";

import { colorValues } from "@/theme/tokens/color";

import type { IconProps } from "./types";

export function EyeOffIcon({ color = colorValues.grey400, size = 24 }: IconProps) {
  return (
    <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
      <Path
        d="M9.9 4.24A9.12 9.12 0 0 1 12 4c6.5 0 10 7 10 7a17.16 17.16 0 0 1-2.16 3.19m-2.7 2.26A9.7 9.7 0 0 1 12 18c-6.5 0-10-7-10-7a17.34 17.34 0 0 1 4.06-4.94"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <Path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      <Path d="M3 3l18 18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </Svg>
  );
}
