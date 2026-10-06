"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { Check, MessageCircle, Minus, Plus, X } from "lucide-react";
import { allHotels, type Country } from "@/data/all-hotels";
import { allBoards, boardLabels, type Board } from "@/data/hotel-pricing";
import { addDays, boardsFor, calcQuote, formatDate } from "@/lib/booking";
import Dropdown, { type DropdownGroup } from "./Dropdown";

// All the words in this form. Change them here.
const labels = {
  step1: "Ku dëshiron të shkosh?",
  step2: "Hoteli dhe shërbimi",
  step3: "Datat dhe udhëtarët",
  summary: "Përmbledhja",
  chooseHotel: "Zgjidh hotelin",
  searchHotel: "Kërko hotelin...",
  noHotel: "Nuk u gjet asnjë hotel",
  dontKnow: "Nuk e di ende, më këshilloni",
  placeLabel: "Qyteti, zona ose hoteli (opsionale)",
  checkIn: "Data e nisjes (opsionale)",
  nights: "Sa net",
  checkOut: "Kthimi",
  service: "Service (optional)",
  adults: "Të rritur",
  children: "Fëmijë",
  addChild: "Shto fëmijë",
  years: "vjeç",
  notes: "Shënime (opsionale)",
  total: "Totali i vlerësuar",
  disclaimer:
    "Çmim orientues. Disponueshmërinë dhe çmimin final i konfirmojmë ne në WhatsApp.",
  send: "Kërko ofertë në WhatsApp",
  pickFirst: "Zgjidh destinacionin për të vazhduar",
  rowDestination: "Destinacioni",
  rowHotel: "Hoteli",
  rowDates: "Data",
  rowService: "Service",
  rowGuests: "Udhëtarët",
  notSet: "—",
};

// image: optional photo. Without one the tile gets a dark red background.
type Dest = { id: string; label: string; sub: string; country?: Country; image?: string };

const destinations: Dest[] = [
  { id: "antalya", label: "Antalya", sub: "Turqi", country: "Turkey", image: "/images/destinations/antalya/hero.jpg" },
  { id: "egypt", label: "Hurghada", sub: "Egjipt", country: "Egypt", image: "/images/destinations/egypt/hero.jpg" },
  { id: "greece", label: "Greqi", sub: "Ishuj & bregdet", country: "Greece", image: "/images/destinations/greece/hero.jpg" },
  { id: "albania", label: "Shqipëri", sub: "Bregdet", country: "Albania" },
  { id: "dubai", label: "Dubai", sub: "Emiratet" },
  { id: "europe", label: "Evropë", sub: "Qytete" },
  { id: "other", label: "Tjetër", sub: "Na trego" },
];

const field =
  "w-full rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-white outline-none [color-scheme:dark] placeholder:text-gray-600 transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20";
const tag = "mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-400";
const round =
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 transition hover:bg-red-600 disabled:opacity-30";
const card =
  "rounded-3xl border border-white/10 bg-gradient-to-b from-neutral-900 to-neutral-950 p-4 sm:p-6";

const subscribe = () => () => {};
function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function Stepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-neutral-950 px-4 py-2.5">
      <span className="text-sm text-gray-300">{label}</span>
      <div className="flex items-center gap-3">
        <button type="button" aria-label={`${label} -`} disabled={value <= min} onClick={() => onChange(value - 1)} className={round}>
          <Minus size={16} />
        </button>
        <span className="w-6 text-center font-bold">{value}</span>
        <button type="button" aria-label={`${label} +`} disabled={value >= max} onClick={() => onChange(value + 1)} className={round}>
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}

function StepTitle({ n, children }: { n: number; children: string }) {
  return (
    <h3 className="mb-5 flex items-center gap-3 text-base font-extrabold uppercase tracking-wide">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm shadow-lg shadow-red-900/40">
        {n}
      </span>
      {children}
    </h3>
  );
}

function Row({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-white/5 py-2 text-sm last:border-0">
      <span className="text-gray-400">{name}</span>
      <span className="text-right font-bold">{value}</span>
    </div>
  );
}

export default function RequestForm() {
  const today = useSyncExternalStore(subscribe, getToday, () => "");

  const [destId, setDestId] = useState("");
  const [slug, setSlug] = useState("");
  const [place, setPlace] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [nights, setNights] = useState(7);
  const [board, setBoard] = useState<Board | "">("");
  const [adults, setAdults] = useState(2);
  const [childAges, setChildAges] = useState<number[]>([]);
  const [notes, setNotes] = useState("");

  const dest = destinations.find((d) => d.id === destId);
  const countryHotels = dest?.country
    ? allHotels.filter((h) => h.country === dest.country)
    : [];
  const hotel = countryHotels.find((h) => h.slug === slug);

  const regions = Array.from(new Set(countryHotels.map((h) => h.region)));
  const hotelGroups: DropdownGroup[] = [
    { options: [{ value: "", label: labels.dontKnow }] },
    ...regions.map((region) => ({
      label: region,
      options: countryHotels
        .filter((h) => h.region === region)
        .map((h) => ({ value: h.slug, label: h.name })),
    })),
  ];

  const boards = hotel ? boardsFor(hotel.slug) : allBoards;
  const activeBoard: Board | "" = board && boards.includes(board) ? board : "";
  const checkOut = checkIn ? addDays(checkIn, nights) : "";

  const quote =
    hotel && checkIn
      ? calcQuote(hotel.slug, activeBoard || boards[0], checkIn, checkOut, adults, childAges)
      : null;

  function pickDestination(id: string) {
    setDestId(id);
    setSlug("");
    setPlace("");
    setBoard("");
  }

  function changeAge(index: number, delta: number) {
    setChildAges(
      childAges.map((age, i) =>
        i === index ? Math.min(17, Math.max(0, age + delta)) : age
      )
    );
  }

  const guestsText = `${adults} ${labels.adults.toLowerCase()}${
    childAges.length > 0 ? `, ${childAges.length} ${labels.children.toLowerCase()}` : ""
  }`;

  const message = [
    "Përshëndetje! Dua një ofertë:",
    dest ? `Destinacioni: ${dest.label} (${dest.sub})` : "",
    hotel ? `Hoteli: ${hotel.name}` : place ? `Hoteli / zona: ${place}` : "",
    checkIn
      ? `Data: ${formatDate(checkIn)} - ${formatDate(checkOut)} (${nights} net)`
      : "Data: ende pa vendosur",
    activeBoard ? `Shërbimi: ${boardLabels[activeBoard]}` : "",
    `Të rritur: ${adults}`,
    childAges.length > 0
      ? `Fëmijë: ${childAges.length} (mosha: ${childAges.join(", ")})`
      : "Fëmijë: 0",
    quote && quote.ok ? `Çmimi orientues: ${quote.total}€` : "",
    notes ? `Shënime: ${notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const href = `https://wa.me/38349833888?text=${encodeURIComponent(message)}`;

  return (
    <div className="space-y-5">
      {/* Step 1: destinations in one horizontal row */}
      <div className={card}>
        <StepTitle n={1}>{labels.step1}</StepTitle>
        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-7 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
          {destinations.map((d) => {
            const selected = destId === d.id;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => pickDestination(d.id)}
                aria-pressed={selected}
                className={`group relative aspect-[3/4] w-[36%] shrink-0 snap-center overflow-hidden rounded-2xl border text-left transition duration-300 sm:w-[24%] lg:w-auto ${
                  selected
                    ? "border-red-500 ring-2 ring-red-500 shadow-[0_0_30px_rgba(220,38,38,0.35)]"
                    : "border-white/10 hover:border-red-500/60"
                } ${d.image ? "bg-neutral-900" : "bg-gradient-to-br from-red-950/70 to-neutral-900"}`}
              >
                {d.image && (
                  <Image
                    src={d.image}
                    alt={d.label}
                    fill
                    sizes="(min-width: 1024px) 150px, 36vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                {selected && (
                  <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600">
                    <Check size={14} />
                  </span>
                )}
                <span className="absolute inset-x-0 bottom-0 p-3">
                  <span className="block text-sm font-extrabold uppercase tracking-wide">
                    {d.label}
                  </span>
                  <span className="block text-xs text-gray-300">{d.sub}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {!dest && (
        <span className="flex items-center justify-center gap-2 rounded-full bg-white/10 py-4 text-sm font-bold text-gray-400">
          <MessageCircle size={18} />
          {labels.pickFirst}
        </span>
      )}

      {dest && (
        <div className="grid gap-5 lg:grid-cols-3 lg:items-start">
          {/* Step 2 */}
          <div className={card}>
            <StepTitle n={2}>{labels.step2}</StepTitle>
            <div className="space-y-5">
              {countryHotels.length > 0 ? (
                <Dropdown
                  value={slug}
                  onChange={setSlug}
                  groups={hotelGroups}
                  placeholder={labels.chooseHotel}
                  searchable
                  searchPlaceholder={labels.searchHotel}
                  emptyText={labels.noHotel}
                />
              ) : (
                <div>
                  <label className={tag}>{labels.placeLabel}</label>
                  <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} className={field} />
                </div>
              )}

              <div>
                <p className={tag}>{labels.service}</p>
                <div className="flex flex-wrap gap-2">
                  {boards.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBoard(activeBoard === b ? "" : b)}
                      className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                        activeBoard === b
                          ? "bg-red-600 text-white shadow-lg shadow-red-900/40"
                          : "border border-white/10 bg-neutral-950 text-gray-300 hover:border-red-500/60 hover:text-white"
                      }`}
                    >
                      {boardLabels[b]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className={card}>
            <StepTitle n={3}>{labels.step3}</StepTitle>
            <div className="space-y-4">
              <div>
                <label className={tag}>{labels.checkIn}</label>
                <input type="date" min={today} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className={field} />
              </div>

              <div>
                <p className={tag}>{labels.nights}</p>
                <Stepper
                  label={checkOut ? `→ ${formatDate(checkOut)}` : labels.checkOut}
                  value={nights}
                  min={1}
                  max={30}
                  onChange={setNights}
                />
              </div>

              <div className="space-y-2">
                <Stepper label={labels.adults} value={adults} min={1} max={10} onChange={setAdults} />

                {childAges.map((age, index) => (
                  <div key={index} className="flex items-center justify-between gap-2 rounded-xl bg-neutral-950 px-4 py-2.5">
                    <span className="text-sm text-gray-300">
                      {labels.children} {index + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      <button type="button" aria-label="-" disabled={age <= 0} onClick={() => changeAge(index, -1)} className={round}>
                        <Minus size={16} />
                      </button>
                      <span className="w-14 text-center text-sm font-bold">
                        {age} {labels.years}
                      </span>
                      <button type="button" aria-label="+" disabled={age >= 17} onClick={() => changeAge(index, 1)} className={round}>
                        <Plus size={16} />
                      </button>
                      <button
                        type="button"
                        aria-label="Hiq"
                        onClick={() => setChildAges(childAges.filter((_, i) => i !== index))}
                        className={`${round} ml-1`}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))}

                {childAges.length < 6 && (
                  <button
                    type="button"
                    onClick={() => setChildAges([...childAges, 5])}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 py-2.5 text-sm font-bold text-gray-300 transition hover:border-red-500 hover:text-white"
                  >
                    <Plus size={16} />
                    {labels.addChild}
                  </button>
                )}
              </div>

              <div>
                <label className={tag}>{labels.notes}</label>
                <textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} className={field} />
              </div>
            </div>
          </div>

          {/* Step 4: summary + send (stays visible on desktop while scrolling) */}
          <div className="space-y-4 lg:sticky lg:top-28">
            <div className={card}>
              <h3 className="mb-3 text-base font-extrabold uppercase tracking-wide">{labels.summary}</h3>
              <Row name={labels.rowDestination} value={dest.label} />
              <Row name={labels.rowHotel} value={hotel?.name ?? (place || labels.notSet)} />
              <Row
                name={labels.rowDates}
                value={checkIn ? `${formatDate(checkIn)} → ${formatDate(checkOut)}` : labels.notSet}
              />
              <Row name={labels.rowService} value={activeBoard ? boardLabels[activeBoard] : labels.notSet} />
              <Row name={labels.rowGuests} value={guestsText} />
            </div>

            {quote && quote.ok && (
              <div className="rounded-3xl border border-red-500/50 bg-gradient-to-br from-red-600/20 to-red-950/20 p-5 shadow-[0_0_40px_rgba(220,38,38,0.2)]">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-300">{labels.total}</p>
                <p className="mt-1 text-4xl font-extrabold">{quote.total}€</p>
                <p className="mt-2 text-xs text-gray-400">{labels.disclaimer}</p>
              </div>
            )}

            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-red-600 py-4 text-lg font-bold text-white shadow-lg shadow-red-900/40 transition hover:bg-red-700"
            >
              <MessageCircle size={20} />
              {labels.send}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}