// Edit this file to change the destination cards on the homepage and the Destinations page.
// - active: false hides a card
// - name: the English name (also the Albanian one if "nameSq" is missing)
// - nameSq: the Albanian name
// - description, season: Albanian text. The English text goes in "en".
// - price: optional. Only add it when you have a confirmed, current price,
//   for example price: "nga 699€"
// - image: optional. Without it the photo spot stays blank.
// - href: optional. If missing, the card opens WhatsApp with a pre-written message.
// - moreDestinations (bottom): the countries inside the "More" pop-up.

import type { Lang } from "@/components/LanguageProvider";

export type Destination = {
  name: string;
  nameSq?: string;
  description: string;
  season: string;
  en: { description: string; season: string };
  active: boolean;
  image?: string;
  price?: string;
  href?: string;
};

export const destinations: Destination[] = [
  {
    name: "Dubai",
    description: "Fluturime dhe hotele, gjatë gjithë vitit",
    season: "Gjithë vitin",
    en: { description: "Flights and hotels, all year round", season: "All year" },
    active: true,
    image: "/images/offers/dubai.jpg",
  },
  {
    name: "Antalya",
    description: "Charter për verën 2027. Pyet për ofertat e hershme",
    season: "Vera 2027",
    en: { description: "Charter flights for summer 2027. Ask about early offers", season: "Summer 2027" },
    active: true,
    image: "/images/destinations/antalya/hero.jpg",
    href: "/destinations/antalya",
  },
  {
    name: "Egypt",
    nameSq: "Egjipt",
    description: "Charter për verën 2027. Pyet për ofertat e hershme",
    season: "Vera 2027",
    en: { description: "Charter flights for summer 2027. Ask about early offers", season: "Summer 2027" },
    active: true,
    image: "/images/destinations/egypt/hero.jpg",
    href: "/destinations/egypt",
  },
  {
    name: "Greece",
    nameSq: "Greqi",
    description: "Ishuj dhe plazhe. Pyet për verën 2027",
    season: "Vera 2027",
    en: { description: "Islands and beaches. Ask about summer 2027", season: "Summer 2027" },
    active: true,
    image: "/images/destinations/greece/hero.jpg",
    href: "/destinations/greece",
  },
  {
    name: "Italy",
    nameSq: "Itali",
    description: "Romë, Milano, Venecia. Fluturim dhe hotel",
    season: "Vjeshtë & dimër",
    en: { description: "Rome, Milan, Venice. Flight and hotel", season: "Autumn & winter" },
    active: true,
    image: "/images/destinations/italy/itali.jpg",
  },
  {
    name: "Switzerland",
    nameSq: "Zvicër",
    description: "Alpet, liqenet dhe qytetet. Fluturim dhe hotel",
    season: "Vjeshtë & dimër",
    en: { description: "The Alps, lakes and cities. Flight and hotel", season: "Autumn & winter" },
    active: true,
    image: "/images/destinations/switzerland/switzerland.jpg",
  },
  {
    name: "Germany",
    nameSq: "Gjermani",
    description: "Qytete të mëdha dhe tregje krishtlindjesh. Fluturim dhe hotel",
    season: "Vjeshtë & dimër",
    en: { description: "Big cities and Christmas markets. Flight and hotel", season: "Autumn & winter" },
    active: true,
    image: "/images/destinations/germany/germany.jpg",
  },
  {
    name: "Albania",
    nameSq: "Shqipëri",
    description: "Shfleto hotelet tona në bregdetin shqiptar dhe pyet për çmimet",
    season: "Vera 2027",
    en: { description: "Browse our hotels on the Albanian coast and ask about prices", season: "Summer 2027" },
    active: true,
    image: "/images/destinations/albania/albania.jpg",
    href: "/hotels",
  },
];

export const moreDestinations: string[] = [
  "Spain",
  "Poland",
  "Czechia",
  "Austria",
  "Hungary",
  "Malta",
];

// Albanian names for the list above. A country that is missing here keeps its English name.
export const moreDestinationNames: Record<string, string> = {
  Spain: "Spanjë",
  Poland: "Poloni",
  Czechia: "Çeki",
  Austria: "Austri",
  Hungary: "Hungari",
  Malta: "Maltë",
};

export function localized(d: Destination, lang: Lang) {
  return lang === "en"
    ? { name: d.name, description: d.en.description, season: d.en.season }
    : { name: d.nameSq ?? d.name, description: d.description, season: d.season };
}

export function moreName(name: string, lang: Lang) {
  return lang === "sq" ? (moreDestinationNames[name] ?? name) : name;
}