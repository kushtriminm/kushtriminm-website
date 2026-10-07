import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const root = "public/images";
const out = "compressed";
const limit = 400 * 1024; // only files bigger than 400 KB

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

for (const file of walk(root)) {
  if (!/\.jpe?g$/i.test(file)) continue;
  const before = fs.statSync(file).size;
  if (before < limit) continue;

  const dest = path.join(out, path.relative(root, file));
  fs.mkdirSync(path.dirname(dest), { recursive: true });

  await sharp(file)
    .rotate()
    .resize({ width: 1800, withoutEnlargement: true })
    .jpeg({ quality: 72, mozjpeg: true })
    .toFile(dest);

  const after = fs.statSync(dest).size;
  console.log(
    `${path.relative(root, file)}: ${Math.round(before / 1024)} KB -> ${Math.round(after / 1024)} KB`
  );
}
console.log("Done. Check the folder: compressed");