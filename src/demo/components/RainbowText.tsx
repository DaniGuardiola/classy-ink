import { Color } from "../../data/colors.js";
import { Box, Text } from "../../index.js"; // "tailwind-ink"
import { clsx } from "../lib/clsx.js";

const COLORS: Color[] = ["red", "yellow", "green", "blue", "magenta"];

type RainboxTextProps = { text: string; class?: string };

export function RainboxText({ text, class: className }: RainboxTextProps) {
  const lines = text.split("\n");
  const coloredLines = lines.map((line, lineI) => (
    <Box key={lineI}>
      {line.split("").map((char, charI) => (
        <Text key={charI} class={`text-${COLORS[charI % COLORS.length]}`}>
          {char}
        </Text>
      ))}
    </Box>
  ));
  return <Box class={clsx("flex-col", className)}>{coloredLines}</Box>;
}
