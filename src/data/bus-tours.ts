// Edit this file to add, change or hide bus tours.
// - active: false hides a tour
// - image: your photo, e.g. "/images/bus-tours/pogradec.jpg" (file lives in public/images/bus-tours/)
// - departures: dates as "YYYY-MM-DD". Past dates hide themselves, and a tour with
//   no future dates hides itself.
// - A departure can have its own price. Without one it uses the tour's base price.
// - cities: optional. A list of departure cities with their own times for this tour.
//   Without it, the shared city list in BusDialog.tsx is used (filtered by "from").
//   With cities: [] the visitor is told the cities and times are confirmed on WhatsApp.
// - Albanian text is the main text. Put the English text inside "en".

export type Departure = {
  start: string;
  end: string;
  price?: number;
};

export type City = {
  name: string;
  time?: string;
  location?: string;
  locationEn?: string;
};

// Everything the visitor reads. One copy in Albanian, one in English.
export type TourText = {
  title: string;
  duration: string;
  priceNote: string;
  highlights: string[];
  includes: string[];
  extras: string[];
  itinerary: { day: string; text: string }[];
  documents?: string;
  notes?: string[];
};

export type BusTour = TourText & {
  slug: string;
  active: boolean;
  image?: string;
  price: number;
  departures: Departure[];
  from: string; // Albanian city names, used to filter the departure cities
  cities?: City[];
  en?: TourText;
};

export const busTours: BusTour[] = [
  {
    slug: "stambolli",
    title: "Stamboll",
    active: true,
    image: "/images/bus-tours/stambolli.jpg",
    duration: "3 netë / 4 ditë",
    price: 89,
    priceNote: "për person",
    highlights: [
      "Transport me autobus",
      "Hotel 5 yje me SPA falas",
      "Mëngjes turk i përfshirë",
      "Guidë profesionale në shqip",
    ],
    // 12 Datat e Stambollit
    departures: [
      { start: "2026-10-14", end: "2026-10-17" },
      { start: "2026-10-21", end: "2026-10-24" },
      { start: "2026-10-28", end: "2026-10-31" },
      { start: "2026-11-04", end: "2026-11-07" },
      { start: "2026-11-11", end: "2026-11-14" },
      { start: "2026-11-18", end: "2026-11-21" },
      { start: "2026-11-25", end: "2026-11-28" },
      { start: "2026-12-02", end: "2026-12-05" },
      { start: "2026-12-09", end: "2026-12-12" },
      { start: "2026-12-16", end: "2026-12-19" },
      { start: "2026-12-23", end: "2026-12-26" },
      { start: "2026-12-30", end: "2027-01-02" },
    ],
    from: "Prishtinë, Suharekë, Komoran, Prizren, Gjakovë, Pejë, Ferizaj, Klinë, Malishevë, Kiçevë / Kievi, Vushtrri, Arllat, Viti, Hani i Elezit, Mitrovicë",
    includes: [
      "Udhëtim me autobus super komod",
      "Akomodim në hotel 5 yje",
      "SPA falas: pishinë e brendshme, sauna, hamam dhe fitness",
      "Mëngjes turk i përfshirë",
      "Guidë profesionale gjatë vizitave (në shqip)",
      "Ndalesë në Selanik, Greqi, gjatë kthimit",
    ],
    extras: [
      "Teleferiku Pierre Loti: 5€ (obligative)",
      "Transporti te Xhamia Çamlıca: 10€ (obligative)",
      "Shëtitje me anije në Bosfor: 15€ (obligative)",
      "Aqua Florya: 25€ (opsionale)",
    ],
    itinerary: [
      {
        day: "Dita 1",
        text: "Mbërritja në Stamboll rreth orës 10:00. Vizitë në 212 Outlet, check-in dhe relaksim në hotel, teleferiku Pierre Loti dhe vizitë në Ortaköy.",
      },
      {
        day: "Dita 2",
        text: "Mëngjes turk në hotel. Vizitë opsionale në Aqua Florya, një nga akuariumet më të mëdha në Evropë. Lagjja Balat, Sheshi Taksim dhe Galata Tower.",
      },
      {
        day: "Dita 3",
        text: "Xhamia Çamlıca (pjesa aziatike), shëtitje me anije në Bosfor, Kapali Qarshi (Grand Bazar), Hagia Sophia, Sultan Ahmet dhe vizitë në qendrën tregtare Venezia Mall.",
      },
      {
        day: "Dita 4",
        text: "Mëngjes turk dhe check-out. Nisja për Kosovë në orën 08:00 me ndalesë në Selanik, Greqi. Arritja rreth orës 23:00 - 00:00.",
      },
    ],
    documents: "Pasaportë e vlefshme minimum 6 muaj.",
    en: {
      title: "Istanbul",
      duration: "3 nights / 4 days",
      priceNote: "per person",
      highlights: [
        "Bus transport",
        "5-star hotel with free SPA",
        "Turkish breakfast included",
        "Professional guide in Albanian",
      ],
      includes: [
        "Travel by a very comfortable bus",
        "5-star hotel accommodation",
        "Free SPA: indoor pool, sauna, hammam and fitness",
        "Turkish breakfast included",
        "Professional guide during the visits (in Albanian)",
        "Stop in Thessaloniki, Greece, on the way back",
      ],
      extras: [
        "Pierre Loti cable car: €5 (mandatory)",
        "Transport to Çamlıca Mosque: €10 (mandatory)",
        "Bosphorus boat cruise: €15 (mandatory)",
        "Aqua Florya: €25 (optional)",
      ],
      itinerary: [
        {
          day: "Day 1",
          text: "Arrival in Istanbul around 10:00. Visit to 212 Outlet, check-in and relaxing at the hotel, Pierre Loti cable car and a visit to Ortaköy.",
        },
        {
          day: "Day 2",
          text: "Turkish breakfast at the hotel. Optional visit to Aqua Florya, one of the largest aquariums in Europe. Balat district, Taksim Square and Galata Tower.",
        },
        {
          day: "Day 3",
          text: "Çamlıca Mosque (Asian side), Bosphorus boat cruise, the Grand Bazaar, Hagia Sophia, Sultanahmet and a visit to Venezia Mall.",
        },
        {
          day: "Day 4",
          text: "Turkish breakfast and check-out. Departure for Kosovo at 08:00 with a stop in Thessaloniki, Greece. Arrival around 23:00 - 00:00.",
        },
      ],
      documents: "Passport valid for at least 6 months.",
    },
  },
  {
    slug: "budapest-vienna",
    title: "Budapest & Vjenë",
    active: true,
    image: "/images/bus-tours/budapest-vienna.jpg",
    duration: "2 netë / 3 ditë",
    price: 169,
    priceNote: "për person",
    highlights: [
      "Transport me autobus",
      "2 netë akomodim në hotel",
      "Mëngjes i përfshirë",
      "Vizita në Budapest dhe Vjenë",
    ],
    departures: [
      { start: "2026-10-15", end: "2026-10-18" },
      { start: "2026-10-22", end: "2026-10-25", price: 179 },
      { start: "2026-11-05", end: "2026-11-08", price: 179 },
      { start: "2026-11-27", end: "2026-11-30", price: 179 },
      { start: "2026-12-24", end: "2026-12-27", price: 179 },
    ],
    from: "Prishtinë",
    includes: [
      "Transport me autobus",
      "2 netë akomodim në hotel",
      "Mëngjes në hotel",
      "Vizita në Budapest dhe Vjenë",
    ],
    extras: ["Shëtitje me anije në Danub: 20€ (obligative)"],
    itinerary: [
      {
        day: "Dita 1 - Budapest",
        text: "Arritja në Budapest. Shëtitje dhe vizita te Fisherman's Bastion, Chain Bridge, Parlamenti dhe Budapest Castle, me kohë të lirë për drekë. Akomodimi në hotel dhe pushim pasdite. Në mbrëmje shëtitje panoramike në qytet dhe shëtitje me anije në Danub.",
      },
      {
        day: "Dita 2 - Vjenë",
        text: "Mëngjes në hotel, nisja drejt Vjenës me ndalesë në Parndorf Outlet Center. Shëtitje në Vjenë me vizita te Katedralja St. Stephen, Parlamenti dhe atraksione të tjera. Pasdite vonë kthimi në hotel në Budapest.",
      },
      {
        day: "Dita 3 - Kthimi",
        text: "Mëngjes dhe check-out nga hoteli. Ndalesë për shopping në Arena Mall, nisja për Kosovë rreth orës 12:00 dhe arritja rreth orës 23:00.",
      },
    ],
    documents:
      "Letërnjoftim ose pasaportë e vlefshme. Për fëmijë: pasaportë dhe certifikatë me fotografi dhe vulë (jo më e vjetër se 6 muaj).",
    en: {
      title: "Budapest & Vienna",
      duration: "2 nights / 3 days",
      priceNote: "per person",
      highlights: [
        "Bus transport",
        "2 nights hotel accommodation",
        "Breakfast included",
        "Visits to Budapest and Vienna",
      ],
      includes: [
        "Bus transport",
        "2 nights hotel accommodation",
        "Breakfast at the hotel",
        "Visits to Budapest and Vienna",
      ],
      extras: ["Danube boat cruise: €20 (mandatory)"],
      itinerary: [
        {
          day: "Day 1 - Budapest",
          text: "Arrival in Budapest. Walk and visits to Fisherman's Bastion, Chain Bridge, the Parliament and Buda Castle, with free time for lunch. Hotel accommodation and an afternoon rest. In the evening a panoramic city tour and a Danube boat cruise.",
        },
        {
          day: "Day 2 - Vienna",
          text: "Breakfast at the hotel, departure for Vienna with a stop at Parndorf Outlet Center. Walking tour of Vienna with visits to St. Stephen's Cathedral, the Parliament and other attractions. Late afternoon return to the hotel in Budapest.",
        },
        {
          day: "Day 3 - Return",
          text: "Breakfast and hotel check-out. Shopping stop at Arena Mall, departure for Kosovo around 12:00 and arrival around 23:00.",
        },
      ],
      documents:
        "Valid ID card or passport. For children: passport and a certificate with photo and stamp (not older than 6 months).",
    },
  },
  {
    slug: "pogradec-weekend",
    title: "Fundjavë në Pogradec & Korçë",
    active: false,
    duration: "2 netë / 3 ditë",
    price: 80,
    priceNote: "për person",
    highlights: [
      "Transport me autobus",
      "2 netë akomodim në hotel",
      "2 mëngjese dhe 2 darka",
      "Ofertë për Ditën e Flamurit, 28 Nëntor",
    ],
    departures: [
      { start: "2026-11-27", end: "2026-11-29" },
      { start: "2026-11-28", end: "2026-11-30" },
    ],
    from: "",
    cities: [],
    includes: [
      "Transport me autobus komod",
      "2 netë akomodim në hotel 4 yje në Pogradec",
      "2 mëngjese dhe 2 darka",
      "Shërbimi i pijeve gjatë udhëtimit",
      "Internet falas (Starlink)",
      "Vizita në Pogradec, Tiranë, Voskopojë, Korçë dhe Elbasan",
    ],
    extras: ["Lundrimi me varka te burimi i Drinit të Zi: pagesë individuale"],
    itinerary: [
      {
        day: "Dita 1",
        text: "Grumbullimi i udhëtarëve nga qytetet e nisjes dhe vazhdimi i rrugës, me pushim në autostradë. Vizitë në Strugë, Ohër dhe Shën Naum. Relaksim te burimi i Drinit të Zi. Akomodimi në hotel, darka në hotel dhe shëtitje në qytetin e Pogradecit.",
      },
      {
        day: "Dita 2",
        text: "Mëngjes në hotel, pastaj vizitë në qytetin e vjetër të Voskopojës dhe të Korçës dhe në mësonjëtoren e parë shqipe. Darka në hotel dhe muzikë pas darkës.",
      },
      {
        day: "Dita 3",
        text: "Mëngjes në hotel. Vizitë në Elbasan, pastaj nisja për në Tiranë dhe vizitë në qytet. Kthimi në Prishtinë, arritja rreth orës 22:00.",
      },
    ],
    en: {
      title: "Weekend in Pogradec & Korça",
      duration: "2 nights / 3 days",
      priceNote: "per person",
      highlights: [
        "Bus transport",
        "2 nights hotel accommodation",
        "2 breakfasts and 2 dinners",
        "Special offer for Flag Day, 28 November",
      ],
      includes: [
        "Travel by a comfortable bus",
        "2 nights in a 4-star hotel in Pogradec",
        "2 breakfasts and 2 dinners",
        "Drinks service during the trip",
        "Free internet (Starlink)",
        "Visits to Pogradec, Tirana, Voskopoja, Korça and Elbasan",
      ],
      extras: ["Boat ride at the source of the Black Drin: individual payment"],
      itinerary: [
        {
          day: "Day 1",
          text: "Travellers are collected from their cities and the journey continues, with a rest stop on the motorway. Visits to Struga, Ohrid and St. Naum. Relaxing at the source of the Black Drin. Hotel check-in, dinner at the hotel and a walk in Pogradec.",
        },
        {
          day: "Day 2",
          text: "Breakfast at the hotel, then a visit to the old towns of Voskopoja and Korça and to the first Albanian-language school. Dinner at the hotel, with music after dinner.",
        },
        {
          day: "Day 3",
          text: "Breakfast at the hotel. Visit to Elbasan, then departure for Tirana and a visit to the city. Return to Pristina, arriving around 22:00.",
        },
      ],
    },
  },
  {
    slug: "pogradec-2-days", image: "/images/bus-tours/pogradec-2-days.jpg",
    title: "Fundjavë në Pogradec, Strugë & Ohër",
    active: true,
    duration: "1 natë / 2 ditë",
    price: 50,
    priceNote: "për person",
    highlights: [
      "Transport me autobus",
      "1 natë akomodim në hotel",
      "Mëngjes dhe darkë",
      "Muzikë live",
    ],
    // Every Saturday
    departures: [
      { start: "2026-10-24", end: "2026-10-25" },
      { start: "2026-10-31", end: "2026-11-01" },
      { start: "2026-11-07", end: "2026-11-08" },
      { start: "2026-11-14", end: "2026-11-15" },
      { start: "2026-11-21", end: "2026-11-22" },
      { start: "2026-11-28", end: "2026-11-29" },
      { start: "2026-12-05", end: "2026-12-06" },
      { start: "2026-12-12", end: "2026-12-13" },
      { start: "2026-12-19", end: "2026-12-20" },
    ],
    from: "Gjakovë, Gjilan, Prizren, Pejë, Therandë, Mitrovicë, Vushtrri, Prishtinë, Ferizaj",
    cities: [
      { name: "Gjakovë", time: "05:00" },
      { name: "Gjilan", time: "05:00" },
      { name: "Prizren", time: "05:30" },
      { name: "Pejë", time: "05:30" },
      { name: "Therandë", time: "06:00" },
      { name: "Mitrovicë", time: "06:00" },
      { name: "Vushtrri", time: "06:00" },
      { name: "Prishtinë", time: "07:00" },
      { name: "Ferizaj", time: "07:30" },
    ],
    includes: [
      "Transport me autobus komod",
      "1 natë akomodim në hotel 4 yje në Pogradec",
      "Mëngjes dhe darkë në hotel",
      "Shërbimi i pijeve gjatë udhëtimit",
      "Vizita në Pogradec, Strugë, Ohër, Shën Naum dhe Drilon",
      "Muzikë live pas darkës",
    ],
    extras: [],
    notes: ["Grupi duhet të jetë të paktën 8 persona."],
    itinerary: [
      {
        day: "Dita 1",
        text: "Kalimi kufitar në Bllacë dhe vazhdimi për në Strugë. Vizitë në Strugë dhe te burimi i Drinit të Zi. Vizitë në Ohër, me shëtitje rreth liqenit dhe qytetit. Vizitë në Shën Naum. Akomodimi në hotel në Pogradec. Darka në hotel dhe muzikë live pas darkës.",
      },
      {
        day: "Dita 2",
        text: "Vizitë në Parkun Drilon. Pastaj vizitë në Elbasan dhe nisja për në Tiranë, me vizitë në qytet. Nisja për në Prishtinë, arritja rreth orës 22:00.",
      },
    ],
    en: {
      title: "Weekend in Pogradec, Struga & Ohrid",
      duration: "1 night / 2 days",
      priceNote: "per person",
      highlights: [
        "Bus transport",
        "1 night hotel accommodation",
        "Breakfast and dinner",
        "Live music",
      ],
      includes: [
        "Travel by a comfortable bus",
        "1 night in a 4-star hotel in Pogradec",
        "Breakfast and dinner at the hotel",
        "Drinks service during the trip",
        "Visits to Pogradec, Struga, Ohrid, St. Naum and Drilon",
        "Live music after dinner",
      ],
      extras: [],
      notes: ["The group must be at least 8 people."],
      itinerary: [
        {
          day: "Day 1",
          text: "Border crossing at Blace and on to Struga. Visit to Struga and the source of the Black Drin. Visit to Ohrid, with a walk around the lake and the town. Visit to St. Naum. Hotel accommodation in Pogradec. Dinner at the hotel and live music after dinner.",
        },
        {
          day: "Day 2",
          text: "Visit to Drilon Park. Then a visit to Elbasan and departure for Tirana, with a visit to the city. Departure for Pristina, arriving around 22:00.",
        },
      ],
    },
  },
];