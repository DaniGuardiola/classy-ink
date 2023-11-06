import { useMemo } from "react";

import { tailwindToInkProps } from "../index.js";
import { type Props } from "../shared.js";
import { useTailwindInkContext } from "./context.js";

export function useTailwindInk(className?: string): Props {
  const { cache } = useTailwindInkContext();
  return useMemo(() => {
    if (!className) return {};
    const cacheResult = cache?.get(className);
    if (cacheResult) return cacheResult;
    const result = tailwindToInkProps(className);
    cache?.set(className, result);
    return result;
  }, [className]);
}
