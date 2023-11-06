import { createContext, useContext } from "react";

import { type LruCache } from "../lib/create-lru-cache.js";
import { type Props } from "../shared.js";

type ClassyInkContextValue = {
  cache?: LruCache<string, Props>;
};

export const ClassyInkContext = createContext<
  ClassyInkContextValue | undefined
>(undefined);

export function useClassyInkContext(): Partial<ClassyInkContextValue> {
  return useContext(ClassyInkContext) ?? {};
}
