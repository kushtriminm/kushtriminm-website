"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MapPin, Search, MessageCircle, Star } from "lucide-react";

const WHATSAPP = "https://wa.me/38349833888";

type Hotel = {
  name: string;
  destination: string;
  stars?: number;
  price?: number;
  priceText?: string;
  board?: string;
  description: string;
  tags: string[];
};

const destinations = [
  "Të gjitha",
  "Durrës",
  "Golem",
  "Mali i Robit",
  "Sarandë",
  "Vlorë",
  "Shëngjin",
  "Tiranë",
  "Himarë",
  "Dhërmi",
  "Qerret",
  "Orikum",
];

const hotels: Hotel[] = [

  // =====================================================
  // GOLEM / DURRËS
  // =====================================================

  {
    name: "Amelia Mare",
    destination: "Golem",
    stars: 5,
    price: 75,
    board: "All Inclusive",
    description:
      "Hotel modern 5★ në Golem, ideal për familje dhe pushime All Inclusive pranë plazhit.",
    tags: ["All Inclusive", "Beach", "Pool", "Family"],
  },

  {
    name: "Diamma Resort",
    destination: "Golem",
    stars: 5,
    price: 35.5,
    board: "BB",
    description:
      "Resort pranë Shkëmbit të Kavajës me ambiente moderne, SPA, pishinë të brendshme dhe restorant.",
    tags: ["SPA", "Pool", "Beach", "Luxury"],
  },

  {
    name: "Bonita Classic Hotel & SPA",
    destination: "Golem",
    stars: 5,
    price: 75,
    board: "All Inclusive",
    description:
      "Hotel 5★ në vijë të parë me pishina, SPA, plazh dhe ambiente të përshtatshme për familje.",
    tags: ["All Inclusive", "SPA", "Beach", "Family"],
  },

  {
    name: "Bonita Luxory",
    destination: "Golem",
    stars: 5,
    price: 70,
    board: "All Inclusive",
    description:
      "Hotel modern pranë plazhit me Aqua Park për fëmijë dhe të rritur.",
    tags: ["Aqua Park", "Family", "Beach", "All Inclusive"],
  },

  {
    name: "Fafa Palace",
    destination: "Golem",
    stars: 5,
    price: 78,
    board: "All Inclusive",
    description:
      "Resort i madh në Golem me ambiente të shumta, pishina dhe shërbim All Inclusive.",
    tags: ["All Inclusive", "Pool", "SPA", "Family"],
  },

  {
    name: "Garden Palace Hotel",
    destination: "Golem",
    stars: 4,
    price: 65,
    board: "BB",
    description:
      "Hotel pranë plazhit me pishinë të jashtme, kopsht, restorant dhe parking.",
    tags: ["Pool", "Beach", "Parking", "Family"],
  },

  {
    name: "PINEA Hotel Resort & SPA",
    destination: "Mali i Robit",
    stars: 5,
    price: 65,
    board: "BB",
    description:
      "Resort pranë plazhit privat me SPA, sauna, palestër, kids club dhe pishinë.",
    tags: ["SPA", "Private Beach", "Kids Club", "Pool"],
  },

  {
    name: "Delight Hotel & SPA",
    destination: "Mali i Robit",
    stars: 4,
    price: 75,
    board: "All Inclusive",
    description:
      "Hotel familjar me pishinë, jacuzzi, palestër, restorant dhe ambiente për fëmijë.",
    tags: ["SPA", "Family", "Pool", "Restaurant"],
  },

  {
    name: "Prestige Resort",
    destination: "Mali i Robit",
    stars: 5,
    description:
      "Resort me vila pranë plazhit, me mundësi BB, HB dhe FB sipas zgjedhjes.",
    tags: ["Beach", "Villas", "Family", "Resort"],
  },

  {
    name: "Kraja Hotel",
    destination: "Durrës",
    stars: 4,
    price: 58,
    board: "BB",
    description:
      "Hotel direkt në plazh me plazh privat, pishinë, kopsht dhe dhoma me pamje nga deti.",
    tags: ["Beach", "Pool", "Sea View", "Parking"],
  },

  {
    name: "Blue Marine",
    destination: "Durrës",
    stars: 4,
    price: 30,
    board: "BB",
    description:
      "Hotel në Shkëmbin e Kavajës, shumë pranë plazhit, me pishinë dhe parking.",
    tags: ["Beach", "Pool", "Parking", "Wi-Fi"],
  },

  {
    name: "Royal G",
    destination: "Durrës",
    stars: 5,
    description:
      "Hotel luksoz pranë plazhit me pishina, SPA dhe zonë private plazhi.",
    tags: ["5 Star", "SPA", "Beach", "Pool"],
  },

  {
    name: "VM Resort",
    destination: "Golem",
    stars: 5,
    description:
      "Resort 5★ me SPA & Wellness, restorant, bar dhe ambiente moderne.",
    tags: ["5 Star", "SPA", "Wellness", "Pool"],
  },

  {
    name: "Grand Blue Fafa",
    destination: "Golem",
    stars: 5,
    description:
      "Resort i madh pranë detit, ideal për pushime familjare dhe All Inclusive.",
    tags: ["Beach", "Family", "Pool", "Resort"],
  },

  {
    name: "Martiness Hotel",
    destination: "Golem",
    stars: 5,
    description:
      "Hotel modern pranë bregdetit me ambiente elegante dhe shërbime turistike.",
    tags: ["Beach", "Luxury", "Pool", "Family"],
  },

  {
    name: "Klajdi Resort & SPA",
    destination: "Golem",
    stars: 5,
    description:
      "Resort pranë detit me SPA, pishinë dhe ambiente relaksi.",
    tags: ["SPA", "Beach", "Pool", "Luxury"],
  },

  {
    name: "Royal G Max Hotel & SPA",
    destination: "Durrës",
    stars: 5,
    description:
      "Hotel modern me SPA dhe ambiente luksoze pranë bregdetit.",
    tags: ["5 Star", "SPA", "Beach", "Luxury"],
  },

  {
    name: "Durres Bay Hotel",
    destination: "Durrës",
    stars: 4,
    description:
      "Hotel pranë bregdetit, i përshtatshëm për pushime familjare dhe çifte.",
    tags: ["Beach", "Family", "Restaurant"],
  },

  {
    name: "Albatros Beach Resort",
    destination: "Durrës",
    stars: 4,
    description:
      "Resort pranë detit me ambiente për pushime verore.",
    tags: ["Beach", "Pool", "Family"],
  },

  {
    name: "Premium Beach Hotel",
    destination: "Durrës",
    stars: 5,
    description:
      "Hotel premium në zonën bregdetare të Durrësit.",
    tags: ["Beach", "Luxury", "Pool"],
  },

  {
    name: "Fafa Premium",
    destination: "Durrës",
    stars: 5,
    description:
      "Resort modern me ambiente premium pranë plazhit.",
    tags: ["Beach", "Luxury", "Pool"],
  },

  {
    name: "Adria Palace",
    destination: "Golem",
    stars: 4,
    description:
      "Hotel pranë bregdetit në zonën e Golemit.",
    tags: ["Beach", "Family", "Pool"],
  },

  {
    name: "Bleart",
    destination: "Golem",
    stars: 4,
    description:
      "Hotel pranë plazhit në zonën e Golemit.",
    tags: ["Beach", "Pool", "Family"],
  },

  {
    name: "Roden Hotel",
    destination: "Golem",
    stars: 4,
    description:
      "Hotel në zonën e Golemit, i përshtatshëm për pushime verore.",
    tags: ["Beach", "Family"],
  },

  // =====================================================
  // SARANDË
  // =====================================================

  {
    name: "Vola Hotel",
    destination: "Sarandë",
    stars: 4,
    price: 95,
    board: "BB",
    description:
      "Hotel buzë detit me dhoma me ballkon dhe pamje nga deti, pishinë, parking dhe Wi-Fi.",
    tags: ["Sea View", "Beach", "Pool", "BB"],
  },

  {
    name: "Grand Sarande",
    destination: "Sarandë",
    stars: 4,
    description:
      "Hotel në vijë të parë në qendër të Sarandës, me dhoma dhe suita me pamje nga deti.",
    tags: ["Sea View", "Beach", "City Center"],
  },

  {
    name: "San Angelo Luxury Resort",
    destination: "Sarandë",
    stars: 5,
    description:
      "Resort luksoz pranë Sarandës me ambiente moderne dhe pamje të bukura.",
    tags: ["Luxury", "Sea View", "Resort"],
  },

  {
    name: "Saranda Palace",
    destination: "Sarandë",
    stars: 4,
    description:
      "Hotel pranë detit me ambiente për pushime familjare dhe çifte.",
    tags: ["Beach", "Pool", "Family"],
  },

  {
    name: "Joelle Premium Hotel",
    destination: "Sarandë",
    stars: 5,
    description:
      "Hotel premium me ambiente moderne pranë bregdetit të Sarandës.",
    tags: ["Luxury", "Beach", "Pool"],
  },

  {
    name: "Andon Lapa & SPA",
    destination: "Sarandë",
    stars: 4,
    description:
      "Hotel me SPA dhe ambiente relaksi pranë bregdetit.",
    tags: ["SPA", "Beach", "Pool"],
  },

  {
    name: "Hotel Brilant",
    destination: "Sarandë",
    stars: 4,
    description:
      "Hotel pranë detit, ideal për pushime në Sarandë.",
    tags: ["Beach", "Sea View", "Family"],
  },

  {
    name: "Hotel Sejko",
    destination: "Sarandë",
    stars: 3,
    description:
      "Hotel pranë bregdetit në Sarandë.",
    tags: ["Beach", "Family"],
  },

  {
    name: "Mucobega",
    destination: "Sarandë",
    stars: 4,
    description:
      "Resort pranë detit me pishinë dhe ambiente për pushime.",
    tags: ["Beach", "Pool", "Family"],
  },

  {
    name: "Panorama Hotel",
    destination: "Sarandë",
    stars: 4,
    description:
      "Hotel me pamje panoramike dhe ambiente për pushime në Sarandë.",
    tags: ["Sea View", "Pool", "Family"],
  },

  // =====================================================
  // VLORË
  // =====================================================

  {
    name: "Thea Hotel",
    destination: "Vlorë",
    stars: 4,
    description:
      "Hotel pranë Lungomares dhe Marina Bay, me dhoma me pamje nga deti.",
    tags: ["Sea View", "Beach", "Family"],
  },

  {
    name: "Aerial Hotel & SPA",
    destination: "Vlorë",
    stars: 4,
    description:
      "Hotel pranë tunelit të Vlorës, me SPA dhe dhoma me pamje nga deti.",
    tags: ["SPA", "Sea View", "Family"],
  },

  {
    name: "Regina City",
    destination: "Vlorë",
    stars: 4,
    description:
      "Hotel modern në Vlorë, pranë detit dhe Lungomares.",
    tags: ["Beach", "Pool", "City"],
  },

  {
    name: "Diamond Hill Resort",
    destination: "Vlorë",
    stars: 5,
    description:
      "Resort modern me ambiente relaksi dhe pishina.",
    tags: ["Resort", "Pool", "Family"],
  },

  {
    name: "Valza Boutique Hotel",
    destination: "Vlorë",
    stars: 4,
    description:
      "Boutique hotel me ambiente moderne pranë bregdetit.",
    tags: ["Boutique", "Beach", "Luxury"],
  },

  {
    name: "Royal Hotel",
    destination: "Vlorë",
    stars: 4,
    description:
      "Hotel pranë bregdetit të Vlorës.",
    tags: ["Beach", "Family"],
  },

  {
    name: "Kraal",
    destination: "Vlorë",
    stars: 4,
    description:
      "Hotel modern në zonën e Vlorës.",
    tags: ["Beach", "Family", "Pool"],
  },

  // =====================================================
  // SHËNGJIN
  // =====================================================

  {
    name: "Rafaelo Deluxe & SPA",
    destination: "Shëngjin",
    stars: 5,
    description:
      "Resort premium në Shëngjin me SPA dhe ambiente moderne.",
    tags: ["5 Star", "SPA", "Beach", "Luxury"],
  },

  {
    name: "Rafaelo Executive SPA",
    destination: "Shëngjin",
    stars: 5,
    description:
      "Hotel premium me SPA dhe ambiente pranë detit.",
    tags: ["5 Star", "SPA", "Beach"],
  },

  {
    name: "Rafaelo Comfort",
    destination: "Shëngjin",
    stars: 4,
    description:
      "Hotel familjar pranë plazhit të Shëngjinit.",
    tags: ["Beach", "Family", "Pool"],
  },

  {
    name: "Great White Hotel",
    destination: "Shëngjin",
    stars: 4,
    description:
      "Hotel modern pranë plazhit të Shëngjinit.",
    tags: ["Beach", "Family", "Pool"],
  },

  {
    name: "MiraMar Hotel",
    destination: "Shëngjin",
    stars: 4,
    description:
      "Hotel pranë detit me ambiente moderne.",
    tags: ["Beach", "Family"],
  },

  {
    name: "Twin Towers",
    destination: "Shëngjin",
    stars: 4,
    description:
      "Hotel pranë plazhit të Shëngjinit.",
    tags: ["Beach", "Family"],
  },

  // =====================================================
  // TIRANË
  // =====================================================

  {
    name: "MAK Albania",
    destination: "Tiranë",
    stars: 5,
    description:
      "Hotel luksoz në Tiranë, i përshtatshëm për qëndrime biznesi dhe city breaks.",
    tags: ["5 Star", "City", "Luxury"],
  },

  {
    name: "Balkan Crest Resort & SPA",
    destination: "Tiranë",
    stars: 5,
    description:
      "Resort me SPA dhe ambiente relaksi pranë Tiranës.",
    tags: ["SPA", "Resort", "Luxury"],
  },

  {
    name: "Te Stela Resort",
    destination: "Tiranë",
    stars: 4,
    description:
      "Resort me ambiente sportive, pishina dhe restorant.",
    tags: ["Resort", "Pool", "Family"],
  },

  // =====================================================
  // HIMARË
  // =====================================================

  {
    name: "Nia Boutique by Rapos",
    destination: "Himarë",
    stars: 4,
    description:
      "Boutique hotel pranë bregdetit të Himarës.",
    tags: ["Boutique", "Beach", "Sea View"],
  },

  {
    name: "Rapos Resort",
    destination: "Himarë",
    stars: 4,
    description:
      "Resort pranë detit me ambiente për pushime.",
    tags: ["Beach", "Resort", "Family"],
  },

  // =====================================================
  // DHËRMI
  // =====================================================

  {
    name: "Empire Beach Resort",
    destination: "Dhërmi",
    stars: 5,
    description:
      "Resort premium buzë detit në Dhërmi.",
    tags: ["5 Star", "Beach", "Luxury"],
  },

  {
    name: "Elysium Hotel",
    destination: "Dhërmi",
    stars: 5,
    description:
      "Hotel luksoz me pamje nga deti dhe ambiente moderne.",
    tags: ["Luxury", "Sea View", "Pool"],
  },

  // =====================================================
  // ORIKUM
  // =====================================================

  {
    name: "D'Azur Resort",
    destination: "Orikum",
    stars: 4,
    description:
      "Resort pranë detit në Orikum.",
    tags: ["Beach", "Resort", "Pool"],
  },

  {
    name: "Regina Palma",
    destination: "Orikum",
    stars: 4,
    description:
      "Hotel pranë bregdetit në Orikum.",
    tags: ["Beach", "Family"],
  },

  {
    name: "Safin Hotel & SPA",
    destination: "Orikum",
    stars: 4,
    description:
      "Hotel me SPA dhe ambiente relaksi pranë bregdetit.",
    tags: ["SPA", "Beach", "Pool"],
  },

  {
    name: "Maor Hotel",
    destination: "Orikum",
    stars: 4,
    description:
      "Hotel pranë plazhit të Orikumit.",
    tags: ["Beach", "Family"],
  },

  // =====================================================
  // QERRET
  // =====================================================

  {
    name: "Blumare Resort",
    destination: "Qerret",
    stars: 4,
    description:
      "Resort pranë plazhit në Qerret.",
    tags: ["Beach", "Resort", "Family"],
  },

  {
    name: "Bounty",
    destination: "Qerret",
    stars: 4,
    description:
      "Hotel pranë bregdetit në Qerret.",
    tags: ["Beach", "Family"],
  },

];

export default function HotelsPage() {
  const [selectedDestination, setSelectedDestination] =
    useState("Të gjitha");

  const [search, setSearch] = useState("");

  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      const matchesDestination =
        selectedDestination === "Të gjitha" ||
        hotel.destination === selectedDestination;

      const matchesSearch =
        hotel.name.toLowerCase().includes(search.toLowerCase()) ||
        hotel.destination.toLowerCase().includes(search.toLowerCase());

      return matchesDestination && matchesSearch;
    });
  }, [selectedDestination, search]);

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HERO */}

      <section className="relative overflow-hidden px-6 pb-20 pt-40">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(220,38,38,0.18),_transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl text-center">

          <p className="font-semibold uppercase tracking-[0.35em] text-red-500">
            Kushtrimi NM Worldwide
          </p>

          <h1 className="mt-5 text-5xl font-black md:text-7xl">
            Hotels in Albania
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            Zgjidhni hotelin tuaj të preferuar në Shqipëri dhe na kontaktoni
            për të kontrolluar disponueshmërinë.
          </p>

        </div>

      </section>

      {/* SEARCH */}

      <section className="sticky top-[70px] z-30 border-y border-neutral-800 bg-black/95 py-5 backdrop-blur-xl">

        <div className="mx-auto max-w-7xl px-6">

          <div className="relative">

            <Search
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              placeholder="Kërko hotelin ose destinacionin..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-neutral-700 bg-neutral-900 py-4 pl-14 pr-6 text-white outline-none transition focus:border-red-500"
            />

          </div>

          {/* DESTINATIONS */}

          <div className="mt-5 flex gap-3 overflow-x-auto pb-2">

            {destinations.map((destination) => (

              <button
                key={destination}
                onClick={() => setSelectedDestination(destination)}
                className={`whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                  selectedDestination === destination
                    ? "border-red-600 bg-red-600 text-white"
                    : "border-neutral-700 bg-neutral-900 text-gray-300 hover:border-red-500 hover:text-white"
                }`}
              >
                {destination}
              </button>

            ))}

          </div>

        </div>

      </section>

      {/* HOTELS */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="mb-10 flex items-end justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-500">
              {selectedDestination}
            </p>

            <h2 className="mt-2 text-3xl font-black md:text-4xl">
              {filteredHotels.length} Hotels
            </h2>

          </div>

          <p className="hidden text-sm text-gray-500 md:block">
            Çmimet janë sipas ofertave të publikuara
          </p>

        </div>

        {filteredHotels.length === 0 ? (

          <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-16 text-center">

            <h3 className="text-2xl font-bold">
              Nuk u gjet asnjë hotel
            </h3>

            <p className="mt-3 text-gray-400">
              Provoni një destinacion tjetër ose kërkim tjetër.
            </p>

          </div>

        ) : (

          <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">

            {filteredHotels.map((hotel) => (

              <article
                key={`${hotel.destination}-${hotel.name}`}
                className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-neutral-800 bg-neutral-950 transition duration-300 hover:-translate-y-2 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-900/10"
              >

                {/* IMAGE PLACEHOLDER */}

                <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-800 via-neutral-900 to-black">

                  <div className="text-center">

                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600/10 text-red-500">
                      <MapPin size={30} />
                    </div>

                    <p className="text-sm text-gray-500">
                      Foto e hotelit
                    </p>

                    <p className="mt-1 text-xs text-gray-600">
                      Do të shtohet
                    </p>

                  </div>

                  {/* DESTINATION BADGE */}

                  <div className="absolute left-5 top-5 rounded-full bg-black/80 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
                    {hotel.destination}
                  </div>

                </div>

                {/* CONTENT */}

                <div className="flex flex-1 flex-col p-7">

                  <div className="flex items-center justify-between gap-4">

                    <div>

                      <div className="flex items-center gap-1 text-yellow-400">

                        {Array.from({
                          length: hotel.stars || 4,
                        }).map((_, index) => (
                          <Star
                            key={index}
                            size={14}
                            fill="currentColor"
                          />
                        ))}

                      </div>

                      <h3 className="mt-2 text-2xl font-bold">
                        {hotel.name}
                      </h3>

                    </div>

                  </div>

                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">

                    <MapPin size={16} className="text-red-500" />

                    {hotel.destination}, Albania

                  </div>

                  <p className="mt-5 min-h-[72px] text-sm leading-7 text-gray-400">
                    {hotel.description}
                  </p>

                  {/* TAGS */}

                  <div className="mt-5 flex min-h-[64px] flex-wrap content-start gap-2">

                    {hotel.tags.slice(0, 4).map((tag) => (

                      <span
                        key={tag}
                        className="rounded-full bg-neutral-900 px-3 py-1.5 text-xs text-gray-300"
                      >
                        {tag}
                      </span>

                    ))}

                  </div>

                  {/* PRICE */}

                  <div className="mt-6 border-t border-neutral-800 pt-6">

                    {hotel.price ? (

                      <>

                        <p className="text-xs uppercase tracking-wider text-gray-500">
                          Nga
                        </p>

                        <div className="mt-1 flex items-end gap-2">

                          <span className="text-3xl font-black text-red-500">
                            €{hotel.price}
                          </span>

                          <span className="pb-1 text-sm text-gray-500">
                            / person / natë
                          </span>

                        </div>

                        {hotel.board && (
                          <p className="mt-1 text-sm font-semibold text-gray-300">
                            {hotel.board}
                          </p>
                        )}

                      </>

                    ) : (

                      <>

                        <p className="text-xs uppercase tracking-wider text-gray-500">
                          Çmimi
                        </p>

                        <p className="mt-1 text-2xl font-black text-white">
                          Kontaktoni për çmim
                        </p>

                      </>

                    )}

                  </div>

                  {/* BUTTONS */}

                  <div className="mt-7 grid grid-cols-2 gap-3">

                    <Link
                      href={`/hotels/${hotel.name
                        .toLowerCase()
                        .replace(/&/g, "and")
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)/g, "")}`}
                      className="rounded-full bg-red-600 py-3 text-center text-sm font-semibold transition hover:bg-red-700"
                    >
                      View Hotel
                    </Link>

                    <a
                      href={`${WHATSAPP}?text=${encodeURIComponent(
                        `Përshëndetje! Jam i interesuar për hotelin ${hotel.name} në ${hotel.destination}. A mund të kontrolloni disponueshmërinë dhe ofertën?`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-full border border-neutral-700 py-3 text-sm font-semibold transition hover:border-green-500 hover:bg-green-500/10 hover:text-green-400"
                    >
                      <MessageCircle size={17} />
                      Disponueshmëria
                    </a>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

      {/* BOTTOM CTA */}

      <section className="border-t border-neutral-900 bg-neutral-950 py-24">

        <div className="mx-auto max-w-4xl px-6 text-center">

          <p className="font-semibold uppercase tracking-[0.3em] text-red-500">
            Nuk e gjete hotelin?
          </p>

          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            Na trego çfarë po kërkon
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-gray-400">
            Na shkruani në WhatsApp dhe ekipi ynë do t'ju ndihmojë të
            gjeni hotelin dhe ofertën më të përshtatshme.
          </p>

          <a
            href={`${WHATSAPP}?text=${encodeURIComponent(
              "Përshëndetje! Jam duke kërkuar një hotel në Shqipëri. A mund të më ndihmoni?"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-red-600 px-8 py-4 font-semibold transition hover:scale-105 hover:bg-red-700"
          >
            <MessageCircle size={20} />
            Na kontaktoni në WhatsApp
          </a>

        </div>

      </section>

    </main>
  );
}