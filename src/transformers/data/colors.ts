import { kebabCaseToCamelCase } from "../../shared.js";

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
export function isColor(color?: string): color is Color {
  return COLORS.includes(color as any);
}
export function toOutputColor(color: string) {
  if (!isColor(color)) throw new Error(`Unknown color: ${color}`);
  return kebabCaseToCamelCase(color);
}
