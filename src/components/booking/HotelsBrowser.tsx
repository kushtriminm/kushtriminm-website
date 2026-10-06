"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { allBoards, boardLabels, type Board } from "@/data/hotel-pricing";
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

// All the words here. Change them here.
const labels = {
  all: "Të gjitha",
  stars: "Yje",
  service: "Shërbimi",
  clear: "Pastro filtrat",
  count: "hotele",
  details: "Detaje",
  book: "Rezervo",
  from: "nga",
  perNight: "për person / natë",
  askPrice: "Çmimi: pyet për ofertë",
  photoSoon: "Foto së shpejti",
  swipe: "Swipe for more",
  none: "Asnjë hotel me këto filtra.",
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
  `shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition ${
    active
      ? "bg-red-600 text-white"
      : "border border-white/15 bg-neutral-900 text-gray-300 hover:border-red-500/60 hover:text-white"
  }`;

const cardClass =
  "group flex w-[78%] shrink-0 snap-center flex-col overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 transition duration-300 hover:border-red-500/60 hover:shadow-[0_0_40px_rgba(220,38,38,0.25)] md:w-[calc((100%_-_1rem)/2)] md:snap-start xl:w-[calc((100%_-_2rem)/3)]";

export default function HotelsBrowser({ cards }: { cards: HotelCard[] }) {
  const [country, setCountry] = useState("");
  const [stars, setStars] = useState(0);
  const [service, setService] = useState<Board | "">("");

  const countries = Array.from(new Set(cards.map((c) => c.country)));
  const starOptions = Array.from(
    new Set(cards.map((c) => c.stars).filter((s) => s > 0))
  ).sort((a, b) => b - a);
  const serviceOptions = allBoards.filter((b) =>
    cards.some((c) => c.boards.includes(b))
  );

  const visible = cards.filter(
    (c) =>
      (!country || c.country === country) &&
      (!stars || c.stars === stars) &&
      (!service || c.boards.includes(service))
  );
  const regions = Array.from(new Set(visible.map((c) => c.region)));
  const filtered = !!country || !!stars || !!service;

  function clear() {
    setCountry("");
    setStars(0);
    setService("");
  }

  const label = "text-xs font-bold uppercase tracking-wider text-gray-500";

  return (
    <>
      <section className="px-5">
        <div className="mx-auto max-w-7xl space-y-3">
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button type="button" onClick={() => setCountry("")} className={pill(!country)}>
              {labels.all}
            </button>
            {countries.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setCountry(country === name ? "" : name)}
                className={pill(country === name)}
              >
                {name}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className={label}>{labels.stars}</span>
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

            {serviceOptions.length > 0 && (
              <>
                <span className={`${label} ml-2`}>{labels.service}</span>
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
              </>
            )}

            {filtered && (
              <button
                type="button"
                onClick={clear}
                className="ml-2 text-sm font-bold text-red-500 hover:text-red-400"
              >
                {labels.clear}
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 pt-8">
        <div className="mx-auto max-w-7xl">
          {visible.length === 0 && (
            <p className="py-10 text-center text-gray-400">{labels.none}</p>
          )}

          {regions.map((region) => {
            const items = visible.filter((c) => c.region === region);

            return (
              <div key={region} id={sectionId(region)} className="mb-10 scroll-mt-28 sm:mb-14">
                <div className="mb-5 flex items-end justify-between gap-4">
                  <h2 className="text-xl font-bold uppercase tracking-wide sm:text-2xl">
                    {region}
                  </h2>
                  <p className="shrink-0 text-sm text-gray-500">
                    {items.length} {labels.count}
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
                            {labels.photoSoon}
                          </p>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                          {card.category}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <p className="flex items-center gap-1.5 text-xs text-gray-400">
                          <MapPin size={14} className="text-red-500" />
                          {card.location}
                        </p>
                        <h3 className="mt-2 text-lg font-extrabold uppercase leading-tight tracking-wide">
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
                              {labels.from}{" "}
                              <span className="text-xl font-extrabold text-red-500">
                                {card.from}€
                              </span>{" "}
                              {labels.perNight}
                            </>
                          ) : (
                            labels.askPrice
                          )}
                        </p>

                        <div className="mt-auto grid grid-cols-2 gap-3 pt-5">
                          <Link
                            href={`/hotels/${card.slug}`}
                            className="rounded-full border border-white/30 py-3 text-center text-sm font-bold transition hover:bg-white hover:text-black"
                          >
                            {labels.details}
                          </Link>
                          <BookButton
                            slug={card.slug}
                            className="rounded-full bg-red-600 py-3 text-sm font-bold text-white transition hover:bg-red-700"
                          >
                            {labels.book}
                          </BookButton>
                        </div>
                      </div>
                    </article>
                  ))}
                </ScrollRow>

                <p className="mt-1 text-center text-xs text-gray-500 md:hidden">
                  {labels.swipe} &rarr;
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}