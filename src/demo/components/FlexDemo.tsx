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
        <Text class="italic">flex-row</Text>
        <Box class="border border-red flex-row">
          {repeat(3, (i) => (
            <Box key={i} class="border px-1">
              <Text>{i}</Text>
            </Box>
          ))}
        </Box>
      </Box>
      <Box class="flex-col">
        <Text class="italic">flex-row-reverse</Text>
        <Box class="border border-red flex-row-reverse">
          {repeat(3, (i) => (
            <Box key={i} class="border px-1">
              <Text>{i}</Text>
            </Box>
          ))}
        </Box>
      </Box>
      <Box class="flex-col">
        <Text class="italic">flex-col</Text>
        <Box class="border border-red flex-col">
          {repeat(3, (i) => (
            <Box key={i} class="border justify-center px-1">
              <Text>{i}</Text>
            </Box>
          ))}
        </Box>
      </Box>
      <Box class="flex-col">
        <Text class="italic">flex-col-reverse</Text>
        <Box class="border border-red flex-col-reverse">
          {repeat(3, (i) => (
            <Box key={i} class="border justify-center px-1">
              <Text>{i}</Text>
            </Box>
          ))}
        </Box>
      </Box>
      <Box class="flex-col">
        <Text class="italic">flex-wrap</Text>
        <Box class="border border-red flex-wrap w-30">
          {repeat(10, (i) => (
            <Box key={i} class="border px-1">
              <Text>{i}</Text>
            </Box>
          ))}
        </Box>
      </Box>
      <Box class="flex-col">
        <Text class="italic">flex-wrap-reverse</Text>
        <Box class="border border-red flex-wrap-reverse w-30">
          {repeat(10, (i) => (
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
        <Text class="italic">gap-1</Text>
        <Box class="border border-red flex-wrap w-30 gap-1">
          {repeat(10, (i) => (
            <Box key={i} class="border px-1">
              <Text>{i}</Text>
            </Box>
          ))}
        </Box>
      </Box>
      <Box class="flex-col">
        <Text class="italic">gap-x-1</Text>
        <Box class="border border-red flex-wrap w-30 gap-x-1">
          {repeat(10, (i) => (
            <Box key={i} class="border px-1">
              <Text>{i}</Text>
            </Box>
          ))}
        </Box>
      </Box>
      <Box class="flex-col">
        <Text class="italic">gap-y-1</Text>
        <Box class="border border-red flex-wrap w-30 gap-y-1">
          {repeat(10, (i) => (
            <Box key={i} class="border px-1">
              <Text>{i}</Text>
            </Box>
          ))}
        </Box>
      </Box>
      <Box class="flex-col">
        <Text class="italic">gap-5</Text>
        <Box class="border border-red gap-5">
          {repeat(3, (i) => (
            <Box key={i} class="border px-1">
              <Text>{i}</Text>
            </Box>
          ))}
        </Box>
      </Box>
      <Box class="flex-col">
        <Text class="italic">grow</Text>
        <Box class="border">
          <Box class="border border-red px-1 grow-0">
            <Text>grow-0</Text>
          </Box>
          <Box class="grow border border-red px-1">
            <Text>grow</Text>
          </Box>
        </Box>
        <Box class="border">
          <Box class="border border-red px-1 grow-0">
            <Text>grow-0</Text>
          </Box>
          <Box class="border border-red px-1 grow-2">
            <Text>grow-2</Text>
          </Box>
          <Box class="border border-red px-1 grow-1">
            <Text>grow-1</Text>
          </Box>
        </Box>
      </Box>
      <Box class="flex-col">
        <Text class="italic">shrink</Text>
        <Box class="border w-40">
          <Box class="grow shrink border border-red px-1 w-25">
            <Text>shrink</Text>
          </Box>
          <Box class="grow border border-red px-1 w-25 shrink-0">
            <Text>shrink-0</Text>
          </Box>
        </Box>
      </Box>
      <Box class="flex-col">
        <Text class="italic">basis</Text>
        <Box class="border w-40">
          <Box class="grow border border-red px-1 w-25 basis-15">
            <Text>basis-15</Text>
          </Box>
          <Box class="grow border border-red px-1 w-25 basis-5">
            <Text>basis-5</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export function FlexDemo() {
  return (
    <Box class="grow flex-col px-1 gap-1">
      <DemoPageTitle>Flex layout (1)</DemoPageTitle>
      <Box class="gap-2">
        <Column1 />
        <Column2 />
      </Box>
    </Box>
  );
}
