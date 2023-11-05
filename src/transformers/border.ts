import {
  Props,
  UtilityTransformerMap,
  kebabCaseToCamelCase,
  parseFragment,
} from "../shared.js";
import {
  OutputSide,
  OUTPUT_SIDES,
  isSide,
  SIDES_AND_CORNERS_MAP,
  isBoxStyle,
  isColor,
} from "../data/index.js";

function enableBorderSide(side: OutputSide, currentProps: Props) {
  const props: Props = {};
  OUTPUT_SIDES.forEach((outputSide) => {
    const property = kebabCaseToCamelCase(`border-${outputSide}`);
    const currentValue = currentProps[property];
    const targetValue = outputSide === side || currentValue === true;
    props[property] = targetValue;
  });
  if (currentProps.borderStyle === undefined) props.borderStyle = "single";
  return props;
}

export const BORDER_TRANSFORMER_MAP: UtilityTransformerMap = {
  border: (value, currentProps) => {
    // border
    if (!value)
      return {
        borderStyle: currentProps.borderStyle ?? "single",
        borderTop: true,
        borderBottom: true,
        borderLeft: true,
        borderRight: true,
      };
    if (isSide(value)) {
      const outputSide = SIDES_AND_CORNERS_MAP[value];
      return enableBorderSide(outputSide, currentProps);
    }

    // style
    if (isBoxStyle(value)) return { borderStyle: kebabCaseToCamelCase(value) };

    // color
    if (isColor(value)) return { borderColor: kebabCaseToCamelCase(value) };

    // dim color
    if (value === "dim") return { borderDimColor: true };

    const [side, sideValue] = parseFragment(value);
    if (isSide(side) && sideValue) {
      const outputSide = SIDES_AND_CORNERS_MAP[side];

      // color by side
      if (isColor(sideValue)) {
        const property = kebabCaseToCamelCase(`border-${outputSide}-color`);
        const value = kebabCaseToCamelCase(sideValue);
        return { [property]: value };
      }

      // dim color by side
      if (sideValue === "dim") {
        const property = kebabCaseToCamelCase(`border-${outputSide}-dim-color`);
        return { [property]: true };
      }
    }

    return false;
  },
};
