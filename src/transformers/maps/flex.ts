import {
  UtilityTransformerMap,
  isFragment,
  numericTransformer,
  parseFragment,
} from "../../shared.js";
import {
  ALIGN_ITEMS_MAP,
  ALIGN_SELF_MAP,
  FLEX_DIRECTION_MAP,
  JUSTIFY_CONTENT_MAP,
  isAlignItemsValue,
  isAlignSelfValue,
  isFlexDirectionValue,
  isFlexWrapValue,
  isJustifyContentValue,
} from "../data/index.js";

export const FLEX_TRANSFORMER_MAP: UtilityTransformerMap = {
  flex: (value) => {
    // display
    if (!value) return { display: "flex" };

    // flex direction
    if (isFlexDirectionValue(value))
      return { flexDirection: FLEX_DIRECTION_MAP[value] };

    // flex wrap
    if (isFlexWrapValue(value)) return { flexWrap: value };

    return false;
  },

  grow: numericTransformer("flexGrow", { defaultValue: 1 }),
  shrink: numericTransformer("flexShrink", { defaultValue: 1 }),
  // TODO: complex values
  basis: numericTransformer("flexBasis"),

  items: (value) => {
    if (!isAlignItemsValue(value)) return false;
    return { alignItems: ALIGN_ITEMS_MAP[value] };
  },
  self: (value) => {
    if (!isAlignSelfValue(value)) return false;
    return { alignSelf: ALIGN_SELF_MAP[value] };
  },
  justify: (value) => {
    if (!isJustifyContentValue(value)) return false;
    return { justifyContent: JUSTIFY_CONTENT_MAP[value] };
  },

  gap: (value, currentProps) => {
    if (!value) return false;
    if (!isFragment(value))
      return numericTransformer("gap")(value, currentProps);
    const [side, sideValue] = parseFragment(value);
    if (side === "x")
      return numericTransformer("columnGap")(sideValue, currentProps);
    if (side === "y")
      return numericTransformer("rowGap")(sideValue, currentProps);
    return false;
  },
};
