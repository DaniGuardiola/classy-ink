import {
  BOX_STYLES,
  COLORS,
  SIDES,
  SIDES_AND_CORNERS_MAP,
} from "../data/index.js";
import { kebabCaseToCamelCase } from "../shared.js";
import { colorHighlight, combinations,type Utilities } from "./shared.js";

export const BORDER_UTILITIES: Utilities = {
  // border
  border: [
    'borderStyle: "single"',
    ...SIDES.map((side) => {
      const outputSide = SIDES_AND_CORNERS_MAP[side];
      const property = kebabCaseToCamelCase(`border-${outputSide}`);
      return `${property}: true`;
    }),
  ],
  ...combinations(
    SIDES,
    (value) => `border-${value}`,
    (value) => {
      const property = kebabCaseToCamelCase(
        `border-${SIDES_AND_CORNERS_MAP[value]}`,
      );
      return [`borderStyle: "single"`, `${property}: true`];
    },
  ),

  // style
  ...combinations(
    BOX_STYLES,
    (value) => `border-${value}`,
    (value) => `borderStyle: "${kebabCaseToCamelCase(value)}"`,
  ),

  // color
  ...combinations(
    COLORS,
    (value) => `border-${value}`,
    (value) => [
      colorHighlight(value),
      `borderColor: "${kebabCaseToCamelCase(value)}"`,
    ],
  ),

  // dim color
  "border-dim": "borderDimColor: true",

  // color by side
  ...SIDES.map((side) => {
    const outputSide = SIDES_AND_CORNERS_MAP[side];
    return combinations(
      COLORS,
      (value) => `border-${side}-${value}`,
      (value) => {
        const property = kebabCaseToCamelCase(`border-${outputSide}-color`);
        return [
          colorHighlight(value),
          `${property}: "${kebabCaseToCamelCase(value)}"`,
        ];
      },
    );
  }).reduce((a, b) => ({ ...a, ...b }), {}),

  // dim color by side
  ...combinations(
    SIDES,
    (value) => `border-${value}-dim`,
    (value) => {
      const outputSide = SIDES_AND_CORNERS_MAP[value];
      const property = kebabCaseToCamelCase(`border-${outputSide}-dim-color`);
      return `${property}: true`;
    },
  ),
};
