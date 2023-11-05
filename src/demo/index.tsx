#!/usr/bin/env node
import { render, useInput } from "ink";
import { Box, Text } from "../index.js"; // "tailwind-ink"
import { RainboxText } from "./components/RainbowText.js";
import { ASCII_TITLE } from "./lib/ascii-title.js";
import { useState } from "react";
import { BasicDemo } from "./components/BasicDemo.js";
import { FlexDemo } from "./components/FlexDemo.js";
import { FlexDemo2 } from "./components/FlexDemo2.js";
import { TextDemo } from "./components/TextDemo.js";
import { BorderDemo } from "./components/BorderDemo.js";
import { clsx } from "./lib/clsx.js";
import { TailwindInkProvider } from "../components/TailwindInkProvider.js";

type PageButtonProps = {
  children: string;
  disabled: boolean;
};

function PageButton({ children, disabled }: PageButtonProps) {
  return (
    <Box class={clsx("border border-cyan px-1", disabled && "border-dim")}>
      <Text class={clsx("text-cyan", disabled && "text-dim")}>{children}</Text>
    </Box>
  );
}

const DEMO_PAGES = [
  <BasicDemo key="basic" />,
  <FlexDemo key="flex" />,
  <FlexDemo2 key="flex-2" />,
  <TextDemo key="text" />,
  <BorderDemo key="border" />,
];

function DemoViewer() {
  const [page, setPage] = useState(0);
  useInput((input, key) => {
    if (key.leftArrow && page > 0) setPage(page - 1);
    if (key.rightArrow && page < DEMO_PAGES.length - 1) setPage(page + 1);
    if (input === "q") process.exit(0);
  });
  return (
    <Box class="flex-col m-1 w-full gap-1">
      <Box class="justify-between">
        <PageButton disabled={page === 0}>← Previous page</PageButton>
        <Box class="p-1">
          <Text class="italic">Press Q to quit</Text>
        </Box>
        <PageButton disabled={page === DEMO_PAGES.length - 1}>
          Next page →
        </PageButton>
      </Box>
      <Box>{DEMO_PAGES[page]}</Box>
    </Box>
  );
}

function MenuButton({
  children,
  selected,
}: {
  children: string;
  selected: boolean;
}) {
  return (
    <Box class={clsx("border px-1", selected ? "border-bold" : "border-dim")}>
      <Text class={clsx(selected ? "font-bold" : "text-dim")}>{children}</Text>
    </Box>
  );
}

type MenuOption = "START" | "QUIT";

type MenuProps = {
  onDemoStart: () => void;
};

function Menu({ onDemoStart }: MenuProps) {
  const [selected, setSelected] = useState<MenuOption>("START");
  useInput((_, key) => {
    if (key.leftArrow && selected === "QUIT") setSelected("START");
    if (key.rightArrow && selected === "START") setSelected("QUIT");
    if (key.return) {
      switch (selected) {
        case "START":
          onDemoStart();
          break;
        case "QUIT":
          process.exit(0);
      }
    }
  });
  return (
    <TailwindInkProvider>
      <Box class="border-t border-b border-double border-blue">
        <MenuButton selected={selected === "START"}>Start demo</MenuButton>
        <MenuButton selected={selected === "QUIT"}>Quit</MenuButton>
      </Box>
    </TailwindInkProvider>
  );
}

function Demo() {
  const [view, setView] = useState<"menu" | "demo">("menu");
  return (
    <Box class="flex-col items-center py-1 gap-1">
      <RainboxText text={ASCII_TITLE} />
      {view === "menu" ? (
        <>
          <Text>Created by Dani Guardiola</Text>
          <Menu onDemoStart={() => setView("demo")} />
        </>
      ) : (
        <DemoViewer />
      )}
    </Box>
  );
}

render(<Demo />);
