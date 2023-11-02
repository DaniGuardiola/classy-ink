// size dimentions
export const SIZE_DIMENTIONS = ["w", "h"] as const;
export type SizeDimention = (typeof SIZE_DIMENTIONS)[number];
export function isSizeDimention(
  dimention?: string
): dimention is SizeDimention {
  return SIZE_DIMENTIONS.includes(dimention as any);
}
export const SIZE_DIMENTIONS_MAP = {
  w: "Width",
  h: "Height",
} as const;

// overflow values
export const OVERFLOW_VALUES = ["visible", "hidden"] as const;
export type OverflowValue = (typeof OVERFLOW_VALUES)[number];
export function isOverflowValue(value?: string): value is OverflowValue {
  return OVERFLOW_VALUES.includes(value as any);
}

// overflow dimentions
export const OVERFLOW_DIMENTIONS = ["x", "y"] as const;
export type OverflowDimention = (typeof OVERFLOW_DIMENTIONS)[number];
export function isOverflowDimention(
  dimention?: string
): dimention is OverflowDimention {
  return OVERFLOW_DIMENTIONS.includes(dimention as any);
}
export const OVERFLOW_DIMENTIONS_MAP = {
  x: "X",
  y: "Y",
} as const;
