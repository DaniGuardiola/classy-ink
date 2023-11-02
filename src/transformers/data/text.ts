// truncate
export const TEXT_TRUNCATE_VALUES = ["start", "middle"] as const;
export type TextTruncateValue = (typeof TEXT_TRUNCATE_VALUES)[number];
export function isTextTruncateValue(
  value?: string
): value is TextTruncateValue {
  return TEXT_TRUNCATE_VALUES.includes(value as any);
}

// whitespace
export const TEXT_WHITESPACE_VALUES = ["wrap", "nowrap"] as const;
export type TextWhitespaceValue = (typeof TEXT_WHITESPACE_VALUES)[number];
export function isTextWhitespaceValue(
  value?: string
): value is TextWhitespaceValue {
  return TEXT_WHITESPACE_VALUES.includes(value as any);
}
export const TEXT_WHITESPACE_MAP = {
  wrap: "wrap",
  nowrap: "truncate",
} as const;
