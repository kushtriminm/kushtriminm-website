"use client";

import Link from "next/link";
import { ArrowRight, Bus, Plane, Snowflake } from "lucide-react";
import { busTours } from "@/data/bus-tours";
import { offers, perPerson } from "@/data/offers";
import { useLang, type Lang } from "@/components/LanguageProvider";
import { dayMonth, useToday } from "@/components/tours/shared";
import { holidayRange, isChristmasSeason } from "@/lib/season";

// All the words here, in both languages. Change them here.
const labels = {
  sq: {
    eyebrow: "Festat",
    heading: "Krishtlindje & Viti i Ri",
    text: "Nisje për festat, me çmim për person.",
    all: "Shiko të gjitha ofertat",
    bus: "Me autobus",
    plane: "Me avion",
  },
  en: {
    eyebrow: "The holidays",
    heading: "Christmas & New Year",
    text: "Departures around the holidays, with prices per person.",
    all: "See all offers",
    bus: "By bus",
    plane: "By plane",
  },
};

type Row = {
  key: string;
  slug: string;
  kind: "bus" | "plane";
  title: string;
  date: string;
  price: number;
};

// The first departure of each trip that falls inside the holiday dates.
function buildRows(lang: Lang, today: string): Row[] {
  const { from, to } = holidayRange(today);
  const start = today > from ? today : from;
  const rows: Row[] = [];

  for (const tour of busTours) {
    if (!tour.active) continue;
    const dep = tour.departures
      .filter((d) => d.start >= start && d.start <= to)
      .sort((a, b) => a.start.localeCompare(b.start))[0];
    if (!dep) continue;
    rows.push({
      key: `bus-${tour.slug}`,
      slug: tour.slug,
      kind: "bus",
      title: lang === "en" && tour.en ? tour.en.title : tour.title,
      date: dep.start,
      price: dep.price ?? tour.price,
    });
  }

  for (const offer of offers) {
    if (!offer.active) continue;
    const dep = offer.departures
      .filter((d) => d.start >= start && d.start <= to)
      .sort((a, b) => a.start.localeCompare(b.start))[0];
    if (!dep) continue;
    rows.push({
      key: `plane-${offer.slug}`,
      slug: offer.slug,
      kind: "plane",
      title: offer.title[lang],
      date: dep.start,
      price: perPerson(dep.total),
    });
  }

  return rows.sort((a, b) => a.date.localeCompare(b.date) || a.price - b.price).slice(0, 4);
}

export default function ChristmasTrips() {
  const { lang } = useLang();
  const t = labels[lang];
  const today = useToday();

  if (!isChristmasSeason(today)) return null;
  const rows = buildRows(lang, today);
  if (rows.length === 0) return null;

  return (
    <section className="bg-black px-5 py-10 sm:py-14">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-red-700 to-red-900 px-6 py-8 sm:px-10 sm:py-10">
        <Snowflake
          className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 text-white/10"
          aria-hidden="true"
        />

        <div className="relative">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/80">
            <Snowflake size={14} aria-hidden="true" />
            {t.eyebrow}
          </p>
          <h2 className="mt-2 text-balance text-2xl font-extrabold uppercase tracking-wide text-white sm:text-4xl">
            {t.heading}
          </h2>
          <p className="mt-2 text-sm text-white/85">{t.text}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {rows.map((row) => {
              const Icon = row.kind === "bus" ? Bus : Plane;
              return (
                <Link
                  key={row.key}
                  href={`/offers#${row.slug}`}
                  className="flex min-h-[5.5rem] flex-col justify-between rounded-2xl bg-black/25 p-4 text-white transition hover:bg-black/40"
                >
                  <span className="flex items-start gap-2">
                    <Icon size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                    <span className="sr-only">{row.kind === "bus" ? t.bus : t.plane}: </span>
                    <span className="min-w-0 break-words font-extrabold uppercase leading-tight tracking-wide">
                      {row.title}
                    </span>
                  </span>
                  <span className="mt-3 flex items-baseline justify-between gap-3">
                    <span className="font-mono text-sm text-white/80">{dayMonth(row.date)}</span>
                    <span className="text-xl font-black">{row.price}€</span>
                  </span>
                </Link>
              );
            })}
          </div>

          <Link
            href="/offers"
            className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-bold text-white underline-offset-4 hover:underline"
          >
            {t.all}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}