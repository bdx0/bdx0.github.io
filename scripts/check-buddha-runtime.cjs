"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(process.argv[2] || "out/embedded/buddha/vendor");
const entries = [
  "three.module.js",
  "loaders/GLTFLoader.js",
  "controls/OrbitControls.js",
  "loaders/DRACOLoader.js",
  "libs/meshopt_decoder.module.js",
  "utils/BufferGeometryUtils.js",
];

const visited = new Set();
const missing = [];

function check(file) {
  const absolute = path.resolve(root, file);
  if (!fs.existsSync(absolute)) {
    missing.push(file);
    return;
  }
  if (visited.has(absolute)) return;
  visited.add(absolute);
  const source = fs.readFileSync(absolute, "utf8");
  const importPattern = /\b(?:from\s*|import\s*\(\s*|import\s*)["'](\.\.?\/[^"']+)["']/g;
  let match;
  while ((match = importPattern.exec(source)) !== null) {
    const imported = path.resolve(path.dirname(absolute), match[1]);
    if (!imported.startsWith(root + path.sep)) {
      missing.push(file + " -> " + match[1] + " (outside vendor)");
      continue;
    }
    check(path.relative(root, imported));
  }
}

for (const entry of entries) check(entry);

if (missing.length) {
  console.error("Missing self-hosted Buddha dependencies:\n" + missing.map(x => " - " + x).join("\n"));
  process.exit(1);
}

console.log("Verified " + visited.size + " self-hosted runtime JS files and relative imports.");
