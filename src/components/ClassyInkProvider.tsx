import { type ReactNode, useMemo } from "react";

import { createLruCache } from "../lib/create-lru-cache.js";
import { type Props } from "../shared.js";
import { ClassyInkContext } from "./context.js";

const DEFAULT_MAX_CACHE_SIZE = 500;

export type ClassyInkProviderProps = {
  maxCacheSize?: number;
  children: ReactNode;
};

export function ClassyInkProvider({
  maxCacheSize = DEFAULT_MAX_CACHE_SIZE,
  children,
}: ClassyInkProviderProps) {
  const cache = useMemo(
    () =>
      maxCacheSize > 0
        ? createLruCache<string, Props>(maxCacheSize)
        : undefined,
    [maxCacheSize],
  );
  return (
    <ClassyInkContext.Provider value={{ cache }}>
      {children}
    </ClassyInkContext.Provider>
  );
}
