// align items
export const ALIGN_ITEMS_VALUES = [
  "start",
  "center",
  "end",
  "stretch",
] as const;
export type AlignItemsValue = (typeof ALIGN_ITEMS_VALUES)[number];
export function isAlignItemsValue(value?: unknown): value is AlignItemsValue {
  return ALIGN_ITEMS_VALUES.includes(value as any);
}
export const ALIGN_ITEMS_MAP = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
} as const;

// align self
export const ALIGN_SELF_VALUES = ["start", "center", "end", "auto"] as const;
export type AlignSelfValue = (typeof ALIGN_SELF_VALUES)[number];
export function isAlignSelfValue(value?: unknown): value is AlignSelfValue {
  return ALIGN_SELF_VALUES.includes(value as any);
}
export const ALIGN_SELF_MAP = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  auto: "auto",
} as const;

// justify content
export const JUSTIFY_CONTENT_VALUES = [
  "start",
  "end",
  "between",
  "around",
  "center",
] as const;
export type JustifyContentValue = (typeof JUSTIFY_CONTENT_VALUES)[number];
export function isJustifyContentValue(
  value?: unknown,
): value is JustifyContentValue {
  return JUSTIFY_CONTENT_VALUES.includes(value as any);
}
export const JUSTIFY_CONTENT_MAP = {
  start: "flex-start",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
  center: "center",
} as const;

// flex direction
export const FLEX_DIRECTION_VALUES = [
  "row",
  "col",
  "row-reverse",
  "col-reverse",
] as const;
export type FlexDirectionValue = (typeof FLEX_DIRECTION_VALUES)[number];
export function isFlexDirectionValue(
  value?: unknown,
): value is FlexDirectionValue {
  return FLEX_DIRECTION_VALUES.includes(value as any);
}
export const FLEX_DIRECTION_MAP = {
  row: "row",
  col: "column",
  "row-reverse": "row-reverse",
  "col-reverse": "column-reverse",
} as const;

// flex wrap
export const FLEX_WRAP_VALUES = ["nowrap", "wrap", "wrap-reverse"] as const;
export type FlexWrapValue = (typeof FLEX_WRAP_VALUES)[number];
export function isFlexWrapValue(value?: unknown): value is FlexWrapValue {
  return FLEX_WRAP_VALUES.includes(value as any);
}
