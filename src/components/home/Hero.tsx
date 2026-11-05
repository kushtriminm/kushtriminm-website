"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRight, Bus, Plane } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { busTours } from "@/data/bus-tours";
import { offers, perPerson } from "@/data/offers";
import { useLang, type Lang } from "@/components/LanguageProvider";

const heroImage = "/images/hero/home.jpg";

// How many rows the board shows at once.
const ROWS = 5;

// All the words here, in both languages. Change them here.
const labels = {
  sq: {
    line1: "Nga Kosova,",
    line2: "drejt botës.",
    board: "Nisjet e radhës",
    seeAll: "Shiko të gjitha ofertat",
    bus: "Me autobus",
    plane: "Me avion",
    alt: "Krahu i një avioni mbi retë në perëndim të diellit",
  },
  en: {
    line1: "From Kosova,",
    line2: "to the world.",
    board: "Next departures",
    seeAll: "See all offers",
    bus: "By bus",
    plane: "By plane",
    alt: "Airplane wing over clouds at sunset",
  },
};

const months: Record<Lang, string[]> = {
  sq: ["JAN", "SHK", "MAR", "PRI", "MAJ", "QER", "KOR", "GUS", "SHT", "TET", "NËN", "DHJ"],
  en: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
};

type Row = {
  key: string;
  slug: string;
  kind: "bus" | "plane";
  title: string;
  date: string;
  price: number;
};

function getToday() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const subscribe = () => () => {};

function boardDate(date: string, lang: Lang) {
  const [, month, day] = date.split("-");
  return `${day} ${months[lang][Number(month) - 1]}`;
}

// The next departure of every active tour, soonest first. Past dates drop off by themselves.
function buildRows(lang: Lang, today: string): Row[] {
  const rows: Row[] = [];

  for (const tour of busTours) {
    if (!tour.active) continue;
    const next = tour.departures
      .filter((d) => d.start >= today)
      .sort((a, b) => a.start.localeCompare(b.start))[0];
    if (!next) continue;
    rows.push({
      key: `bus-${tour.slug}`,
      slug: tour.slug,
      kind: "bus",
      title: lang === "en" && tour.en ? tour.en.title : tour.title,
      date: next.start,
      price: next.price ?? tour.price,
    });
  }

  for (const offer of offers) {
    if (!offer.active) continue;
    const next = offer.departures
      .filter((d) => d.start >= today)
      .sort((a, b) => a.start.localeCompare(b.start))[0];
    if (!next) continue;
    rows.push({
      key: `plane-${offer.slug}`,
      slug: offer.slug,
      kind: "plane",
      title: offer.title[lang],
      date: next.start,
      price: perPerson(next.total),
    });
  }

  return rows.sort((a, b) => a.date.localeCompare(b.date) || a.price - b.price);
}

export default function Hero() {
  const { lang } = useLang();
  const t = labels[lang];
  const reduce = useReducedMotion();
  const today = useSyncExternalStore(subscribe, getToday, () => "");
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  const rows = today ? buildRows(lang, today) : [];
  const pages = Math.max(1, Math.ceil(rows.length / ROWS));
  const current = page % pages;
  const shown = rows.slice(current * ROWS, current * ROWS + ROWS);

  // Show the next rows every 6 seconds (not while the visitor hovers, or with reduced motion).
  useEffect(() => {
    if (pages < 2 || paused || reduce) return;
    const id = setInterval(() => setPage((p) => p + 1), 6000);
    return () => clearInterval(id);
  }, [pages, paused, reduce]);

  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-black sm:min-h-screen">
      <motion.img
        src={heroImage}
        alt={t.alt}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-[80%_47%] opacity-50 sm:object-[center_47%] sm:opacity-100"
        initial={{ scale: 1 }}
        animate={{ scale: reduce ? 1 : 1.1 }}
        transition={{ duration: 24, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black" />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-5 pb-14 pt-28 text-center text-white sm:px-6">
        <h1 className="whitespace-nowrap text-[clamp(1.9rem,8vw,4.25rem)] font-extrabold uppercase leading-[1.1] tracking-wide">
          {t.line1}
          <br />
          <span className="text-red-500">{t.line2}</span>
        </h1>

        {/* Departures board: real upcoming trips from the offers data */}
        {rows.length > 0 && (
          <div
            className="mt-8 w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-black/60 text-left backdrop-blur-md"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/80 sm:text-sm">
                <span aria-hidden="true" className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                </span>
                {t.board}
              </p>
              {pages > 1 && (
                <span aria-hidden="true" className="flex gap-1">
                  {Array.from({ length: pages }, (_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 w-1.5 rounded-full ${i === current ? "bg-red-500" : "bg-white/25"}`}
                    />
                  ))}
                </span>
              )}
            </div>

            <div className="min-h-[15rem] [perspective:700px]">
              {shown.map((row, i) => {
                const Icon = row.kind === "bus" ? Bus : Plane;
                return (
                  <Link
                    key={`${current}-${row.key}`}
                    href={`/offers#${row.slug}`}
                    style={{ animationDelay: `${i * 110}ms` }}
                    className="board-row grid min-h-[3rem] grid-cols-[1rem_minmax(0,1fr)_auto_auto] items-center gap-x-3 border-t border-white/10 px-4 py-3 font-mono text-[12px] uppercase tracking-wide text-white transition hover:bg-white/10 sm:text-sm"
                  >
                    <Icon size={14} className="text-red-500" aria-hidden="true" />
                    <span className="min-w-0 truncate">
                      <span className="sr-only">{row.kind === "bus" ? t.bus : t.plane}: </span>
                      {row.title}
                    </span>
                    <span className="text-white/70">{boardDate(row.date, lang)}</span>
                    <span className="font-bold text-red-400">{row.price}€</span>
                  </Link>
                );
              })}
            </div>

            <Link
              href="/offers"
              className="flex min-h-[3rem] items-center justify-between gap-3 border-t border-white/10 bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700"
            >
              {t.seeAll}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}