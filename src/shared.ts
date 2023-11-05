import { type BoxProps, type TextProps } from "ink";

import {
  SPATIAL_VALUES,
  SPATIAL_VALUES_MAP,
  type SpatialValueOutput,
} from "./data/index.js";

// types
// -----

type Mutable<T> = {
  -readonly [Value in keyof T]: T[Value];
};

export type Props = Mutable<BoxProps & TextProps>;

export type UtilityData = readonly [head: string, rest: string | undefined];

export type UtilityTransformer = (
  value: string | undefined,
  currentProps: Props,
) => Props | false;
export type UtilityTransformerMap = Record<string, UtilityTransformer | Props>;

// parsing
// -------

const HEAD_REGEXP = "(?<head>[a-z]+)";
const REST_REGEXP = "(-(?<rest>.+?))?";
const FRAGMENT_REGEXP = new RegExp(`^${HEAD_REGEXP}${REST_REGEXP}$`);

export function isFragment(fragment: unknown) {
  if (typeof fragment !== "string") return false;
  const match = fragment.match(FRAGMENT_REGEXP);
  if (!match || !match.groups) return false;
  const { head } = match.groups;
  if (!head) return false;
  return true;
}

export function parseFragment(fragment: string): UtilityData {
  const match = fragment.match(FRAGMENT_REGEXP);
  if (!match || !match.groups)
    throw new Error(`Error parsing fragment: ${fragment}`);
  const { head, rest } = match.groups;
  if (!head) throw new Error(`Error parsing fragment: ${fragment}`);
  return [head, rest] as const;
}

const ARBITRARY_VALUE_REGEXP = `\\[(?<value>.*)\\]`;
export function parseArbitraryValue(rawValue: string) {
  const match = rawValue.match(ARBITRARY_VALUE_REGEXP);
  if (!match || !match.groups) return false;
  const { value } = match.groups;
  if (!value) return false;
  return value;
}

// https://stackoverflow.com/a/32229831
function withMaxDecimalPlaces(value: number, decimalPlaces: number) {
  return String(Number(value.toFixed(decimalPlaces)));
}

const FRACTIONAL_VALUE_REGEXP =
  /^(?<numerator>\d{1,2})\/(?<denominator>\d{1,2})$/;
export function parseFractionalValue(value: string): string | false {
  const match = value.match(FRACTIONAL_VALUE_REGEXP);
  if (!match || !match.groups) return false;
  const { numerator, denominator } = match.groups;
  if (!numerator || !denominator) return false;

  const num = Number(numerator);
  const den = Number(denominator);

  if (num === 0) return false; // equivalent to 0
  if (num === den) return false; // equivalent to 1
  if (den === 0) return false; // impossible
  if (den === 1) return false; // equivalent to a whole number
  if (num > den) return false; // improper

  return withMaxDecimalPlaces((num / den) * 100, 6);
}

const PERCENTAGE_VALUE_REGEXP = /^(?<value>\d{1,6})%$/;
export function parsePercentageValue(value: string) {
  const match = value.match(PERCENTAGE_VALUE_REGEXP);
  if (!match || !match.groups) return false;
  const { value: percentage } = match.groups;
  if (!percentage) return false;

  const per = Number(percentage);
  if (per < 0) return false;

  return withMaxDecimalPlaces(per, 6);
}

// transformer utils
// -----------------

type KebabCaseToCamelCase<S extends string> = S extends `${infer T}-${infer U}`
  ? `${T}${Capitalize<KebabCaseToCamelCase<U>>}`
  : S;

export function kebabCaseToCamelCase<S extends string>(
  s: S,
): KebabCaseToCamelCase<S> {
  return s.replace(/-([a-z])/g, (m) =>
    m[1].toUpperCase(),
  ) as KebabCaseToCamelCase<S>;
}

const DEFAULT_MAX_NUMERIC_VALUE = 99999;

type NumericValueOptions = {
  maxValue?: number;
  allowNegative?: boolean;
};

function isValidNumericValue(
  value: number,
  {
    maxValue = DEFAULT_MAX_NUMERIC_VALUE,
    allowNegative = false,
  }: NumericValueOptions = {},
) {
  return (
    Number.isSafeInteger(value) &&
    (allowNegative || value >= 0) &&
    value <= maxValue
  );
}

export type NumericTransformerOptions = NumericValueOptions & {
  defaultValue?: number;
  fallbackFn?: (
    property: string,
    value: string,
    currentProps: Props,
  ) => Props | false;
};

export function numericTransformer(
  property: keyof Props,
  {
    maxValue = DEFAULT_MAX_NUMERIC_VALUE,
    allowNegative = false,
    defaultValue,
    fallbackFn,
  }: NumericTransformerOptions = {},
): UtilityTransformer {
  return (value, currentProps) => {
    if (!value) {
      if (defaultValue === undefined) return false;
      return { [property]: defaultValue };
    }

    function isValid(number: number) {
      return isValidNumericValue(number, { maxValue, allowNegative });
    }

    let numericValue = Number(value);
    if (!isValid(numericValue)) {
      const arbitraryValue = parseArbitraryValue(value);
      // try parsing arbitrary value syntax
      numericValue = Number(arbitraryValue);
      if (arbitraryValue === false || !isValid(numericValue)) {
        if (fallbackFn)
          return fallbackFn(
            property,
            arbitraryValue === false ? value : arbitraryValue,
            currentProps,
          );
        return false;
      }
    }

    return { [property]: numericValue };
  };
}

export function percentageFallback(property: string, value: string) {
  let percentage = parseFractionalValue(value);
  if (!percentage) percentage = parsePercentageValue(value);
  if (!percentage) {
    if (value === "full") percentage = "100";
    else return false;
  }
  return { [property]: `${percentage}%` };
}

export function spatialTransformers(
  utility: string,
  createTransformer: (spatialValue?: SpatialValueOutput) => UtilityTransformer,
) {
  const transformers: UtilityTransformerMap = {
    [utility]: createTransformer(),
  };
  SPATIAL_VALUES.forEach((spatialValue) => {
    transformers[`${utility}${spatialValue}`] = createTransformer(
      SPATIAL_VALUES_MAP[spatialValue],
    );
  });
  return transformers;
}
