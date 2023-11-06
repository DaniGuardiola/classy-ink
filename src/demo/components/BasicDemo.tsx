import { Box, Text } from "../../index.js"; // "tailwind-ink"
import { DemoPageTitle } from "./DemoComponents.js";

function Column1() {
  return (
    <Box class="grow flex-col gap-1">
      <Box class="flex-col">
        <Text class="italic">m-1</Text>
        <Box class="border">
          <Box class="border border-red m-1 w-3" />
        </Box>
      </Box>
      <Box class="flex-col">
        <Text class="italic">mx-1</Text>
        <Box class="border">
          <Box class="border border-red mx-1 w-3" />
        </Box>
      </Box>
      <Box class="flex-col">
        <Text class="italic">my-1</Text>
        <Box class="border">
          <Box class="border border-red my-1 w-3" />
        </Box>
      </Box>
      <Box class="flex-col">
        <Text class="italic">ml-1</Text>
        <Box class="border">
          <Box class="border border-red ml-1 w-3" />
        </Box>
      </Box>
      <Box class="flex-col">
        <Text class="italic">ml-[-2]</Text>
        <Box class="border">
          <Box class="border border-red ml-[-2] w-3" />
        </Box>
      </Box>
    </Box>
  );
}

function Column2() {
  return (
    <Box class="grow flex-col gap-1">
      <Box class="flex-col">
        <Text class="italic">p-1</Text>
        <Box class="border border-red p-1">
          <Box class="border w-3" />
        </Box>
      </Box>
      <Box class="flex-col">
        <Text class="italic">px-1</Text>
        <Box class="border border-red px-1">
          <Box class="border w-3" />
        </Box>
      </Box>
      <Box class="flex-col">
        <Text class="italic">py-1</Text>
        <Box class="border border-red py-1">
          <Box class="border w-3" />
        </Box>
      </Box>
      <Box class="flex-col">
        <Text class="italic">pl-1</Text>
        <Box class="border border-red pl-1">
          <Box class="border w-3" />
        </Box>
      </Box>
    </Box>
  );
}

function Column3() {
  return (
    <Box class="grow flex-col gap-1">
      <Box class="flex-col">
        <Text class="italic">w-10</Text>
        <Box class="border border-red w-10" />
      </Box>
      <Box class="flex-col">
        <Text class="italic">min-w-10</Text>
        <Box class="min-w-10 border border-red" />
      </Box>
      <Box class="flex-col">
        <Text class="italic">h-5</Text>
        <Box class="border border-red w-1 h-5" />
      </Box>
      <Box class="flex-col">
        <Text class="italic">min-h-5</Text>
        <Box class="min-h-5 border border-red w-1" />
      </Box>
      <Box class="flex-col">
        <Text class="italic">overflow-visible</Text>
        <Box class="overflow-visible border border-red w-5">
          <Box class="border w-15 shrink-0" />
        </Box>
      </Box>
      <Box class="flex-col">
        <Text class="italic">overflow-hidden</Text>
        <Box class="overflow-hidden border border-red w-5">
          <Box class="border w-15 shrink-0" />
        </Box>
      </Box>
    </Box>
  );
}


export function BasicDemo() {
  return (
    <Box class="grow flex-col px-1 gap-1">
      <DemoPageTitle>Basic utilities</DemoPageTitle>
      <Box class="gap-2">
        <Column1 />
        <Column2 />
        <Column3 />
      </Box>
    </Box>
  );
}
