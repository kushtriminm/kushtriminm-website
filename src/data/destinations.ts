// Edit this file to change the destination cards on the homepage and the Destinations page.
// - active: false hides a card
// - season: the small label on the card
// - price: optional. Only add it when you have a confirmed, current price,
//   for example price: "nga 699€"
// - image: optional. Without it the photo spot stays blank.
// - href: optional. If missing, the card opens WhatsApp with a pre-written message.
// - moreDestinations (bottom): the countries inside the "Më shumë" pop-up.

export type Destination = {
  name: string;
  description: string;
  season: string;
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
    active: true,
    image: "/images/offers/dubai.jpg",
  },
  {
    name: "Antalya",
    description: "Charter për verën 2027. Pyet për ofertat e hershme",
    season: "Vera 2027",
    active: true,
    image: "/images/destinations/antalya/hero.jpg",
    href: "/destinations/antalya",
  },
  {
    name: "Egypt",
    description: "Charter për verën 2027. Pyet për ofertat e hershme",
    season: "Vera 2027",
    active: true,
    image: "/images/destinations/egypt/hero.jpg",
    href: "/destinations/egypt",
  },
  {
    name: "Greece",
    description: "Ishuj dhe plazhe. Pyet për verën 2027",
    season: "Vera 2027",
    active: true,
    image: "/images/destinations/greece/hero.jpg",
    href: "/destinations/greece",
  },
  {
    name: "Italy",
    description: "Romë, Milano, Venecia. Fluturim dhe hotel",
    season: "Vjeshtë & dimër",
    active: true,
    image: "/images/destinations/italy/itali.jpg",
  },
  {
    name: "Switzerland",
    description: "Alpet, liqenet dhe qytetet. Fluturim dhe hotel",
    season: "Vjeshtë & dimër",
    active: true,
    image: "/images/destinations/switzerland/switzerland.jpg",
  },
  {
    name: "Germany",
    description: "Qytete të mëdha dhe tregje krishtlindjesh. Fluturim dhe hotel",
    season: "Vjeshtë & dimër",
    active: true,
    image: "/images/destinations/germany/germany.jpg",
  },
  {
    name: "Albania",
    description: "Shfleto hotelet tona në bregdetin shqiptar dhe pyet për çmimet",
    season: "Vera 2027",
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