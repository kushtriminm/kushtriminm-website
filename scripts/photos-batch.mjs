import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const inbox = "photos-inbox";

// File name in the inbox (without .jpg) -> where it goes inside "public".
// Any other name that matches an offer (e.g. malta.jpg) goes to images/offers/<name>.jpg
const special = {
  pogradec: "images/bus-tours/pogradec-2-days.jpg",
  "pogradec-2-days": "images/bus-tours/pogradec-2-days.jpg",
  stambolli: "images/bus-tours/stambolli.jpg",
  "budapest-vienna": "images/bus-tours/budapest-vienna.jpg",
};

const offerNames = [
  "paris-disneyland", "dubai-abu-dhabi", "catania-palermo", "malta",
  "napoli-sorrento-salerno", "barcelona-madrid", "puglia", "kalabria",
  "valencia-sevilje-madrid", "colmar-strasburg", "amsterdam-bruksel",
  "rome", "barcelona", "milano-liqenet",
];

const files = fs.existsSync(inbox)
  ? fs.readdirSync(inbox, { withFileTypes: true })
      .filter((e) => e.isFile() && /\.(jpe?g|png|webp|avif)$/i.test(e.name))
      .map((e) => e.name)
  : [];

if (files.length === 0) {
  console.log("No photos found in the folder: photos-inbox");
  process.exit(1);
}

const qualities = [90, 86, 82, 78, 74, 70];

for (const file of files) {
  const name = path.parse(file).name.toLowerCase();
  const target = special[name] ?? (offerNames.includes(name) ? `images/offers/${name}.jpg` : null);

  if (!target) {
    console.log(`SKIPPED ${file}: no destination for the name "${name}"`);
    continue;
  }

  const input = path.join(inbox, file);
  const output = path.join("public", target);
  fs.mkdirSync(path.dirname(output), { recursive: true });

  const meta = await sharp(input).rotate().metadata();
  const w = meta.autoOrient?.width ?? meta.width;
  const h = meta.autoOrient?.height ?? meta.height;

  for (const quality of qualities) {
    await sharp(input)
      .rotate()
      .resize({ width: 2000, withoutEnlargement: true })
      .jpeg({ quality, mozjpeg: true })
      .toFile(output);
    if (fs.statSync(output).size <= 700 * 1024) break;
  }

  const kb = Math.round(fs.statSync(output).size / 1024);
  const warn = w < 1500 ? "   <-- small photo, it will look soft" : "";
  console.log(`${target}: ${kb} KB (original ${w}x${h} px)${warn}`);

  fs.mkdirSync(path.join(inbox, "done"), { recursive: true });
  fs.renameSync(input, path.join(inbox, "done", `${Date.now()}-${file}`));
}