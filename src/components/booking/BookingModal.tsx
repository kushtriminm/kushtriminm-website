"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Minus, Plus, X } from "lucide-react";
import { allHotels as hotels } from "@/data/all-hotels";
import { boardLabels, type Board } from "@/data/hotel-pricing";
import {
  addDays,
  boardsFor,
  calcQuote,
  formatDate,
  type Quote,
} from "@/lib/booking";
import Dropdown, { type DropdownGroup } from "./Dropdown";

// All the words in the pop-up. Change them here.
const labels = {
  title: "Rezervo një qëndrim",
  hotel: "Hoteli",
  chooseHotel: "Zgjidh hotelin",
  searchHotel: "Kërko hotelin...",
  noHotel: "Nuk u gjet asnjë hotel",
  checkIn: "Data e hyrjes",
  nights: "Sa net",
  checkOut: "Dalja",
  service: "Shërbimi",
  adults: "Të rritur",
  children: "Fëmijë",
  addChild: "Shto fëmijë",
  years: "vjeç",
  total: "Totali i vlerësuar",
  disclaimer:
    "Çmim orientues. Disponueshmërinë dhe çmimin final i konfirmojmë ne në WhatsApp.",
  send: "Pyet për vende të lira",
  close: "Mbyll",
};

function problemText(quote: Extract<Quote, { ok: false }>) {
  switch (quote.problem) {
    case "dates":
      return "Zgjidh datën e hyrjes.";
    case "noPrices":
      return "Çmimet për këtë hotel shpallen së shpejti. Dërgo kërkesën dhe të përgjigjemi me ofertën.";
    case "outOfSeason":
      return "Për këto data nuk kemi ende çmim të shpallur. Dërgo kërkesën dhe e kontrollojmë.";
    case "board":
      return "Ky shërbim nuk ka çmim për këto data. Zgjidh një tjetër ose dërgo kërkesën.";
    case "minNights":
      return `Për këto data kërkohen të paktën ${quote.minNights} net.`;
    case "blocked":
      return "Këto data mund të mos jenë të lira. Dërgo kërkesën dhe e kontrollojmë.";
  }
}

const regions = Array.from(new Set(hotels.map((hotel) => hotel.region)));

const hotelGroups: DropdownGroup[] = regions.map((region) => ({
  label: region,
  options: hotels
    .filter((hotel) => hotel.region === region)
    .map((hotel) => ({ value: hotel.slug, label: hotel.name })),
}));

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none [color-scheme:dark] focus:border-red-500";

const roundButton =
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 transition hover:bg-red-600 disabled:opacity-30";

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
    <div className="flex items-center justify-between rounded-xl bg-black px-4 py-2.5">
      <span className="text-sm text-gray-300">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={`${label} -`}
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
          className={roundButton}
        >
          <Minus size={16} />
        </button>
        <span className="w-6 text-center font-bold">{value}</span>
        <button
          type="button"
          aria-label={`${label} +`}
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
          className={roundButton}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}

export default function BookingModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [today, setToday] = useState("");
  const [slug, setSlug] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [nights, setNights] = useState(3);
  const [board, setBoard] = useState<Board>("bb");
  const [adults, setAdults] = useState(2);
  const [childAges, setChildAges] = useState<number[]>([]);

  useEffect(() => {
    function onOpen(event: Event) {
      const detail = (event as CustomEvent<string | undefined>).detail;
      setToday(new Date().toISOString().slice(0, 10));
      setSlug(detail ?? "");
      setIsOpen(true);
      document.body.style.overflow = "hidden";
      dialogRef.current?.showModal();
    }

    window.addEventListener("open-booking", onOpen);
    return () => window.removeEventListener("open-booking", onOpen);
  }, []);

  const hotel = hotels.find((item) => item.slug === slug);
  const boards = hotel ? boardsFor(hotel.slug) : [];
  const activeBoard = boards.includes(board) ? board : boards[0];
  const checkOut = checkIn ? addDays(checkIn, nights) : "";

  const quote =
    hotel && activeBoard
      ? calcQuote(hotel.slug, activeBoard, checkIn, checkOut, adults, childAges)
      : null;

  const ready = !!hotel && !!activeBoard && !!checkIn;

  let whatsappHref = "";
  if (ready && hotel && activeBoard) {
    const message = [
      "Përshëndetje! Dua të pyes për vende të lira:",
      `Hoteli: ${hotel.name} (${hotel.destination})`,
      `Hyrja: ${formatDate(checkIn)}`,
      `Dalja: ${formatDate(checkOut)} (${nights} net)`,
      `Shërbimi: ${boardLabels[activeBoard]}`,
      `Të rritur: ${adults}`,
      childAges.length > 0
        ? `Fëmijë: ${childAges.length} (mosha: ${childAges.join(", ")})`
        : "Fëmijë: 0",
      quote && quote.ok ? `Çmimi orientues: ${quote.total}€` : "",
    ]
      .filter(Boolean)
      .join("\n");

    whatsappHref = `https://wa.me/38349833888?text=${encodeURIComponent(message)}`;
  }

  function changeAge(index: number, delta: number) {
    setChildAges(
      childAges.map((age, i) =>
        i === index ? Math.min(17, Math.max(0, age + delta)) : age
      )
    );
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={() => {
        setIsOpen(false);
        document.body.style.overflow = "";
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) dialogRef.current?.close();
      }}
      className="fixed inset-0 m-auto h-fit max-h-[88svh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto overscroll-contain rounded-3xl bg-neutral-900 p-0 text-white backdrop:bg-black/70"
    >
      {isOpen && (
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl font-extrabold uppercase tracking-wide sm:text-2xl">
              {labels.title}
            </h2>
            <button
              type="button"
              aria-label={labels.close}
              onClick={() => dialogRef.current?.close()}
              className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-5 space-y-4">
            {/* Hotel */}
            <div>
              <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-400">
                {labels.hotel}
              </p>
              <Dropdown
                value={slug}
                onChange={setSlug}
                groups={hotelGroups}
                placeholder={labels.chooseHotel}
                searchable
                searchPlaceholder={labels.searchHotel}
                emptyText={labels.noHotel}
              />
            </div>

            {hotel && (
              <>
                {/* Dates */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-400">
                      {labels.checkIn}
                    </label>
                    <input
                      type="date"
                      min={today}
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className={fieldClass}
                    />
                  </div>

                  <div>
                    <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-400">
                      {labels.nights}
                    </p>
                    <Stepper
                      label={checkOut ? `→ ${formatDate(checkOut)}` : labels.checkOut}
                      value={nights}
                      min={1}
                      max={30}
                      onChange={setNights}
                    />
                  </div>
                </div>

                {/* Service */}
                <div>
                  <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-400">
                    {labels.service}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {boards.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBoard(b)}
                        className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                          activeBoard === b
                            ? "bg-red-600 text-white"
                            : "bg-black text-gray-300 hover:text-white"
                        }`}
                      >
                        {boardLabels[b]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Guests */}
                <div className="space-y-2">
                  <Stepper
                    label={labels.adults}
                    value={adults}
                    min={1}
                    max={10}
                    onChange={setAdults}
                  />

                  {childAges.map((age, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-2 rounded-xl bg-black px-4 py-2.5"
                    >
                      <span className="text-sm text-gray-300">
                        {labels.children} {index + 1}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          aria-label="-"
                          disabled={age <= 0}
                          onClick={() => changeAge(index, -1)}
                          className={roundButton}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-14 text-center text-sm font-bold">
                          {age} {labels.years}
                        </span>
                        <button
                          type="button"
                          aria-label="+"
                          disabled={age >= 17}
                          onClick={() => changeAge(index, 1)}
                          className={roundButton}
                        >
                          <Plus size={16} />
                        </button>
                        <button
                          type="button"
                          aria-label={labels.close}
                          onClick={() =>
                            setChildAges(childAges.filter((_, i) => i !== index))
                          }
                          className={`${roundButton} ml-1`}
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

                {/* Result */}
                {quote &&
                  (quote.ok ? (
                    <div className="rounded-2xl border border-red-500/40 bg-red-600/10 p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        {labels.total}
                      </p>
                      <p className="mt-1 text-3xl font-extrabold">
                        {quote.total}€
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {quote.nights} net · {adults} {labels.adults.toLowerCase()}
                        {childAges.length > 0
                          ? ` · ${childAges.length} ${labels.children.toLowerCase()}`
                          : ""}
                      </p>
                      <p className="mt-2 text-xs text-gray-500">
                        {labels.disclaimer}
                      </p>
                    </div>
                  ) : (
                    <p className="rounded-2xl bg-black p-4 text-sm text-gray-300">
                      {problemText(quote)}
                    </p>
                  ))}
              </>
            )}
          </div>

          {ready ? (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-2 rounded-full bg-red-600 py-3.5 font-bold text-white transition hover:bg-red-700"
            >
              <MessageCircle size={18} />
              {labels.send}
            </a>
          ) : (
            <span className="mt-6 flex items-center justify-center gap-2 rounded-full bg-white/10 py-3.5 font-bold text-gray-500">
              <MessageCircle size={18} />
              {labels.send}
            </span>
          )}
        </div>
      )}
    </dialog>
  );
}