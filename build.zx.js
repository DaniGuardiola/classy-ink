#!/usr/bin/env zx
import fs from "node:fs/promises";

import { $ } from "zx";

const SUBPATH = "./intellisense";

// see https://github.com/isaacs/tshy/issues/28
async function tweakPackageJson() {
  const path = "./package.json";
  const packageJson = JSON.parse(await fs.readFile(path, "utf-8"));
  const exportContent = packageJson.exports[SUBPATH];
  const jsPath = exportContent.import.default;
  packageJson.exports[SUBPATH] = [exportContent, jsPath];
  fs.writeFile(path, JSON.stringify(packageJson));
  await $`prettier --write ${path}`;
}

async function build() {
  await $`bun tshy`;
  await tweakPackageJson();
}

await build();
