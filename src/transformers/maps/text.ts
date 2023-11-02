import { UtilityTransformerMap, kebabCaseToCamelCase } from "../../shared.js";
import {
  TEXT_WHITESPACE_MAP,
  isColor,
  isTextTruncateValue,
  isTextWhitespaceValue,
} from "../data/index.js";

export const TEXT_TRANSFORMER_MAP: UtilityTransformerMap = {
  // wrapping
  whitespace: (value) => {
    if (isTextWhitespaceValue(value))
      return { wrap: TEXT_WHITESPACE_MAP[value] };
    return false;
  },
  truncate: (value) => {
    if (!value) return { wrap: "truncate" };
    if (isTextTruncateValue(value)) return { wrap: `truncate-${value}` };
    return false;
  },

  // color
  text: (value) => {
    if (value === "dim") return { dimColor: true };
    if (isColor(value)) return { color: kebabCaseToCamelCase(value) };
    return false;
  },

  // background color
  bg: (value) => {
    if (isColor(value)) return { backgroundColor: kebabCaseToCamelCase(value) };
    return false;
  },

  // format
  font: (value) => {
    if (value === "bold") return { bold: true };
    return false;
  },
  italic: { italic: true },
  underline: { underline: true },
  strike: { strikethrough: true },
  inverse: { inverse: true },
};
