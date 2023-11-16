import {
  COLORS,
  TEXT_TRUNCATE_VALUES,
  TEXT_WHITESPACE_MAP,
  TEXT_WHITESPACE_VALUES,
} from "../data/index.js";
import { kebabCaseToCamelCase } from "../shared.js";
import { colorHighlight, combinations, type Utilities } from "./shared.js";

export const TEXT_UTILITIES: Utilities = {
  // wrapping
  ...combinations(
    TEXT_WHITESPACE_VALUES,
    (value) => `whitespace-${value}`,
    (value) => `wrap: "${TEXT_WHITESPACE_MAP[value]}"`,
  ),
  truncate: 'wrap: "truncate"',
  ...combinations(
    TEXT_TRUNCATE_VALUES,
    (value) => `truncate-${value}`,
    (value) => `wrap: "truncate-${value}"`,
  ),

  // color
  "text-dim": "dimColor: true",
  ...combinations(
    COLORS,
    (value) => `text-${value}`,
    (value) => [
      colorHighlight(value),
      `color: "${kebabCaseToCamelCase(value)}"`,
    ],
  ),

  // background color
  ...combinations(
    COLORS,
    (value) => `bg-${value}`,
    (value) => [
      colorHighlight(value),
      `backgroundColor: "${kebabCaseToCamelCase(value)}"`,
    ],
  ),

  // format
  "font-bold": "bold: true",
  italic: "italic: true",
  underline: "underline: true",
  strike: "strikethrough: true",
  inverse: "inverse: true",
};
