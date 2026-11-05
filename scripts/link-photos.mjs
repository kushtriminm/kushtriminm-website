import fs from "node:fs";
import path from "node:path";

// For every photo in public/images/offers and public/images/bus-tours,
// add an image line to the matching offer if it does not have one yet.
const jobs = [
  { dir: "public/images/offers", url: "/images/offers", file: "src/data/offers.ts" },
  { dir: "public/images/bus-tours", url: "/images/bus-tours", file: "src/data/bus-tours.ts" },
];

for (const job of jobs) {
  if (!fs.existsSync(job.dir) || !fs.existsSync(job.file)) continue;
  let text = fs.readFileSync(job.file, "utf8");
  let changed = 0;

  for (const photo of fs.readdirSync(job.dir)) {
    if (!/\.jpg$/i.test(photo)) continue;
    const name = path.parse(photo).name;
    const line = `image: "${job.url}/${photo}"`;
    const slug = `slug: "${name}",`;

    if (text.includes(line)) continue; // already linked
    if (!text.includes(slug)) {
      console.log(`No offer called "${name}" in ${job.file} (photo ${photo} not linked)`);
      continue;
    }
    text = text.replace(slug, `${slug} ${line},`);
    changed++;
    console.log(`Linked ${photo} -> ${name}`);
  }

  if (changed > 0) fs.writeFileSync(job.file, text);
}
console.log("Done.");