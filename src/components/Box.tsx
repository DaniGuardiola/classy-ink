import { Box as InkBox,type DOMElement } from "ink";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { useTailwindInk } from "./tailwind-ink.js";

export type BoxProps = ComponentPropsWithRef<typeof InkBox> & {
  class?: string;
};

export const Box = forwardRef<DOMElement, BoxProps>(function Box(
  { class: className, ...props },
  ref,
) {
  return <InkBox ref={ref} {...useTailwindInk(className)} {...props} />;
});
