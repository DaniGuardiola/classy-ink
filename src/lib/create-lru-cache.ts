// taken from tailwind-merge with love <3
// https://github.com/dcastil/tailwind-merge/blob/main/src/lib/lru-cache.ts

export interface LruCache<Key, Value> {
  get(key: Key): Value | undefined;
  set(key: Key, value: Value): Value;
}

// LRU cache inspired from hashlru (https://github.com/dominictarr/hashlru/blob/v1.0.4/index.js) but object replaced with Map to improve performance
export function createLruCache<Key, Value>(
  maxCacheSize: number,
): LruCache<Key, Value> {
  if (maxCacheSize < 1)
    return { get: () => undefined, set: (_, value) => value };

  let cacheSize = 0;
  let cache = new Map<Key, Value>();
  let previousCache = new Map<Key, Value>();

  function update(key: Key, value: Value) {
    cache.set(key, value);
    cacheSize++;

    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = new Map();
    }
  }

  return {
    get(key) {
      let value = cache.get(key);
      if (value !== undefined) return value;
      if ((value = previousCache.get(key)) !== undefined) {
        update(key, value);
        return value;
      }
    },
    set(key, value) {
      if (cache.has(key)) cache.set(key, value);
      else update(key, value);
      return value;
    },
  };
}
