import {
  ALIGN_ITEMS_MAP,
  ALIGN_ITEMS_VALUES,
  ALIGN_SELF_MAP,
  ALIGN_SELF_VALUES,
  FLEX_DIRECTION_MAP,
  FLEX_DIRECTION_VALUES,
  FLEX_WRAP_VALUES,
  JUSTIFY_CONTENT_MAP,
  JUSTIFY_CONTENT_VALUES,
} from "../data/index.js";
import {
  combinations,
  numericUtility,
  SMALL_NUMERIC_VALUES,
  type Utilities,
} from "./shared.js";

export const FLEX_UTILITIES: Utilities = {
  // display
  flex: 'display: "flex"',

  // flex direction
  ...combinations(
    FLEX_DIRECTION_VALUES,
    (value) => `flex-${value}`,
    (value) => `flexDirection: "${FLEX_DIRECTION_MAP[value]}"`,
  ),

  // flex wrap
  ...combinations(
    FLEX_WRAP_VALUES,
    (value) => `flex-${value}`,
    (value) => `flexWrap: "${value}"`,
  ),

  // behavior
  grow: numericUtility("flexGrow", {
    defaultValue: 1,
    values: SMALL_NUMERIC_VALUES,
  }),
  shrink: numericUtility("flexShrink", {
    defaultValue: 1,
    values: SMALL_NUMERIC_VALUES,
  }),
  basis: numericUtility("flexBasis"),

  // alignment
  ...combinations(
    ALIGN_ITEMS_VALUES,
    (value) => `items-${value}`,
    (value) => `alignItems: "${ALIGN_ITEMS_MAP[value]}"`,
  ),
  ...combinations(
    ALIGN_SELF_VALUES,
    (value) => `self-${value}`,
    (value) => `alignSelf: "${ALIGN_SELF_MAP[value]}"`,
  ),
  ...combinations(
    JUSTIFY_CONTENT_VALUES,
    (value) => `justify-${value}`,
    (value) => `justifyContent: "${JUSTIFY_CONTENT_MAP[value]}"`,
  ),

  // gap
  gap: numericUtility("gap"),
  "gap-x": numericUtility("columnGap"),
  "gap-y": numericUtility("rowGap"),
};
