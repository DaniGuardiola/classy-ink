# Tailwind Ink

Build beautiful CLI interfaces with [Tailwind CSS](https://tailwindcss.com) and [Ink](https://term.ink/).

```
npm install tailwind-ink
```

Tailwind Ink is a simple drop-in replacement for the `Box` and `Text` Ink components. It adds support for utility classes through the `class` prop.

```tsx
TODO: example here
```

## Features

- Full support\* for all of `Box` and `Text` props.
- Optimized for familiarity. Tailwind CSS users will feel right at home.
- Support for [Tailwind CSS Intellisense](https://tailwindcss.com/docs/editor-setup#intelli-sense-for-vs-code) and [automatic sorting](https://github.com/tailwindlabs/prettier-plugin-tailwindcss). **TODO**
- Customizable screen variants (`sm`, `md`, `lg`...) to adapt to different terminal sizes. **TODO**
- Runtime compilation, which allows dynamic values like `border-${color}` to work.
- Cached and memoized so that performance is not an issue. **TODO**

_\* While all props are supported, some subsets of functionality are not fully implemented yet. See the [Current limitations](#current-limitations) section for more information._

## Usage

1. Import `Box` and `Text` from `tailwind-ink` instead of `ink`.

   ```tsx
   import { Box, Text } from "tailwind-ink";
   ```

2. Use the `class` prop to apply styles.

   ```tsx
   <Box class="border py-1 px-3 min-w-1/2 flex-wrap gap-2">
     <Text class="text-red">Hello</Text>
     <Text class="text-white font-bold bg-blue">World!</Text>
   </Box>
   ```

### IDE support

1. Install the [Tailwind CSS Intellisense extension](https://tailwindcss.com/docs/editor-setup#intelli-sense-for-vs-code) for Visual Studio Code.

2. Install `tailwindcss` in your project.

   ```
   npm install tailwindcss
   ```

3. Create a `tailwind.config.js` file in the project root, and put the following content:

   ```
   module.exports = require("tailwind-ink/config")
   ```

For automatic class sorting, set up the [Tailwind CSS Prettier plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss).

### Tips

The compilation process occurs at runtime, so you can use dynamic values in your classes (as opposed to standard Tailwind CSS).

For example, the following will actually work:

```tsx
<Box class={`border-${color}-bright`} />
```

---

You can still pass any style props you want, and they will take precedence over the Tailwind Ink classes.

For example, in the following code the final value of `flexDirection` will be `"row"` instead of `"column"`:

```tsx
<Box class="flex-col" flexDirection="row" />
```

---

Tailwind Ink uses a cache to avoid recompiling the same classes over and over again. This means that normally there's no reason to use style props directly for performance reasons.

The main exception is a highly dynamic value that changes very frequently. In that case, it's recommended to extract that value into a style prop while leaving others as utility classes.

---

Utilities that support a numeric value (`gap`, `m`, `grow`...) also support the arbitrary value syntax (e.g. `gap-[4]`).

---

Tailwind Ink is relatively lax about allowed values in comparison to Tailwind CSS. For example, `w-23/58` (equivalent to `width: 0.396551724%`) and `w-71827` will work out of the box, even though they are normally non-sensical values.

These odd values are not "officially supported" though, and might stop working in a future update. Try to stick to common sense values or use the arbitrary value syntax (e.g. `w-[0.396551%]` or `w-[71827]`) which will always support custom values.

## Style props

All `<Box />` and `<Text />` style props are supported. Below are their equivalent Tailwind Ink utilities.

### `Box` props

- `position`: `absolute` and `relative`
- `columnGap`: `gap-x-<n>`
- `rowGap`: `gap-y-<n>`
- `gap`: `gap-<n>`
- `margin`: `m-<n>`
- `margin<X|Y|Top|Bottom|Left|Right>`: `m-<x|y|t|b|l|r>-<n>`
- `padding`: `p-<n>`
- `padding<X|Y|Top|Bottom|Left|Right>`: `p-<x|y|t|b|l|r>-<n>`
- `flexGrow`: `grow` (value: `1`) and `grow-<n>`
- `flexShrink`: `shrink` (value: `1`) and `shrink-<n>`
- `flexDirection`: `flex-<row|row-reverse|column|column-reverse>`
- `flexBasis`: `basis-<n>`
- `flexWrap`: `flex-<nowrap|wrap|wrap-reverse>`
- `alignItems`: `items-<start|center|end|stretch>`
- `alignSelf`: `self-<start|center|end|auto>`
- `justifyContent`: `justify-<start|end|between|around|center>`
- `width`: `w-<n>`, `w-<n/n>`, `w-[<n>%]` and `w-full`
- `height`: `h-<n>`, `h-<n/n>`, `h-[<n>%]` and `h-full`
- `minWidth`: `min-w-<n>`, `min-w-<n/n>`, `min-w-[<n>%]` and `min-w-full`
- `minHeight`: `min-h-<n>`, `min-h-<n/n>`, `min-h-[<n>%]` and `min-h-full`
- `display`: `flex` and `hidden`
- `borderStyle`: `border-<style>` (`border-<tl|t|tr|r|br|b|bl|l|a>-<style>` is not supported yet)
- `border<Top|Bottom|Left|Right>Style`: `border-<t|b|l|r>`
- `borderColor`: `border-<color>`
- `border<Top|Bottom|Left|Right>Color`: `border-<t|b|l|r>-<color>`
- `borderDimColor`: `border-dim`
- `border<Top|Bottom|Left|Right>DimColor`: `border-<t|b|l|r>-dim`
- `overflow`: `overflow-<visible|hidden>`
- `overflow<X|Y>`: `overflow-<x|y>-<visible|hidden>`

### `Text` props

- `color`: `text-<color>`
- `backgroundColor`: `bg-<color>`
- `dimColor`: `text-dim`
- `bold`: `font-bold`
- `italic`: `italic`
- `underline`: `underline`
- `strikethrough`: `strike`
- `inverse`: `inverse`
- `wrap`: `whitespace-wrap`, `whitespace-nowrap` (equivalent to `truncate`), `truncate` (truncates the end), `truncate-<start|middle>`

## Notes

### Colors

The following colors are supported:

- `black`
- `white`
- `gray`
- `red`
- `green`
- `yellow`
- `blue`
- `cyan`
- `magenta`

All colors except `gray` also have a "bright" equivalent named `<color>-bright` (e.g. `red-bright`).

### Borders

- `border` sets `borderStyle: "single"` and enables all sides (`borderTop`, `borderBottom`, `borderLeft`, `borderRight`).
- When `border-<t|b|l|r>` is set:
  - `borderStyle` is set to `"single"` unless another style is already set **for all sides** (`border-<style>`).
  - Other sides are disabled (set to `false`) unless explicitly enabled. In other words, it functions as a "whitelist". Note that `border` overrides this.

### Current limitations

- `basis` only supports basic numeric values.
- Margin utilities only support negative values through arbitrary value syntax (e.g. `ml-[-1]`). Standard syntax (e.g. `-ml-1`) is not supported.

## Author

Tailwind Ink was built by [Dani Guardiola](https://dio.la/).
