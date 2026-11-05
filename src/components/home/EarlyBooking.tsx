"use client";

import Link from "next/link";
import { MessageCircle, Sun } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";

// All the words here, in both languages. Change them here.
const labels = {
  sq: {
    badge: "Së shpejti",
    eyebrow: "Vera 2027",
    heading: "Rezervim i hershëm",
    text: "Rezervimi i hershëm për Antalyan, Hurghadën dhe Greqinë vjen së shpejti. Na shkruaj dhe të njoftojmë të parët kur hapet.",
    notify: "Më njofto në WhatsApp",
    destinations: "Shiko destinacionet",
    message: "Përshëndetje! Dua të njoftohem kur hapet rezervimi i hershëm për verën 2027.",
  },
  en: {
    badge: "Coming soon",
    eyebrow: "Summer 2027",
    heading: "Early booking",
    text: "Early booking for Antalya, Hurghada and Greece is coming soon. Message us and we will tell you first when it opens.",
    notify: "Notify me on WhatsApp",
    destinations: "See destinations",
    message: "Hello! Please let me know when early booking for summer 2027 opens.",
  },
};

export default function EarlyBooking() {
  const { lang } = useLang();
  const t = labels[lang];

  return (
    <section className="bg-black px-5 py-12 sm:py-16">
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900 to-neutral-950 px-6 py-10 text-center sm:px-12 sm:py-12">
        <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-red-600/15 blur-3xl" />

        <div className="relative">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-[0_0_30px_rgba(220,38,38,0.5)]">
            <Sun size={22} aria-hidden="true" />
          </span>

          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-red-600/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-400">
            {t.badge}
          </p>
          <p className="mt-3 text-sm font-bold uppercase text-gray-400">{t.eyebrow}</p>
          <h2 className="mt-1 text-balance text-3xl font-extrabold uppercase tracking-wide text-white sm:text-4xl">
            {t.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-balance text-sm leading-6 text-gray-300 sm:text-base">
            {t.text}
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`https://wa.me/38349833888?text=${encodeURIComponent(t.message)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-3 font-bold text-white transition hover:bg-red-700 sm:w-auto"
            >
              <MessageCircle size={18} className="shrink-0" />
              {t.notify}
            </a>
            <Link
              href="/destinations"
              className="flex min-h-[48px] w-full items-center justify-center rounded-full border border-white/30 px-8 py-3 font-bold text-white transition hover:bg-white hover:text-black sm:w-auto"
            >
              {t.destinations}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}