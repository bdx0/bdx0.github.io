"use strict";

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const filename = process.argv[2] || "public/embedded/buddha/index.html";
const html = fs.readFileSync(filename, "utf8");
const opens = (html.match(/<script\b/gi) || []).length;
const closes = (html.match(/<\/script\s*>/gi) || []).length;

if (opens !== closes || !html.trimEnd().endsWith("</html>")) {
  throw new Error("Buddha HTML is incomplete: " + opens + " script opens, " + closes + " closes.");
}

const moduleMatches = [...html.matchAll(/<script\s+type="module"\s*>([\s\S]*?)<\/script>/gi)];
if (moduleMatches.length !== 1) {
  throw new Error("Expected exactly one complete Buddha module script.");
}
const source = moduleMatches[0][1];
if (!/\banimate\s*\(\s*\)\s*;\s*$/.test(source.trim())) {
  throw new Error("Buddha animation loop is not started at the end of the module script.");
}

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "buddha-html-check-"));
try {
  const script = path.join(dir, "main.mjs");
  fs.writeFileSync(script, source);
  const result = spawnSync(process.execPath, ["--check", script], { encoding: "utf8" });
  if (result.status !== 0) {
    throw new Error("Buddha module JavaScript syntax invalid: " + (result.stderr || result.stdout));
  }
} finally {
  fs.rmSync(dir, { recursive: true, force: true });
}

console.log("Buddha HTML verified: " + opens + " scripts closed; module syntax valid; animate() called.");
