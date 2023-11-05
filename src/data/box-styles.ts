export const BOX_STYLES = [
  "single",
  "double",
  "round",
  "bold",
  "single-double",
  "double-single",
  "classic",
  "arrow",
] as const;
export type BoxStyle = (typeof BOX_STYLES)[number];
export function isBoxStyle(boxStyle?: unknown): boxStyle is BoxStyle {
  return BOX_STYLES.includes(boxStyle as any);
}
