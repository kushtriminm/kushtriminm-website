"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Bus, ChevronDown, Plane } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { busTours } from "@/data/bus-tours";
import { heroImages } from "@/data/hero-images";
import { offers, perPerson } from "@/data/offers";
import { useLang, type Lang } from "@/components/LanguageProvider";
import Snow from "@/components/christmas/Snow";
import { montserrat } from "@/lib/fonts";

// The photo changes every this many seconds, and the change takes FADE_SECONDS.
const IMAGE_SECONDS = 15;
const FADE_SECONDS = 2.5;
function shuffle(list: number[]) {
  const order = [...list];
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

// The photos after the first one: a long random sequence where every round shows each photo
// once in a new order, and the same photo never comes twice in a row.
function shuffledImages(first: number): number[] {
  const all = heroImages.map((_, i) => i);
  let last = first;
  const sequence: number[] = [];
  for (let round = 0; round < 40; round++) {
    const order = shuffle(all);
    if (order.length > 1 && order[0] === last) order.push(order.shift()!);
    sequence.push(...order);
    last = order[order.length - 1];
  }
  return sequence;
}

const orderCache = new Map<number, number[]>();
function getImageOrder(first: number) {
  if (!orderCache.has(first)) orderCache.set(first, shuffledImages(first));
  return orderCache.get(first)!;
}

// How many rows the board shows at once.
const ROWS = 5;

// The rows change every this many seconds. Change the number to make it faster or slower.
const ROTATE_SECONDS = 4;

// The first time the site opens in a visit, only the headline shows, in the middle of the screen.
// After this many seconds it moves up and the departures board appears.
const INTRO_SECONDS = 2;
const SEEN_KEY = "kushtrimi-hero-intro";

// All the words here, in both languages. Change them here.
const labels = {
  sq: {
    line1: "Udhëtimi juaj.",
    line2: "Pasioni ynë.",
    board: "Nisjet e radhës",
    seeAll: "Shiko të gjitha ofertat",
    bus: "Me autobus",
    plane: "Me avion",
  },
  en: {
    line1: "Your Journey.",
    line2: "Our Passion.",
    board: "Next departures",
    seeAll: "See all offers",
    bus: "By bus",
    plane: "By plane",
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

// One line of the headline. Its words rise into place one after another,
// coming out of a soft blur. startIndex keeps the timing going across both lines.
function TitleLine({ text, startIndex, reduce }: { text: string; startIndex: number; reduce: boolean }) {
  const words = text.split(" ");
  return (
    <span aria-hidden="true" className="block whitespace-nowrap">
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block will-change-transform"
          initial={reduce ? false : { opacity: 0, y: "0.45em", filter: "blur(10px)" }}
          animate={{ opacity: 1, y: "0em", filter: "blur(0px)" }}
          transition={{ delay: 0.15 + (startIndex + i) * 0.14, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
          {i < words.length - 1 && " "}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero({ firstImage = 0 }: { firstImage?: number }) {
  const { lang } = useLang();
  const t = labels[lang];
  const reduce = useReducedMotion();
  const today = useSyncExternalStore(subscribe, getToday, () => "");
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [showBoard, setShowBoard] = useState(false);
  // The departures board starts closed; tapping its bar opens the list.
  const [boardOpen, setBoardOpen] = useState(false);
  // The random photo order is picked once the page is open in the browser.
  const first = heroImages[firstImage] ? firstImage : 0;
  const imageOrder = useSyncExternalStore(
    subscribe,
    () => getImageOrder(first),
    () => null
  );
  const [imageStep, setImageStep] = useState(0);
  // The highest step whose photo has finished loading.
  const [loadedStep, setLoadedStep] = useState(-1);
  const nextReady = loadedStep > imageStep;

  // Move to the next photo IMAGE_SECONDS after it has loaded in the background,
  // so a slow connection never shows a half-loaded or empty photo.
  useEffect(() => {
    if (!imageOrder || imageOrder.length < 2 || !nextReady) return;
    const id = setTimeout(() => setImageStep((s) => s + 1), IMAGE_SECONDS * 1000);
    return () => clearTimeout(id);
  }, [imageOrder, imageStep, nextReady]);

  // On screen at once: the previous photo (underneath), the current one fading in over it,
  // and the next one loading invisibly on top (only after the current one has loaded).
  // Step 0 is the photo picked on the server, so it is already in the page when it opens.
  const layers: number[] = [];
  if (imageStep > 0) layers.push(imageStep - 1);
  layers.push(imageStep);
  if (imageOrder && loadedStep >= imageStep) layers.push(imageStep + 1);
  const imageAt = (step: number) =>
    heroImages[step === 0 || !imageOrder ? first : imageOrder[(step - 1) % imageOrder.length]];

  const rows = today ? buildRows(lang, today) : [];
  const pages = Math.max(1, Math.ceil(rows.length / ROWS));
  const current = page % pages;
  const shown = rows.slice(current * ROWS, current * ROWS + ROWS);

  // The opening: headline alone in the middle, then the board appears and the headline moves up.
  useEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      // Storage can be blocked: we simply play the opening every time.
    }

    function reveal() {
      setShowBoard(true);
      try {
        window.sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        // ignore
      }
    }

    if (seen || reduce) {
      setShowBoard(true);
      return;
    }

    const timer = setTimeout(reveal, INTRO_SECONDS * 1000);
    const skip = () => {
      clearTimeout(timer);
      reveal();
    };
    window.addEventListener("scroll", skip, { once: true, passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", skip);
    };
  }, [reduce]);

  // Show the next rows every few seconds (not while the visitor hovers over the board).
  useEffect(() => {
    if (pages < 2 || paused || !showBoard || !boardOpen) return;
    const id = setInterval(() => setPage((p) => p + 1), ROTATE_SECONDS * 1000);
    return () => clearInterval(id);
  }, [pages, paused, showBoard, boardOpen]);

  const fullText = `${t.line1} ${t.line2}`;

  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-black sm:min-h-screen">
      {layers.map((step) => {
        const image = imageAt(step);
        // The first photo shows at once; later ones wait until they have loaded.
        const visible = step <= imageStep && (step === 0 || loadedStep >= step);
        const moving = !reduce && step <= imageStep;
        return (
          // Each new photo fades in over the previous one, which stays fully visible
          // underneath until it is covered, so the change never dips to black.
          <motion.div
            key={step}
            className="absolute inset-0 overflow-hidden"
            initial={step === 0 ? false : { opacity: 0 }}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: reduce ? 0.4 : FADE_SECONDS, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              className="absolute inset-0 will-change-transform"
              initial={{ scale: 1.06, x: "0%", y: "0%" }}
              animate={moving ? { scale: 1.01, ...image.drift } : undefined}
              transition={{ duration: IMAGE_SECONDS + FADE_SECONDS + 3, ease: "linear" }}
            >
              <Image
                src={image.src}
                alt={step === imageStep ? image[lang] : ""}
                fill
                sizes="100vw"
                loading="eager"
                fetchPriority={step === 0 ? "high" : "low"}
                onLoad={() => setLoadedStep((s) => Math.max(s, step))}
                style={{ objectPosition: image.focus }}
                className="object-cover opacity-75 sm:opacity-[0.78]"
              />
            </motion.div>
          </motion.div>
        );
      })}
      {/* Dark fade over the photo. It reaches full black a little before the bottom and
          overhangs the edge by a few pixels, so no thin line of photo shows on phones. */}
      <div className="absolute inset-x-0 -bottom-1 top-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.5),rgba(0,0,0,0.25)_45%,#000_94%)]" />
      <Snow />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-5 pb-14 pt-28 text-center text-white sm:px-6">
        <motion.h1
          layout
          transition={{ type: "spring", stiffness: 70, damping: 18 }}
          className={`${montserrat.className} text-[clamp(1.9rem,8.4vw,5rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.01em] text-white`}
        >
          <span className="sr-only">{fullText}</span>
          <TitleLine key={`${lang}-1`} text={t.line1} startIndex={0} reduce={!!reduce} />
          <TitleLine
            key={`${lang}-2`}
            text={t.line2}
            startIndex={t.line1.split(" ").length}
            reduce={!!reduce}
          />
          {/* A short red line draws itself under the title once the words are in. */}
          <motion.span
            aria-hidden="true"
            className="mx-auto mt-[0.28em] block h-[3px] w-[1.4em] origin-center rounded-full bg-red-600"
            initial={reduce ? false : { scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: reduce ? 0 : 1.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.h1>

        {/* Departures board: real upcoming trips from the offers data */}
        {showBoard && rows.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="mt-8 w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-black/60 text-left backdrop-blur-md"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <button
              type="button"
              onClick={() => setBoardOpen((o) => !o)}
              aria-expanded={boardOpen}
              aria-controls="departures-list"
              className={`flex min-h-[3rem] w-full items-center justify-between gap-3 bg-black px-4 py-3 text-left transition-colors hover:bg-white/5 ${boardOpen ? "border-b border-red-600/50" : ""}`}
            >
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/80 sm:text-sm">
                <span aria-hidden="true" className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                </span>
                {t.board}
              </span>
              <span className="flex items-center gap-3">
                {boardOpen && pages > 1 && (
                  <span aria-hidden="true" className="flex gap-1">
                    {Array.from({ length: pages }, (_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 w-1.5 rounded-full ${i === current ? "bg-red-500" : "bg-white/25"}`}
                      />
                    ))}
                  </span>
                )}
                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className={`text-white/70 transition-transform duration-500 ${boardOpen ? "rotate-180" : ""}`}
                />
              </span>
            </button>

            {/* The list opens and closes smoothly; the headline and board stay centred together. */}
            <AnimatePresence initial={false}>
              {boardOpen && (
                <motion.div
                  id="departures-list"
                  key="list"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.6, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
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
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}