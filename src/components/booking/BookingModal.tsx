"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Minus, Plus, X } from "lucide-react";
import { allHotels, type Country } from "@/data/all-hotels";
import { boardLabels, type Board } from "@/data/hotel-pricing";
import {
  addDays,
  boardsFor,
  calcQuote,
  formatDate,
  type Quote,
} from "@/lib/booking";
import { useLang } from "@/components/LanguageProvider";
import Dropdown, { type DropdownGroup } from "./Dropdown";

// All the words in the pop-up, in both languages. Change them here.
const labels = {
  sq: {
    title: "Rezervo një qëndrim",
    hotel: "Hoteli",
    chooseHotel: "Zgjidh hotelin",
    searchHotel: "Kërko hotelin...",
    noHotel: "Nuk u gjet asnjë hotel",
    checkIn: "Data e hyrjes",
    nights: "Sa net",
    nightsWord: "net",
    checkOut: "Dalja",
    service: "Shërbimi",
    adults: "Të rritur",
    children: "Fëmijë",
    addChild: "Shto fëmijë",
    years: "vjeç",
    remove: "Hiq",
    total: "Totali i vlerësuar",
    disclaimer:
      "Çmim orientues. Disponueshmërinë dhe çmimin final i konfirmojmë ne në WhatsApp.",
    send: "Pyet për vende të lira",
    close: "Mbyll",
    // Messages when there is no price
    pDates: "Zgjidh datën e hyrjes.",
    pNoPrices:
      "Çmimet për këtë hotel shpallen së shpejti. Dërgo kërkesën dhe të përgjigjemi me ofertën.",
    pOutOfSeason:
      "Për këto data nuk kemi ende çmim të shpallur. Dërgo kërkesën dhe e kontrollojmë.",
    pBoard:
      "Ky shërbim nuk ka çmim për këto data. Zgjidh një tjetër ose dërgo kërkesën.",
    pMinNights: (n?: number) =>
      n ? `Për këto data kërkohen të paktën ${n} net.` : "Për këto data kërkohet një qëndrim më i gjatë.",
    pBlocked:
      "Këto data mund të mos jenë të lira. Dërgo kërkesën dhe e kontrollojmë.",
    // WhatsApp message
    msgIntro: "Përshëndetje! Dua të pyes për vende të lira:",
    msgHotel: "Hoteli",
    msgIn: "Hyrja",
    msgOut: "Dalja",
    msgService: "Shërbimi",
    msgAdults: "Të rritur",
    msgChildren: "Fëmijë",
    msgAges: "mosha",
    msgPrice: "Çmimi orientues",
  },
  en: {
    title: "Book a stay",
    hotel: "Hotel",
    chooseHotel: "Choose a hotel",
    searchHotel: "Search for a hotel...",
    noHotel: "No hotel found",
    checkIn: "Check-in date",
    nights: "How many nights",
    nightsWord: "nights",
    checkOut: "Check-out",
    service: "Service",
    adults: "Adults",
    children: "Children",
    addChild: "Add a child",
    years: "yrs",
    remove: "Remove",
    total: "Estimated total",
    disclaimer:
      "Guide price. We confirm availability and the final price on WhatsApp.",
    send: "Ask about availability",
    close: "Close",
    pDates: "Choose the check-in date.",
    pNoPrices:
      "Prices for this hotel will be announced soon. Send the request and we will reply with an offer.",
    pOutOfSeason:
      "We do not have a published price for these dates yet. Send the request and we will check.",
    pBoard:
      "This service has no price for these dates. Choose another one or send the request.",
    pMinNights: (n?: number) =>
      n ? `These dates require at least ${n} nights.` : "These dates require a longer stay.",
    pBlocked:
      "These dates may not be available. Send the request and we will check.",
    msgIntro: "Hello! I would like to ask about availability:",
    msgHotel: "Hotel",
    msgIn: "Check-in",
    msgOut: "Check-out",
    msgService: "Service",
    msgAdults: "Adults",
    msgChildren: "Children",
    msgAges: "ages",
    msgPrice: "Guide price",
  },
};

type Words = (typeof labels)["sq"] | (typeof labels)["en"];

function problemText(t: Words, quote: Extract<Quote, { ok: false }>) {
  switch (quote.problem) {
    case "dates":
      return t.pDates;
    case "noPrices":
      return t.pNoPrices;
    case "outOfSeason":
      return t.pOutOfSeason;
    case "board":
      return t.pBoard;
    case "minNights":
            return t.pMinNights(quote.minNights ?? 0);
    case "blocked":
      return t.pBlocked;
  }
}

// Groups hotels by place. If a country is given, only that country's hotels.
function makeGroups(country?: Country): DropdownGroup[] {
  const list = country
    ? allHotels.filter((hotel) => hotel.country === country)
    : allHotels;
  const regions = Array.from(new Set(list.map((hotel) => hotel.region)));

  return regions.map((region) => ({
    label: region,
    options: list
      .filter((hotel) => hotel.region === region)
      .map((hotel) => ({ value: hotel.slug, label: hotel.name })),
  }));
}

const fieldClass =
  "block min-h-[3rem] w-full min-w-0 max-w-full appearance-none rounded-xl border border-white/10 bg-black px-4 py-3 text-left text-white outline-none [color-scheme:dark] focus:border-red-500";

const roundButton =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 transition hover:bg-red-600 disabled:opacity-30";

const tag = "mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-400";

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
    <div className="flex items-center justify-between gap-3 rounded-xl bg-black px-4 py-2.5">
      <span className="min-w-0 text-sm text-gray-300">{label}</span>
      <div className="flex shrink-0 items-center gap-3">
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

type OpenDetail = { slug?: string; country?: Country } | string | undefined;

export default function BookingModal() {
  const { lang } = useLang();
  const t = labels[lang];
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [today, setToday] = useState("");
  const [country, setCountry] = useState<Country | undefined>(undefined);
  const [slug, setSlug] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [nights, setNights] = useState(3);
  const [board, setBoard] = useState<Board>("bb");
  const [adults, setAdults] = useState(2);
  const [childAges, setChildAges] = useState<number[]>([]);

  useEffect(() => {
    function onOpen(event: Event) {
      const detail = (event as CustomEvent<OpenDetail>).detail;
      const opts = typeof detail === "string" ? { slug: detail } : detail ?? {};

      setToday(new Date().toISOString().slice(0, 10));
      setCountry(opts.country);
      setSlug(opts.slug ?? "");
      setIsOpen(true);
      document.body.style.overflow = "hidden";
      dialogRef.current?.showModal();
    }

    window.addEventListener("open-booking", onOpen);
    return () => window.removeEventListener("open-booking", onOpen);
  }, []);

  const hotelGroups = makeGroups(country);
  const hotel = allHotels.find((item) => item.slug === slug);
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
      t.msgIntro,
      `${t.msgHotel}: ${hotel.name} (${hotel.destination})`,
      `${t.msgIn}: ${formatDate(checkIn)}`,
      `${t.msgOut}: ${formatDate(checkOut)} (${nights} ${t.nightsWord})`,
      `${t.msgService}: ${boardLabels[activeBoard]}`,
      `${t.msgAdults}: ${adults}`,
      childAges.length > 0
        ? `${t.msgChildren}: ${childAges.length} (${t.msgAges}: ${childAges.join(", ")})`
        : `${t.msgChildren}: 0`,
      quote && quote.ok ? `${t.msgPrice}: ${quote.total}€` : "",
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
            <h2 className="min-w-0 text-balance text-xl font-extrabold uppercase tracking-wide sm:text-2xl">
              {t.title}
            </h2>
            <button
              type="button"
              aria-label={t.close}
              onClick={() => dialogRef.current?.close()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-5 space-y-4">
            {/* Hotel */}
            <div>
              <p className={tag}>{t.hotel}</p>
              <Dropdown
                value={slug}
                onChange={setSlug}
                groups={hotelGroups}
                placeholder={t.chooseHotel}
                searchable
                searchPlaceholder={t.searchHotel}
                emptyText={t.noHotel}
              />
            </div>

            {hotel && (
              <>
                {/* Dates */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="min-w-0">
                    <label className={tag}>{t.checkIn}</label>
                    <input
                      type="date"
                      min={today}
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className={fieldClass}
                    />
                  </div>

                  <div className="min-w-0">
                    <p className={tag}>{t.nights}</p>
                    <Stepper
                      label={checkOut ? `→ ${formatDate(checkOut)}` : t.checkOut}
                      value={nights}
                      min={1}
                      max={30}
                      onChange={setNights}
                    />
                  </div>
                </div>

                {/* Service */}
                <div>
                  <p className={tag}>{t.service}</p>
                  <div className="flex flex-wrap gap-2">
                    {boards.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBoard(b)}
                        className={`min-h-[44px] rounded-full px-4 py-2 text-sm font-bold transition ${
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
                    label={t.adults}
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
                      <span className="min-w-0 text-sm text-gray-300">
                        {t.children} {index + 1}
                      </span>
                      <div className="flex shrink-0 items-center gap-2">
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
                          {age} {t.years}
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
                          aria-label={t.remove}
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
                      className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 py-2.5 text-sm font-bold text-gray-300 transition hover:border-red-500 hover:text-white"
                    >
                      <Plus size={16} />
                      {t.addChild}
                    </button>
                  )}
                </div>

                {/* Result */}
                {quote &&
                  (quote.ok ? (
                    <div className="rounded-2xl border border-red-500/40 bg-red-600/10 p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        {t.total}
                      </p>
                      <p className="mt-1 text-3xl font-extrabold">{quote.total}€</p>
                      <p className="mt-1 text-xs text-gray-400">
                        {quote.nights} {t.nightsWord} · {adults} {t.adults.toLowerCase()}
                        {childAges.length > 0
                          ? ` · ${childAges.length} ${t.children.toLowerCase()}`
                          : ""}
                      </p>
                      <p className="mt-2 text-xs text-gray-500">{t.disclaimer}</p>
                    </div>
                  ) : (
                    <p className="rounded-2xl bg-black p-4 text-sm text-gray-300">
                      {problemText(t, quote)}
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
              className="mt-6 flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-3.5 text-center font-bold text-white transition hover:bg-red-700"
            >
              <MessageCircle size={18} className="shrink-0" />
              {t.send}
            </a>
          ) : (
            <span className="mt-6 flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-3.5 text-center font-bold text-gray-500">
              <MessageCircle size={18} className="shrink-0" />
              {t.send}
            </span>
          )}
        </div>
      )}
    </dialog>
  );
}