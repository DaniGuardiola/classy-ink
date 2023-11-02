import {
  Props,
  UtilityTransformerMap,
  kebabCaseToCamelCase,
  parseFragment,
} from "../../shared.js";
import {
  OutputSide,
  OUTPUT_SIDES,
  isSide,
  SIDES_AND_CORNERS_MAP,
  isBoxStyle,
  isColor,
  toOutputColor,
} from "../data/index.js";

function enableBorderSide(side: OutputSide, currentProps: Props) {
  const props: Props = {};
  OUTPUT_SIDES.forEach((outputSide) => {
    const property = kebabCaseToCamelCase(`border-${outputSide}`);
    const currentValue = currentProps[property];
    const targetValue = outputSide === side || currentValue === true;
    props[property] = targetValue;
  });
  // TODO: styles by side/corner
  if (currentProps.borderStyle === undefined) props.borderStyle = "single";
  return props;
}

export const BORDER_TRANSFORMER_MAP: UtilityTransformerMap = {
  border: (value, currentProps) => {
    // "border"
    if (!value)
      return {
        borderStyle: currentProps.borderStyle ?? "single",
        borderTop: true,
        borderBottom: true,
        borderLeft: true,
        borderRight: true,
      };

    // "border-<side>"
    // TODO: border-x and border-y
    // TODO: support sides and corners?
    if (isSide(value)) {
      const outputSide = SIDES_AND_CORNERS_MAP[value];
      return enableBorderSide(outputSide, currentProps);
    }

    // "border-<style>"
    // TODO: support sides and corners
    if (isBoxStyle(value)) return { borderStyle: value };

    // "border-<color>"
    if (isColor(value)) return { borderColor: toOutputColor(value) };

    // "border-dim"
    if (value === "dim") return { borderDimColor: true };

    const [side, sideValue] = parseFragment(value);
    if (isSide(side) && sideValue) {
      const outputSide = SIDES_AND_CORNERS_MAP[side];

      // "border-<side>-<color>"
      if (isColor(sideValue)) {
        const property = kebabCaseToCamelCase(`border-${outputSide}-color`);
        const value = toOutputColor(sideValue);
        return { [property]: value };
      }

      // "border-<side>-dim"
      if (sideValue === "dim") {
        const property = kebabCaseToCamelCase(`border-${outputSide}-dim-color`);
        return { [property]: true };
      }
    }

    return false;
  },
};
