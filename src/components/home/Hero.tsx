"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { busTours } from "@/data/bus-tours";
import { useLang } from "@/components/LanguageProvider";

const heroImage = "/images/hero/home.jpg";

// All the words here, in both languages. Change them here.
const labels = {
  sq: {
    eyebrow: "Partneri juaj i besuar i udhëtimit",
    line1: "Nga Kosova,",
    line2: "drejt botës.",
    special: "Ofertë speciale",
    perPerson: "për person",
    seeTrip: "Shiko udhëtimin",
    offers: "Shiko ofertat tona",
    whatsapp: "Na shkruaj në WhatsApp",
    alt: "Krahu i një avioni mbi retë në perëndim të diellit",
  },
  en: {
    eyebrow: "Your Trusted Travel Partner",
    line1: "From Kosova,",
    line2: "to the world.",
    special: "Special offer",
    perPerson: "per person",
    seeTrip: "See the trip",
    offers: "See our offers",
    whatsapp: "Message us on WhatsApp",
    alt: "Airplane wing over clouds at sunset",
  },
};

function getToday() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const subscribe = () => () => {};

export default function Hero() {
  const { lang } = useLang();
  const t = labels[lang];
  const reduce = useReducedMotion();
  const today = useSyncExternalStore(subscribe, getToday, () => "");
  const [showOffer, setShowOffer] = useState(false);

  // The cheapest upcoming departure among the active bus tours.
  const offer = today
    ? busTours
        .filter((tour) => tour.active)
        .flatMap((tour) => {
          const next = tour.departures
            .filter((d) => d.start >= today)
            .sort((x, y) => x.start.localeCompare(y.start))[0];
          return next ? [{ tour, next, price: next.price ?? tour.price }] : [];
        })
        .sort((x, y) => x.price - y.price)[0]
    : undefined;

  const hasOffer = !!offer;

  // Brand line 4.5s, offer 6s, repeat (off for visitors who prefer reduced motion).
  useEffect(() => {
    if (!hasOffer || reduce) return;
    const timer = setTimeout(() => setShowOffer((v) => !v), showOffer ? 6000 : 4500);
    return () => clearTimeout(timer);
  }, [hasOffer, reduce, showOffer]);

  const showingOffer = showOffer && !!offer && !reduce;
  const offerTitle = offer ? (lang === "en" && offer.tour.en ? offer.tour.en.title : offer.tour.title) : "";

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
        <div className="flex min-h-[230px] w-full items-center justify-center sm:min-h-[260px]">
          <AnimatePresence mode="wait">
            {!showingOffer || !offer ? (
              <motion.div
                key="brand"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                <p className="text-balance text-[11px] font-bold uppercase tracking-wider text-white/70 sm:text-sm">
                  {t.eyebrow}
                </p>
                <h1 className="mt-5 break-words text-4xl font-extrabold uppercase leading-[1.1] tracking-wide sm:text-6xl lg:text-7xl">
                  {t.line1}
                  <br />
                  <span className="text-red-500">{t.line2}</span>
                </h1>
              </motion.div>
            ) : (
              <motion.div
                key="offer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                <p className="rounded-full bg-red-600/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-red-400 sm:text-sm">
                  {t.special}
                </p>
                <h2 className="mt-4 break-words text-4xl font-extrabold uppercase leading-[1.1] tracking-wide sm:text-6xl lg:text-7xl">
                  {offerTitle}
                </h2>
                <p className="mt-3 text-lg text-gray-200 sm:text-2xl">
                  {offer.next.start.split("-").reverse().join(".")} ·{" "}
                  <span className="font-bold text-red-500">{offer.price}€</span> {t.perPerson}
                </p>
                <Link
                  href="/#udhetime"
                  className="mt-4 text-sm font-bold text-white underline underline-offset-4 hover:text-red-400"
                >
                  {t.seeTrip} &rarr;
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mx-auto mt-6 flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
          <Link
            href="/offers"
            className="rounded-full bg-red-600 px-8 py-3.5 text-center text-base font-bold text-white transition hover:bg-red-700"
          >
            {t.offers}
          </Link>
          <a
            href="https://wa.me/38349833888"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/50 px-8 py-3.5 text-center text-base font-bold text-white transition hover:border-white hover:bg-white hover:text-black"
          >
            {t.whatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}