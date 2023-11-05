export const COLORS = [
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "cyan",
  "magenta",
  "white",
  "gray",
  "grey",
  "black-bright",
  "red-bright",
  "green-bright",
  "yellow-bright",
  "blue-bright",
  "cyan-bright",
  "magenta-bright",
  "white-bright",
] as const;
export type Color = (typeof COLORS)[number];
export function isColor(color?: unknown): color is Color {
  return COLORS.includes(color as any);
}
