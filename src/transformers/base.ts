import {
  isOverflowDimention,
  isOverflowValue,
  isSizeDimention,
  OVERFLOW_DIMENTIONS_MAP,
  SIZE_DIMENTIONS_MAP,
} from "../data/index.js";
import {
  isFragment,
  numericTransformer,
  parseFragment,
  percentageFallback,
  spatialTransformers,
  type UtilityTransformerMap,
} from "../shared.js";

export const BASE_TRANSFORMER_MAP: UtilityTransformerMap = {
  // display
  hidden: { display: "none" },

  // position
  absolute: { position: "absolute" },
  relative: { position: "relative" },

  // margin
  ...spatialTransformers("m", (spatialValue) =>
    numericTransformer(`margin${spatialValue ?? ""}`, { allowNegative: true }),
  ),

  // padding
  ...spatialTransformers("p", (spatialValue) =>
    numericTransformer(`padding${spatialValue ?? ""}`, { allowNegative: true }),
  ),

  // size
  w: numericTransformer("width", { fallbackFn: percentageFallback }),
  h: numericTransformer("height", { fallbackFn: percentageFallback }),
  min: (value, currentProps) => {
    if (!value) return false;
    const [dimention, dimentionValue] = parseFragment(value);
    if (isSizeDimention(dimention))
      return numericTransformer(`min${SIZE_DIMENTIONS_MAP[dimention]}`, {
        fallbackFn: percentageFallback,
      })(dimentionValue, currentProps);
    return false;
  },

  // overflow
  overflow: (value) => {
    if (isOverflowValue(value)) return { overflow: value };
    if (value && isFragment(value)) {
      const [dimention, dimentionValue] = parseFragment(value);
      if (isOverflowDimention(dimention))
        return {
          [`overflow${OVERFLOW_DIMENTIONS_MAP[dimention]}`]: dimentionValue,
        };
    }
    return false;
  },
};
