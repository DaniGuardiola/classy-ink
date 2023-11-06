import { parseFragment,type Props } from "../shared.js";
import { UTILITY_TRANSFORMER_MAP } from "../transformers/index.js";

function transformUtility(
  name: string,
  value: string | undefined,
  currentProps: Props,
  fullUtility: string,
) {
  const transformer = UTILITY_TRANSFORMER_MAP[name];
  if (!transformer) return false;
  if (typeof transformer === "function") {
    const result = transformer(value, currentProps);
    if (!result) return false;
    return result;
  } else if (name === fullUtility) {
    return transformer;
  }
}

function utilityToInkProps(utility: string, currentProps: Props): Props {
  let result = transformUtility(utility, undefined, currentProps, utility);
  if (result) return result;

  const [name, value] = parseFragment(utility);
  result = transformUtility(name, value, currentProps, utility);
  if (!result) throw new Error(`Unknown utility: ${utility}`);
  return result;
}

export function tailwindToInkProps(className: string): Props {
  const props: Props = {};
  className
    .split(" ")
    .filter(Boolean)
    .sort()
    .forEach((c) => {
      const utilityProps = utilityToInkProps(c, props);
      Object.assign(props, utilityProps);
    });

  return props;
}
