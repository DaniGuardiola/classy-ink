import { BOX_STYLES, COLORS } from "../../data/index.js";
import { Box, Text } from "../../index.js"; // "classy-ink"
import { DemoPageTitle } from "./DemoComponents.js";

function Column1() {
  return (
    <Box class="flex-col grow">
      <Text class="italic">{`border-<side>`}</Text>
      <Box class="flex-col gap-1">
        <Box class="flex-col">
          <Box class="border justify-center">
            <Text>border</Text>
          </Box>
        </Box>
        <Box class="flex-col">
          <Box class="border-t justify-center">
            <Text>border-t</Text>
          </Box>
        </Box>
        <Box class="flex-col">
          <Box class="border-b justify-center">
            <Text>border-b</Text>
          </Box>
        </Box>
        <Box class="flex-col">
          <Box class="border-l justify-center">
            <Text>border-l</Text>
          </Box>
        </Box>
        <Box class="flex-col">
          <Box class="border-r justify-center">
            <Text>border-r</Text>
          </Box>
        </Box>
      </Box>
      <Box class="h-2" />
      <Text class="italic">{`border-<side>-<color>`}</Text>
      <Box class="flex-col gap-1">
        <Box class="flex-col">
          <Box class="border border-t-blue border-b-green justify-center">
            <Text>border-t-blue border-b-green</Text>
          </Box>
        </Box>
      </Box>
      <Box class="h-2" />
      <Text class="italic">{`border-<side>-dim`}</Text>
      <Box class="flex-col gap-1">
        <Box class="flex-col">
          <Box class="border border-t-dim border-r-dim justify-center">
            <Text>border-t-dim border-r-dim</Text>
          </Box>
        </Box>
      </Box>
      <Box class="h-2" />
      <Text class="italic">{`border-<style>`}</Text>
      <Box class="flex-col">
        {BOX_STYLES.map((style) => (
          <Box key={style} class="flex-col">
            <Box class={`border-${style} px-1`}>
              <Text>{`border-${style}`}</Text>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function Column2() {
  return (
    <Box class="flex-col grow">
      <Text class="italic">{`border-<color>`}</Text>
      <Box class="flex-col">
        {COLORS.map((color) => (
          <Box key={color} class={`border border-${color} px-1`}>
            <Text>{`border-${color}`}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function Column3() {
  return (
    <Box class="flex-col grow">
      <Text class="italic">border-dim</Text>
      <Box class="flex-col">
        {COLORS.map((color) => (
          <Box key={color} class={`border border-${color} border-dim px-1`}>
            <Text>{`${color}`}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export function BorderDemo() {
  return (
    <Box class="flex-col px-1 grow gap-1">
      <DemoPageTitle>Border utilities</DemoPageTitle>
      <Box class="gap-2">
        <Column1 />
        <Column2 />
        <Column3 />
      </Box>
    </Box>
  );
}
