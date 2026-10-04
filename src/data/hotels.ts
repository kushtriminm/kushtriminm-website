export type HotelPrice = {
  period: string;
  price: string;
};

export type Hotel = {
  slug: string;
  name: string;
  region: string;
  destination: string;
  location: string;
  category: string;
  stars?: number;
  prices: HotelPrice[];
  price?: number;
  pricePeriod?: string;
  priceNote?: string;
  image: string;
  description: string;
  facilities: string[];
  gallery: string[];
};

export const hotels: Hotel[] = [

  // =========================================================
  // DURRËS / GOLEM / MALI I ROBIT
  // =========================================================

  {
    slug: "royal-g-max-hotel-spa",
    name: "Royal G Max Hotel & Spa",
    region: "Durrës / Golem / Mali i Robit",
    destination: "Golem",
    location: "Golem, Durrës",
    category: "Hotel & Spa",
    stars: 5,
    prices: [],
    image: "",
    description:
      "A modern hotel in the Golem area, ideal for relaxing holidays by the Albanian coast.",
    facilities: [
      "Hotel & Spa",
      "Restaurant",
      "Swimming Pool",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "aqua-fafa-blue",
    name: "Aqua Fafa Blue",
    region: "Durrës / Golem / Mali i Robit",
    destination: "Golem",
    location: "Golem, Durrës",
    category: "Beach Resort",
    stars: 5,
    prices: [],
    image: "",
    description:
      "A beautiful resort option in Golem, suitable for families and couples looking for a comfortable seaside holiday.",
    facilities: [
      "Beach",
      "Swimming Pool",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "durres-bay-hotel",
    name: "Durrës Bay Hotel",
    region: "Durrës / Golem / Mali i Robit",
    destination: "Durrës",
    location: "Durrës",
    category: "Beach Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A seaside hotel in Durrës offering a convenient location for guests looking to enjoy the beach and the city.",
    facilities: [
      "Beach",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "delight-hotel",
    name: "Delight Hotel & Spa",
    region: "Durrës / Golem / Mali i Robit",
    destination: "Mali i Robit",
    location: "Mali i Robit, Golem",
    category: "Hotel & Spa",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A comfortable hotel in Mali i Robit with swimming pool, jacuzzi, fitness facilities, restaurant and family-friendly spaces.",
    facilities: [
      "Swimming Pool",
      "Jacuzzi",
      "Fitness",
      "Restaurant",
      "Pool Bar",
      "Children's Area",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "vm-resort",
    name: "VM Resort",
    region: "Durrës / Golem / Mali i Robit",
    destination: "Golem",
    location: "Golem, Durrës",
    category: "Resort",
    stars: 5,
    prices: [],
    image: "",
    description:
      "A resort option in Golem for guests looking for a relaxing beach holiday with comfortable accommodation.",
    facilities: [
      "Swimming Pool",
      "Restaurant",
      "Beach",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "pinea-hotel",
    name: "Pinea Hotel Resort & Spa",
    region: "Durrës / Golem / Mali i Robit",
    destination: "Mali i Robit",
    location: "Mali i Robit, Golem",
    category: "Resort & Spa",
    stars: 5,
    prices: [],
    image: "",
    description:
      "A resort located close to the beach in Mali i Robit, offering private beach access, swimming pool, SPA, sauna, gym and family facilities.",
    facilities: [
      "Private Beach",
      "Swimming Pool",
      "SPA",
      "Sauna",
      "Gym",
      "Kids Club",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "bonita-luxury",
    name: "Bonita Luxury",
    region: "Durrës / Golem / Mali i Robit",
    destination: "Golem",
    location: "Golem, Durrës",
    category: "Luxury Hotel",
    stars: 5,
    prices: [],
    image: "",
    description:
      "A modern hotel in Golem with an Aqua Park, suitable for families and guests looking for entertainment and a beach holiday.",
    facilities: [
      "Aqua Park",
      "Swimming Pool",
      "Beach",
      "Restaurant",
      "SPA access",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "elite-bay",
    name: "Elite Bay",
    region: "Durrës / Golem / Mali i Robit",
    destination: "Golem",
    location: "Golem, Durrës",
    category: "Beach Hotel",
    stars: 5,
    prices: [],
    image: "",
    description:
      "A seaside accommodation option in Golem, suitable for relaxing holidays on the Albanian coast.",
    facilities: [
      "Beach",
      "Swimming Pool",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "fllad",
    name: "Fllad",
    region: "Durrës / Golem / Mali i Robit",
    destination: "Golem",
    location: "Golem, Durrës",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A comfortable accommodation option in the Golem area for guests looking for a relaxing coastal holiday.",
    facilities: [
      "Beach",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "bonita-classic",
    name: "Bonita Classic Hotel & Spa",
    region: "Durrës / Golem / Mali i Robit",
    destination: "Golem",
    location: "Golem, Durrës",
    category: "Hotel & Spa",
    stars: 5,
    prices: [],
    image: "",
    description:
      "A beachfront hotel in Golem with swimming pools for adults and children, SPA facilities and direct beach access.",
    facilities: [
      "Beachfront",
      "2 Adult Pools",
      "2 Children's Pools",
      "SPA",
      "Restaurant",
      "Parking",
      "Wi-Fi",
    ],
    gallery: [],
  },

  // =========================================================
  // SHËNGJIN
  // =========================================================

  {
    slug: "rafaelo-executive-spa",
    name: "Rafaelo Executive Spa",
    region: "Shëngjin",
    destination: "Shëngjin",
    location: "Shëngjin",
    category: "Hotel & Spa",
    stars: 5,
    prices: [],
    image: "",
    description:
      "A premium Rafaelo property in Shëngjin offering a comfortable seaside holiday experience.",
    facilities: [
      "SPA",
      "Swimming Pool",
      "Restaurant",
      "Beach",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "miramar-hotel",
    name: "MiraMar Hotel",
    region: "Shëngjin",
    destination: "Shëngjin",
    location: "Shëngjin",
    category: "Beach Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A seaside hotel in Shëngjin, ideal for guests looking for a relaxing beach holiday.",
    facilities: [
      "Beach",
      "Restaurant",
      "Swimming Pool",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "triumf",
    name: "Triumf",
    region: "Shëngjin",
    destination: "Shëngjin",
    location: "Shëngjin",
    category: "Beach Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A comfortable hotel option in Shëngjin close to the seaside.",
    facilities: [
      "Beach",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "rafaelo-deluxe-and-spa",
    name: "Rafaelo Deluxe & Spa",
    region: "Shëngjin",
    destination: "Shëngjin",
    location: "Shëngjin",
    category: "Hotel & Spa",
    stars: 5,
    prices: [],
    image: "",
    description:
      "A premium Rafaelo hotel offering modern accommodation and spa facilities near the coast.",
    facilities: [
      "SPA",
      "Swimming Pool",
      "Restaurant",
      "Beach",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "rafaelo-lake",
    name: "Rafaelo Lake",
    region: "Shëngjin",
    destination: "Shëngjin",
    location: "Shëngjin",
    category: "Resort",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A Rafaelo accommodation option offering a relaxing stay in the Shëngjin area.",
    facilities: [
      "Swimming Pool",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "rafaelo-comfort",
    name: "Rafaelo Comfort",
    region: "Shëngjin",
    destination: "Shëngjin",
    location: "Shëngjin",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A comfortable Rafaelo hotel option in Shëngjin.",
    facilities: [
      "Restaurant",
      "Beach",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "froj-d-2",
    name: "Frojd 2",
    region: "Shëngjin",
    destination: "Shëngjin",
    location: "Shëngjin",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A hotel option in Shëngjin for a comfortable seaside holiday.",
    facilities: [
      "Beach",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "twin-towers",
    name: "Twin Towers",
    region: "Shëngjin",
    destination: "Shëngjin",
    location: "Shëngjin",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A seaside accommodation option in Shëngjin.",
    facilities: [
      "Beach",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "family-rafaelo",
    name: "Family Rafaelo",
    region: "Shëngjin",
    destination: "Shëngjin",
    location: "Shëngjin",
    category: "Family Hotel",
    stars: 3,
    prices: [],
    image: "",
    description:
      "A family-friendly Rafaelo accommodation option in Shëngjin.",
    facilities: [
      "Family Rooms",
      "Beach",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "domus-hotel",
    name: "Domus Hotel",
    region: "Shëngjin",
    destination: "Shëngjin",
    location: "Shëngjin",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A comfortable hotel in the Shëngjin area.",
    facilities: [
      "Beach",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "tanushaj",
    name: "Tanushaj",
    region: "Shëngjin",
    destination: "Shëngjin",
    location: "Shëngjin",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A comfortable accommodation option in Shëngjin.",
    facilities: [
      "Beach",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "tanushaj-2",
    name: "Tanushaj 2",
    region: "Shëngjin",
    destination: "Shëngjin",
    location: "Shëngjin",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A comfortable accommodation option in Shëngjin.",
    facilities: [
      "Beach",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "wilson",
    name: "Wilson",
    region: "Shëngjin",
    destination: "Shëngjin",
    location: "Shëngjin",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A hotel option close to the beach in Shëngjin.",
    facilities: [
      "Beach",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "fjord-1",
    name: "Fjord 1",
    region: "Shëngjin",
    destination: "Shëngjin",
    location: "Shëngjin",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A seaside hotel option in Shëngjin.",
    facilities: [
      "Beach",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  // =========================================================
  // SARANDË
  // =========================================================

  {
    slug: "apollon-hotel",
    name: "Apollon Hotel",
    region: "Sarandë",
    destination: "Sarandë",
    location: "Sarandë",
    category: "Beach Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A seaside hotel in Sarandë, suitable for enjoying the Albanian Riviera.",
    facilities: [
      "Beach",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "agimi-s",
    name: "Agimi & S",
    region: "Sarandë",
    destination: "Sarandë",
    location: "Sarandë",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A comfortable accommodation option in Sarandë.",
    facilities: [
      "Swimming Pool",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "saranda-palace",
    name: "Saranda Palace",
    region: "Sarandë",
    destination: "Sarandë",
    location: "Sarandë",
    category: "Beach Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A popular seaside accommodation option in Sarandë.",
    facilities: [
      "Beach",
      "Swimming Pool",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "grand-sarande",
    name: "Grand Sarande",
    region: "Sarandë",
    destination: "Sarandë",
    location: "Sarandë",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A comfortable hotel in Sarandë for a relaxing Riviera holiday.",
    facilities: [
      "Swimming Pool",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "aulona",
    name: "Aulona",
    region: "Sarandë",
    destination: "Sarandë",
    location: "Sarandë",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A hotel option in Sarandë close to the attractions and beaches of the Riviera.",
    facilities: [
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "panorama-sarande",
    name: "Panorama",
    region: "Sarandë",
    destination: "Sarandë",
    location: "Sarandë",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A hotel option in Sarandë offering a comfortable base for exploring the Riviera.",
    facilities: [
      "Swimming Pool",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "san-angelo-luxury-resort",
    name: "San Angelo Luxury Resort",
    region: "Sarandë",
    destination: "Sarandë",
    location: "Sarandë",
    category: "Luxury Resort",
    stars: 5,
    prices: [],
    image: "",
    description:
      "A luxury resort option on the Albanian Riviera, ideal for guests looking for a premium holiday experience.",
    facilities: [
      "Luxury Resort",
      "Swimming Pool",
      "Restaurant",
      "Beach",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "oasis-sarande",
    name: "Oasis",
    region: "Sarandë",
    destination: "Sarandë",
    location: "Sarandë",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A comfortable hotel option in Sarandë.",
    facilities: [
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  // =========================================================
  // VLORË
  // =========================================================

  {
    slug: "new-york-vlore",
    name: "New York",
    region: "Vlorë",
    destination: "Vlorë",
    location: "Vlorë",
    category: "Beach Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A seaside hotel in Vlorë, ideal for enjoying the Albanian Riviera.",
    facilities: [
      "Beach",
      "Swimming Pool",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "kraal",
    name: "KRAAL",
    region: "Vlorë",
    destination: "Vlorë",
    location: "Vlorë",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A comfortable accommodation option in Vlorë.",
    facilities: [
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "thea-hotel",
    name: "THEA Hotel",
    region: "Vlorë",
    destination: "Vlorë",
    location: "Vlorë",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A modern hotel option in Vlorë.",
    facilities: [
      "Swimming Pool",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "regina-garden",
    name: "Regina Garden",
    region: "Vlorë",
    destination: "Vlorë",
    location: "Vlorë",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A comfortable Regina hotel option in Vlorë.",
    facilities: [
      "Swimming Pool",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "regina-city",
    name: "Regina City",
    region: "Vlorë",
    destination: "Vlorë",
    location: "Vlorë",
    category: "City & Beach Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A hotel in Vlorë offering convenient access to the city and the coast.",
    facilities: [
      "Swimming Pool",
      "Restaurant",
      "Beach",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "diamond-hill-resort",
    name: "Diamond Hill Resort",
    region: "Vlorë",
    destination: "Vlorë",
    location: "Vlorë",
    category: "Resort",
    stars: 5,
    prices: [],
    image: "",
    description:
      "A resort option near Vlorë, suitable for families and guests looking for a relaxing stay.",
    facilities: [
      "Swimming Pool",
      "Restaurant",
      "SPA",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "aerial-hotel-spa",
    name: "Aerial Hotel & Spa",
    region: "Vlorë",
    destination: "Vlorë",
    location: "Vlorë",
    category: "Hotel & Spa",
    stars: 5,
    prices: [],
    image: "",
    description:
      "A premium hotel and spa option in Vlorë.",
    facilities: [
      "SPA",
      "Swimming Pool",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  // =========================================================
  // KSAMIL
  // =========================================================

  {
    slug: "vista-mare",
    name: "Vista Mare",
    region: "Ksamil",
    destination: "Ksamil",
    location: "Ksamil",
    category: "Beach Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A hotel in Ksamil, ideal for guests looking to enjoy the famous beaches and turquoise waters of the Albanian Riviera.",
    facilities: [
      "Beach",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "atlantis-ksamil",
    name: "Atlantis",
    region: "Ksamil",
    destination: "Ksamil",
    location: "Ksamil",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A comfortable accommodation option in Ksamil.",
    facilities: [
      "Beach",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "gl-hotel",
    name: "GL Hotel",
    region: "Ksamil",
    destination: "Ksamil",
    location: "Ksamil",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A hotel option in Ksamil close to the area's beaches and attractions.",
    facilities: [
      "Beach",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "la-maison-ksamil",
    name: "La Maison",
    region: "Ksamil",
    destination: "Ksamil",
    location: "Ksamil",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A comfortable accommodation option in Ksamil.",
    facilities: [
      "Beach",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "sole-mare",
    name: "Sole Mare",
    region: "Ksamil",
    destination: "Ksamil",
    location: "Ksamil",
    category: "Beach Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A seaside accommodation option in Ksamil.",
    facilities: [
      "Beach",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "ilio-ksamil",
    name: "Ilio",
    region: "Ksamil",
    destination: "Ksamil",
    location: "Ksamil",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A hotel option in Ksamil for a relaxing beach holiday.",
    facilities: [
      "Beach",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "euro-hotel-ksamil",
    name: "EURO HOTEL",
    region: "Ksamil",
    destination: "Ksamil",
    location: "Ksamil",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A comfortable hotel option in Ksamil.",
    facilities: [
      "Beach",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  // =========================================================
  // RADHIMË
  // =========================================================

  {
    slug: "white-hill",
    name: "White Hill",
    region: "Radhimë",
    destination: "Radhimë",
    location: "Radhimë, Vlorë",
    category: "Beach Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A seaside accommodation option in Radhimë, close to the beautiful beaches south of Vlorë.",
    facilities: [
      "Beach",
      "Restaurant",
      "Swimming Pool",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "regina-blue",
    name: "Regina Blue",
    region: "Radhimë",
    destination: "Radhimë",
    location: "Radhimë, Vlorë",
    category: "Beach Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A beachfront hotel in Radhimë offering a relaxing coastal holiday.",
    facilities: [
      "Beach",
      "Swimming Pool",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "olympia-radhime",
    name: "Olympia",
    region: "Radhimë",
    destination: "Radhimë",
    location: "Radhimë, Vlorë",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A comfortable accommodation option in Radhimë.",
    facilities: [
      "Beach",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "kaan-hotel",
    name: "KAAN HOTEL",
    region: "Radhimë",
    destination: "Radhimë",
    location: "Radhimë, Vlorë",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A hotel option in Radhimë near the coast.",
    facilities: [
      "Beach",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "hotel-roi",
    name: "HOTEL ROI",
    region: "Radhimë",
    destination: "Radhimë",
    location: "Radhimë, Vlorë",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A comfortable hotel option in Radhimë.",
    facilities: [
      "Beach",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "tris3-hotel",
    name: "TRIS3 HOTEL",
    region: "Radhimë",
    destination: "Radhimë",
    location: "Radhimë, Vlorë",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A hotel option in Radhimë for a coastal holiday.",
    facilities: [
      "Beach",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "mazarine-hotel",
    name: "Mazarine Hotel",
    region: "Radhimë",
    destination: "Radhimë",
    location: "Radhimë, Vlorë",
    category: "Beach Hotel",
    stars: 5,
    prices: [],
    image: "",
    description:
      "A premium seaside hotel in the Radhimë area.",
    facilities: [
      "Beach",
      "Swimming Pool",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  // =========================================================
  // ULQIN
  // =========================================================

  {
    slug: "mediteran-vila-edition",
    name: "Mediteran Vila Edition",
    region: "Ulqin",
    destination: "Ulqin",
    location: "Ulqin, Montenegro",
    category: "Villa",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A Mediterranean-style accommodation option in Ulqin.",
    facilities: [
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "vue-mer",
    name: "VUE MER",
    region: "Ulqin",
    destination: "Ulqin",
    location: "Ulqin, Montenegro",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A comfortable accommodation option in Ulqin.",
    facilities: [
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "ambiente-hotel",
    name: "Ambiente Hotel",
    region: "Ulqin",
    destination: "Ulqin",
    location: "Ulqin, Montenegro",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A hotel option in Ulqin for a relaxing Adriatic holiday.",
    facilities: [
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  // =========================================================
  // VELIPOJË
  // =========================================================

  {
    slug: "holiday-hotel-velipoje",
    name: "Holiday Hotel",
    region: "Velipojë",
    destination: "Velipojë",
    location: "Velipojë",
    category: "Beach Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A beach hotel in Velipojë, suitable for families and seaside holidays.",
    facilities: [
      "Beach",
      "Swimming Pool",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "erjani",
    name: "ERJANI",
    region: "Velipojë",
    destination: "Velipojë",
    location: "Velipojë",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A comfortable accommodation option in Velipojë.",
    facilities: [
      "Beach",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "arnil",
    name: "Arnil",
    region: "Velipojë",
    destination: "Velipojë",
    location: "Velipojë",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A hotel option in Velipojë close to the coast.",
    facilities: [
      "Beach",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "arda-hotel",
    name: "Arda Hotel",
    region: "Velipojë",
    destination: "Velipojë",
    location: "Velipojë",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A comfortable hotel option in Velipojë.",
    facilities: [
      "Beach",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "qetesia",
    name: "QETESIA",
    region: "Velipojë",
    destination: "Velipojë",
    location: "Velipojë",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A peaceful accommodation option in Velipojë.",
    facilities: [
      "Beach",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "margjokaj",
    name: "MARGJOKAJ",
    region: "Velipojë",
    destination: "Velipojë",
    location: "Velipojë",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A comfortable accommodation option in Velipojë.",
    facilities: [
      "Beach",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  // =========================================================
  // ORIKUM
  // =========================================================

  {
    slug: "dazur-resort",
    name: "D'Azur Resort",
    region: "Orikum",
    destination: "Orikum",
    location: "Orikum, Vlorë",
    category: "Resort",
    stars: 5,
    prices: [],
    image: "",
    description:
      "A seaside resort in Orikum, ideal for a relaxing holiday on the Albanian Riviera.",
    facilities: [
      "Beach",
      "Swimming Pool",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "regina-palma",
    name: "Regina Palma",
    region: "Orikum",
    destination: "Orikum",
    location: "Orikum, Vlorë",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A comfortable hotel option in Orikum.",
    facilities: [
      "Beach",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },

  {
    slug: "mour-hotel",
    name: "MOUR HOTEL",
    region: "Orikum",
    destination: "Orikum",
    location: "Orikum, Vlorë",
    category: "Hotel",
    stars: 4,
    prices: [],
    image: "",
    description:
      "A hotel option in Orikum for a relaxing coastal holiday.",
    facilities: [
      "Beach",
      "Restaurant",
      "Wi-Fi",
      "Parking",
    ],
    gallery: [],
  },
];