import { UtilityTransformerMap } from "../shared.js";
import {
  BASE_TRANSFORMER_MAP,
  BORDER_TRANSFORMER_MAP,
  FLEX_TRANSFORMER_MAP,
  TEXT_TRANSFORMER_MAP,
} from "./maps/index.js";

export const UTILITY_TRANSFORMER_MAP: UtilityTransformerMap = {
  ...BASE_TRANSFORMER_MAP,
  ...BORDER_TRANSFORMER_MAP,
  ...FLEX_TRANSFORMER_MAP,
  ...TEXT_TRANSFORMER_MAP,
};
