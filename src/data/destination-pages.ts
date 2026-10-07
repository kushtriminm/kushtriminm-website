import type { Country } from "./all-hotels";

export type DestinationPage = {
  country: Country;
  eyebrow: string;
  title: string;
  tagline: string;
  season: string;
  seasonNote: string;
  heroImage: string;
  aboutImage?: string;
  overviewTitle: string;
  overview: string;
  highlights: string[];
  areasTitle?: string;
  areas?: { name: string; text: string; image: string }[];
  experiences?: { title: string; text: string; image: string }[];
  faq: { q: string; a: string }[];
};

const folder = (name: string) => (file: string) => `/images/destinations/${name}/${file}`;
const a = folder("antalya");
const e = folder("egypt");
const g = folder("greece");

const charterNote =
  "Charter me fluturim të drejtpërdrejtë nga maji 2027. Për data të tjera pyet për bileta individuale dhe ofertë.";

// Edit the words here. Hotels come from hotels-abroad.ts (and the hotel list), not from here.
export const destinationPages: Record<"antalya" | "egypt" | "greece", DestinationPage> = {
  antalya: {
    country: "Turkey",
    eyebrow: "Turkey",
    title: "Antalya",
    tagline: "Resorte luksoze, plazhe me ujë kristal dhe pushime all inclusive.",
    season: "Vera 2027",
    seasonNote: charterNote,
    heroImage: a("hero.jpg"),
    aboutImage: a("about.jpg"),
    overviewTitle: "Ku nisin ëndrrat e Mesdheut",
    overview:
      "Histori e lashtë dhe bregdet i pafund. Zbuloje Antalyan me hotele luksoze, plazhe dhe ushqim all inclusive.",
    highlights: ["Plazhe private", "Hotele luksoze", "All inclusive", "Diell mesdhetar"],
    areasTitle: "Zgjidh zonën tënde",
    areas: [
      { name: "Lara", text: "Resorte luksoze buzë detit dhe pushime të paharrueshme për familje.", image: a("lara.jpg") },
      { name: "Belek", text: "Resorte ultra luksoze, golf dhe përvoja premium.", image: a("belek.jpg") },
      { name: "Side", text: "Histori e lashtë e bashkuar me plazhe të bukura.", image: a("side.jpg") },
      { name: "Kemer", text: "Male, natyrë dhe bregdet me ujë kristal.", image: a("kemer.jpg") },
    ],
    experiences: [
      { title: "Shëtitje me barkë", text: "Zbulo gjire të fshehura dhe ujë turkez.", image: a("boat.jpg") },
      { title: "Aqua parqe", text: "Argëtim për familjen me rrëshqitëse dhe aktivitete.", image: a("waterpark.jpg") },
      { title: "Histori e lashtë", text: "Qytete dhe rrënoja me mijëra vjet histori.", image: a("history.jpg") },
      { title: "Safari", text: "Aventurë nëpër male, fshatra dhe natyrën e Antalyas.", image: a("safari.jpg") },
    ],
    faq: [
      { q: "Kur është koha më e mirë për Antalyan?", a: "Maji deri në tetor është sezoni më i kërkuar, me kohë perfekte për plazh." },
      { q: "Cila zonë është më e mira për familje?", a: "Lara dhe Belek janë ideale për familje për shkak të resorteve të tyre." },
      { q: "A janë hotelet në Antalya all inclusive?", a: "Shumë resorte ofrojnë all inclusive dhe ultra all inclusive." },
    ],
  },
  egypt: {
    country: "Egypt",
    eyebrow: "Egypt",
    title: "Hurghada",
    tagline: "Resorte luksoze, ujë kristal dhe aventura në Detin e Kuq.",
    season: "Vera 2027",
    seasonNote: charterNote,
    heroImage: e("hero.jpg"),
    aboutImage: e("about.jpg"),
    overviewTitle: "Ku takohet shkretëtira me Detin e Kuq",
    overview:
      "Bregdeti mahnitës i Egjiptit me resorte all inclusive, ujë turkez, aventura në shkretëtirë dhe kujtime të paharrueshme.",
    highlights: ["Plazhet e Detit të Kuq", "Resorte luksoze", "Zhytje dhe snorkeling", "Aventura në shkretëtirë"],
    experiences: [
      { title: "Zhytje në Detin e Kuq", text: "Zbulo koralet, jetën detare plot ngjyra dhe ujin kristal.", image: e("diving.jpg") },
      { title: "Safari në shkretëtirë", text: "Peizazhet e shkretëtirës, kultura beduine dhe perëndime të paharrueshme.", image: e("safari.jpg") },
      { title: "Shëtitje me barkë", text: "Ishuj, snorkeling dhe udhëtime me barkë në Detin e Kuq.", image: e("boat.jpg") },
      { title: "Delfinët", text: "Noto pranë delfinëve, një nga përvojat më magjike të Detit të Kuq.", image: e("dolphins.jpg") },
    ],
    faq: [
      { q: "Kur është koha më e mirë për Hurghadën?", a: "Nga tetori deri në maj ka kohë të shkëlqyer, me temperatura të ngrohta dhe ditë të rehatshme në plazh." },
      { q: "A janë hotelet në Hurghada all inclusive?", a: "Po, shumë resorte ofrojnë all inclusive dhe ultra all inclusive." },
      { q: "A është Hurghada e mirë për familje?", a: "Po. Ka resorte për familje, aqua parqe, plazhe dhe aktivitete për çdo moshë." },
    ],
  },
  greece: {
    country: "Greece",
    eyebrow: "Greece",
    title: "Greece",
    tagline: "Ishuj të bukur, resorte luksoze dhe përvoja mesdhetare të paharrueshme.",
    season: "Vera 2027",
    seasonNote: charterNote,
    heroImage: g("hero.jpg"),
    overviewTitle: "Pushimi yt në Greqi, pa stres",
    overview:
      "Nga ishujt ikonikë te bregdeti i Halkidikit: organizojmë fluturime, hotele dhe asistencë për pushimin tënd në Greqi.",
    highlights: ["Ishuj ikonikë", "Plazhe kristal", "Resorte për familje", "Fluturim + hotel"],
    areasTitle: "Zgjidh destinacionin",
    areas: [
      { name: "Santorini", text: "Fshatra të bardha, kupola blu dhe perëndime të paharrueshme në Egje.", image: g("santorini.jpg") },
      { name: "Mykonos", text: "Plazhe luksoze, jetë nate dhe përvoja ekskluzive.", image: g("mykonos.jpg") },
      { name: "Halkidiki", text: "Plazhe kristal dhe resorte për familje.", image: g("halkidiki.jpg") },
      { name: "Crete", text: "Histori e lashtë, plazhe të bukura dhe kulturë autentike greke.", image: g("crete.jpg") },
    ],
    faq: [
      { q: "Cilat janë vendet më të bukura për të vizituar në Greqi?", a: "Santorini, Mykonos, Halkidiki dhe Crete janë ndër destinacionet më të kërkuara për plazhe, hotele luksoze dhe përvoja të paharrueshme." },
      { q: "A është Greqia e përshtatshme për familje?", a: "Po. Greqia ka shumë resorte për familje, plazhe të qeta dhe aktivitete për fëmijë dhe të rritur." },
      { q: "A mund të organizoni fluturime dhe hotele?", a: "Po. Organizojmë paketa të plota me fluturime, akomodim dhe asistencë." },
      { q: "Kur është koha më e mirë për Greqinë?", a: "Pranvera, fillimi i verës dhe vjeshta ofrojnë kohë të shkëlqyer me më pak njerëz." },
    ],
  },
};