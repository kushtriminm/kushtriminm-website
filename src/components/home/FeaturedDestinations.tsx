"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight, MessageCircle, Plus, X } from "lucide-react";
import {
  destinations,
  localized,
  moreDestinations,
  moreName,
} from "@/data/destinations";
import { useLang } from "@/components/LanguageProvider";

// All the words in this section, in both languages. Change them here.
const labels = {
  sq: {
    eyebrow: "Ku do të shkosh?",
    heading: "Destinacionet tona",
    explore: "Shiko më shumë",
    ask: "Pyet për oferta",
    swipe: "Rrëshqit për më shumë",
    moreTitle: "Më shumë",
    moreSeason: "Kudo në botë",
    moreText: "Spanjë, Poloni, Çeki, Austri, Hungari dhe më shumë",
    moreHeading: "Më shumë destinacione",
    moreHint: "Nuk po e gjen vendin tënd? Na shkruaj, organizojmë udhëtime kudo në botë.",
    moreButton: "Na shkruaj në WhatsApp",
    close: "Mbyll",
    another: "një destinacion tjetër",
    message: (name: string) => `Përshëndetje! Jam i interesuar për ${name}.`,
  },
  en: {
    eyebrow: "Where do you want to go?",
    heading: "Our destinations",
    explore: "Explore",
    ask: "Ask for offers",
    swipe: "Swipe for more",
    moreTitle: "More",
    moreSeason: "Worldwide",
    moreText: "Spain, Poland, Czechia, Austria, Hungary and more",
    moreHeading: "More destinations",
    moreHint: "Can't find your place? Message us, we organise trips anywhere in the world.",
    moreButton: "Message us on WhatsApp",
    close: "Close",
    another: "another destination",
    message: (name: string) => `Hello! I'm interested in ${name}.`,
  },
};

const cardSize =
  "aspect-[4/5] w-[72%] shrink-0 snap-center overflow-hidden rounded-3xl md:aspect-[4/3] md:w-auto";

export default function FeaturedDestinations() {
  const { lang } = useLang();
  const t = labels[lang];
  const items = destinations.filter((d) => d.active);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const whatsappLink = (name: string) =>
    `https://wa.me/38349833888?text=${encodeURIComponent(t.message(name))}`;

  function openMore() {
    document.body.style.overflow = "hidden";
    dialogRef.current?.showModal();
  }

  return (
    <section className="bg-black px-5 py-14 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase text-red-500">{t.eyebrow}</p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold uppercase tracking-wide text-white sm:text-5xl">
            {t.heading}
          </h2>
        </div>

        {/* Phone: swipe sideways. Desktop: equal grid. */}
        <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0">
          {items.map((item) => {
            const text = localized(item, lang);
            const href = item.href ?? whatsappLink(text.name);
            const external = !item.href;

            return (
              <a
                key={item.name}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`group relative border border-white/10 bg-gradient-to-br from-neutral-800 to-neutral-950 transition duration-300 hover:border-red-500/60 hover:shadow-[0_0_40px_rgba(220,38,38,0.25)] ${cardSize}`}
              >
                {item.image && (
                  <Image
                    src={item.image}
                    alt={text.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 72vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <span className="absolute left-3 top-3 max-w-[85%] truncate rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                  {text.season}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="break-words text-xl font-extrabold uppercase tracking-wide text-white lg:text-3xl">
                    {text.name}
                  </h3>
                  <p className="mt-1 line-clamp-3 text-sm text-gray-300">{text.description}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-bold">
                    {item.price && <span className="text-red-500">{item.price}</span>}
                    <span className="flex items-center gap-1 text-white transition group-hover:gap-2">
                      {external ? t.ask : t.explore}
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </a>
            );
          })}

          {/* "More" card: opens a pop-up with the other countries */}
          <button
            type="button"
            onClick={openMore}
            className={`group relative flex flex-col items-center justify-center border border-dashed border-white/25 bg-neutral-950 p-6 text-center transition hover:border-red-500 ${cardSize}`}
          >
            <span className="absolute left-3 top-3 max-w-[85%] truncate rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
              {t.moreSeason}
            </span>
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white transition group-hover:scale-110">
              <Plus size={28} />
            </span>
            <h3 className="mt-4 break-words text-xl font-extrabold uppercase tracking-wide text-white lg:text-3xl">
              {t.moreTitle}
            </h3>
            <p className="mt-2 text-balance text-sm text-gray-400">{t.moreText}</p>
          </button>
        </div>

        <p className="mt-1 text-center text-xs text-gray-500 md:hidden">{t.swipe} &rarr;</p>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => {
          document.body.style.overflow = "";
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="fixed inset-0 m-auto h-fit max-h-[78svh] w-[calc(100%-2rem)] max-w-md overflow-y-auto overscroll-contain rounded-3xl bg-neutral-900 p-0 text-white backdrop:bg-black/70"
      >
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-balance text-2xl font-extrabold uppercase tracking-wide">
              {t.moreHeading}
            </h3>
            <button
              type="button"
              aria-label={t.close}
              onClick={() => dialogRef.current?.close()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2">
            {moreDestinations.map((name) => (
              <a
                key={name}
                href={whatsappLink(moreName(name, lang))}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-black px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-red-600"
              >
                {moreName(name, lang)}
              </a>
            ))}
          </div>

          <p className="mt-5 text-sm text-gray-400">{t.moreHint}</p>

          <a
            href={whatsappLink(t.another)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-3 font-bold text-white transition hover:bg-red-700"
          >
            <MessageCircle size={18} />
            {t.moreButton}
          </a>
        </div>
      </dialog>
    </section>
  );
}