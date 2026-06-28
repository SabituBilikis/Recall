import Svg, { Path } from "react-native-svg";

import { colorValues } from "@/theme/tokens/color";

import type { IconProps } from "./types";

// ic:outline-file-copy — stacked documents.
export function FileIcon({ color = colorValues.green600, size = 24 }: IconProps) {
  return (
    <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
      <Path
        d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12zm-1 4H8c-1.1 0-1.99.9-1.99 2L6 21c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V11zM8 21V7h6v5h5v9z"
        fill={color}
      />
    </Svg>
  );
}
