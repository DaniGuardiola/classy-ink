import {
  isSizeDimention,
  OVERFLOW_VALUES,
  SIZE_DIMENTIONS_MAP,
} from "../data/index.js";
import { parseFragment,percentageFallback } from "../shared.js";
import {
  combinations,
  DEFAULT_NUMERIC_AND_PERCENTAGE_VALUES,
  INVALID_UTILITY,
  numericUtility,
  spatialUtilities,
  type Utilities,
} from "./shared.js";

export const BASE_UTILITIES: Utilities = {
  // display
  hidden: 'display: "none"',

  // position
  absolute: 'position: "absolute"',
  relative: 'position: "relative"',

  // margin
  ...spatialUtilities("m", (spatialValue) =>
    numericUtility(`margin${spatialValue ?? ""}`, { allowNegative: true }),
  ),

  // padding
  ...spatialUtilities("p", (spatialValue) =>
    numericUtility(`padding${spatialValue ?? ""}`, { allowNegative: true }),
  ),

  // size
  w: numericUtility("width", {
    fallbackFn: percentageFallback,
    values: DEFAULT_NUMERIC_AND_PERCENTAGE_VALUES,
  }),
  h: numericUtility("height", {
    fallbackFn: percentageFallback,
    values: DEFAULT_NUMERIC_AND_PERCENTAGE_VALUES,
  }),
  min: [
    (value) => {
      if (!value) return INVALID_UTILITY;
      const [dimention, dimentionValue] = parseFragment(String(value));
      if (isSizeDimention(dimention) && dimentionValue)
        return numericUtility(`min${SIZE_DIMENTIONS_MAP[dimention]}`, {
          fallbackFn: percentageFallback,
          values: DEFAULT_NUMERIC_AND_PERCENTAGE_VALUES,
        })[0](dimentionValue);
      return INVALID_UTILITY;
    },
  ],

  // overflow
  ...combinations(
    OVERFLOW_VALUES,
    (value) => `overflow-${value}`,
    (value) => `overflow: "${value}"`,
  ),
  ...combinations(
    OVERFLOW_VALUES,
    (value) => `overflow-x-${value}`,
    (value) => `overflowX: "${value}"`,
  ),
  ...combinations(
    OVERFLOW_VALUES,
    (value) => `overflow-y-${value}`,
    (value) => `overflowY: "${value}"`,
  ),
};
