// sides
export const SIDES = ["t", "r", "b", "l"] as const;
export type Side = (typeof SIDES)[number];
export function isSide(side?: string): side is Side {
  return SIDES.includes(side as any);
}

// output sides
export const OUTPUT_SIDES = ["top", "right", "bottom", "left"] as const;
export type OutputSide = (typeof OUTPUT_SIDES)[number];

// corners
export const CORNERS = ["tl", "tr", "br", "bl"] as const;
export type Corner = (typeof CORNERS)[number];
export function isCorner(corner?: string): corner is Corner {
  return CORNERS.includes(corner as any);
}

// sides and corners
export const SIDES_AND_CORNERS = [...SIDES, ...CORNERS];
export type SideOrCorner = (typeof SIDES_AND_CORNERS)[number];
export function isSideOrCorner(
  sideOrCorner?: string
): sideOrCorner is SideOrCorner {
  return SIDES_AND_CORNERS.includes(sideOrCorner as any);
}
export const SIDES_AND_CORNERS_MAP = {
  tl: "topLeft",
  t: "top",
  tr: "topRight",
  r: "right",
  br: "bottomRight",
  b: "bottom",
  bl: "bottomLeft",
  l: "left",
} as const;

// axes
export const AXES = ["x", "y"] as const;
export type Axis = (typeof AXES)[number];
export function isAxis(axis?: string): axis is Axis {
  return AXES.includes(axis as any);
}
