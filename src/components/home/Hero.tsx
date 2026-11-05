"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLang } from "@/components/LanguageProvider";

const heroImage = "/images/hero/home.jpg";

// All the words here, in both languages. Change them here.
const labels = {
  sq: {
    eyebrow: "Partneri juaj i besuar i udhëtimit",
    line1: "Nga Kosova,",
    line2: "drejt botës.",
    offers: "Shiko ofertat tona",
    whatsapp: "Na shkruaj në WhatsApp",
    alt: "Krahu i një avioni mbi retë në perëndim të diellit",
  },
  en: {
    eyebrow: "Your Trusted Travel Partner",
    line1: "From Kosova,",
    line2: "to the world.",
    offers: "See our offers",
    whatsapp: "Message us on WhatsApp",
    alt: "Airplane wing over clouds at sunset",
  },
};

export default function Hero() {
  const { lang } = useLang();
  const t = labels[lang];
  const reduce = useReducedMotion();

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
        <p className="text-balance text-[11px] font-bold uppercase tracking-wider text-white/70 sm:text-sm">
          {t.eyebrow}
        </p>
        <h1 className="mt-5 break-words text-4xl font-extrabold uppercase leading-[1.1] tracking-wide sm:text-6xl lg:text-7xl">
          {t.line1}
          <br />
          <span className="text-red-500">{t.line2}</span>
        </h1>

        <div className="mx-auto mt-10 flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
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