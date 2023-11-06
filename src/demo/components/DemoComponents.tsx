import { Box, Text } from "../../index.js"; // "classy-ink"

export function DemoPageTitle({ children }: { children: string }) {
  return (
    <Box class="border-b">
      <Text class="font-bold">{children}</Text>
    </Box>
  );
}
