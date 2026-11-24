"use client";

import { Plus, Trash2 } from "lucide-react";
import {
  allBoards,
  boardLabels,
  type Board,
  type ChildRule,
  type HotelPricing,
  type Season,
} from "@/data/hotel-pricing";
import { btnGhost, card, field, label } from "./ui";

// Prices for the booking calculator: one adult, per night, per service, between two dates.
export function emptyPricing(): HotelPricing {
  return { boards: [], seasons: [], childRules: [], blocked: [] };
}

const num = (value: string) => (value.trim() === "" ? undefined : Number(value));

// Checks the prices before saving. Returns a message, or "" when everything is fine.
export function pricingProblem(p: HotelPricing): string {
  const boards = p.boards ?? [];
  for (const [i, s] of p.seasons.entries()) {
    const n = i + 1;
    if (!s.from || !s.to) return `Season ${n}: choose both dates.`;
    if (s.to < s.from) return `Season ${n}: the last night is before the first night.`;
    if (!boards.some((b) => typeof s.prices[b] === "number" && s.prices[b]! > 0))
      return `Season ${n}: enter at least one price.`;
  }
  for (const [i, r] of (p.childRules ?? []).entries()) {
    if (r.toAge < r.fromAge) return `Child rule ${i + 1}: "to age" is lower than "from age".`;
    if (r.type !== "free" && !(Number(r.value) >= 0)) return `Child rule ${i + 1}: enter the value.`;
  }
  for (const [i, b] of (p.blocked ?? []).entries()) {
    if (!b.from || !b.to || b.to < b.from) return `Stop sale ${i + 1}: check the dates.`;
  }
  return "";
}

// Removes prices of services that were switched off, so nothing hidden is saved.
export function cleanPricing(p: HotelPricing): HotelPricing {
  const boards = p.boards ?? [];
  return {
    boards,
    seasons: p.seasons.map((s) => ({
      from: s.from,
      to: s.to,
      prices: Object.fromEntries(
        boards.filter((b) => typeof s.prices[b] === "number").map((b) => [b, s.prices[b]])
      ) as Season["prices"],
      ...(s.minNights ? { minNights: s.minNights } : {}),
    })),
    childRules: p.childRules ?? [],
    blocked: p.blocked ?? [],
  };
}

export default function PricingEditor({
  value,
  onChange,
}: {
  value: HotelPricing;
  onChange: (p: HotelPricing) => void;
}) {
  const boards = value.boards ?? [];
  const seasons = value.seasons;
  const rules = value.childRules ?? [];
  const blocked = value.blocked ?? [];

  const toggleBoard = (b: Board) =>
    onChange({
      ...value,
      boards: boards.includes(b) ? boards.filter((x) => x !== b) : allBoards.filter((x) => x === b || boards.includes(x)),
    });

  const setSeason = (i: number, patch: Partial<Season>) =>
    onChange({ ...value, seasons: seasons.map((s, j) => (j === i ? { ...s, ...patch } : s)) });
  const setRule = (i: number, patch: Partial<ChildRule>) =>
    onChange({ ...value, childRules: rules.map((r, j) => (j === i ? { ...r, ...patch } : r)) });
  const setBlocked = (i: number, patch: Partial<{ from: string; to: string }>) =>
    onChange({ ...value, blocked: blocked.map((b, j) => (j === i ? { ...b, ...patch } : b)) });

  return (
    <div className="space-y-5">
      <section className={card}>
        <p className={label}>Services the hotel sells</p>
        <div className="flex flex-wrap gap-2">
          {allBoards.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => toggleBoard(b)}
              aria-pressed={boards.includes(b)}
              className={`min-h-[40px] rounded-full border px-4 text-sm font-bold transition ${
                boards.includes(b) ? "border-red-500 bg-red-600 text-white" : "border-white/15 text-gray-300 hover:border-white/40"
              }`}
            >
              {boardLabels[b]}
            </button>
          ))}
        </div>
      </section>

      <section className={card}>
        <p className={label}>Seasons · price for ONE adult per night (€)</p>
        {boards.length === 0 && <p className="text-sm text-gray-400">Choose the services above first.</p>}
        <div className="space-y-3">
          {seasons.map((s, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-neutral-950 p-3">
              <div className="grid gap-3 sm:grid-cols-[1fr_1fr_8rem_auto]">
                <div>
                  <label className={label} htmlFor={`s${i}-from`}>First night</label>
                  <input id={`s${i}-from`} type="date" className={field} value={s.from} onChange={(e) => setSeason(i, { from: e.target.value })} />
                </div>
                <div>
                  <label className={label} htmlFor={`s${i}-to`}>Last night</label>
                  <input id={`s${i}-to`} type="date" className={field} value={s.to} onChange={(e) => setSeason(i, { to: e.target.value })} />
                </div>
                <div>
                  <label className={label} htmlFor={`s${i}-min`}>Min. nights</label>
                  <input id={`s${i}-min`} type="number" min={1} inputMode="numeric" className={field} value={s.minNights ?? ""} onChange={(e) => setSeason(i, { minNights: num(e.target.value) })} />
                </div>
                <button
                  type="button"
                  aria-label={`Remove season ${i + 1}`}
                  onClick={() => onChange({ ...value, seasons: seasons.filter((_, j) => j !== i) })}
                  className="flex h-11 w-11 items-center justify-center self-end rounded-xl text-red-400 transition hover:bg-red-500/15"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              {boards.length > 0 && (
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                  {boards.map((b) => (
                    <div key={b}>
                      <label className={label} htmlFor={`s${i}-${b}`}>{boardLabels[b]}</label>
                      <input
                        id={`s${i}-${b}`}
                        type="number"
                        min={0}
                        inputMode="decimal"
                        className={field}
                        value={s.prices[b] ?? ""}
                        onChange={(e) => setSeason(i, { prices: { ...s.prices, [b]: num(e.target.value) } })}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          className={`${btnGhost} mt-3`}
          onClick={() => {
            const last = seasons[seasons.length - 1];
            onChange({ ...value, seasons: [...seasons, { from: "", to: "", prices: last ? { ...last.prices } : {} }] });
          }}
        >
          <Plus size={16} /> Add season
        </button>
      </section>

      <section className={card}>
        <p className={label}>Children (the first rule that matches the age is used)</p>
        <div className="space-y-3">
          {rules.map((r, i) => (
            <div key={i} className="grid grid-cols-2 gap-3 sm:grid-cols-[6rem_6rem_1fr_8rem_auto]">
              <div>
                <label className={label} htmlFor={`r${i}-from`}>From age</label>
                <input id={`r${i}-from`} type="number" min={0} max={17} className={field} value={r.fromAge} onChange={(e) => setRule(i, { fromAge: Number(e.target.value) })} />
              </div>
              <div>
                <label className={label} htmlFor={`r${i}-to`}>To age</label>
                <input id={`r${i}-to`} type="number" min={0} max={17} className={field} value={r.toAge} onChange={(e) => setRule(i, { toAge: Number(e.target.value) })} />
              </div>
              <div>
                <label className={label} htmlFor={`r${i}-type`}>Price</label>
                <select id={`r${i}-type`} className={field} value={r.type} onChange={(e) => setRule(i, { type: e.target.value as ChildRule["type"] })}>
                  <option value="free">Free</option>
                  <option value="fixed">Fixed € per night</option>
                  <option value="percent">% of adult price</option>
                </select>
              </div>
              <div>
                <label className={label} htmlFor={`r${i}-val`}>{r.type === "percent" ? "%" : "€ / night"}</label>
                <input id={`r${i}-val`} type="number" min={0} disabled={r.type === "free"} className={field} value={r.type === "free" ? "" : (r.value ?? "")} onChange={(e) => setRule(i, { value: num(e.target.value) })} />
              </div>
              <button
                type="button"
                aria-label={`Remove child rule ${i + 1}`}
                onClick={() => onChange({ ...value, childRules: rules.filter((_, j) => j !== i) })}
                className="flex h-11 w-11 items-center justify-center self-end rounded-xl text-red-400 transition hover:bg-red-500/15"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-500">Children older than every rule pay the adult price.</p>
        <button
          type="button"
          className={`${btnGhost} mt-2`}
          onClick={() => onChange({ ...value, childRules: [...rules, { fromAge: 0, toAge: 5, type: "free" }] })}
        >
          <Plus size={16} /> Add child rule
        </button>
      </section>

      <section className={card}>
        <p className={label}>Stop sale (hotel full) · optional</p>
        <div className="space-y-3">
          {blocked.map((b, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-3">
              <div>
                <label className={label} htmlFor={`b${i}-from`}>From</label>
                <input id={`b${i}-from`} type="date" className={field} value={b.from} onChange={(e) => setBlocked(i, { from: e.target.value })} />
              </div>
              <div>
                <label className={label} htmlFor={`b${i}-to`}>To</label>
                <input id={`b${i}-to`} type="date" className={field} value={b.to} onChange={(e) => setBlocked(i, { to: e.target.value })} />
              </div>
              <button
                type="button"
                aria-label={`Remove stop sale ${i + 1}`}
                onClick={() => onChange({ ...value, blocked: blocked.filter((_, j) => j !== i) })}
                className="flex h-11 w-11 items-center justify-center self-end rounded-xl text-red-400 transition hover:bg-red-500/15"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className={`${btnGhost} mt-3`}
          onClick={() => onChange({ ...value, blocked: [...blocked, { from: "", to: "" }] })}
        >
          <Plus size={16} /> Add stop sale
        </button>
      </section>
    </div>
  );
}
