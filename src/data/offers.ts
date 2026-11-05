// Offers by plane from Tirana. To add an offer, copy a block.
// - d("start", "end", total): "total" is the operator's price for 2 people.
//   The price per person is worked out automatically (total / 2, rounded up to end in 9).
// - Past dates hide themselves. An offer with no future dates hides itself.
// - image: add later, e.g. "/images/offers/paris-disneyland.jpg" (file goes in public/images/offers/)
// - active: false hides an offer.

export type Region = "italy" | "spain" | "europe" | "middleeast";
export type Text = { sq: string; en: string };
export type Departure = { start: string; end: string; total: number };

export type Offer = {
  slug: string;
  active: boolean;
  region: Region;
  image?: string;
  title: Text;
  tagline: Text;
  duration: Text;
  bag?: string | null; // cabin bag size. null = not listed
  departures: Departure[];
  days: Text[];
  includes?: Text[];
  extras?: Text[];
  notes?: Text[];
};

const t = (sq: string, en: string): Text => ({ sq, en });
const d = (start: string, end: string, total: number): Departure => ({ start, end, total });

// "3 netë / 4 ditë": nights first, then days.
const dur = (days: number) =>
  t(
    `${days - 1} ${days === 2 ? "natë" : "netë"} / ${days} ditë`,
    `${days - 1} ${days === 2 ? "night" : "nights"} / ${days} days`
  );

// Total for 2 people -> price per person, rounded up to a number ending in 9.
export function perPerson(total: number) {
  return Math.ceil((total / 2 - 9) / 10) * 10 + 9;
}

// The lines shown on the offer card. Nights are worked out from the first departure.
export function planeHighlights(offer: Offer): Text[] {
  const first = offer.departures[0];
  const days = Math.round((Date.parse(first.end) - Date.parse(first.start)) / 86400000) + 1;
  const nights = Math.max(1, days - 1);
  return [
    t("Fluturim vajtje-ardhje nga Tirana", "Return flights from Tirana"),
    t(
      `${nights} ${nights === 1 ? "natë" : "netë"} akomodim në hotel`,
      `${nights} ${nights === 1 ? "night" : "nights"} hotel accommodation`
    ),
    t("Mëngjes çdo ditë", "Breakfast every day"),
    t("Shoqërues shqiptar", "Albanian-speaking companion"),
  ];
}

export function allIncludes(offer: Offer): Text[] {
  const list: Text[] = [
    t("Fluturimet vajtje-ardhje nga Tirana", "Return flights from Tirana"),
    t("Transferet dhe shëtitjet me autobus", "Transfers and bus tours"),
    t("Akomodim në hotel", "Hotel accommodation"),
    t("Mëngjes çdo ditë", "Breakfast every day"),
    t("Shoqërues shqiptar gjatë udhëtimit", "Albanian-speaking companion during the trip"),
  ];
  if (offer.bag !== null) {
    const bag = offer.bag ?? "40 x 30 x 20 cm";
    list.push(
      t(
        `Një çantë dore deri në ${bag} (bagazhi i regjistruar kushton shtesë)`,
        `One cabin bag up to ${bag} (checked baggage costs extra)`
      )
    );
  }
  return [...list, ...(offer.includes ?? [])];
}

export const NOT_INCLUDED: Text[] = [
  t("Udhëtimi nga Kosova deri në Tiranë", "Travel from Kosovo to Tirana"),
  t("Gjithçka që nuk përmendet në program", "Anything not mentioned in the program"),
  t("Hyrjet në monumente dhe muzeume", "Entry to monuments and museums"),
  t(
    "Bakshish për shoqëruesin: sugjerohet jo më pak se 1€ në ditë për person të rritur",
    "Tip for the companion: at least €1 per day per adult is suggested"
  ),
];

export const CONDITIONS: Text[] = [
  t(
    "Oraret e fluturimeve mund të ndryshojnë nga kompania ajrore, por programi zbatohet i plotë.",
    "Flight times may be changed by the airline, but the program is carried out in full."
  ),
  t(
    "Vonesat në trafik mund të shkurtojnë disa ndalesa. Shoferi ka pushim të detyrueshëm ligjor.",
    "Traffic delays may shorten some stops. The driver has legally required breaks."
  ),
  t(
    "Programi është ekonomik: hotelet mund të mos jenë në qendër të qytetit.",
    "This is an economy program: hotels may not be in the city centre."
  ),
];

export const offers: Offer[] = [
  {
    slug: "paris-disneyland", image: "/images/offers/paris-disneyland.jpg",
    active: true,
    region: "europe",
    title: t("Paris & Disneyland", "Paris & Disneyland"),
    tagline: t(
      "Kulla Eiffel, Luvri dhe një ditë e plotë në Disneyland Paris.",
      "The Eiffel Tower, the Louvre and a full day at Disneyland Paris."
    ),
    duration: dur(4),
    bag: "40 x 20 x 23 cm",
    departures: [
      d("2026-11-07", "2026-11-10", 1770),
      d("2026-11-28", "2026-12-01", 1058),
      d("2026-12-05", "2026-12-08", 1073),
      d("2026-12-26", "2026-12-29", 1142),
      d("2027-01-23", "2027-01-26", 913),
    ],
    days: [
      t("Fluturim direkt Tiranë – Paris (06:55). Vizitë panoramike: Galeritë Lafayette, Kopshti i Luksemburgut, Opera Garnier, Champs-Élysées, La Défense.", "Direct flight Tirana – Paris (06:55). Panoramic tour: Galeries Lafayette, Luxembourg Gardens, Opera Garnier, Champs-Élysées, La Défense."),
      t("Kulla Eiffel, lundrim në Seine, Harku i Triumfit, Place de la Concorde, Invalidët dhe Muzeu i Luvrit.", "Eiffel Tower, Seine cruise, Arc de Triomphe, Place de la Concorde, Les Invalides and the Louvre."),
      t("E gjithë dita në Disneyland Paris, me të dy parqet.", "The whole day at Disneyland Paris, with both parks."),
      t("Transferi në aeroport. Fluturim direkt Paris – Tiranë (10:05), arritja 12:40.", "Transfer to the airport. Direct flight Paris – Tirana (10:05), arriving 12:40."),
    ],
    includes: [
      t("3 netë akomodim", "3 nights accommodation"),
      t("Hyrja në parkun Disneyland Paris", "Entry to Disneyland Paris"),
    ],
    extras: [
      t("Hyrja në Luvër: 25€ (fëmijë deri në 11 vjeç: 15€)", "Louvre entry: €25 (children up to 11: €15)"),
      t("Lundrim në Seine: 18€ (fëmijë deri në 11 vjeç: 10€)", "Seine cruise: €18 (children up to 11: €10)"),
      t("Kulla Eiffel, kati i dytë me ashensor: 28€ (fëmijë deri në 11 vjeç: 18€)", "Eiffel Tower, second floor by lift: €28 (children up to 11: €18)"),
    ],
    notes: [
      t("Biletat e hyrjes rezervohen paraprakisht gjatë rezervimit të turit. Dita e hyrjes mund të ndryshojë sipas disponueshmërisë.", "Entry tickets are booked in advance when you book the tour. The entry day may change depending on availability."),
    ],
  },
  {
    slug: "dubai-abu-dhabi", image: "/images/offers/dubai-abu-dhabi.jpg",
    active: true,
    region: "middleeast",
    title: t("Dubai & Abu Dhabi", "Dubai & Abu Dhabi"),
    tagline: t(
      "Qiellgërvishtës, shkretëtirë dhe Xhamia e Sheikut Zayed.",
      "Skyscrapers, the desert and the Sheikh Zayed Mosque."
    ),
    duration: dur(5),
    bag: null,
    departures: [
      d("2026-11-11", "2026-11-15", 1398),
      d("2026-11-18", "2026-11-22", 1398),
      d("2026-11-25", "2026-11-29", 1398),
      d("2026-12-02", "2026-12-06", 1398),
      d("2026-12-09", "2026-12-13", 1398),
    ],
    days: [
      t("Fluturim direkt Tiranë – Dubai (13:05), arritja 21:15. Transferi në hotel.", "Direct flight Tirana – Dubai (13:05), arriving 21:15. Transfer to the hotel."),
      t("Vizitë panoramike në Dubai: Burj Al Arab, Madinat Jumeirah, Palm Jumeirah, Dubai Marina, Burj Khalifa, Dubai Mall dhe shatërvani kërcimtar.", "Panoramic tour of Dubai: Burj Al Arab, Madinat Jumeirah, Palm Jumeirah, Dubai Marina, Burj Khalifa, Dubai Mall and the dancing fountain."),
      t("Ditë me opsione: ngjitja në Burj Khalifa dhe safari në shkretëtirë me darkë barbecue.", "Day with optional activities: Burj Khalifa and a desert safari with a barbecue dinner."),
      t("Vizitë në Abu Dhabi: Xhamia e Sheikut Zayed, Heritage Village, Ishulli Yas. Kthim në Dubai.", "Visit to Abu Dhabi: Sheikh Zayed Mosque, Heritage Village, Yas Island. Return to Dubai."),
      t("Transferi në aeroport. Fluturim direkt Dubai – Tiranë (09:00), arritja 12:05.", "Transfer to the airport. Direct flight Dubai – Tirana (09:00), arriving 12:05."),
    ],
    includes: [
      t("Guida vendase në disa shëtitje", "Local guides on some tours"),
      t("Një çantë dore 7 kg (55 x 40 x 23 cm) dhe një bagazh 20 kg", "One 7 kg cabin bag (55 x 40 x 23 cm) and one 20 kg checked bag"),
    ],
    extras: [
      t("Lundrim me katamaran në Dubai Marina: 42€", "Catamaran cruise in Dubai Marina: €42"),
      t("Darkë me pamje nga shatërvani: 60€", "Dinner with a view of the fountain: €60"),
      t("Ngjitja në Burj Khalifa: 68€", "Burj Khalifa visit: €68"),
      t("Dubai Frame: 47€", "Dubai Frame: €47"),
      t("Safari dhe darkë në shkretëtirë: 60€", "Desert safari and dinner: €60"),
    ],
    notes: [
      t("Pasaporta duhet të ketë të paktën 6 muaj vlefshmëri nga dita e nisjes. Pa këtë, udhëtari nuk lejohet të fluturojë.", "The passport must be valid for at least 6 months from the departure date. Without this the traveller cannot fly."),
      t("Në xhami, femrat duhet të kenë krahët dhe këmbët e mbuluara dhe flokët me shami.", "In mosques, women must cover arms and legs and wear a headscarf."),
      t("Shtrati i tretë në dhomë është shtrat portativ.", "The third bed in a room is a portable extra bed."),
    ],
  },
  {
    slug: "catania-palermo", image: "/images/offers/catania-palermo.jpg",
    active: true,
    region: "italy",
    title: t("Catania & Palermo", "Catania & Palermo"),
    tagline: t("Siçilia: Taormina, Palermo, Syracuse dhe më shumë.", "Sicily: Taormina, Palermo, Syracuse and more."),
    duration: dur(4),
    departures: [
      d("2027-03-19", "2027-03-22", 591),
      d("2027-04-23", "2027-04-26", 632),
    ],
    days: [
      t("Fluturim Tiranë – Catania (23:20), arritja 00:55. Fjetje në hotel.", "Flight Tirana – Catania (23:20), arriving 00:55. Overnight at the hotel."),
      t("Taormina, Messina, Cefalù dhe Palermo me vizitat kryesore.", "Taormina, Messina, Cefalù and Palermo with the main visits."),
      t("Erice, Trapani, Marsala, Agrigento dhe Ragusa.", "Erice, Trapani, Marsala, Agrigento and Ragusa."),
      t("Modica, Noto, Syracuse dhe Catania. Fluturim Catania – Tiranë (21:20), arritja 22:45.", "Modica, Noto, Syracuse and Catania. Flight Catania – Tirana (21:20), arriving 22:45."),
    ],
  },
  {
    slug: "malta", image: "/images/offers/malta.jpg",
    active: true,
    region: "europe",
    title: t("Maltë", "Malta"),
    tagline: t("Valletta, Mdina dhe ujërat kristal të Mesdheut.", "Valletta, Mdina and the crystal waters of the Mediterranean."),
    duration: dur(4),
    departures: [
      d("2026-11-28", "2026-12-01", 798),
      d("2026-12-12", "2026-12-15", 707),
      d("2027-02-18", "2027-02-21", 694),
      d("2027-03-11", "2027-03-14", 753),
      d("2027-03-21", "2027-03-24", 745),
    ],
    days: [
      t("Fluturim direkt Tiranë – Maltë (06:00), arritja 07:50. Vizitë panoramike në Valletta.", "Direct flight Tirana – Malta (06:00), arriving 07:50. Panoramic tour of Valletta."),
      t("Rabat, Mdina, Mosta dhe Blue Grotto.", "Rabat, Mdina, Mosta and the Blue Grotto."),
      t("Birgu, Senglea, Cospicua, Sliema dhe St. Julian's.", "Birgu, Senglea, Cospicua, Sliema and St. Julian's."),
      t("Transferi në aeroport. Fluturim Maltë – Tiranë (08:25), arritja 10:05.", "Transfer to the airport. Flight Malta – Tirana (08:25), arriving 10:05."),
    ],
    includes: [t("Hotel 3 yje", "3-star hotel")],
    notes: [
      t("Hyrjet në Fortesën San Elmo, Katedralen e St. John, Mdina, Mosta dhe Blue Grotto janë opsionale.", "Entries to Fort St. Elmo, St. John's Co-Cathedral, Mdina, Mosta and the Blue Grotto are optional."),
    ],
  },
  {
    slug: "napoli-sorrento-salerno", image: "/images/offers/napoli-sorrento-salerno.jpg",
    active: true,
    region: "italy",
    title: t("Napoli, Sorrento & Salerno", "Naples, Sorrento & Salerno"),
    tagline: t("Napoli, Kapri dhe bregdeti i Amalfit.", "Naples, Capri and the Amalfi coast."),
    duration: dur(4),
    departures: [
      d("2027-02-26", "2027-03-01", 714),
      d("2027-03-23", "2027-03-26", 771),
    ],
    days: [
      t("Fluturim Tiranë – Bari (06:50), transfer në Napoli. Duomo, Pallati Mbretëror, Sheshi Plebiscito. Fjetje në Napoli.", "Flight Tirana – Bari (06:50), transfer to Naples. Duomo, Royal Palace, Piazza del Plebiscito. Overnight in Naples."),
      t("Traget për në Kapri, kthim në Sorrento. Fjetje në Sorrento.", "Ferry to Capri and back to Sorrento. Overnight in Sorrento."),
      t("Sorrento në këmbë. Opsionale: anije për Positano, Amalfi dhe Salerno. Fjetje në Salerno.", "Walk through Sorrento. Optional: boats to Positano, Amalfi and Salerno. Overnight in Salerno."),
      t("Transferi në aeroportin e Barit. Fluturim Bari – Tiranë (23:00), arritja 00:05.", "Transfer to Bari airport. Flight Bari – Tirana (23:00), arriving 00:05."),
    ],
    includes: [
      t("Traget Sorrento – Kapri", "Ferry Sorrento – Capri"),
      t("1 natë në Napoli, 1 në Sorrento, 1 në Salerno", "1 night in Naples, 1 in Sorrento, 1 in Salerno"),
    ],
    extras: [
      t("Udhëtim me 3 anije (Sorrento – Positano – Amalfi – Salerno): 50€", "Trip by 3 boats (Sorrento – Positano – Amalfi – Salerno): €50"),
    ],
    notes: [
      t("Autobusët nuk lejohen në bregdetin e Amalfit, prandaj Positano dhe Amalfi vizitohen vetëm me anije. Kush nuk e zgjedh, kalon me autobus direkt në Salerno. Nëse moti nuk e lejon, anija mund të mos realizohet dhe nuk ka kthim pagese.", "Buses are not allowed on the Amalfi coast, so Positano and Amalfi are visited only by boat. Anyone who skips it goes by bus straight to Salerno. If the weather does not allow it, the boat trip may not take place and there is no refund."),
    ],
  },
  {
    slug: "barcelona-madrid", image: "/images/offers/barcelona-madrid.jpg",
    active: true,
    region: "spain",
    title: t("Barcelonë & Madrid", "Barcelona & Madrid"),
    tagline: t("Gaudí, Saragosa, Madrid dhe Toledo në 5 ditë.", "Gaudí, Zaragoza, Madrid and Toledo in 5 days."),
    duration: dur(5),
    departures: [
      d("2026-12-24", "2026-12-28", 998),
      d("2027-02-25", "2027-03-01", 910),
      d("2027-03-28", "2027-04-01", 1183),
    ],
    days: [
      t("Fluturim direkt Tiranë – Barcelonë (18:55), arritja 21:35.", "Direct flight Tirana – Barcelona (18:55), arriving 21:35."),
      t("Barcelona: Sagrada Família, Las Ramblas, Passeig de Gràcia dhe lagjja Gotike. Pasdite nisja për Saragosa.", "Barcelona: Sagrada Família, Las Ramblas, Passeig de Gràcia and the Gothic Quarter. Afternoon departure for Zaragoza."),
      t("Saragosa, pastaj Madrid: Plaza de Toros dhe parku El Retiro.", "Zaragoza, then Madrid: Plaza de Toros and El Retiro Park."),
      t("Madrid me guidë: Gran Vía, Puerta del Sol, Pallati Mbretëror dhe stadiumi Santiago Bernabéu.", "Madrid with a guide: Gran Vía, Puerta del Sol, the Royal Palace and the Santiago Bernabéu stadium."),
      t("Toledo. Fluturim direkt Madrid – Tiranë (21:40), arritja 00:50.", "Toledo. Direct flight Madrid – Tirana (21:40), arriving 00:50."),
    ],
    includes: [t("4 netë: 1 në Barcelonë, 1 në Saragosa, 2 në Madrid", "4 nights: 1 in Barcelona, 1 in Zaragoza, 2 in Madrid")],
  },
  {
    slug: "puglia", image: "/images/offers/puglia.jpg",
    active: true,
    region: "italy",
    title: t("Puglia: Alberobello, Otranto & Taranto", "Puglia: Alberobello, Otranto & Taranto"),
    tagline: t("Qytete historike, shtëpitë Trulli dhe Matera.", "Historic towns, the Trulli houses and Matera."),
    duration: dur(4),
    departures: [d("2027-03-05", "2027-03-08", 556)],
    days: [
      t("Fluturim Tiranë – Bari (06:50). Polignano a Mare, Monopoli, Alberobello (Trulli) dhe Brindisi.", "Flight Tirana – Bari (06:50). Polignano a Mare, Monopoli, Alberobello (Trulli) and Brindisi."),
      t("Lecce, Otranto dhe Gallipoli.", "Lecce, Otranto and Gallipoli."),
      t("Taranto, Matera (Sassi) dhe Altamura.", "Taranto, Matera (Sassi) and Altamura."),
      t("Barletta, Trani dhe Bari. Fluturim Bari – Tiranë (18:00), arritja 18:55.", "Barletta, Trani and Bari. Flight Bari – Tirana (18:00), arriving 18:55."),
    ],
  },
  {
    slug: "kalabria", image: "/images/offers/kalabria.jpg",
    active: true,
    region: "italy",
    title: t("Kalabria & arbëreshët", "Calabria & the Arbëreshë villages"),
    tagline: t("Bregdet italian dhe fshatrat arbëreshe.", "The Italian coast and the Arbëreshë villages."),
    duration: dur(4),
    bag: "40 x 20 x 25 cm, 8 kg",
    departures: [
      d("2026-11-27", "2026-11-30", 721),
      d("2027-03-19", "2027-03-22", 681),
    ],
    days: [
      t("Fluturim Tiranë – Lamezia Terme (07:30). Pizzo, Tropea, Scilla dhe Reggio Calabria.", "Flight Tirana – Lamezia Terme (07:30). Pizzo, Tropea, Scilla and Reggio Calabria."),
      t("Catanzaro, fshatrat arbëreshë (Caraffa, Vena, Zangarona) dhe Lamezia Terme.", "Catanzaro, the Arbëreshë villages (Caraffa, Vena, Zangarona) and Lamezia Terme."),
      t("Cosenza, fshatrat arbëreshë (Lungro, Civita, Frascineto), Le Castella dhe Crotone.", "Cosenza, the Arbëreshë villages (Lungro, Civita, Frascineto), Le Castella and Crotone."),
      t("Fluturim Lamezia Terme – Tiranë (06:05), arritja 07:30.", "Flight Lamezia Terme – Tirana (06:05), arriving 07:30."),
    ],
  },
  {
    slug: "valencia-sevilje-madrid", image: "/images/offers/valencia-sevilje-madrid.jpg",
    active: true,
    region: "spain",
    title: t("Valencia, Sevilje & Madrid", "Valencia, Seville & Madrid"),
    tagline: t("Andaluzia: Granada, Malaga, Sevilje dhe Córdoba.", "Andalusia: Granada, Málaga, Seville and Córdoba."),
    duration: dur(6),
    bag: "40 x 20 x 25 cm",
    departures: [d("2027-04-19", "2027-04-24", 1012)],
    days: [
      t("Fluturim direkt Tiranë – Valencia (18:35), arritja 21:35.", "Direct flight Tirana – Valencia (18:35), arriving 21:35."),
      t("Valencia, pastaj Granada: pallati i Alhambrës dhe kopshtet Generalife.", "Valencia, then Granada: the Alhambra and the Generalife gardens."),
      t("Malaga dhe Sevilje: Plaza de España, Kulla e Artë dhe Katedralja.", "Málaga and Seville: Plaza de España, the Torre del Oro and the Cathedral."),
      t("Córdoba (Alcázar dhe Xhamia), pastaj Madrid.", "Córdoba (the Alcázar and the Mosque), then Madrid."),
      t("Madrid me guidë: Gran Vía, Pallati Mbretëror dhe Santiago Bernabéu.", "Madrid with a guide: Gran Vía, the Royal Palace and Santiago Bernabéu."),
      t("Toledo. Fluturim direkt Madrid – Tiranë (20:10), arritja 23:20.", "Toledo. Direct flight Madrid – Tirana (20:10), arriving 23:20."),
    ],
    includes: [t("5 netë akomodim", "5 nights accommodation")],
  },
  {
    slug: "colmar-strasburg", image: "/images/offers/colmar-strasburg.jpg",
    active: true,
    region: "europe",
    title: t("Colmar & Strasburg", "Colmar & Strasbourg"),
    tagline: t("Alsasa magjike dhe Baden-Baden në 2 ditë.", "Magical Alsace and Baden-Baden in 2 days."),
    duration: dur(2),
    departures: [
      d("2026-11-09", "2026-11-10", 644),
      d("2026-12-07", "2026-12-08", 710),
    ],
    days: [
      t("Fluturim Tiranë – Bazel (05:50). Mulhouse dhe Colmar (\"Venecia e Vogël\"). Fjetje në Strasburg.", "Flight Tirana – Basel (05:50). Mulhouse and Colmar (\"Little Venice\"). Overnight in Strasbourg."),
      t("Strasburg (UNESCO): Katedralja, Petite France. Pastaj Baden-Baden. Fluturim Baden-Baden – Tiranë (18:40), arritja 20:45.", "Strasbourg (UNESCO): the Cathedral and Petite France. Then Baden-Baden. Flight Baden-Baden – Tirana (18:40), arriving 20:45."),
    ],
    includes: [t("1 natë akomodim", "1 night accommodation")],
    notes: [
      t("Më 10 Nëntor fluturimi i kthimit është në orën 15:00, prandaj programi nis më herët nga hoteli.", "On 10 November the return flight is at 15:00, so the program starts earlier from the hotel."),
    ],
  },
  {
    slug: "amsterdam-bruksel", image: "/images/offers/amsterdam-bruksel.jpg",
    active: true,
    region: "europe",
    title: t("Amsterdam & Bruksel", "Amsterdam & Brussels"),
    tagline: t("Bruksel, Bruges, Hagë, Rotterdam dhe Amsterdam.", "Brussels, Bruges, The Hague, Rotterdam and Amsterdam."),
    duration: dur(4),
    departures: [
      d("2026-11-26", "2026-11-29", 898),
      d("2027-04-01", "2027-04-04", 985),
    ],
    days: [
      t("Fluturim Tiranë – Bruksel (06:00), arritja 09:00. Grand Place, Katedralja e Shën Mikelit, pastaj Bruges. Fjetje pranë kufirit Belg – Holandez.", "Flight Tirana – Brussels (06:00), arriving 09:00. Grand Place, St. Michael's Cathedral, then Bruges. Overnight near the Belgian – Dutch border."),
      t("Hagë dhe Rotterdam. Pasdite nisja për Amsterdam.", "The Hague and Rotterdam. Afternoon departure for Amsterdam."),
      t("Amsterdam: Sheshi Dam dhe Sheshi i Muzeve. Opsionale: lundrim në kanale.", "Amsterdam: Dam Square and Museum Square. Optional: canal cruise."),
      t("Transferi në Bruksel. Fluturim direkt Bruksel – Tiranë (16:45), arritja 19:15.", "Transfer to Brussels. Direct flight Brussels – Tirana (16:45), arriving 19:15."),
    ],
  },
  {
    slug: "rome", image: "/images/offers/rome.jpg",
    active: true,
    region: "italy",
    title: t("Romë", "Rome"),
    tagline: t("Koloseu, Fontana di Trevi dhe Vatikani në 2 ditë.", "The Colosseum, Trevi Fountain and the Vatican in 2 days."),
    duration: dur(2),
    departures: [
      d("2026-11-27", "2026-11-28", 538),
      d("2027-02-26", "2027-02-27", 573),
    ],
    days: [
      t("Fluturim Tiranë – Romë (06:00), arritja 07:40. Piazza del Popolo, Fontana di Trevi, Pantheon, Piazza Navona dhe Koloseu.", "Flight Tirana – Rome (06:00), arriving 07:40. Piazza del Popolo, Trevi Fountain, Pantheon, Piazza Navona and the Colosseum."),
      t("Sheshi San Pietro, Vatikani dhe Castel Sant'Angelo. Fluturim Romë – Tiranë (19:45), arritja 21:20.", "St. Peter's Square, the Vatican and Castel Sant'Angelo. Flight Rome – Tirana (19:45), arriving 21:20."),
    ],
    includes: [t("1 natë akomodim", "1 night accommodation")],
  },
  {
    slug: "barcelona", image: "/images/offers/barcelona.jpg",
    active: true,
    region: "spain",
    title: t("Barcelonë", "Barcelona"),
    tagline: t("Gaudí, plazhet urbane dhe Passeig de Gràcia.", "Gaudí, city beaches and Passeig de Gràcia."),
    duration: dur(4),
    departures: [
      d("2026-11-29", "2026-12-02", 798),
      d("2026-12-05", "2026-12-08", 798),
      d("2027-01-14", "2027-01-17", 641),
      d("2027-02-12", "2027-02-15", 700),
      d("2027-03-06", "2027-03-09", 813),
    ],
    days: [
      t("Fluturim direkt Tiranë – Barcelonë (20:00), arritja 22:40.", "Direct flight Tirana – Barcelona (20:00), arriving 22:40."),
      t("Passeig de Gràcia, Casa Batlló, Casa Milà, lagjja Gotike dhe Katedralja.", "Passeig de Gràcia, Casa Batlló, Casa Milà, the Gothic Quarter and the Cathedral."),
      t("Park Güell, Sagrada Família, Montjuïc, Las Ramblas, Marina Olimpike dhe stadiumi Camp Nou.", "Park Güell, Sagrada Família, Montjuïc, Las Ramblas, the Olympic Marina and Camp Nou."),
      t("Opsionale: Montserrat. Fluturim direkt Barcelonë – Tiranë (23:25), arritja 01:55.", "Optional: Montserrat. Direct flight Barcelona – Tirana (23:25), arriving 01:55."),
    ],
    extras: [
      t("Udhëtimi për në Montserrat: 15€ (fëmijë deri në 10 vjeç: 7€)", "Trip to Montserrat: €15 (children up to 10: €7)"),
      t("Hyrja në manastirin e Montserratit: 22€ (fëmijë deri në 10 vjeç: 15€)", "Montserrat monastery entry: €22 (children up to 10: €15)"),
      t("Hyrja në Park Güell: 16€", "Park Güell entry: €16"),
      t("Hyrja në Camp Nou: me kërkesë, çmimi ndryshon", "Camp Nou entry: on request, the price varies"),
    ],
    notes: [
      t("Biletat e hyrjes rezervohen paraprakisht gjatë rezervimit të turit.", "Entry tickets are booked in advance when you book the tour."),
    ],
  },
  {
    slug: "milano-liqenet", image: "/images/offers/milano-liqenet.jpg",
    active: true,
    region: "italy",
    title: t("Milano & liqenet", "Milan & the lakes"),
    tagline: t("Milano dhe liqenet Garda, Como dhe Maggiore.", "Milan and Lakes Garda, Como and Maggiore."),
    duration: dur(4),
    departures: [d("2027-03-19", "2027-03-22", 861)],
    days: [
      t("Fluturim direkt Tiranë – Milano (06:10). Liqeni Garda: Garda, Riva del Garda dhe Sirmione.", "Direct flight Tirana – Milan (06:10). Lake Garda: Garda, Riva del Garda and Sirmione."),
      t("Milano: Kështjella Sforzesco, Duomo, Galeria Vittorio Emanuele II dhe Teatri La Scala.", "Milan: Sforza Castle, the Duomo, Galleria Vittorio Emanuele II and La Scala."),
      t("Liqeni Como: Como dhe Tremezzo. Fjetje pranë Luganos.", "Lake Como: Como and Tremezzo. Overnight near Lugano."),
      t("Lugano dhe liqeni Maggiore (Locarno, Cannobio, Verbania). Fluturim Milano Malpensa – Tiranë (22:20), arritja 00:15.", "Lugano and Lake Maggiore (Locarno, Cannobio, Verbania). Flight Milan Malpensa – Tirana (22:20), arriving 00:15."),
    ],
    extras: [
      t("Traget Riva del Garda – Limone – Malcesine: 25€", "Ferry Riva del Garda – Limone – Malcesine: €25"),
      t("Traget Tremezzo – Bellagio – Menaggio: 25€", "Ferry Tremezzo – Bellagio – Menaggio: €25"),
    ],
  },
];