"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
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

// Rolling waves: each layer slides sideways, at its own speed.
function Waves() {
  const d = "M0 30 C100 5 200 55 300 30 S500 55 600 30 S800 55 900 30 S1100 55 1200 30 V60 H0 Z";
  const layers = [
    { fill: "rgba(255,255,255,0.16)", height: "h-16", seconds: 18, reverse: false },
    { fill: "rgba(255,255,255,0.28)", height: "h-10", seconds: 12, reverse: true },
  ];
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-16 overflow-hidden">
      {layers.map((layer, i) => (
        <svg
          key={i}
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className={`wave-slide absolute bottom-0 left-0 w-[200%] ${layer.height}`}
          style={{
            animationDuration: `${layer.seconds}s`,
            animationDirection: layer.reverse ? "reverse" : "normal",
          }}
        >
          <path d={d} fill={layer.fill} />
        </svg>
      ))}
    </div>
  );
}

export default function EarlyBooking() {
  const { lang } = useLang();
  const t = labels[lang];

  return (
    <section className="bg-black px-5 py-12 sm:py-16">
      <div className="relative mx-auto flex min-h-[30rem] max-w-4xl items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-b from-[#1f9fd0] via-[#1c78bd] to-[#0d4a9e] px-6 pb-28 pt-12 text-center shadow-[0_0_60px_rgba(14,116,189,0.3)] sm:min-h-[34rem] sm:px-12 sm:pb-24 sm:pt-16">
        {/* sun, partly out of the corner */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 z-0 h-44 w-44 rounded-full bg-[#e8c500] shadow-[0_0_80px_30px_rgba(250,204,21,0.35)] sm:-right-16 sm:-top-16 sm:h-60 sm:w-60"
        />

        {/* palm trees (the pictures in public/images), behind the waves */}
        <div
          aria-hidden="true"
          className="palm-sway pointer-events-none absolute bottom-0 -left-2 z-[1] w-28 sm:left-0 sm:w-52"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/palm-left.png" alt="" className="block h-auto w-full" />
        </div>
        <div
          aria-hidden="true"
          className="palm-sway pointer-events-none absolute bottom-0 -right-2 z-[1] w-36 sm:right-0 sm:w-72"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/palm-right.png" alt="" className="block h-auto w-full" />
        </div>

        <Waves />

        <div className="relative z-10 w-full [text-shadow:0_1px_12px_rgba(3,30,70,0.45)]">
          <p className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
            {t.badge}
          </p>
          <p className="mt-3 text-sm font-bold uppercase text-sky-100">{t.eyebrow}</p>
          <h2 className="mt-1 text-balance text-3xl font-extrabold uppercase tracking-wide text-white sm:text-5xl">
            {t.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-balance text-sm leading-6 text-sky-50 sm:text-base">
            {t.text}
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`https://wa.me/38349833888?text=${encodeURIComponent(t.message)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-3 font-bold text-white shadow-lg transition hover:bg-red-700 sm:w-auto"
            >
              <MessageCircle size={18} className="shrink-0" />
              {t.notify}
            </a>
            <Link
              href="/destinations"
              className="flex min-h-[48px] w-full items-center justify-center rounded-full border border-white/60 px-8 py-3 font-bold text-white transition hover:bg-white hover:text-blue-900 sm:w-auto"
            >
              {t.destinations}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}