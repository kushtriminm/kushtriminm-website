"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Bus,
  Calendar as CalendarIcon,
  Check,
  ChevronDown,
  MapPin,
  MessageCircle,
  Users,
  X,
} from "lucide-react";
import { busTours } from "@/data/bus-tours";
import type { Lang } from "@/components/LanguageProvider";
import { dayMonth, euro, fullDate, useToday, whatsappLink } from "./shared";
import { useModalDialog } from "./useModalDialog";

type Tab = "program" | "includes" | "info";
type CityRow = { name: string; time?: string; location?: string; locationEn?: string };

// All the words here, in both languages. Change them here.
const labels = {
  sq: {
    close: "Mbyll",
    dates: "Zgjidh datën e nisjes",
    departFrom: "Nisja nga qyteti",
    noCities: "Qytetet dhe orari i nisjes konfirmohen në WhatsApp.",
    passengers: "Numri i personave",
    total: "Çmimi total:",
    hour: "Ora",
    leavesAt: "Nisja në orën",
    location: "Lokacioni",
    tabProgram: "Programi",
    tabIncludes: "Përfshihet",
    tabInfo: "Info",
    extras: "Pagesa në udhëtim",
    notes: "Kujdes",
    documents: "Dokumentet",
    book: "Rezervo në WhatsApp",
  },
  en: {
    close: "Close",
    dates: "Choose your departure date",
    departFrom: "Departure city",
    noCities: "Departure cities and times are confirmed on WhatsApp.",
    passengers: "Number of passengers",
    total: "Total price:",
    hour: "At",
    leavesAt: "Departure at",
    location: "Location",
    tabProgram: "Program",
    tabIncludes: "Included",
    tabInfo: "Info",
    extras: "Payments during the trip",
    notes: "Please note",
    documents: "Documents",
    book: "Book on WhatsApp",
  },
};

// Shared departure cities (used when a tour has no list of its own), in order of time.
const departureCities: (CityRow & { time: string })[] = [
  { name: "Gjakovë", time: "14:00", location: "Stacioni i autobusve", locationEn: "Bus station" },
  { name: "Prizren", time: "15:00", location: "Stacioni i autobusve", locationEn: "Bus station" },
  { name: "Pejë", time: "15:00", location: "Stacioni i autobusve", locationEn: "Bus station" },
  { name: "Mitrovicë", time: "15:00", location: "Stacioni i autobusve", locationEn: "Bus station" },
  { name: "Suharekë", time: "15:15", location: "Reshtan, Parkingu i Autobanit", locationEn: "Reshtan, motorway parking" },
  { name: "Klinë", time: "15:20", location: "Te Nora Market", locationEn: "At Nora Market" },
  { name: "Malishevë", time: "15:20", location: "Te parkingu i autostradës, te rrethi i banjës", locationEn: "At the motorway parking, by the spa roundabout" },
  { name: "Kiçevë / Kievi", time: "15:30", location: "Stacioni i vjetër", locationEn: "Old station" },
  { name: "Vushtrri", time: "15:30", location: "Tek rrethi i Gojbules", locationEn: "At the Gojbulja roundabout" },
  { name: "Arllat", time: "15:40", location: "Në rrugën kryesore", locationEn: "On the main road" },
  { name: "Komoran", time: "15:50", location: "Tek udhëkryqi", locationEn: "At the junction" },
  { name: "Viti", time: "16:40", location: "Te udhëkryqi i Kllokotit", locationEn: "At the Kllokot junction" },
  { name: "Prishtinë", time: "17:00", location: "Stacioni i autobusve", locationEn: "Bus station" },
  { name: "Ferizaj", time: "17:30", location: "Te parkingu te autobani (Bibaj)", locationEn: "At the motorway parking (Bibaj)" },
  { name: "Hani i Elezit", time: "17:50", location: "Pumpa Shell në kufi", locationEn: "Shell petrol station at the border" },
];

function cityTime(tourSlug: string, cityName: string, defaultTime: string) {
  if (tourSlug === "budapest-vienna" && cityName === "Prishtinë") return "23:00";
  return defaultTime;
}

export default function BusDialog({
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

  const tour = busTours.find((x) => x.slug === slug);
  const upcoming = tour
    ? tour.departures.filter((d) => d.start >= today).sort((a, b) => a.start.localeCompare(b.start))
    : [];
  const cityRows: CityRow[] = tour
    ? (tour.cities ??
      departureCities
        .filter((c) => tour.from.includes(c.name))
        .map((c) => ({ ...c, time: cityTime(tour.slug, c.name, c.time) })))
    : [];

  const [date, setDate] = useState(upcoming[0]?.start ?? "");
  const [city, setCity] = useState(cityRows[0]?.name ?? "");
  const [people, setPeople] = useState(1);
  const [tab, setTab] = useState<Tab>("program");
  const [menuOpen, setMenuOpen] = useState(false);

  if (!tour || upcoming.length === 0) return null;

  const text = lang === "en" && tour.en ? tour.en : tour;
  const dep = upcoming.find((d) => d.start === date) ?? upcoming[0];
  const unit = dep.price ?? tour.price;
  const total = unit * people;
  const cityObj = cityRows.find((c) => c.name === city);
  const time = cityObj?.time;
  const where = cityObj ? `${cityObj.name}${time ? ` (${time})` : ""}` : "";

  const message =
    lang === "en"
      ? `Hello! I would like to book the ${text.title} trip (departure: ${fullDate(dep.start)})${where ? ` from ${where}` : ""}, for ${people} person(s). Total price: ${total}€.`
      : `Përshëndetje! Dua të rezervoj udhëtimin për ${text.title} (nisja: ${fullDate(dep.start)})${where ? `, nga qyteti: ${where}` : ""}, për ${people} person/a. Çmimi total: ${total}€.`;

  const tabs: { id: Tab; label: string }[] = [
    { id: "program", label: t.tabProgram },
    { id: "includes", label: t.tabIncludes },
    { id: "info", label: t.tabInfo },
  ];

  return (
    <dialog
      ref={ref}
      aria-label={text.title}
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close();
      }}
      className="fixed inset-0 m-auto h-fit max-h-[88svh] w-[calc(100%-1.5rem)] max-w-lg overflow-y-auto overscroll-contain rounded-3xl bg-neutral-900 p-0 text-white backdrop:bg-black/70"
    >
      <div>
        <div className="relative">
          {tour.image && (
            <div className="relative aspect-[16/6] w-full">
              <Image
                src={tour.image}
                alt={text.title}
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

          <div className="px-5 pb-1 pr-14 pt-4">
            <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-red-600/20 px-3 py-0.5 text-xs font-bold text-red-400">
              <Bus size={12} aria-hidden="true" />
              {text.duration}
            </span>
            <h3 className="break-words text-balance text-xl font-extrabold uppercase leading-tight tracking-wide">
              {text.title}
            </h3>
            <p className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-black text-red-500">{euro(unit)}</span>
              <span className="text-sm text-gray-400">{text.priceNote}</span>
            </p>
          </div>
        </div>

        <div className="px-5 pb-5">
          <p className="mt-4 flex items-center gap-1.5 text-xs font-bold uppercase text-gray-400">
            <CalendarIcon size={14} className="text-red-500" />
            {t.dates}
          </p>
          <div className="mt-2 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 sm:grid sm:grid-cols-4 sm:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
                  <span className="opacity-80">{euro(d.price ?? tour.price)}</span>
                </button>
              );
            })}
          </div>

          <div className="relative mt-4">
            {cityRows.length > 0 ? (
              <>
                <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase text-gray-400">
                  <MapPin size={14} className="text-red-500" />
                  {t.departFrom}
                </p>

                <div className="relative">
                  <button
                    type="button"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex min-h-[48px] w-full items-center justify-between gap-2 rounded-2xl border border-white/10 bg-black px-4 py-3 text-left text-sm font-medium text-white outline-none transition focus:border-red-500"
                  >
                    <span className="min-w-0 break-words">
                      {city}
                      {time ? ` — ${t.hour} ${time}` : ""}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`shrink-0 text-gray-400 transition-transform ${menuOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {menuOpen && (
                    <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-56 space-y-1 overflow-y-auto rounded-2xl border border-white/10 bg-neutral-950 p-2 shadow-2xl">
                      {cityRows.map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => {
                            setCity(c.name);
                            setMenuOpen(false);
                          }}
                          className={`flex min-h-[44px] w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-xs transition ${
                            city === c.name
                              ? "bg-red-600 font-bold text-white"
                              : "text-gray-300 hover:bg-neutral-800 hover:text-white"
                          }`}
                        >
                          <span>{c.name}</span>
                          {c.time && (
                            <span className="shrink-0 opacity-80">
                              {t.hour} {c.time}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {cityObj && (time || cityObj.location) && (
                  <p className="mt-2 flex flex-col gap-0.5 pl-1 text-xs text-gray-400">
                    {time && (
                      <span>
                        {t.leavesAt} <strong className="text-white">{time}</strong>
                      </span>
                    )}
                    {cityObj.location && (
                      <span>
                        {t.location}:{" "}
                        <span className="text-gray-300">
                          {lang === "en" ? (cityObj.locationEn ?? cityObj.location) : cityObj.location}
                        </span>
                      </span>
                    )}
                  </p>
                )}
              </>
            ) : (
              <p className="flex items-start gap-2 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-gray-300">
                <MapPin size={14} className="mt-0.5 shrink-0 text-red-500" />
                {t.noCities}
              </p>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
            <div className="flex min-w-0 items-center gap-2">
              <Users size={16} className="shrink-0 text-red-500" />
              <span className="text-xs font-bold uppercase text-gray-300">{t.passengers}</span>
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
                {text.itinerary.map((step) => (
                  <li key={step.day} className="border-l-2 border-red-600 pl-4">
                    <p className="font-bold text-white">{step.day}</p>
                    <p>{step.text}</p>
                  </li>
                ))}
              </ol>
            )}

            {tab === "includes" && (
              <ul className="space-y-2">
                {text.includes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check size={16} className="mt-1 shrink-0 text-red-500" />
                    <span className="min-w-0">{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {tab === "info" && (
              <div className="space-y-5">
                {text.extras.length > 0 && (
                  <div>
                    <p className="font-bold text-white">{t.extras}</p>
                    <ul className="mt-1 list-disc space-y-1 pl-5">
                      {text.extras.map((extra) => (
                        <li key={extra}>{extra}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {text.notes && text.notes.length > 0 && (
                  <div>
                    <p className="font-bold text-white">{t.notes}</p>
                    <ul className="mt-1 list-disc space-y-1 pl-5">
                      {text.notes.map((note) => (
                        <li key={note}>{note}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {text.documents && (
                  <p>
                    <span className="font-bold text-white">{t.documents}: </span>
                    {text.documents}
                  </p>
                )}
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