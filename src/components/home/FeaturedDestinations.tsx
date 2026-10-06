"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight, MessageCircle, Plus, X } from "lucide-react";
import { destinations, moreDestinations } from "@/data/destinations";

// All the words in this section. Change them here.
const labels = {
  eyebrow: "Ku do të shkosh?",
  heading: "Destinacionet tona",
  explore: "Shiko më shumë",
  ask: "Pyet për oferta",
  swipe: "Swipe for more",
  moreTitle: "Më shumë",
  moreSeason: "Kudo në botë",
  moreText: "Spain, Poland, Czechia, Austria, Hungary dhe më shumë",
  moreHeading: "Më shumë destinacione",
  moreHint: "Nuk po e gjen vendin tënd? Na shkruaj, organizojmë udhëtime kudo në botë.",
  moreButton: "Na shkruaj në WhatsApp",
  close: "Mbyll",
};

function whatsappLink(name: string) {
  const text = `Përshëndetje! Jam i interesuar për ${name}.`;
  return `https://wa.me/38349833888?text=${encodeURIComponent(text)}`;
}

const cardSize =
  "aspect-[4/5] w-[72%] shrink-0 snap-center overflow-hidden rounded-3xl md:aspect-[4/3] md:w-auto";

export default function FeaturedDestinations() {
  const items = destinations.filter((d) => d.active);
  const dialogRef = useRef<HTMLDialogElement>(null);

  function openMore() {
    document.body.style.overflow = "hidden";
    dialogRef.current?.showModal();
  }

  return (
    <section className="bg-black px-5 py-14 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase text-red-500">
            {labels.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold uppercase tracking-wide text-white sm:text-5xl">
            {labels.heading}
          </h2>
        </div>

        {/* Phone: swipe sideways. Desktop: equal grid. */}
        <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0">
          {items.map((item) => {
            const href = item.href ?? whatsappLink(item.name);
            const external = !item.href;

            return (
              <a
                key={item.name}
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={`group relative border border-white/10 bg-gradient-to-br from-neutral-800 to-neutral-950 transition duration-300 hover:border-red-500/60 hover:shadow-[0_0_40px_rgba(220,38,38,0.25)] ${cardSize}`}
              >
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 72vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                  {item.season}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="break-words text-xl font-extrabold uppercase tracking-wide text-white lg:text-3xl">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-300">
                    {item.description}
                  </p>
                  <div className="mt-3 flex items-center gap-3 text-sm font-bold">
                    {item.price && (
                      <span className="text-red-500">{item.price}</span>
                    )}
                    <span className="flex items-center gap-1 text-white transition group-hover:gap-2">
                      {external ? labels.ask : labels.explore}
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
            <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
              {labels.moreSeason}
            </span>
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white transition group-hover:scale-110">
              <Plus size={28} />
            </span>
            <h3 className="mt-4 break-words text-xl font-extrabold uppercase tracking-wide text-white lg:text-3xl">
              {labels.moreTitle}
            </h3>
            <p className="mt-2 text-sm text-gray-400">{labels.moreText}</p>
          </button>
        </div>

        <p className="mt-1 text-center text-xs text-gray-500 md:hidden">
          {labels.swipe} &rarr;
        </p>
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
            <h3 className="text-2xl font-extrabold uppercase tracking-wide">
              {labels.moreHeading}
            </h3>
            <button
              type="button"
              aria-label={labels.close}
              onClick={() => dialogRef.current?.close()}
              className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2">
            {moreDestinations.map((name) => (
              <a
                key={name}
                href={whatsappLink(name)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-black px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-red-600"
              >
                {name}
              </a>
            ))}
          </div>

          <p className="mt-5 text-sm text-gray-400">{labels.moreHint}</p>

          <a
            href={whatsappLink("një destinacion tjetër")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-full bg-red-600 py-3.5 font-bold text-white transition hover:bg-red-700"
          >
            <MessageCircle size={18} />
            {labels.moreButton}
          </a>
        </div>
      </dialog>
    </section>
  );
}