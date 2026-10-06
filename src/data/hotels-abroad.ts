import type { AnyHotel, Country } from "./all-hotels";

const A = "/images/destinations/antalya/";
const E = "/images/destinations/egypt/";

// To add a hotel abroad: add one resort(...) line below.
// Photos: put them in public/images/hotels/<slug>/ as 1.jpg, 2.jpg ... and they show by themselves.
// Stars and categories were copied from your old pages: please check them.
function resort(
  country: Country,
  slug: string,
  name: string,
  destination: string,
  location: string,
  image: string,
  description: string,
  facilities: string[]
): AnyHotel {
  return {
    country,
    slug,
    name,
    region: `${destination}, ${country}`,
    destination,
    location,
    category: "Resort",
    stars: 5,
    prices: [],
    image,
    description,
    facilities,
    gallery: [],
  };
}

export const abroadHotels: AnyHotel[] = [
  resort("Turkey", "rixos-premium-belek", "Rixos Premium Belek", "Belek", "Belek, Antalya", A + "Rixos.jpg", "Resort luksoz buzë detit me restorante të shkëlqyera, spa dhe përvoja premium për familje.", ["Plazh", "Spa", "Klub fëmijësh"]),
  resort("Turkey", "maxx-royal-belek", "Maxx Royal Belek", "Belek", "Belek, Antalya", A + "maxxroyal.jpg", "Resort ultra luksoz me vila private, ushqim gurmand dhe shërbim personal të veçantë.", ["Golf", "Luksoz", "Aqua park"]),
  resort("Turkey", "regnum-carya", "Regnum Carya", "Belek", "Belek, Antalya", A + "regnum.jpg", "Resort elegant buzë detit me golf, suita luksoze dhe ultra all inclusive.", ["Golf", "Plazh privat", "Familje"]),
  resort("Turkey", "selectum-noa-belek", "Selectum Noa Belek", "Belek", "Belek, Antalya", A + "selectumnoa.jpg", "Resort premium që bashkon dizajnin modern, relaksimin buzë detit dhe mikpritjen e shkëlqyer.", ["Luksoz", "Plazh", "Relaksim"]),
  resort("Turkey", "bosphorus-sorgun", "Bosphorus Sorgun", "Side", "Side, Antalya", A + "bosphorussorgun.jpg", "Resort modern buzë detit me dhoma elegante, ambient të bukur dhe argëtim.", ["Plazh", "Spa", "Familje"]),
  resort("Turkey", "kremlin-palace", "Kremlin Palace", "Lara", "Lara, Antalya", A + "kremlin.jpg", "Resort i njohur luksoz me arkitekturë të frymëzuar nga ajo ruse, pishina mbresëlënëse dhe argëtim.", ["Luksoz", "Pishina", "Argëtim"]),
  resort("Turkey", "ng-phaselis-bay", "NG Phaselis Bay", "Kemer", "Kemer, Antalya", A + "ngphaselis.jpg", "Resort ekskluziv i rrethuar nga malet, natyra dhe uji kristal i Mesdheut.", ["Natyrë", "Spa", "Luksoz"]),
  resort("Turkey", "swandor-kemer", "Swandor Kemer", "Kemer", "Kemer, Antalya", A + "swandor.jpg", "Resort për familje i njohur për argëtimin, kopshtet dhe plazhin privat.", ["Familje", "Argëtim", "Plazh"]),
  resort("Turkey", "rixos-sungate", "Rixos Sungate", "Kemer", "Kemer, Antalya", A + "rixossungate.jpg", "Resort i madh luksoz me plazhe private, pajisje të nivelit botëror dhe përvoja të paharrueshme.", ["Plazh", "Spa", "Luksoz"]),
  resort("Turkey", "rubi-platinum", "Rubi Platinum", "Alanya", "Alanya, Antalya", A + "rubiplatinum.jpg", "Resort elegant buzë detit me akomodim të bukur, ushqim premium dhe pushime relaksuese.", ["Plazh", "Të rritur", "Relaksim"]),
  resort("Egypt", "serry-beach-resort", "Serry Beach Resort", "Hurghada", "Hurghada, Egypt", E + "serry.jpg", "Resort modern buzë detit me dhoma elegante, pishina të bukura dhe atmosferë relaksuese të Detit të Kuq.", ["Plazh", "Spa", "Luksoz"]),
  resort("Egypt", "desert-rose-resort", "Desert Rose Resort", "Hurghada", "Hurghada, Egypt", E + "desertrose.jpg", "Resort i njohur all inclusive me lagunë private, kopshte dhe pajisje të shkëlqyera për familje.", ["All inclusive", "Familje", "Lagunë"]),
  resort("Egypt", "caves-beach-resort", "Caves Beach Resort", "Hurghada", "Hurghada, Egypt", E + "caves.jpg", "Resort i veçantë për të rritur, i frymëzuar nga shpellat, me arkitekturë të rrallë buzë detit.", ["Të rritur", "Plazh", "Unik"]),
  resort("Egypt", "jaz-elite-asteria", "Jaz Elite Asteria", "Hurghada", "Hurghada, Egypt", E + "jaz.jpg", "Resort premium me dhoma elegante, ushqim të zgjedhur dhe pushime relaksuese në Detin e Kuq.", ["Premium", "Relaksim", "Plazh"]),
  resort("Egypt", "pickalbatros-citadel", "Pickalbatros Citadel", "Hurghada", "Hurghada, Egypt", E + "citadel.jpg", "Resort ikonik luksoz prej guri me pamje mahnitëse nga Deti i Kuq.", ["Pamje nga deti", "Luksoz", "Familje"]),
  resort("Egypt", "pickalbatros-jungle-aqua-park", "Pickalbatros Jungle Aqua Park Resort", "Hurghada", "Hurghada, Egypt", E + "neverland.jpg", "Resort i madh me aqua park, aktivitete dhe përvoja të paharrueshme për familje.", ["Aqua park", "Familje", "Argëtim"]),
  resort("Egypt", "rixos-premium-magawish", "Rixos Premium Magawish", "Hurghada", "Hurghada, Egypt", E + "megawish.jpg", "Resort ultra luksoz buzë detit me restorante premium, dizajn elegant dhe shërbim ekskluziv.", ["Ultra luksoz", "Plazh", "Spa"]),
  resort("Egypt", "steigenberger-aldau-beach", "Steigenberger ALDAU Beach", "Hurghada", "Hurghada, Egypt", E + "steigenberger.jpg", "Resort elegant buzë detit i njohur për golfin, wellness dhe mikpritjen e shkëlqyer.", ["Golf", "Spa", "Luksoz"]),
];