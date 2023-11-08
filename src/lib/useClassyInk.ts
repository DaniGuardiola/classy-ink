import { useMemo } from "react";

import { useClassyInkContext } from "../components/context.js";
import { compileClass } from "../index.js";
import { type Props } from "../shared.js";

export function useClassyInk(className?: string): Props {
  const { cache } = useClassyInkContext();
  return useMemo(() => {
    if (!className) return {};
    const cacheResult = cache?.get(className);
    if (cacheResult) return cacheResult;
    const result = compileClass(className);
    cache?.set(className, result);
    return result;
  }, [cache, className]);
}
