// Edit this file to add, change or hide bus tours on the homepage.
// - active: false hides a tour
// - image: your photo, e.g. "/images/bus-tours/istanbul.jpg" (file lives in public/images/bus-tours/)
// - departures: dates as "YYYY-MM-DD". Past dates hide themselves, and a tour with
//   no future dates hides itself.
// - A departure can have its own price. Without one it uses the tour's base price.
// - The order of this list is the order on the website.

export type Departure = {
  start: string;
  end: string;
  price?: number;
};

export type BusTour = {
  slug: string;
  title: string;
  active: boolean;
  image?: string;
  duration: string;
  price: number;
  priceNote: string;
  highlights: string[];
  departures: Departure[];
  from: string;
  includes: string[];
  extras: string[];
  itinerary: { day: string; text: string }[];
  documents: string;
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
      { start: "2026-12-30", end: "2027-01-02" }
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
  },
  {
    slug: "budapest-vienna",
    title: "Budapest & Vjenë",
    active: true,
    image: "/images/bus-tours/budapest-vienna.jpg",
    duration: "3 ditë",
    price: 169,
    priceNote: "për person",
    highlights: [
      "2 netë në B&B Hotel Budapest City",
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
      "2 netë akomodim në B&B Hotel Budapest City, në qendër të Budapestit",
      "Mëngjes në hotel",
      "Vizita në Budapest dhe Vjenë",
    ],
    extras: ["Shëtitje me anije në Danub: 20€ (obligative)"],
    itinerary: [
      {
        day: "Dita 1 - Budapest",
        text: "Arritja në Budapest. Shëtitje dhe vizita te Fisherman's Bastion, Chain Bridge, Parlamenti dhe Budapest Castle, me kohë të lirë për drekë. Akomodimi në B&B Hotel Budapest City dhe pushim pasdite. Në mbrëmje shëtitje panoramike në qytet dhe shëtitje me anije në Danub.",
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
  },
];