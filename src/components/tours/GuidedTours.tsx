"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bus, MessageCircle, Plane } from "lucide-react";
import { busTours } from "@/data/bus-tours";
import { offers, perPerson, planeHighlights, type Region } from "@/data/offers";
import { useLang, type Lang } from "@/components/LanguageProvider";
import BusDialog from "./BusDialog";
import PlaneDialog from "./PlaneDialog";
import { dayMonth, useToday } from "./shared";

// How many offers the homepage shows. The rest are on the Offers page.
const HOME_LIMIT = 6;

type Kind = "bus" | "plane";
type Area = Region | "turkey" | "albania";

// The order of the regions on the phone version of the Offers page.
const areaOrder: Area[] = ["turkey", "albania", "italy", "spain", "europe", "middleeast"];

type Card = {
  kind: Kind;
  slug: string;
  area: Area;
  title: string;
  duration: string;
  image?: string;
  min: number;
  varies: boolean;
  dates: string[];
  lines: string[];
};

// All the words here, in both languages. Change them here.
const labels = {
  sq: {
    eyebrow: "Nisjet e radhës",
    heading: "Udhëtime me guidë",
    intro: "Udhëtime me autobus dhe me avion, me shoqërues. Zgjidh datën dhe rezervo vendin.",
    priceNote:
      "Çmimet janë për person. Udhëtimet me avion nisen nga Aeroporti i Tiranës dhe çmimi nuk përfshin udhëtimin nga Kosova deri në Tiranë.",
    all: "Të gjitha",
    bus: "Me autobus",
    plane: "Me avion",
    from: "nga",
    perPerson: "për person",
    details: "Detaje",
    book: "Rezervo",
    seeAll: "Shiko të gjitha ofertat",
    none: "Asnjë ofertë për këtë zgjedhje.",
    fromTirana: "Nisja nga Tirana",
    type: "Lloji",
    region: "Rajoni",
    swipe: "Rrëshqit për më shumë",
    count: "oferta",
    soonTitle: "Nisje të reja së shpejti",
    soonText: "Na shkruaj dhe të themi datat e radhës.",
    soonButton: "Na shkruaj në WhatsApp",
  },
  en: {
    eyebrow: "Upcoming departures",
    heading: "Guided tours",
    intro: "Bus and flight trips with a companion. Pick a date and book your seat.",
    priceNote:
      "Prices are per person. Flight tours depart from Tirana Airport and the price does not include travel from Kosovo to Tirana.",
    all: "All",
    bus: "By bus",
    plane: "By plane",
    from: "from",
    perPerson: "per person",
    details: "Details",
    book: "Book",
    seeAll: "See all offers",
    none: "No offers for this choice.",
    fromTirana: "Departs from Tirana",
    type: "Type",
    region: "Region",
    swipe: "Swipe for more",
    count: "offers",
    soonTitle: "New departures coming soon",
    soonText: "Message us and we will tell you the next dates.",
    soonButton: "Message us on WhatsApp",
  },
};

const areaLabels: Record<Area, Record<Lang, string>> = {
  italy: { sq: "Itali", en: "Italy" },
  spain: { sq: "Spanjë", en: "Spain" },
  europe: { sq: "Evropë", en: "Europe" },
  middleeast: { sq: "Dubai", en: "Dubai" },
  turkey: { sq: "Turqi", en: "Turkey" },
  albania: { sq: "Shqipëri", en: "Albania" },
};

function busArea(slug: string): Area {
  if (slug.startsWith("pogradec")) return "albania";
  if (slug.includes("stambol") || slug.includes("istanbul")) return "turkey";
  return "europe";
}

function buildCards(lang: Lang, today: string): Card[] {
  const cards: Card[] = [];

  for (const tour of busTours) {
    if (!tour.active) continue;
    const upcoming = tour.departures
      .filter((d) => d.start >= today)
      .sort((a, b) => a.start.localeCompare(b.start));
    if (upcoming.length === 0) continue;

    const text = lang === "en" && tour.en ? tour.en : tour;
    const prices = upcoming.map((d) => d.price ?? tour.price);
    cards.push({
      kind: "bus",
      slug: tour.slug,
      area: busArea(tour.slug),
      title: text.title,
      duration: text.duration,
      image: tour.image,
      min: Math.min(...prices),
      varies: new Set(prices).size > 1,
      dates: upcoming.map((d) => d.start),
      lines: text.highlights,
    });
  }

  for (const offer of offers) {
    if (!offer.active) continue;
    const upcoming = offer.departures
      .filter((d) => d.start >= today)
      .sort((a, b) => a.start.localeCompare(b.start));
    if (upcoming.length === 0) continue;

    const prices = upcoming.map((d) => perPerson(d.total));
    cards.push({
      kind: "plane",
      slug: offer.slug,
      area: offer.region,
      title: offer.title[lang],
      duration: offer.duration[lang],
      image: offer.image,
      min: Math.min(...prices),
      varies: new Set(prices).size > 1,
      dates: upcoming.map((d) => d.start),
      lines: planeHighlights(offer).map((x) => x[lang]),
    });
  }

  // Cheapest first
  return cards.sort((a, b) => a.min - b.min || a.title.localeCompare(b.title));
}

// A row that swipes sideways on phones and becomes a grid from tablet size up.
const rowClass =
  "-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 lg:grid-cols-3";
const cardWidth = "w-[78%] shrink-0 snap-center sm:w-[60%] md:w-auto";

export default function GuidedTours({ variant = "home" }: { variant?: "home" | "page" }) {
  const { lang } = useLang();
  const t = labels[lang];
  const today = useToday();
  const [kind, setKind] = useState<"all" | Kind>("all");
  const [area, setArea] = useState<"all" | Area>("all");
  const [open, setOpen] = useState<{ kind: Kind; slug: string } | null>(null);

  // On the Offers page: open the offer named after the # in the address,
  // or the one the search sends (the "open-offer" message).
  useEffect(() => {
    if (variant !== "page") return;

    function openSlug(raw: string) {
      const slug = decodeURIComponent(raw).replace(/^#/, "");
      if (!slug) return;
      const found: { kind: Kind; slug: string } | null = busTours.some((x) => x.slug === slug)
        ? { kind: "bus", slug }
        : offers.some((x) => x.slug === slug)
          ? { kind: "plane", slug }
          : null;
      if (!found) return;
      setKind("all");
      setArea("all");
      setOpen(found);
      // The phone and the computer layouts each have their own copy of the card:
      // scroll to the one that is visible.
      setTimeout(() => {
        const target = ["m", "d"]
          .map((p) => document.getElementById(`${p}-offer-${found.kind}-${found.slug}`))
          .find((el) => el && el.offsetParent !== null);
        target?.scrollIntoView({ block: "center", inline: "center", behavior: "auto" });
      }, 80);
    }

    openSlug(window.location.hash);

    const onOpen = (e: Event) => openSlug((e as CustomEvent<string>).detail ?? "");
    window.addEventListener("open-offer", onOpen);
    return () => window.removeEventListener("open-offer", onOpen);
  }, [variant]);

  const all = buildCards(lang, today);

  if (all.length === 0) {
    if (variant === "home") return null;
    return (
      <section className="px-5 py-24 text-center">
        <div className="mx-auto max-w-md">
          <h1 className="text-balance text-2xl font-extrabold uppercase tracking-wide text-white sm:text-3xl">
            {t.soonTitle}
          </h1>
          <p className="mt-3 text-balance text-sm text-gray-400">{t.soonText}</p>
          <a
            href="https://wa.me/38349833888"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-3 font-bold text-white transition hover:bg-red-700"
          >
            <MessageCircle size={18} />
            {t.soonButton}
          </a>
        </div>
      </section>
    );
  }

  const byKind = all.filter((c) => kind === "all" || c.kind === kind);
  const areas = areaOrder.filter((a) => byKind.some((c) => c.area === a));
  const activeArea = area !== "all" && areas.includes(area) ? area : "all";
  const filtered = byKind.filter((c) => activeArea === "all" || c.area === activeArea);
  const groups = areaOrder
    .map((a) => ({ area: a, items: filtered.filter((c) => c.area === a) }))
    .filter((g) => g.items.length > 0);
  const Heading = variant === "page" ? "h1" : "h2";

  const chip = (active: boolean) =>
    `min-h-[40px] shrink-0 rounded-full px-5 text-sm font-bold transition ${
      active
        ? "bg-red-600 text-white"
        : "border border-white/15 bg-neutral-900 text-gray-300 hover:border-red-500/60 hover:text-white"
    }`;

  const chipRow =
    "-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0";

  // idPrefix keeps the ids unique: "m" = phone layout, "d" = computer layout, "h" = homepage.
  function renderCard(card: Card, width: string, idPrefix: string) {
    const Icon = card.kind === "bus" ? Bus : Plane;
    return (
      <article
        key={`${card.kind}-${card.slug}`}
        id={`${idPrefix}-offer-${card.kind}-${card.slug}`}
        className={`flex scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 transition duration-300 hover:border-red-500/60 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)] ${width}`}
      >
        <div className="relative aspect-[16/10] w-full bg-gradient-to-br from-red-950/60 to-neutral-950">
          {card.image && (
            <Image
              src={card.image}
              alt={card.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 78vw"
              className="object-cover"
            />
          )}
          <span className="absolute left-2.5 top-2.5 flex max-w-[85%] items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            <Icon size={12} aria-hidden="true" className="shrink-0" />
            <span className="sr-only">{t[card.kind]}: </span>
            <span className="truncate">{card.duration}</span>
          </span>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="break-words text-balance text-lg font-extrabold uppercase leading-tight tracking-wide text-white">
            {card.title}
          </h3>

          <p className="mt-2 flex flex-wrap items-baseline gap-x-1.5">
            {card.varies && <span className="text-xs text-gray-400">{t.from}</span>}
            <span className="text-3xl font-black text-red-500">{card.min}€</span>
            <span className="text-xs text-gray-400">{t.perPerson}</span>
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {card.dates.slice(0, 3).map((d) => (
              <span key={d} className="rounded-full bg-black px-2 py-1 text-[11px] font-bold text-white">
                {dayMonth(d)}
              </span>
            ))}
            {card.dates.length > 3 && (
              <span className="text-[11px] text-gray-400">+{card.dates.length - 3}</span>
            )}
          </div>

          <ul className="mt-3 space-y-1 text-[13px] text-gray-200">
            {card.lines.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                <span className="min-w-0 break-words">{line}</span>
              </li>
            ))}
          </ul>
          {card.kind === "plane" && <p className="mt-2 text-xs text-gray-500">{t.fromTirana}</p>}

          <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
            <button
              type="button"
              onClick={() => setOpen({ kind: card.kind, slug: card.slug })}
              className="min-h-[44px] rounded-full border border-white/30 px-2 text-xs font-bold leading-tight text-white transition hover:bg-white hover:text-black"
            >
              {t.details}
            </button>
            <button
              type="button"
              onClick={() => setOpen({ kind: card.kind, slug: card.slug })}
              className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-full bg-red-600 px-2 text-xs font-bold leading-tight text-white transition hover:bg-red-700"
            >
              <MessageCircle size={14} className="shrink-0" />
              {t.book}
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <section className="bg-gradient-to-b from-black via-neutral-950 to-black px-5 py-10 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs font-bold uppercase text-red-500 sm:text-sm">{t.eyebrow}</p>
          <Heading className="mt-2 text-balance text-2xl font-extrabold uppercase tracking-wide text-white sm:text-4xl">
            {t.heading}
          </Heading>
          <p className="mx-auto mt-3 max-w-md text-balance text-sm text-gray-400">{t.intro}</p>
          {variant === "page" && (
            <p className="mx-auto mt-2 max-w-lg text-balance text-xs text-gray-500">{t.priceNote}</p>
          )}
        </div>

        {variant === "page" && (
          <div className="mt-6 space-y-3">
            <div role="group" aria-label={t.type} className={chipRow}>
              {(["all", "bus", "plane"] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  aria-pressed={kind === k}
                  onClick={() => setKind(k)}
                  className={`${chip(kind === k)} flex items-center gap-2`}
                >
                  {k === "bus" && <Bus size={15} aria-hidden="true" />}
                  {k === "plane" && <Plane size={15} aria-hidden="true" />}
                  {k === "all" ? t.all : t[k]}
                </button>
              ))}
            </div>

            <div role="group" aria-label={t.region} className={chipRow}>
              <button
                type="button"
                aria-pressed={activeArea === "all"}
                onClick={() => setArea("all")}
                className={chip(activeArea === "all")}
              >
                {t.all}
              </button>
              {areas.map((a) => (
                <button
                  key={a}
                  type="button"
                  aria-pressed={activeArea === a}
                  onClick={() => setArea(a)}
                  className={chip(activeArea === a)}
                >
                  {areaLabels[a][lang]}
                </button>
              ))}
            </div>
          </div>
        )}

        {variant === "page" ? (
          filtered.length === 0 ? (
            <p className="mt-8 text-center text-sm text-gray-400">{t.none}</p>
          ) : (
            <>
              {/* Phone: grouped by region, each row swipes sideways */}
              <div className="mt-8 space-y-8 md:hidden">
                {groups.map((g) => (
                  <div key={g.area}>
                    <div className="mb-3 flex items-end justify-between gap-4">
                      <h2 className="min-w-0 break-words text-lg font-extrabold uppercase tracking-wide text-white">
                        {areaLabels[g.area][lang]}
                      </h2>
                      <p className="shrink-0 text-xs text-gray-500">
                        {g.items.length} {t.count}
                      </p>
                    </div>
                    <div className={rowClass}>{g.items.map((c) => renderCard(c, cardWidth, "m"))}</div>
                    {g.items.length > 1 && (
                      <p className="mt-1 text-center text-xs text-gray-500">{t.swipe} &rarr;</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Computer: everything together in one grid. The filters narrow it down. */}
              <div className="mt-8 hidden md:block">
                <p className="mb-4 text-right text-xs text-gray-500">
                  {filtered.length} {t.count}
                </p>
                <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
                  {filtered.map((c) => renderCard(c, "w-auto", "d"))}
                </div>
              </div>
            </>
          )
        ) : (
          <>
            <div className={`mt-6 ${rowClass}`}>
              {all.slice(0, HOME_LIMIT).map((c) => renderCard(c, cardWidth, "h"))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/offers"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/30 px-8 text-sm font-bold text-white transition hover:bg-white hover:text-black"
              >
                {t.seeAll}
                <ArrowRight size={16} />
              </Link>
            </div>
          </>
        )}
      </div>

      {open?.kind === "bus" && (
        <BusDialog key={open.slug} slug={open.slug} lang={lang} onClose={() => setOpen(null)} />
      )}
      {open?.kind === "plane" && (
        <PlaneDialog key={open.slug} slug={open.slug} lang={lang} onClose={() => setOpen(null)} />
      )}
    </section>
  );
}