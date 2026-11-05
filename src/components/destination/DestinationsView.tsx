"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import {
  destinations,
  localized,
  moreDestinations,
  moreName,
} from "@/data/destinations";
import { useLang } from "@/components/LanguageProvider";

// All the words on this page, in both languages. Change them here.
const labels = {
  sq: {
    eyebrow: "Ku do të shkosh?",
    heading: "Destinacionet tona",
    intro:
      "Nga qytetet evropiane te plazhet e verës. Zgjidh një destinacion ose na shkruaj ku dëshiron të shkosh.",
    explore: "Shiko më shumë",
    ask: "Pyet për oferta",
    moreHeading: "Kudo në botë",
    moreText:
      "Nuk e sheh vendin tënd? Organizojmë udhëtime kudo në botë. Na shkruaj dhe e gjejmë së bashku.",
    cta: "Na shkruaj në WhatsApp",
    another: "një destinacion tjetër",
    message: (name: string) => `Përshëndetje! Jam i interesuar për ${name}.`,
  },
  en: {
    eyebrow: "Where do you want to go?",
    heading: "Our destinations",
    intro:
      "From European cities to summer beaches. Pick a destination or message us where you want to go.",
    explore: "Explore",
    ask: "Ask for offers",
    moreHeading: "Anywhere in the world",
    moreText:
      "Can't see your place? We organise trips anywhere in the world. Message us and we will find it together.",
    cta: "Message us on WhatsApp",
    another: "another destination",
    message: (name: string) => `Hello! I'm interested in ${name}.`,
  },
};

// 2 cards per row on phones, 3 on desktop. The last row is centred.
const cardClass =
  "group relative aspect-[4/5] w-[calc(50%_-_0.375rem)] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-800 to-neutral-950 transition duration-300 hover:border-red-500/60 hover:shadow-[0_0_40px_rgba(220,38,38,0.25)] sm:aspect-[4/3] sm:w-[calc(50%_-_0.625rem)] lg:w-[calc(33.333%_-_0.84rem)]";

export default function DestinationsView() {
  const { lang } = useLang();
  const t = labels[lang];
  const items = destinations.filter((d) => d.active);

  const whatsappLink = (name: string) =>
    `https://wa.me/38349833888?text=${encodeURIComponent(t.message(name))}`;

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden px-5 pb-10 pt-36 text-center sm:pb-14 sm:pt-44">
        <Image
          src="/images/destinations/banner.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />

        <div className="relative mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase text-red-500">{t.eyebrow}</p>
          <h1 className="mt-3 text-balance text-2xl font-bold uppercase tracking-wide sm:text-4xl">
            {t.heading}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-gray-300">{t.intro}</p>
        </div>
      </section>

      {/* Cards */}
      <section className="px-5 pb-10 sm:pb-14">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-3 sm:gap-5">
          {items.map((item) => {
            const text = localized(item, lang);
            const inner = (
              <>
                {item.image && (
                  <Image
                    src={item.image}
                    alt={text.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <span className="absolute left-3 top-3 max-w-[85%] truncate rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                  {text.season}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <h2 className="break-words text-[15px] font-extrabold uppercase leading-tight sm:text-2xl sm:tracking-wide lg:text-3xl">
                    {text.name}
                  </h2>
                  <p className="mt-1 line-clamp-3 text-xs text-gray-300 sm:line-clamp-none sm:text-sm">
                    {text.description}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-bold">
                    {item.price && <span className="text-red-500">{item.price}</span>}
                    <span className="flex items-center gap-1 transition group-hover:gap-2">
                      {item.href ? t.explore : t.ask}
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </>
            );

            return item.href ? (
              <Link key={item.name} href={item.href} className={cardClass}>
                {inner}
              </Link>
            ) : (
              <a
                key={item.name}
                href={whatsappLink(text.name)}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClass}
              >
                {inner}
              </a>
            );
          })}
        </div>
      </section>

      {/* More countries */}
      <section className="bg-gradient-to-b from-black via-neutral-950 to-black px-5 pb-16 pt-10 text-center sm:pb-24 sm:pt-14">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-balance text-3xl font-extrabold uppercase tracking-wide sm:text-4xl">
            {t.moreHeading}
          </h2>
          <p className="mt-4 text-balance text-gray-400">{t.moreText}</p>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {moreDestinations.map((name) => (
              <a
                key={name}
                href={whatsappLink(moreName(name, lang))}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 bg-neutral-900 px-5 py-2.5 text-sm font-bold transition hover:border-red-500/60 hover:bg-red-600"
              >
                {moreName(name, lang)}
              </a>
            ))}
          </div>

          <a
            href={whatsappLink(t.another)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-red-600 px-9 py-3.5 font-bold transition hover:bg-red-700"
          >
            <MessageCircle size={18} />
            {t.cta}
          </a>
        </div>
      </section>
    </>
  );
}