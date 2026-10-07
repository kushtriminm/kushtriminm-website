import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const inbox = "photos-inbox";
const [mode, target, extra] = process.argv.slice(2);

const images = fs.existsSync(inbox)
  ? fs
      .readdirSync(inbox)
      .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  : [];

function stop(message) {
  console.log(message);
  process.exit(1);
}

async function save(input, output, width) {
  fs.mkdirSync(path.dirname(output), { recursive: true });
  for (const quality of [80, 72, 64, 56, 48]) {
    await sharp(input)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality, mozjpeg: true })
      .toFile(output);
    if (fs.statSync(output).size <= 300 * 1024) break;
  }
  console.log(`${output.replaceAll("\\", "/")}: ${Math.round(fs.statSync(output).size / 1024)} KB`);
}

function archive(file) {
  fs.mkdirSync(path.join(inbox, "done"), { recursive: true });
  fs.renameSync(path.join(inbox, file), path.join(inbox, "done", file));
}

if (images.length === 0) stop("No photos found in the folder: photos-inbox");

if (mode === "hotel" && target) {
  const sources =
    (fs.existsSync("src/data/hotels.ts") ? fs.readFileSync("src/data/hotels.ts", "utf8") : "") +
    (fs.existsSync("src/data/hotels-abroad.ts") ? fs.readFileSync("src/data/hotels-abroad.ts", "utf8") : "");
  if (!sources.includes(`"${target}"`)) stop(`The hotel "${target}" was not found. Check the slug.`);

  const dir = path.join("public", "images", "hotels", target);
  const taken = fs.existsSync(dir)
    ? fs.readdirSync(dir).map((f) => parseInt(f)).filter((n) => !Number.isNaN(n))
    : [];
  let n = Math.max(0, ...taken);

  for (const file of images) {
    n++;
    await save(path.join(inbox, file), path.join(dir, `${n}.jpg`), 1600);
    archive(file);
  }
} else if (mode === "file" && target) {
  if (!/\.jpg$/i.test(target)) stop("The target must end in .jpg");
  if (images.length !== 1) stop("Put exactly ONE photo in photos-inbox for this mode.");

  const out = path.join("public", target);
  if (fs.existsSync(out) && extra !== "replace") {
    stop(`${out} already exists. Add the word replace at the end if you want to replace it.`);
  }
  const width = /hero|banner/i.test(target) ? 1920 : 1600;
  await save(path.join(inbox, images[0]), out, width);
  archive(images[0]);
} else {
  stop("Use:  node scripts\\photo.mjs hotel <slug>   or   node scripts\\photo.mjs file images/...jpg");
}