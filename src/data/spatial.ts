// sides
export const SIDES = ["t", "r", "b", "l"] as const;
export type Side = (typeof SIDES)[number];
export function isSide(side?: unknown): side is Side {
  return SIDES.includes(side as any);
}

// output sides
export const OUTPUT_SIDES = ["top", "right", "bottom", "left"] as const;
export type OutputSide = (typeof OUTPUT_SIDES)[number];

// corners
export const CORNERS = ["tl", "tr", "br", "bl"] as const;
export type Corner = (typeof CORNERS)[number];
export function isCorner(corner?: unknown): corner is Corner {
  return CORNERS.includes(corner as any);
}

// sides and corners
export const SIDES_AND_CORNERS = [...SIDES, ...CORNERS];
export type SideOrCorner = (typeof SIDES_AND_CORNERS)[number];
export function isSideOrCorner(
  sideOrCorner?: unknown,
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
export function isAxis(axis?: unknown): axis is Axis {
  return AXES.includes(axis as any);
}

// spatial
export const SPATIAL_VALUES = ["x", "y", "t", "b", "l", "r"] as const;
export const SPATIAL_VALUES_MAP = {
  x: "X",
  y: "Y",
  t: "Top",
  b: "Bottom",
  l: "Left",
  r: "Right",
} as const;
export type SpatialValueOutput =
  (typeof SPATIAL_VALUES_MAP)[keyof typeof SPATIAL_VALUES_MAP];
