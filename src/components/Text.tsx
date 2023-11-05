import { Text as InkText } from "ink";
import { type ComponentPropsWithoutRef } from "react";

import { useTailwindInk } from "./tailwind-ink.js";

export type TextProps = ComponentPropsWithoutRef<typeof InkText> & {
  class?: string;
};

export function Text({ class: className, ...props }: TextProps) {
  return <InkText {...useTailwindInk(className)} {...props} />;
}
