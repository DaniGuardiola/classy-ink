export const BOX_STYLES = [
  "single",
  "double",
  "round",
  "bold",
  "singleDouble",
  "doubleSingle",
  "classic",
  "arrow",
] as const;
export type BoxStyle = (typeof BOX_STYLES)[number];
export function isBoxStyle(boxStyle?: string): boxStyle is BoxStyle {
  return BOX_STYLES.includes(boxStyle as any);
}
