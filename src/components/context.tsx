import { createContext, useContext } from "react";

import { type LruCache } from "../lib/create-lru-cache.js";
import { type Props } from "../shared.js";

type TailwindInkContextValue = {
  cache?: LruCache<string, Props>;
};

export const TailwindInkContext = createContext<
  TailwindInkContextValue | undefined
>(undefined);

export function useTailwindInkContext(): Partial<TailwindInkContextValue> {
  return useContext(TailwindInkContext) ?? {};
}
