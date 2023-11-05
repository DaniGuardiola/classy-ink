import plugin from "tailwindcss/plugin.js";
import { Config } from "tailwindcss";
import {
  DynamicUtilities,
  DynamicUtility,
  INVALID_UTILITY,
  StaticUtilities,
  StaticUtility,
  Utilities,
} from "./shared.js";
import { BASE_UTILITIES } from "./base.js";
import { TEXT_UTILITIES } from "./text.js";
import { FLEX_UTILITIES } from "./flex.js";
import { Color, isColor } from "../data/index.js";
import { BORDER_UTILITIES } from "./border.js";

const UTILITIES: Utilities = {
  ...BASE_UTILITIES,
  ...BORDER_UTILITIES,
  ...FLEX_UTILITIES,
  ...TEXT_UTILITIES,
};

const ZERO_WIDTH_SPACE = "\u200b";
const COLOR_PREFIX = "$color$:";
// based on https://github.com/mbadolato/iTerm2-Color-Schemes/blob/master/windowsterminal/Ubuntu.json
const COLOR_MAP: Record<Color, string> = {
  black: "#2e3436",
  red: "#cc0000",
  green: "#4e9a06",
  yellow: "#c4a000",
  blue: "#3465a4",
  magenta: "#75507b",
  cyan: "#06989a",
  white: "#d3d7cf",
  "black-bright": "#555753",
  gray: "#555753", // alias for black-bright
  grey: "#555753", // alias for black-bright
  "red-bright": "#ef2929",
  "green-bright": "#8ae234",
  "yellow-bright": "#fce94f",
  "blue-bright": "#729fcf",
  "magenta-bright": "#ad7fa8",
  "cyan-bright": "#34e2e2",
  "white-bright": "#eeeeec",
};

function utilityToDocs(docs: StaticUtility) {
  const result: Record<string, string> = {};
  let lastColor: string | undefined;
  (Array.isArray(docs) ? docs : [docs]).forEach((value, index) => {
    const key =
      value === INVALID_UTILITY
        ? // empty space key makes the utility not show anything on
          // hover - we exploit that to hide invalid utilities
          ""
        : // hack that makes utilities work with intellisense,
          // empty space breaks it - another nice side effect is
          // that successive props will be displayed with the same
          // indentation
          ZERO_WIDTH_SPACE.repeat(index + 1);
    if (value.startsWith(COLOR_PREFIX)) {
      lastColor = value.slice(COLOR_PREFIX.length);
    } else {
      if (lastColor) {
        if (!isColor(lastColor)) throw new Error(`Invalid color: ${lastColor}`);
        result.color = `${COLOR_MAP[lastColor]} /* ${value} */`;
      } else result[key] = `/* ${value} */`;
    }
  });
  return result;
}
const STATIC_UTILITIES: StaticUtilities = {};
const DYNAMIC_UTILITIES: DynamicUtilities = {};

function isDynamicUtility(
  utility: StaticUtility | DynamicUtility,
): utility is DynamicUtility {
  return Array.isArray(utility) && typeof utility[0] === "function";
}

Object.entries(UTILITIES).forEach(([key, value]) => {
  if (isDynamicUtility(value)) DYNAMIC_UTILITIES[key] = value;
  else STATIC_UTILITIES[key] = value;
});

function wrapDynamicUtility([fn, values]: DynamicUtility) {
  return [
    (value: string | number) => utilityToDocs(fn(value)),
    values,
  ] as const;
}

export const tailwindConfig: Config = {
  content: [],
  plugins: [
    plugin(function ({ addUtilities, matchUtilities }) {
      // static utilities
      const processedStaticUtilities: Parameters<typeof addUtilities>[0] = {};
      Object.entries(STATIC_UTILITIES).forEach(([className, docs]) => {
        processedStaticUtilities[`.${className}`] = utilityToDocs(docs);
      });
      addUtilities(processedStaticUtilities);

      // dynamic utilities
      Object.entries(DYNAMIC_UTILITIES).forEach(([className, utility]) => {
        const [fn, values] = wrapDynamicUtility(utility);
        matchUtilities<string | number, unknown>(
          { [className]: fn },
          values ? { values } : undefined,
        );
      });
    }),
  ],
  corePlugins: [],
};
