<p align="center">
  <img alt="A screenshot of the example code below" src="https://github.com/DaniGuardiola/classy-ink/raw/main/logo.png">
</p>

> Build classy CLI interfaces with [Tailwind CSS](https://tailwindcss.com)-inspired utility classes and [Ink](https://term.ink/).

Classy Ink is a simple drop-in replacement for the `Box` and `Text` Ink components. It adds support for utility classes through the `class` prop.

---

Try the demo now!

```
npx classy-ink
```

Or [try it in your browser](https://stackblitz.com/edit/classy-ink-demo?file=README&view=editor).

## <a name='Install'></a>Install

```
npm install classy-ink
```

## <a name='Example'></a>Example

<p align="center">
  <img alt="A screenshot of the example code below" src="https://github.com/DaniGuardiola/classy-ink/raw/main/example.png">
</p>

```tsx
import { render } from "ink";
import { Box, Text } from "classy-ink";

function Divider() {
  return <Box class="border-gray my-1 border-t" />;
}

function Button({ label }: { label: string }) {
  return (
    <Box class="border-round bg-blue px-1">
      <Text class="font-bold text-white">{label}</Text>
    </Box>
  );
}

function InputField({ label }: { label: string }) {
  return (
    <Box class="items-center">
      <Text class="mr-2">{label}:</Text>
      <Box class="border-round border-cyan border px-2">
        <Text class="text-cyan">_____________</Text>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <Box class="border-round border-green flex-col border px-2 py-1">
      <Box class="justify-between">
        <Text class="text-magenta font-bold">The Matrix CLI</Text>
        <Text class="text-gray">(Ctrl+C to quit)</Text>
      </Box>
      <Divider />
      <Box class="flex-col gap-1">
        <Text class="text-red font-bold">Access credentials</Text>
        <Box class="gap-4">
          <InputField label="Username" />
          <InputField label="Password" />
        </Box>
      </Box>
      <Divider />
      <Box class="gap-1">
        <Button label="Enter" />
        <Button label="Cancel" />
      </Box>
    </Box>
  );
}

render(<App />);
```

You can [run and edit this example live](https://stackblitz.com/edit/classy-ink-demo-jsayvk?file=example.tsx&view=editor) in your browser.

## <a name='Features'></a>Features

- Full support\* for all of `Box` and `Text` style props.
- Optimized for familiarity. Tailwind CSS users will feel right at home.
- Compatible with [Tailwind CSS Intellisense](https://tailwindcss.com/docs/editor-setup#intelli-sense-for-vs-code) and [automatic sorting](https://github.com/tailwindlabs/prettier-plugin-tailwindcss).
- Customizable screen variants (`sm`, `md`, `lg`...) to adapt to different terminal sizes. _(coming soon)_
- Runtime compilation, which enables dynamic values like `border-${color}`.
- Optional cache that prevents recompilation.

_\* While all props are supported, some small subsets of functionality are not fully implemented yet. See the [Current limitations](#current-limitations) section for more information._

## <a name='Contents'></a>Contents

<!-- vscode-markdown-toc -->

- [Install](#install)
- [Example](#example)
- [Features](#features)
- [Contents](#contents)
- [Usage](#usage)
  - [IDE features (optional)](#ide-features-optional)
  - [Cache (optional)](#cache-optional)
  - [Tips](#tips)
- [Utility classes](#utility-classes)
  - [`Box` props](#box-props)
  - [`Text` props](#text-props)
- [Notes](#notes)
  - [Colors](#colors)
  - [Borders](#borders)
  - [Current limitations](#current-limitations)
- [Custom usage](#custom-usage)
- [Contributing](#contributing)
- [Author](#author)

<!-- vscode-markdown-toc-config
	numbering=false
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

For a history of changes, see the [changelog](CHANGELOG.md).

## <a name='Usage'></a>Usage

1. Import `Box` and `Text` from `classy-ink` instead of `ink`.

   ```tsx
   import { Box, Text } from "classy-ink";
   ```

2. Use the `class` prop to apply styles.

   ```tsx
   <Box class="min-w-1/2 flex-wrap gap-2 border px-3 py-1">
     <Text class="text-red">Hello</Text>
     <Text class="bg-blue font-bold text-white">World!</Text>
   </Box>
   ```

### <a name='IDEfeaturesoptional'></a>IDE features (optional)

1. Install the [Tailwind CSS Intellisense extension](https://tailwindcss.com/docs/editor-setup#intelli-sense-for-vs-code) for Visual Studio Code or any supported IDE.

2. Install `tailwindcss` in your project.

   ```
   npm install -D tailwindcss
   ```

3. Create a `tailwind.config.js` file in the project root with the following content:

   ```tsx
   import { tailwindConfig } from "classy-ink/intellisense";

   export default tailwindConfig;
   ```

For automatic class sorting, set up the [Tailwind CSS Prettier plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss).

### <a name='Cacheoptional'></a>Cache (optional)

To use the cache, wrap your app in a `<ClassyInkProvider />`, for example:

```tsx
import { ClassyInkProvider, Box } from "classy-ink";

function App() {
  return (
    <ClassyInkProvider>
      <Box class="border p-1" />
    </ClassyInkProvider>
  );
}
```

The cache size can be configured with the `maxCacheSize` prop (default: `500`). It can also be disabled by passing the value `0`.

Note that you might not need the cache at all. CLI apps are usually not very dynamic, so the performance impact of recompiling classes is negligible.

Also, note that the cache uses a [Least Recently Used](<https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU)>) algorithm, in case that's relevant to your use case.

### <a name='Tips'></a>Tips

The compilation process occurs at runtime, so you can use dynamic values in your classes. If you're used to Tailwind CSS (where this is not possible), this might be a welcome difference.

For example, the following will work:

```tsx
<Box class={`border-${color}-bright`} />
```

---

You can still pass any style props you want, and they will take precedence over the Classy Ink classes.

For example, in the following code the final value of `flexDirection` will be `"row"` instead of `"column"`:

```tsx
<Box class="flex-col" flexDirection="row" />
```

---

CLI apps are usually not very dynamic, so the cost of compiling (and recompiling) is often negligible. Furthermore, with the optional cache, it's even less of a problem. This means that normally there's no reason to use style props directly (over utility classes) for performance reasons.

The main exception is a highly dynamic value that changes very frequently. In that case, it's recommended to extract that value into a style prop while leaving others as utility classes.

---

Utilities that support a numeric value (`gap`, `m`, `grow`...) also support the arbitrary value syntax (e.g. `gap-[4]`).

---

Classy Ink is relatively lax about allowed values in comparison to Tailwind CSS. For example, `w-23/58` (equivalent to `width: 0.396551724%`) and `w-71827` will work out of the box, even though they are atypical.

Values like these are not "officially supported" though, and might stop working in a future update. If you need them, use the arbitrary value syntax (e.g. `w-[0.396551%]` or `w-[71827]`) which will always support custom values.

## <a name='Utilityclasses'></a>Utility classes

All `<Box />` and `<Text />` style props are supported. Below are their equivalent Classy Ink utilities.

### <a name='Boxprops'></a>`Box` props

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
- `borderStyle`: `border-<style>`
- `border<Top|Bottom|Left|Right>Style`: `border-<t|b|l|r>`
- `borderColor`: `border-<color>`
- `border<Top|Bottom|Left|Right>Color`: `border-<t|b|l|r>-<color>`
- `borderDimColor`: `border-dim`
- `border<Top|Bottom|Left|Right>DimColor`: `border-<t|b|l|r>-dim`
- `overflow`: `overflow-<visible|hidden>`
- `overflow<X|Y>`: `overflow-<x|y>-<visible|hidden>`

### <a name='Textprops'></a>`Text` props

- `color`: `text-<color>`
- `backgroundColor`: `bg-<color>`
- `dimColor`: `text-dim`
- `bold`: `font-bold`
- `italic`: `italic`
- `underline`: `underline`
- `strikethrough`: `strike`
- `inverse`: `inverse`
- `wrap`: `whitespace-wrap`, `whitespace-nowrap` (equivalent to `truncate`), `truncate` (truncates the end), `truncate-<start|middle>`

## <a name='Notes'></a>Notes

### <a name='Colors'></a>Colors

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

### <a name='Borders'></a>Borders

- `border` sets `borderStyle: "single"` and enables all sides (`borderTop`, `borderBottom`, `borderLeft`, `borderRight`).
- When `border-<t|b|l|r>` is set:
  - `borderStyle` is set to `"single"` unless another style is already set **for all sides** (`border-<style>`).
  - All other sides are disabled (set to `false`) unless enabled elsewhere. In other words, it functions as a "whitelist". Note that `border` always enables all sides.

### <a name='Currentlimitations'></a>Current limitations

- Setting border style by side/corner (`border-<tl|t|tr|r|br|b|bl|l|a>-<style>`) is not supported.
- `basis` only supports basic numeric values.
- Margin utilities only support negative values through arbitrary value syntax (e.g. `ml-[-1]`). Standard syntax (e.g. `-ml-1`) is not supported. Negative percentages are not supported either.
- There is no sense of "RTL" or "LTR" in Ink, so logical utilities like `ms-<n>` (`margin-inline-start`) are not supported.

## Custom usage

If you have some kind of custom use case, you can use the `compileClass` function directly. This function takes a class string and returns an object with the corresponding Ink props.

```tsx
import { compileClass } from "classy-ink";
import { Box } from "ink";

const inkProps = compileClass("border border-red");
<Box {...inkProps} />;
```

Note that this function does not have some optimizations that are built-in to the `Box` and `Text` components, like memoization and (optional) global cache. Use at your own risk.

## <a name='Contributing'></a>Contributing

Install [`bun`](https://bun.sh/) and install dependencies with `bun i`.

You can run `bun demo:watch` to start the demo and automatically restart on changes.

Contributions are welcome, especially those that add missing features like the ones listed in [Current limitations](#current-limitations).

## <a name='Author'></a>Author

Classy Ink was built by [Dani Guardiola](https://dio.la/).

Classy Ink is NOT affiliated with Tailwind CSS, Tailwind Labs Inc., or the Ink project.
