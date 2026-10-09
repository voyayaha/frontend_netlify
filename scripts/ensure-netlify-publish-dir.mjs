import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
const client = path.join(dist, "client");

if (fs.existsSync(client) && fs.statSync(client).isDirectory()) {
  console.log("Netlify publish directory already exists: dist/client");
  process.exit(0);
}
if (!fs.existsSync(dist) || !fs.statSync(dist).isDirectory()) {
  console.error("Build did not create dist/. Check the Vite build output above.");
  process.exit(1);
}

// Locate a browser output folder if this project's build wrapper emits it at a
// different level. Do not move or delete server-side build artifacts.
function findIndexDirs(dir, depth = 0) {
  if (depth > 5) return [];
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
  catch { return []; }
  if (entries.some((entry) => entry.isFile() && entry.name === "index.html")) return [dir];
  const found = [];
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name === "node_modules" || entry.name === "client") continue;
    found.push(...findIndexDirs(path.join(dir, entry.name), depth + 1));
  }
  return found;
}
const candidates = findIndexDirs(dist).filter((dir) => dir !== client && !dir.startsWith(client + path.sep));
if (!candidates.length) {
  console.error("Build created dist/ but no dist/client/ or index.html was found. Refusing to publish an empty site; review the Vite build output and plugin configuration.");
  process.exit(1);
}
// Prefer the top-level dist/ browser output, otherwise use the first folder that
// actually contains index.html and copy its siblings (assets, etc.) as well.
const browserRoot = candidates.includes(dist) ? dist : candidates[0];
fs.mkdirSync(client, { recursive: true });
for (const entry of fs.readdirSync(browserRoot, { withFileTypes: true })) {
  if (browserRoot === dist && entry.name === "client") continue;
  fs.cpSync(path.join(browserRoot, entry.name), path.join(client, entry.name), { recursive: true, force: true });
}
console.log(`Created dist/client from browser output at ${path.relative(process.cwd(), browserRoot) || "dist"}.`);
