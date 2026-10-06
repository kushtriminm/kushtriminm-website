"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { Check, MessageCircle, X, Calendar as CalendarIcon, Users, MapPin, ChevronDown } from "lucide-react";
import { busTours, type BusTour, type Departure } from "@/data/bus-tours";

const labels = {
  eyebrow: "Nisjet e radhës",
  heading: "Udhëtime me autobus",
  intro: "Autobusi, hoteli dhe mëngjesi janë të rregulluar. Zgjidh datën dhe rezervo vendin.",
  from: "nga",
  details: "Detaje",
  book: "Rezervo",
  bookWhatsApp: "Rezervo në WhatsApp",
  close: "Mbyll",
  dates: "Zgjidh datën e nisjes",
  tabProgram: "Programi",
  tabIncludes: "Përfshihet",
  tabInfo: "Info",
  extras: "Pagesa në udhëtim",
  documents: "Dokumentet",
  departFrom: "Nisja nga qyteti",
  passengers: "Numri i personave",
  totalPrice: "Çmimi total:",
  swipe: "Swipe for more",
  empty: "Nisje të reja shpallen së shpejti. Na shkruaj për datat e radhës.",
  emptyButton: "Na shkruaj në WhatsApp",
};

type Tab = "program" | "includes" | "info";
type UpcomingTour = BusTour & { upcoming: Departure[] };

function getToday() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const subscribe = () => () => {};

function euro(n: number) {
  return `${n}€`;
}

function whatsappLink(text: string) {
  return `https://wa.me/38349833888?text=${encodeURIComponent(text)}`;
}

function priceInfo(tour: UpcomingTour) {
  const prices = tour.upcoming.map((d) => d.price ?? tour.price);
  return { min: Math.min(...prices), varies: new Set(prices).size > 1 };
}

// Qytetet e nisjes të renditura saktë sipas orës
const departureCities = [
  { name: "Gjakovë", time: "14:00", location: "Stacioni i autobusve" },
  { name: "Prizren", time: "15:00", location: "Stacioni i autobusve" },
  { name: "Pejë", time: "15:00", location: "Stacioni autobusve" },
  { name: "Mitrovicë", time: "15:00", location: "Stacioni i autobusve" },
  { name: "Suharekë", time: "15:15", location: "Reshtan, Parkingu i Autobanit" },
  { name: "Klinë", time: "15:20", location: "Te Nora Market" },
  { name: "Malishevë", time: "15:20", location: "Te parkingu i autostradës, te rrethi i banjës" },
  { name: "Kiçevë / Kievi", time: "15:30", location: "Stacioni i vjetër" },
  { name: "Vushtrri", time: "15:30", location: "Tek rrethi i Gojbules" },
  { name: "Arllat", time: "15:40", location: "Në rrugën kryesore" },
  { name: "Komoran", time: "15:50", location: "Tek udhëkryqi" },
  { name: "Viti", time: "16:40", location: "Te udhëkryqi i Kllokotit" },
  { name: "Prishtinë", time: "17:00", location: "Stacioni i autobusve" },
  { name: "Ferizaj", time: "17:30", location: "Te parkingu te autobani (Bibaj)" },
  { name: "Hani i Elezit", time: "17:50", location: "Pumpa Shell në kufi" },
];

function getCityTime(tourSlug: string | undefined, cityName: string, defaultTime: string) {
  if (tourSlug === "budapest-vienna" && cityName === "Prishtinë") {
    return "23:00";
  }
  return defaultTime;
}

export default function BusTours() {
  const today = useSyncExternalStore(subscribe, getToday, getToday);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("program");

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>(departureCities[0].name);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [passengers, setPassengers] = useState<number>(1);

  const tours: UpcomingTour[] = busTours
    .filter((tour) => tour.active)
    .map((tour) => ({
      ...tour,
      upcoming: tour.departures
        .filter((d) => d.start >= today)
        .sort((a, b) => a.start.localeCompare(b.start)),
    }))
    .filter((tour) => tour.upcoming.length > 0);

  const selected = tours.find((tour) => tour.slug === selectedSlug) ?? null;
  const selectedInfo = selected ? priceInfo(selected) : null;

  const allowedCities = selected
    ? departureCities.filter((c) => selected.from.includes(c.name))
    : departureCities;

  const activeDeparture = selected?.upcoming.find((d) => d.start === selectedDate);
  const unitPrice = activeDeparture?.price ?? selected?.price ?? 0;
  const totalPrice = unitPrice * passengers;

  function openDetails(slug: string) {
    setSelectedSlug(slug);
    setTab("program");
    const found = tours.find((t) => t.slug === slug);
    if (found) {
      if (found.upcoming.length > 0) {
        setSelectedDate(found.upcoming[0].start);
      }
      const initialCities = departureCities.filter((c) => found.from.includes(c.name));
      setSelectedCity(initialCities.length > 0 ? initialCities[0].name : departureCities[0].name);
    }
    setPassengers(1);
    setIsDropdownOpen(false);
    document.body.style.overflow = "hidden";
    dialogRef.current?.showModal();
  }

  if (tours.length === 0) {
    return (
      <section className="bg-gradient-to-b from-black via-neutral-950 to-black px-5 py-14 sm:py-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-extrabold uppercase tracking-wide text-white sm:text-4xl">
            {labels.heading}
          </h2>
          <p className="mt-4 text-gray-400">{labels.empty}</p>
          <a
            href={whatsappLink("Përshëndetje! Dua të di për udhëtimet e radhës me autobus.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-red-600 px-8 py-3.5 font-bold text-white transition hover:bg-red-700"
          >
            <MessageCircle size={18} />
            {labels.emptyButton}
          </a>
        </div>
      </section>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "program", label: labels.tabProgram },
    { id: "includes", label: labels.tabIncludes },
    { id: "info", label: labels.tabInfo },
  ];

  const cityObj = departureCities.find((c) => c.name === selectedCity);
  const displayTime = cityObj ? getCityTime(selected?.slug, cityObj.name, cityObj.time) : "";
  const freqText = selected?.slug === "budapest-vienna" ? "Çdo të Enjte" : selected?.slug === "istanbul" ? "Çdo të Mërkurë" : "";

  const whatsappMessage = selected && selectedDate
    ? `Përshëndetje! Dua të rezervoj udhëtimin për ${selected.title} (${freqText}, Nisja: ${selectedDate.split("-").reverse().join("-")}), nga qyteti: ${selectedCity} (${displayTime}), për ${passengers} person/a. Çmimi total: ${totalPrice}€.`
    : "";

  return (
    <section className="bg-gradient-to-b from-black via-neutral-950 to-black px-5 py-14 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase text-red-500">{labels.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-extrabold uppercase tracking-wide text-white sm:text-5xl">
            {labels.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">{labels.intro}</p>
        </div>

        <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0">
          {tours.map((tour) => {
            const info = priceInfo(tour);
            // Përcaktojmë qartë etiketën për secilin udhëtim (Stamboll -> Çdo të Mërkurë, Budapest -> Çdo të Enjte)
            const tourFreqLabel = tour.slug === "budapest-vienna" ? "Nisjet: Çdo të Enjte" : tour.slug === "istanbul" ? "Nisjet: Çdo të Mërkurë" : "";

            return (
              <article
                key={tour.slug}
                className="flex w-[82%] shrink-0 snap-center flex-col overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 transition duration-300 hover:border-red-500/60 hover:shadow-[0_0_40px_rgba(220,38,38,0.25)] md:w-auto"
              >
                <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-neutral-800 to-neutral-950">
                  {tour.image && (
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      sizes="(min-width: 768px) 50vw, 82vw"
                      className="object-cover"
                    />
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                    {tour.duration}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-2xl font-extrabold uppercase tracking-wide text-white">
                    {tour.title}
                  </h3>

                  <p className="mt-1 flex items-baseline gap-2">
                    {info.varies && <span className="text-sm text-gray-400">{labels.from}</span>}
                    <span className="text-4xl font-black text-red-500">{euro(info.min)}</span>
                    <span className="text-sm text-gray-400">për person</span>
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-1.5">
                    {tourFreqLabel && (
                      <span className="rounded-full bg-red-600/20 px-3 py-1 text-xs font-bold text-red-400">
                        {tourFreqLabel}
                      </span>
                    )}
                    {tour.upcoming.slice(0, 3).map((d) => (
                      <span key={d.start} className="rounded-full bg-black px-2.5 py-1 text-xs font-bold text-white">
                        {d.start.split("-").reverse().slice(0, 2).join(".")}
                      </span>
                    ))}
                    {tour.upcoming.length > 3 && (
                      <span className="text-xs text-gray-400">+{tour.upcoming.length - 3}</span>
                    )}
                  </div>

                  <ul className="mt-4 space-y-1.5 text-sm text-gray-200">
                    {tour.highlights.map((item) => (
                      <li key={item} className="flex gap-2">
                        <Check size={16} className="mt-0.5 shrink-0 text-red-500" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
                    <button
                      type="button"
                      onClick={() => openDetails(tour.slug)}
                      className="rounded-full border border-white/30 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-black"
                    >
                      {labels.details}
                    </button>
                    <button
                      type="button"
                      onClick={() => openDetails(tour.slug)}
                      className="flex items-center justify-center gap-2 rounded-full bg-red-600 py-3 text-sm font-bold text-white transition hover:bg-red-700"
                    >
                      <MessageCircle size={16} />
                      {labels.book}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => {
          document.body.style.overflow = "";
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="fixed inset-0 m-auto h-fit max-h-[85svh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto overscroll-contain rounded-3xl bg-neutral-900 p-0 text-white backdrop:bg-black/70"
      >
        {selected && selectedInfo && (
          <div>
            <div className="relative">
              {selected.image && (
                <div className="relative aspect-[16/7] w-full">
                  <Image
                    src={selected.image}
                    alt={selected.title}
                    fill
                    sizes="(min-width: 640px) 576px, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
                </div>
              )}

              <button
                type="button"
                aria-label={labels.close}
                onClick={() => dialogRef.current?.close()}
                className="absolute right-3 top-3 z-10 rounded-full bg-black/60 p-2 backdrop-blur-sm transition hover:bg-black"
              >
                <X size={18} />
              </button>

              <div className="px-5 pb-1 pr-14 pt-5">
                <span className="inline-block mb-1 rounded-full bg-red-600/20 px-3 py-0.5 text-xs font-bold text-red-400">
                  {selected.duration} • {freqText}
                </span>
                <h3 className="text-2xl font-extrabold uppercase tracking-wide">{selected.title}</h3>
                <p className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-red-500">{euro(unitPrice)}</span>
                  <span className="text-sm text-gray-400">për person</span>
                </p>
              </div>
            </div>

            <div className="px-5 pb-5">
              <div className="mt-4">
                <p className="flex items-center gap-1.5 text-xs font-bold uppercase text-gray-400">
                  <CalendarIcon size={14} className="text-red-500" />
                  {labels.dates}
                </p>
                <div className="mt-2 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 sm:grid sm:grid-cols-4 sm:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {selected.upcoming.map((d) => {
                    const isSelected = selectedDate === d.start;
                    return (
                      <button
                        key={d.start}
                        type="button"
                        onClick={() => setSelectedDate(d.start)}
                        className={`flex min-w-[90px] shrink-0 snap-center flex-col items-center justify-center rounded-xl p-2.5 text-xs font-bold transition border ${
                          isSelected
                            ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/30"
                            : "bg-black/60 border-white/10 text-gray-200 hover:border-red-500/50"
                        }`}
                      >
                        <span className="text-[10px] uppercase opacity-75">Nisja</span>
                        <span className="text-sm font-extrabold mt-0.5">{d.start.split("-").reverse().slice(0, 2).join(".")}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 relative">
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase text-gray-400 mb-2">
                  <MapPin size={14} className="text-red-500" />
                  {labels.departFrom}
                </label>
                
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex items-center justify-between rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm font-medium text-white outline-none focus:border-red-500 transition"
                  >
                    <span>{selectedCity} — Ora {displayTime}</span>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute left-0 right-0 top-full mt-2 z-20 max-h-56 overflow-y-auto rounded-2xl border border-white/10 bg-neutral-950 p-2 shadow-2xl space-y-1">
                      {allowedCities.map((city) => {
                        const cTime = getCityTime(selected?.slug, city.name, city.time);
                        const isChosen = selectedCity === city.name;
                        return (
                          <button
                            key={city.name}
                            type="button"
                            onClick={() => {
                              setSelectedCity(city.name);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs transition ${
                              isChosen ? "bg-red-600 text-white font-bold" : "text-gray-300 hover:bg-neutral-800 hover:text-white"
                            }`}
                          >
                            <span>{city.name}</span>
                            <span className="opacity-80">Ora {cTime}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {cityObj && (
                  <p className="mt-2 flex flex-col gap-0.5 text-xs text-gray-400 pl-1">
                    <span>
                      Nisja në orën <strong className="text-white">{displayTime}</strong>
                    </span>
                    <span>
                      Lokacioni: <span className="text-gray-300">{cityObj.location}</span>
                    </span>
                  </p>
                )}
              </div>

              <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-red-500" />
                  <span className="text-xs font-bold uppercase text-gray-300">{labels.passengers}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-base font-bold text-white hover:bg-red-600 transition"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-base font-extrabold text-white">{passengers}</span>
                  <button
                    type="button"
                    onClick={() => setPassengers(passengers + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-base font-bold text-white hover:bg-red-600 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-2xl bg-red-600/10 border border-red-600/30 px-4 py-3">
                <span className="text-sm font-bold text-gray-300">{labels.totalPrice}</span>
                <span className="text-2xl font-black text-red-500">{euro(totalPrice)}</span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-1 rounded-full bg-black/60 p-1 text-xs font-bold">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    className={`rounded-full py-2 transition ${
                      tab === t.id ? "bg-red-600 text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="mt-4 text-sm leading-6 text-gray-300">
                {tab === "program" && (
                  <ol className="space-y-4">
                    {selected.itinerary.map((step) => (
                      <li key={step.day} className="border-l-2 border-red-600 pl-4">
                        <p className="font-bold text-white">{step.day}</p>
                        <p>{step.text}</p>
                      </li>
                    ))}
                  </ol>
                )}

                {tab === "includes" && (
                  <ul className="space-y-2">
                    {selected.includes.map((item) => (
                      <li key={item} className="flex gap-2">
                        <Check size={16} className="mt-1 shrink-0 text-red-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {tab === "info" && (
                  <div className="space-y-5">
                    <div>
                      <p className="font-bold text-white">{labels.extras}</p>
                      <ul className="mt-1 space-y-1">
                        {selected.extras.map((extra) => (
                          <li key={extra}>{extra}</li>
                        ))}
                      </ul>
                    </div>
                    <p>
                      <span className="font-bold text-white">{labels.documents}: </span>
                      {selected.documents}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="sticky bottom-0 border-t border-neutral-800 bg-neutral-900 p-4">
              <a
                href={whatsappLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-red-600 py-3.5 font-bold text-white transition hover:bg-red-700 shadow-lg shadow-red-600/30"
              >
                <MessageCircle size={18} />
                {labels.bookWhatsApp}
              </a>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}