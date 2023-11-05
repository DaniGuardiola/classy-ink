import { type UtilityTransformerMap } from "../shared.js";
import { BASE_TRANSFORMER_MAP } from "./base.js";
import { BORDER_TRANSFORMER_MAP } from "./border.js";
import { FLEX_TRANSFORMER_MAP } from "./flex.js";
import { TEXT_TRANSFORMER_MAP } from "./text.js";

export const UTILITY_TRANSFORMER_MAP: UtilityTransformerMap = {
  ...BASE_TRANSFORMER_MAP,
  ...BORDER_TRANSFORMER_MAP,
  ...FLEX_TRANSFORMER_MAP,
  ...TEXT_TRANSFORMER_MAP,
};
