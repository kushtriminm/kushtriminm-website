import fs from "node:fs";
import path from "node:path";

const publicDir = "public";

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    return e.isDirectory() ? walk(full) : [full];
  });
}

// Windows ignores capital letters, Netlify does not. This checks the exact spelling.
function check(rel) {
  let dir = publicDir;
  for (const part of rel.split("/").filter(Boolean)) {
    let names = [];
    try {
      names = fs.readdirSync(dir);
    } catch {
      return "missing";
    }
    if (names.includes(part)) {
      dir = path.join(dir, part);
    } else if (names.some((n) => n.toLowerCase() === part.toLowerCase())) {
      return "case";
    } else {
      return "missing";
    }
  }
  return "ok";
}

const refs = new Map();
function add(p, file) {
  if (!refs.has(p)) refs.set(p, new Set());
  refs.get(p).add(file.replaceAll("\\", "/"));
}

const folders = { a: "antalya", e: "egypt", g: "greece" };
const code = walk("src").filter((f) => /\.(ts|tsx)$/.test(f));

for (const file of code) {
  const text = fs.readFileSync(file, "utf8");

  for (const m of text.matchAll(/["'`](\/images\/[^"'`$]+?\.(?:jpe?g|png|webp|avif))["'`]/gi)) {
    add(m[1], file);
  }
  if (file.includes("destination-pages")) {
    for (const m of text.matchAll(/\b([aeg])\("([^"]+\.(?:jpe?g|png|webp))"\)/g)) {
      add(`/images/destinations/${folders[m[1]]}/${m[2]}`, file);
    }
  }
  if (file.includes("hotels-abroad")) {
    for (const m of text.matchAll(/\b([AE])\s*\+\s*"([^"]+\.(?:jpe?g|png|webp))"/g)) {
      add(`/images/destinations/${m[1] === "A" ? "antalya" : "egypt"}/${m[2]}`, file);
    }
  }
}

console.log("\n=== 1. PHOTOS THE CODE USES BUT THAT ARE MISSING ===");
let problems = 0;
for (const [p, files] of refs) {
  const result = check(p);
  if (result === "missing") {
    problems++;
    console.log(`MISSING   ${p}   (used in: ${[...files].join(", ")})`);
  }
  if (result === "case") {
    problems++;
    console.log(`CAPITALS  ${p}   (name differs in upper/lower case, will break on Netlify)`);
  }
}
if (problems === 0) console.log("None.");

console.log("\n=== 2. HOTELS WITHOUT THEIR OWN PHOTO FOLDER ===");
const slugs = [];
try {
  const t = fs.readFileSync("src/data/hotels.ts", "utf8");
  for (const m of t.matchAll(/slug:\s*"([^"]+)"/g)) slugs.push(m[1]);
} catch {}
try {
  const t = fs.readFileSync("src/data/hotels-abroad.ts", "utf8");
  for (const m of t.matchAll(/resort\(\s*"[A-Za-z]+",\s*"([^"]+)"/g)) slugs.push(m[1]);
} catch {}

let none = 0;
for (const slug of slugs) {
  const dir = path.join(publicDir, "images", "hotels", slug);
  const count = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f)).length
    : 0;
  if (count === 0) {
    none++;
    console.log(`0 photos  ${slug}`);
  }
}
console.log(`${none} of ${slugs.length} hotels have no folder of their own.`);

console.log("\n=== 3. PHOTOS OVER 400 KB ===");
let big = 0;
for (const f of walk(path.join(publicDir, "images"))) {
  if (!/\.(jpe?g|png)$/i.test(f)) continue;
  const kb = Math.round(fs.statSync(f).size / 1024);
  if (kb > 400) {
    big++;
    console.log(`${kb} KB  ${f.replaceAll("\\", "/")}`);
  }
}
if (big === 0) console.log("None.");