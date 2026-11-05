"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, SlidersHorizontal, Star } from "lucide-react";
import { allBoards, boardLabels, type Board } from "@/data/hotel-pricing";
import { useLang } from "@/components/LanguageProvider";
import BookButton from "./BookButton";
import ScrollRow from "./ScrollRow";

export type HotelCard = {
  slug: string;
  name: string;
  region: string;
  country: string;
  location: string;
  category: string;
  stars: number;
  image: string;
  from: number | null;
  boards: Board[];
};

// All the words here, in both languages. Change them here.
const labels = {
  sq: {
    all: "Të gjitha",
    stars: "Yje",
    service: "Shërbimi",
    filters: "Filtra",
    clear: "Pastro filtrat",
    count: "hotele",
    details: "Detaje",
    book: "Rezervo",
    from: "nga",
    perNight: "për person / natë",
    askPrice: "Çmimi: pyet për ofertë",
    photoSoon: "Foto së shpejti",
    swipe: "Rrëshqit për më shumë",
    none: "Asnjë hotel me këto filtra.",
  },
  en: {
    all: "All",
    stars: "Stars",
    service: "Service",
    filters: "Filters",
    clear: "Clear filters",
    count: "hotels",
    details: "Details",
    book: "Book",
    from: "from",
    perNight: "per person / night",
    askPrice: "Price: ask for an offer",
    photoSoon: "Photo coming soon",
    swipe: "Swipe for more",
    none: "No hotels match these filters.",
  },
};

// Albanian names of the countries (the data uses English names).
const countryNamesSq: Record<string, string> = {
  Albania: "Shqipëri",
  Turkey: "Turqi",
  Egypt: "Egjipt",
};

function sectionId(region: string) {
  return region
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const pill = (active: boolean) =>
  `min-h-[44px] shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition ${
    active
      ? "bg-red-600 text-white"
      : "border border-white/15 bg-neutral-900 text-gray-300 hover:border-red-500/60 hover:text-white"
  }`;

const cardClass =
  "group flex w-[78%] shrink-0 snap-center flex-col overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 transition duration-300 hover:border-red-500/60 hover:shadow-[0_0_40px_rgba(220,38,38,0.25)] md:w-[calc((100%_-_1rem)/2)] md:snap-start xl:w-[calc((100%_-_2rem)/3)]";

export default function HotelsBrowser({ cards }: { cards: HotelCard[] }) {
  const { lang } = useLang();
  const t = labels[lang];
  const [country, setCountry] = useState("");
  const [stars, setStars] = useState(0);
  const [service, setService] = useState<Board | "">("");
  const [open, setOpen] = useState(false);

  const countryName = (name: string) => (lang === "sq" ? (countryNamesSq[name] ?? name) : name);

  const countries = Array.from(new Set(cards.map((c) => c.country)));
  const starOptions = Array.from(
    new Set(cards.map((c) => c.stars).filter((s) => s > 0))
  ).sort((a, b) => b - a);
  const serviceOptions = allBoards.filter((b) => cards.some((c) => c.boards.includes(b)));

  const visible = cards.filter(
    (c) =>
      (!country || c.country === country) &&
      (!stars || c.stars === stars) &&
      (!service || c.boards.includes(service))
  );
  const regions = Array.from(new Set(visible.map((c) => c.region)));
  const filtered = !!country || !!stars || !!service;
  const extraCount = (stars ? 1 : 0) + (service ? 1 : 0);

  function clear() {
    setCountry("");
    setStars(0);
    setService("");
  }

  const label = "text-xs font-bold uppercase tracking-wider text-gray-500";

  return (
    <>
      <section className="px-5">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button type="button" onClick={() => setCountry("")} className={pill(!country)}>
              {t.all}
            </button>
            {countries.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setCountry(country === name ? "" : name)}
                className={pill(country === name)}
              >
                {countryName(name)}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              className={`flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-bold transition hover:text-white ${
                open || extraCount > 0
                  ? "border-red-500 text-white"
                  : "border-white/15 text-gray-300 hover:border-red-500/60"
              }`}
            >
              <SlidersHorizontal size={16} />
              {t.filters}
              {extraCount > 0 && ` (${extraCount})`}
            </button>
          </div>

          {open && (
            <div className="mx-auto mt-4 w-fit max-w-full space-y-4 rounded-2xl border border-white/10 bg-neutral-900/60 p-4">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className={label}>{t.stars}</span>
                {starOptions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStars(stars === s ? 0 : s)}
                    className={pill(stars === s)}
                  >
                    {s} ★
                  </button>
                ))}
              </div>

              {serviceOptions.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className={label}>{t.service}</span>
                  {serviceOptions.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setService(service === b ? "" : b)}
                      className={pill(service === b)}
                    >
                      {boardLabels[b]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {filtered && (
            <div className="mt-3 text-center">
              <button
                type="button"
                onClick={clear}
                className="min-h-[44px] text-sm font-bold text-red-500 hover:text-red-400"
              >
                {t.clear}
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="px-5 pb-24 pt-8">
        <div className="mx-auto max-w-7xl">
          {visible.length === 0 && (
            <p className="py-10 text-center text-gray-400">{t.none}</p>
          )}

          {regions.map((region) => {
            const items = visible.filter((c) => c.region === region);

            return (
              <div key={region} id={sectionId(region)} className="mb-10 scroll-mt-28 sm:mb-14">
                <div className="mb-5 flex items-end justify-between gap-4">
                  <h2 className="min-w-0 break-words text-xl font-bold uppercase tracking-wide sm:text-2xl">
                    {region}
                  </h2>
                  <p className="shrink-0 text-sm text-gray-500">
                    {items.length} {t.count}
                  </p>
                </div>

                <ScrollRow>
                  {items.map((card) => (
                    <article key={card.slug} className={cardClass}>
                      <div className="relative aspect-[4/3] bg-gradient-to-br from-neutral-800 to-neutral-950">
                        {card.image ? (
                          <Image
                            src={card.image}
                            alt={card.name}
                            fill
                            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 78vw"
                            className="object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <p className="flex h-full items-center justify-center text-sm text-gray-600">
                            {t.photoSoon}
                          </p>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <span className="absolute left-3 top-3 max-w-[85%] truncate rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                          {card.category}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <p className="flex items-center gap-1.5 text-xs text-gray-400">
                          <MapPin size={14} className="shrink-0 text-red-500" />
                          {card.location}
                        </p>
                        <h3 className="mt-2 break-words text-lg font-extrabold uppercase leading-tight tracking-wide">
                          {card.name}
                        </h3>

                        {card.stars > 0 && (
                          <div className="mt-2 flex gap-0.5">
                            {Array.from({ length: card.stars }, (_, i) => (
                              <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        )}

                        <p className="mt-4 text-sm text-gray-400">
                          {card.from !== null ? (
                            <>
                              {t.from}{" "}
                              <span className="text-xl font-extrabold text-red-500">
                                {card.from}€
                              </span>{" "}
                              {t.perNight}
                            </>
                          ) : (
                            t.askPrice
                          )}
                        </p>

                        <div className="mt-auto grid grid-cols-2 gap-3 pt-5">
                          <Link
                            href={`/hotels/${card.slug}`}
                            className="min-h-[44px] rounded-full border border-white/30 px-2 py-3 text-center text-sm font-bold leading-tight transition hover:bg-white hover:text-black"
                          >
                            {t.details}
                          </Link>
                          <BookButton
                            slug={card.slug}
                            className="min-h-[44px] rounded-full bg-red-600 px-2 py-3 text-sm font-bold leading-tight text-white transition hover:bg-red-700"
                          >
                            {t.book}
                          </BookButton>
                        </div>
                      </div>
                    </article>
                  ))}
                </ScrollRow>

                <p className="mt-1 text-center text-xs text-gray-500 md:hidden">
                  {t.swipe} &rarr;
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}