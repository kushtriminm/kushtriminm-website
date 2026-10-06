"use client";

import { useState } from "react";
import { MessageCircle, Minus, Plus } from "lucide-react";
import { allBoards, boardLabels, type Board } from "@/data/hotel-pricing";
import { addDays, formatDate } from "@/lib/booking";
import Dropdown from "./Dropdown";

// All the words in this form. Change them here.
const labels = {
  destination: "Destinacioni",
  choose: "Zgjidh destinacionin",
  place: "Hoteli ose zona (opsionale)",
  checkIn: "Data e nisjes (opsionale)",
  nights: "Sa net",
  service: "Shërbimi (opsionale)",
  adults: "Të rritur",
  children: "Fëmijë",
  ages: "Moshat e fëmijëve (opsionale)",
  notes: "Shënime (opsionale)",
  send: "Kërko ofertë në WhatsApp",
};

const groups = [
  {
    options: [
      "Dubai", "Turkey (Antalya)", "Egypt (Hurghada)", "Greece", "Albania", "Italy",
      "Switzerland", "Germany", "Spain", "Poland", "Czechia", "Austria", "Hungary",
      "Malta", "Tjetër / Other",
    ].map((name) => ({ value: name, label: name })),
  },
];

const field =
  "w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none [color-scheme:dark] placeholder:text-gray-600 focus:border-red-500";
const tag = "mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-400";
const round =
  "flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition hover:bg-red-600 disabled:opacity-30";

function NumberRow({
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

export default function RequestForm() {
  const [destination, setDestination] = useState("");
  const [place, setPlace] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [nights, setNights] = useState(7);
  const [board, setBoard] = useState<Board | "">("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [ages, setAges] = useState("");
  const [notes, setNotes] = useState("");

  const message = [
    "Përshëndetje! Dua një ofertë:",
    `Destinacioni: ${destination}`,
    place ? `Hoteli / zona: ${place}` : "",
    checkIn
      ? `Data: ${formatDate(checkIn)} - ${formatDate(addDays(checkIn, nights))} (${nights} net)`
      : "Data: ende pa vendosur",
    board ? `Shërbimi: ${boardLabels[board]}` : "",
    `Të rritur: ${adults}`,
    `Fëmijë: ${children}${children > 0 && ages ? ` (mosha: ${ages})` : ""}`,
    notes ? `Shënime: ${notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const href = `https://wa.me/38349833888?text=${encodeURIComponent(message)}`;

  return (
    <div className="space-y-4">
      <div>
        <p className={tag}>{labels.destination}</p>
        <Dropdown value={destination} onChange={setDestination} groups={groups} placeholder={labels.choose} />
      </div>

      <div>
        <label className={tag}>{labels.place}</label>
        <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} className={field} />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className={tag}>{labels.checkIn}</label>
          <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className={field} />
        </div>
        <div>
          <p className={tag}>{labels.nights}</p>
          <NumberRow label={labels.nights} value={nights} min={1} max={30} onChange={setNights} />
        </div>
      </div>

      <div>
        <p className={tag}>{labels.service}</p>
        <div className="flex flex-wrap gap-2">
          {allBoards.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBoard(board === b ? "" : b)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                board === b ? "bg-red-600 text-white" : "bg-black text-gray-300 hover:text-white"
              }`}
            >
              {boardLabels[b]}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <NumberRow label={labels.adults} value={adults} min={1} max={10} onChange={setAdults} />
        <NumberRow label={labels.children} value={children} min={0} max={6} onChange={setChildren} />
        {children > 0 && (
          <input type="text" value={ages} onChange={(e) => setAges(e.target.value)} placeholder={labels.ages} className={field} />
        )}
      </div>

      <div>
        <label className={tag}>{labels.notes}</label>
        <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className={field} />
      </div>

      {destination ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-full bg-red-600 py-3.5 font-bold text-white transition hover:bg-red-700"
        >
          <MessageCircle size={18} />
          {labels.send}
        </a>
      ) : (
        <span className="flex items-center justify-center gap-2 rounded-full bg-white/10 py-3.5 font-bold text-gray-500">
          <MessageCircle size={18} />
          {labels.send}
        </span>
      )}
    </div>
  );
}