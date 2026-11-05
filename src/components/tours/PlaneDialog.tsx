"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Calendar as CalendarIcon,
  Check,
  MessageCircle,
  Plane,
  Users,
  X,
} from "lucide-react";
import {
  CONDITIONS,
  NOT_INCLUDED,
  allIncludes,
  offers,
  perPerson,
} from "@/data/offers";
import type { Lang } from "@/components/LanguageProvider";
import { dayMonth, euro, fullDate, useToday, whatsappLink } from "./shared";
import { useModalDialog } from "./useModalDialog";

type Tab = "program" | "includes" | "info";

// All the words here, in both languages. Change them here.
const labels = {
  sq: {
    close: "Mbyll",
    dates: "Zgjidh datën e nisjes",
    people: "Numri i personave",
    perPerson: "për person",
    total: "Çmimi total:",
    tabProgram: "Programi",
    tabIncludes: "Përfshihet",
    tabInfo: "Info",
    day: "Dita",
    notIncluded: "Nuk përfshihet",
    extras: "Opsionale (pagesë shtesë)",
    notes: "Kujdes",
    conditions: "Kushtet",
    book: "Rezervo në WhatsApp",
  },
  en: {
    close: "Close",
    dates: "Choose your departure date",
    people: "Number of people",
    perPerson: "per person",
    total: "Total price:",
    tabProgram: "Program",
    tabIncludes: "Included",
    tabInfo: "Info",
    day: "Day",
    notIncluded: "Not included",
    extras: "Optional (extra cost)",
    notes: "Please note",
    conditions: "Conditions",
    book: "Book on WhatsApp",
  },
};

export default function PlaneDialog({
  slug,
  lang,
  onClose,
}: {
  slug: string;
  lang: Lang;
  onClose: () => void;
}) {
  const t = labels[lang];
  const today = useToday();
  const ref = useModalDialog(onClose);

  const offer = offers.find((o) => o.slug === slug);
  const upcoming = offer
    ? offer.departures.filter((d) => d.start >= today).sort((a, b) => a.start.localeCompare(b.start))
    : [];

  const [date, setDate] = useState(upcoming[0]?.start ?? "");
  const [people, setPeople] = useState(2);
  const [tab, setTab] = useState<Tab>("program");

  if (!offer || upcoming.length === 0) return null;

  const dep = upcoming.find((d) => d.start === date) ?? upcoming[0];
  const unit = perPerson(dep.total);
  const total = unit * people;
  const title = offer.title[lang];

  const message =
    lang === "en"
      ? `Hello! I would like to book "${title}" (${fullDate(dep.start)} - ${fullDate(dep.end)}) for ${people} person(s). Price: ${unit}€ per person (${total}€ total).`
      : `Përshëndetje! Dua të rezervoj udhëtimin "${title}" (${fullDate(dep.start)} - ${fullDate(dep.end)}) për ${people} person/a. Çmimi: ${unit}€ për person (${total}€ total).`;

  const tabs: { id: Tab; label: string }[] = [
    { id: "program", label: t.tabProgram },
    { id: "includes", label: t.tabIncludes },
    { id: "info", label: t.tabInfo },
  ];

  return (
    <dialog
      ref={ref}
      aria-label={title}
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close();
      }}
      className="fixed inset-0 m-auto h-fit max-h-[88svh] w-[calc(100%-1.5rem)] max-w-lg overflow-y-auto overscroll-contain rounded-3xl bg-neutral-900 p-0 text-white backdrop:bg-black/70"
    >
      <div>
        <div className="relative">
          {offer.image && (
            <div className="relative aspect-[16/6] w-full">
              <Image
                src={offer.image}
                alt={title}
                fill
                sizes="(min-width: 640px) 512px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
            </div>
          )}

          <button
            type="button"
            aria-label={t.close}
            onClick={() => ref.current?.close()}
            className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm transition hover:bg-black"
          >
            <X size={18} />
          </button>

          <div className="px-5 pb-1 pr-14 pt-5">
            <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-red-600/20 px-3 py-0.5 text-xs font-bold text-red-400">
              <Plane size={12} aria-hidden="true" />
              {offer.duration[lang]}
            </span>
            <h3 className="break-words text-xl font-extrabold uppercase leading-tight tracking-wide">
              {title}
            </h3>
            <p className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-black text-red-500">{euro(unit)}</span>
              <span className="text-sm text-gray-400">{t.perPerson}</span>
            </p>
          </div>
        </div>

        <div className="px-5 pb-5">
          <p className="mt-3 flex items-center gap-1.5 text-xs font-bold uppercase text-gray-400">
            <CalendarIcon size={14} className="text-red-500" />
            {t.dates}
          </p>
          <div className="mt-2 flex snap-x gap-2 overflow-x-auto pb-2 sm:grid sm:grid-cols-4 sm:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {upcoming.map((d) => {
              const chosen = dep.start === d.start;
              return (
                <button
                  key={d.start}
                  type="button"
                  aria-pressed={chosen}
                  onClick={() => setDate(d.start)}
                  className={`flex min-h-[52px] min-w-[84px] shrink-0 snap-center flex-col items-center justify-center rounded-xl border p-2 text-xs font-bold transition ${
                    chosen
                      ? "border-red-500 bg-red-600 text-white shadow-lg shadow-red-600/30"
                      : "border-white/10 bg-black/60 text-gray-200 hover:border-red-500/50"
                  }`}
                >
                  <span className="text-sm font-extrabold">{dayMonth(d.start)}</span>
                  <span className="opacity-80">{euro(perPerson(d.total))}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
            <div className="flex min-w-0 items-center gap-2">
              <Users size={16} className="shrink-0 text-red-500" />
              <span className="text-xs font-bold uppercase text-gray-300">{t.people}</span>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <button
                type="button"
                aria-label="-"
                onClick={() => setPeople(Math.max(1, people - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 font-bold transition hover:bg-red-600"
              >
                -
              </button>
              <span className="w-6 text-center text-base font-extrabold">{people}</span>
              <button
                type="button"
                aria-label="+"
                onClick={() => setPeople(people + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 font-bold transition hover:bg-red-600"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-red-600/30 bg-red-600/10 px-4 py-3">
            <span className="text-sm font-bold text-gray-300">{t.total}</span>
            <span className="text-2xl font-black text-red-500">{euro(total)}</span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-1 rounded-full bg-black/60 p-1 text-xs font-bold">
            {tabs.map((tabItem) => (
              <button
                key={tabItem.id}
                type="button"
                aria-pressed={tab === tabItem.id}
                onClick={() => setTab(tabItem.id)}
                className={`min-h-[40px] rounded-full px-1 transition ${
                  tab === tabItem.id ? "bg-red-600 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {tabItem.label}
              </button>
            ))}
          </div>

          <div className="mt-4 break-words text-sm leading-6 text-gray-300">
            {tab === "program" && (
              <ol className="space-y-4">
                {offer.days.map((day, i) => (
                  <li key={i} className="border-l-2 border-red-600 pl-4">
                    <p className="font-bold text-white">
                      {t.day} {i + 1}
                    </p>
                    <p>{day[lang]}</p>
                  </li>
                ))}
              </ol>
            )}

            {tab === "includes" && (
              <ul className="space-y-2">
                {allIncludes(offer).map((item) => (
                  <li key={item.sq} className="flex gap-2">
                    <Check size={16} className="mt-1 shrink-0 text-red-500" />
                    <span className="min-w-0">{item[lang]}</span>
                  </li>
                ))}
              </ul>
            )}

            {tab === "info" && (
              <div className="space-y-5">
                <div>
                  <p className="font-bold text-white">{t.notIncluded}</p>
                  <ul className="mt-1 list-disc space-y-1 pl-5">
                    {NOT_INCLUDED.map((item) => (
                      <li key={item.sq}>{item[lang]}</li>
                    ))}
                  </ul>
                </div>
                {offer.extras && (
                  <div>
                    <p className="font-bold text-white">{t.extras}</p>
                    <ul className="mt-1 list-disc space-y-1 pl-5">
                      {offer.extras.map((item) => (
                        <li key={item.sq}>{item[lang]}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {offer.notes && (
                  <div>
                    <p className="font-bold text-white">{t.notes}</p>
                    <ul className="mt-1 list-disc space-y-1 pl-5">
                      {offer.notes.map((item) => (
                        <li key={item.sq}>{item[lang]}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div>
                  <p className="font-bold text-white">{t.conditions}</p>
                  <ul className="mt-1 list-disc space-y-1 pl-5">
                    {CONDITIONS.map((item) => (
                      <li key={item.sq}>{item[lang]}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 border-t border-neutral-800 bg-neutral-900 p-4">
          <a
            href={whatsappLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-red-600 py-3 font-bold text-white shadow-lg shadow-red-600/30 transition hover:bg-red-700"
          >
            <MessageCircle size={18} />
            {t.book}
          </a>
        </div>
      </div>
    </dialog>
  );
}