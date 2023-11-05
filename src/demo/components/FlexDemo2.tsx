import { Box, Text } from "../../index.js"; // "tailwind-ink"
import { DemoPageTitle } from "./DemoComponents.js";

function repeat(n: number, fn: (i: number) => JSX.Element) {
  const elements = [];
  for (let i = 1; i <= n; i++) {
    elements.push(fn(i));
  }
  return elements;
}

function Column1() {
  return (
    <Box class="grow flex-col gap-1">
      <Box class="flex-col">
        <Text class="italic">items-start</Text>
        <Box class="border border-red items-start h-7">
          {repeat(3, (i) => (
            <Box key={i} class="border px-1">
              <Text>{i}</Text>
            </Box>
          ))}
        </Box>
      </Box>
      <Box class="flex-col">
        <Text class="italic">items-center</Text>
        <Box class="border border-red items-center h-7">
          {repeat(3, (i) => (
            <Box key={i} class="border px-1">
              <Text>{i}</Text>
            </Box>
          ))}
        </Box>
      </Box>
      <Box class="flex-col">
        <Text class="italic">items-end</Text>
        <Box class="border border-red items-end h-7">
          {repeat(3, (i) => (
            <Box key={i} class="border px-1">
              <Text>{i}</Text>
            </Box>
          ))}
        </Box>
      </Box>
      <Box class="flex-col">
        <Text class="italic">items-stretch</Text>
        <Box class="border border-red items-stretch h-7">
          {repeat(3, (i) => (
            <Box key={i} class="border px-1">
              <Text>{i}</Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function Column2() {
  return (
    <Box class="grow flex-col gap-1">
      <Box class="flex-col">
        <Text class="italic">justify-start</Text>
        <Box class="border border-red justify-start">
          {repeat(3, (i) => (
            <Box key={i} class="border px-1">
              <Text>{i}</Text>
            </Box>
          ))}
        </Box>
      </Box>
      <Box class="flex-col">
        <Text class="italic">justify-center</Text>
        <Box class="border border-red justify-center">
          {repeat(3, (i) => (
            <Box key={i} class="border px-1">
              <Text>{i}</Text>
            </Box>
          ))}
        </Box>
      </Box>
      <Box class="flex-col">
        <Text class="italic">justify-end</Text>
        <Box class="border border-red justify-end">
          {repeat(3, (i) => (
            <Box key={i} class="border px-1">
              <Text>{i}</Text>
            </Box>
          ))}
        </Box>
      </Box>
      <Box class="flex-col">
        <Text class="italic">justify-between</Text>
        <Box class="border border-red justify-between">
          {repeat(3, (i) => (
            <Box key={i} class="border px-1">
              <Text>{i}</Text>
            </Box>
          ))}
        </Box>
      </Box>
      <Box class="flex-col">
        <Text class="italic">justify-around</Text>
        <Box class="border border-red justify-around">
          {repeat(3, (i) => (
            <Box key={i} class="border px-1">
              <Text>{i}</Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export function FlexDemo2() {
  return (
    <Box class="grow flex-col px-1 gap-1">
      <DemoPageTitle>Flex layout (2)</DemoPageTitle>
      <Box class="gap-2">
        <Column1 />
        <Column2 />
      </Box>
    </Box>
  );
}
