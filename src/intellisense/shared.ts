import {
  SpatialValueOutput,
  SPATIAL_VALUES,
  SPATIAL_VALUES_MAP,
  Color,
} from "../data/index.js";
import {
  NumericTransformerOptions,
  Props,
  numericTransformer,
} from "../shared.js";

// types
// -----

export type ComplexUtility = string[];
export type StaticUtility = string | ComplexUtility;
export type DynamicUtilityValues = Record<string | number, string>;
export type DynamicUtility = [
  fn: (value: string | number) => StaticUtility,
  values?: DynamicUtilityValues,
];
export type Utilities = Record<string, StaticUtility | DynamicUtility>;
export type StaticUtilities = Record<string, StaticUtility>;
export type DynamicUtilities = Record<string, DynamicUtility>;

// values
// ------

function positiveIntegerRange(lastNumber: number) {
  return Array.from({ length: lastNumber + 1 }, (_, i) => i);
}

function arrayToIdentityObject(array: unknown[]) {
  return array.reduce<Record<string, string>>((acc, curr) => {
    const stringValue = String(curr);
    acc[stringValue] = stringValue;
    return acc;
  }, {});
}

export const DEFAULT_NUMERIC_VALUES = arrayToIdentityObject(
  positiveIntegerRange(128),
);

export const SMALL_NUMERIC_VALUES = arrayToIdentityObject(
  positiveIntegerRange(12),
);

function generatePercentages(denominator: number) {
  const percentages: string[] = [];
  for (let i = 1; i < denominator; i++) {
    percentages[i] = `${i}/${denominator}`;
  }
  return percentages;
}
const ALLOWED_DENOMINATORS = [2, 3, 4, 5, 6, 12];
export const FRACTIONAL_VALUES = [
  ...ALLOWED_DENOMINATORS.map(generatePercentages).flat(),
  "full",
];
export const DEFAULT_NUMERIC_AND_PERCENTAGE_VALUES = {
  ...DEFAULT_NUMERIC_VALUES,
  ...arrayToIdentityObject(FRACTIONAL_VALUES),
};

// utility generation
// ------------------

export function spatialUtilities(
  utility: string,
  createUtility: (
    spatialValue?: SpatialValueOutput,
  ) => StaticUtility | DynamicUtility,
) {
  const utilities: Utilities = {
    [utility]: createUtility(),
  };
  SPATIAL_VALUES.forEach((spatialValue) => {
    utilities[`${utility}${spatialValue}`] = createUtility(
      SPATIAL_VALUES_MAP[spatialValue],
    );
  });
  return utilities;
}

export function numericUtility(
  property: keyof Props,
  {
    values = DEFAULT_NUMERIC_VALUES,
    ...options
  }: NumericTransformerOptions & {
    values?: DynamicUtilityValues;
  } = {},
): DynamicUtility {
  return [
    (value) => {
      const transformer = numericTransformer(property, options);
      const result = transformer(String(value), {});
      if (!result) return INVALID_UTILITY;

      const entries = Object.entries(result);
      if (entries.length > 1) throw new Error("Unexpected result");

      {
        const [key, value] = entries[0];
        if (typeof value === "string" && value.endsWith("%"))
          return `${key}: "${value}"`;
        return `${key}: ${value}`;
      }
    },
    values,
  ];
}

export function combinations<T extends string>(
  values: readonly T[],
  getName: (value: T) => string,
  getValue: (value: T) => StaticUtility,
) {
  return values.reduce(
    (acc, value) => {
      acc[getName(value)] = getValue(value);
      return acc;
    },
    {} as Record<string, StaticUtility>,
  );
}

// other
// -----

export const INVALID_UTILITY = "<INVALID>";

export function colorHighlight(color: Color) {
  return `$color$:${color}`;
}
