import type { ReactNode } from "react";

export type IconRenderProps<TColor> = {
  color: TColor;
  size: string;
};

export type IconSlot<TColor> = ReactNode | ((props: IconRenderProps<TColor>) => ReactNode);

export function renderIconSlot<TColor>(icon: IconSlot<TColor> | undefined, color: TColor, size: string) {
  if (!icon) {
    return null;
  }

  if (typeof icon === "function") {
    return icon({ color, size });
  }

  return icon;
}
