import { type ReactNode, useMemo } from "react";

import { createLruCache } from "../lib/create-lru-cache.js";
import { type Props } from "../shared.js";
import { TailwindInkContext } from "./context.js";

const DEFAULT_MAX_CACHE_SIZE = 500;

export type TailwindInkProviderProps = {
  maxCacheSize?: number;
  children: ReactNode;
};

export function TailwindInkProvider({
  maxCacheSize = DEFAULT_MAX_CACHE_SIZE,
  children,
}: TailwindInkProviderProps) {
  const cache = useMemo(
    () =>
      maxCacheSize > 0
        ? createLruCache<string, Props>(maxCacheSize)
        : undefined,
    [maxCacheSize],
  );
  return (
    <TailwindInkContext.Provider value={{ cache }}>
      {children}
    </TailwindInkContext.Provider>
  );
}
