import { COLORS } from "../../data/colors.js";
import { Box, Text } from "../../index.js"; // "classy-ink"
import { DemoPageTitle } from "./DemoComponents.js";

const LOREM_IPSUM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum fermentum sollicitudin. Quisque facilisis orci eget dapibus, eu ullamcorper risus pharetra.";

function Column1() {
  return (
    <Box class="flex-col w-40 grow gap-1">
      <Box class="flex-col">
        <Text class="italic">whitespace-wrap</Text>
        <Box class="border flex-row">
          <Text class="whitespace-wrap">{LOREM_IPSUM}</Text>
        </Box>
      </Box>
      <Box class="flex-col">
        <Text class="italic">truncate (or whitespace-wrap)</Text>
        <Box class="border flex-row">
          <Text class="truncate">{LOREM_IPSUM}</Text>
        </Box>
      </Box>
      <Box class="flex-col">
        <Text class="italic">truncate-start</Text>
        <Box class="border flex-row">
          <Text class="truncate-start">{LOREM_IPSUM}</Text>
        </Box>
      </Box>
      <Box class="flex-col">
        <Text class="italic">truncate-middle</Text>
        <Box class="border flex-row">
          <Text class="truncate-middle">{LOREM_IPSUM}</Text>
        </Box>
      </Box>
    </Box>
  );
}

function Column2() {
  return (
    <Box class="flex-col px-1 py-2 gap-1">
      <Text class="italic">{"text-<color>"}</Text>
      <Box class="flex-col">
        {COLORS.map((color) => (
          <Text key={color} class={`text-${color}`}>{`text-${color}`}</Text>
        ))}
      </Box>
    </Box>
  );
}

function Column3() {
  return (
    <Box class="flex-col px-1 py-2 gap-1">
      <Text class="italic">text-dim</Text>
      <Box class="flex-col">
        {COLORS.map((color) => (
          <Text key={color} class={`text-${color} text-dim`}>
            {color}
          </Text>
        ))}
      </Box>
    </Box>
  );
}

function Column4() {
  return (
    <Box class="flex-col px-1 py-2 gap-1">
      <Text class="italic">{"bg-<color>"}</Text>
      <Box class="flex-col">
        {COLORS.map((color) => (
          <Text key={color} class={`bg-${color}`}>
            {`bg-${color}`}
          </Text>
        ))}
      </Box>
    </Box>
  );
}

function Column5() {
  return (
    <Box class="flex-col px-1 py-2 gap-1">
      <Text class="font-bold">font-bold</Text>
      <Text class="italic">italic</Text>
      <Text class="underline">underline</Text>
      <Text class="strike">strike</Text>
      <Text class="inverse">inverse</Text>
    </Box>
  );
}

export function TextDemo() {
  return (
    <Box class="flex-col px-1 grow gap-1">
      <DemoPageTitle>Text utilities</DemoPageTitle>
      <Box class="gap-2">
        <Column1 />
        <Column2 />
        <Column3 />
        <Column4 />
        <Column5 />
      </Box>
    </Box>
  );
}
