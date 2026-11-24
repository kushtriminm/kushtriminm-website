"use client";

import { useCallback, useEffect, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { Clock, Pencil, Plus, Trash2 } from "lucide-react";
import type { MomentOffer } from "@/lib/live-types";
import { deletePhotos, refreshSite, uploadPhoto } from "@/lib/supabase-browser";
import PhotoPicker, { photoItemsFrom, uploadNew, type PhotoItem } from "./PhotoPicker";
import {
  btnGhost,
  btnLine,
  btnRed,
  card,
  field,
  fromLocalInput,
  label,
  niceDateTime,
  toLocalInput,
} from "./ui";

const DAY = 86_400_000;
const DEFAULT_DAYS = 4;

type Draft = {
  id: string | null;
  title_sq: string;
  title_en: string;
  caption_sq: string;
  caption_en: string;
  photos: PhotoItem[];
  price: string;
  per_person: boolean;
  trip_from: string;
  trip_to: string;
  starts: string; // local date-time
  days: string;
};

function emptyDraft(): Draft {
  return {
    id: null,
    title_sq: "",
    title_en: "",
    caption_sq: "",
    caption_en: "",
    photos: [],
    price: "",
    per_person: true,
    trip_from: "",
    trip_to: "",
    starts: toLocalInput(new Date().toISOString()),
    days: String(DEFAULT_DAYS),
  };
}

function draftFrom(o: MomentOffer): Draft {
  const days = Math.max(1, Math.round((Date.parse(o.ends_at) - Date.parse(o.starts_at)) / DAY));
  return {
    id: o.id,
    title_sq: o.title_sq,
    title_en: o.title_en,
    caption_sq: o.caption_sq,
    caption_en: o.caption_en,
    photos: photoItemsFrom(o.photos),
    price: o.price_eur == null ? "" : String(o.price_eur),
    per_person: o.per_person,
    trip_from: o.trip_from ?? "",
    trip_to: o.trip_to ?? "",
    starts: toLocalInput(o.starts_at),
    days: String(days),
  };
}

function status(o: MomentOffer, now: number) {
  if (Date.parse(o.starts_at) > now) return { text: `Starts ${niceDateTime(o.starts_at)}`, tone: "bg-blue-600" };
  if (Date.parse(o.ends_at) <= now) return { text: "Ended", tone: "bg-neutral-700" };
  const ms = Date.parse(o.ends_at) - now;
  const left = ms < DAY ? `${Math.max(1, Math.ceil(ms / 3_600_000))} h left` : `${Math.floor(ms / DAY)} d left`;
  return { text: `Live · ${left}`, tone: "bg-green-600" };
}

export default function OffersPanel({ sb }: { sb: SupabaseClient }) {
  const [offers, setOffers] = useState<MomentOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [now, setNow] = useState(() => Date.now());

  const load = useCallback(async () => {
    const { data, error } = await sb
      .from("moment_offers")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    setOffers((data as MomentOffer[]) ?? []);
    setNow(Date.now());
    setLoading(false);
  }, [sb]);

  useEffect(() => {
    // Loading from the database is the effect's job here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((d) => (d ? { ...d, [key]: value } : d));

  async function save() {
    if (!draft) return;
    setError("");
    if (!draft.title_sq.trim()) return setError("Write a title in Albanian.");
    if (draft.photos.length === 0) return setError("Add at least one photo.");
    const days = Number(draft.days);
    if (!(days > 0 && days <= 90)) return setError("Days must be between 1 and 90.");
    if (!draft.starts) return setError("Choose when the offer starts.");
    if (draft.trip_from && draft.trip_to && draft.trip_to < draft.trip_from)
      return setError("The trip's last day is before its first day.");

    try {
      setBusy("Uploading photos…");
      const before = draft.id ? (offers.find((o) => o.id === draft.id)?.photos ?? []) : [];
      const photos = await uploadNew(
        draft.photos,
        (file) => uploadPhoto(sb, "offers", file),
        (done, total) => setBusy(`Uploading photos… ${done}/${total}`)
      );

      setBusy("Saving…");
      const startsIso = fromLocalInput(draft.starts);
      const row = {
        title_sq: draft.title_sq.trim(),
        title_en: draft.title_en.trim(),
        caption_sq: draft.caption_sq.trim(),
        caption_en: draft.caption_en.trim(),
        photos,
        price_eur: draft.price.trim() === "" ? null : Math.round(Number(draft.price)),
        per_person: draft.per_person,
        trip_from: draft.trip_from || null,
        trip_to: draft.trip_to || null,
        starts_at: startsIso,
        ends_at: new Date(Date.parse(startsIso) + days * DAY).toISOString(),
      };
      const { error } = draft.id
        ? await sb.from("moment_offers").update(row).eq("id", draft.id)
        : await sb.from("moment_offers").insert(row);
      if (error) throw error;

      await deletePhotos(sb, before.filter((url) => !photos.includes(url)));
      await refreshSite(sb);
      setDraft(null);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Saving failed. Try again.");
    } finally {
      setBusy("");
    }
  }

  async function remove(o: MomentOffer) {
    if (!window.confirm(`Delete "${o.title_sq}"? This removes it from the website and deletes its photos.`)) return;
    setError("");
    const { error } = await sb.from("moment_offers").delete().eq("id", o.id);
    if (error) return setError(error.message);
    await deletePhotos(sb, o.photos);
    await refreshSite(sb);
    await load();
  }

  async function endNow(o: MomentOffer) {
    const { error } = await sb
      .from("moment_offers")
      .update({ ends_at: new Date().toISOString() })
      .eq("id", o.id);
    if (error) return setError(error.message);
    await refreshSite(sb);
    await load();
  }

  async function addDay(o: MomentOffer) {
    const base = Math.max(Date.parse(o.ends_at), Date.now());
    const { error } = await sb
      .from("moment_offers")
      .update({ ends_at: new Date(base + DAY).toISOString() })
      .eq("id", o.id);
    if (error) return setError(error.message);
    await refreshSite(sb);
    await load();
  }

  // ---------- the form ----------
  if (draft) {
    const endsPreview =
      draft.starts && Number(draft.days) > 0
        ? niceDateTime(new Date(Date.parse(fromLocalInput(draft.starts)) + Number(draft.days) * DAY).toISOString())
        : "";
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-extrabold uppercase tracking-wide">
            {draft.id ? "Edit offer" : "New offer"}
          </h2>
          <button type="button" className={btnGhost} onClick={() => setDraft(null)} disabled={!!busy}>
            Cancel
          </button>
        </div>

        <section className={card}>
          <p className={label}>Photos (the first one is the cover)</p>
          <PhotoPicker items={draft.photos} onChange={(p) => set("photos", p)} max={10} />
        </section>

        <section className={`${card} grid gap-4 sm:grid-cols-2`}>
          <div>
            <label className={label} htmlFor="o-tsq">Title · Shqip *</label>
            <input id="o-tsq" className={field} value={draft.title_sq} onChange={(e) => set("title_sq", e.target.value)} placeholder="p.sh. Stamboll 4 ditë" />
          </div>
          <div>
            <label className={label} htmlFor="o-ten">Title · English</label>
            <input id="o-ten" className={field} value={draft.title_en} onChange={(e) => set("title_en", e.target.value)} placeholder="e.g. Istanbul 4 days" />
          </div>
          <div>
            <label className={label} htmlFor="o-csq">Caption · Shqip</label>
            <textarea id="o-csq" rows={7} className={field} value={draft.caption_sq} onChange={(e) => set("caption_sq", e.target.value)} placeholder="Paste the Instagram caption here" />
          </div>
          <div>
            <label className={label} htmlFor="o-cen">Caption · English</label>
            <textarea id="o-cen" rows={7} className={field} value={draft.caption_en} onChange={(e) => set("caption_en", e.target.value)} placeholder="Optional. Empty = the Albanian one is shown" />
          </div>
        </section>

        <section className={`${card} grid gap-4 sm:grid-cols-2`}>
          <div>
            <label className={label} htmlFor="o-price">Price (€) · optional</label>
            <input id="o-price" type="number" min={0} inputMode="numeric" className={field} value={draft.price} onChange={(e) => set("price", e.target.value)} placeholder="e.g. 299" />
          </div>
          <div>
            <span className={label}>Price is</span>
            <div className="flex gap-2">
              {[true, false].map((pp) => (
                <button
                  key={String(pp)}
                  type="button"
                  onClick={() => set("per_person", pp)}
                  className={`min-h-[44px] flex-1 rounded-xl border text-sm font-bold transition ${
                    draft.per_person === pp ? "border-red-500 bg-red-600 text-white" : "border-white/15 text-gray-300 hover:border-white/40"
                  }`}
                >
                  {pp ? "Per person" : "Total"}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={label} htmlFor="o-from">Trip from · optional</label>
            <input id="o-from" type="date" className={field} value={draft.trip_from} onChange={(e) => set("trip_from", e.target.value)} />
          </div>
          <div>
            <label className={label} htmlFor="o-to">Trip to · optional</label>
            <input id="o-to" type="date" className={field} value={draft.trip_to} onChange={(e) => set("trip_to", e.target.value)} />
          </div>
        </section>

        <section className={`${card} grid gap-4 sm:grid-cols-2`}>
          <div>
            <label className={label} htmlFor="o-start">Show on the website from</label>
            <input id="o-start" type="datetime-local" className={field} value={draft.starts} onChange={(e) => set("starts", e.target.value)} />
          </div>
          <div>
            <label className={label} htmlFor="o-days">For how many days</label>
            <div className="flex gap-2">
              <input id="o-days" type="number" min={1} max={90} inputMode="numeric" className={field} value={draft.days} onChange={(e) => set("days", e.target.value)} />
              {[2, 4, 7].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => set("days", String(d))}
                  className={`min-h-[44px] shrink-0 rounded-xl border px-3 text-sm font-bold transition ${
                    draft.days === String(d) ? "border-red-500 bg-red-600 text-white" : "border-white/15 text-gray-300 hover:border-white/40"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          {endsPreview && (
            <p className="text-sm text-gray-400 sm:col-span-2">
              It disappears from the website by itself on <b className="text-white">{endsPreview}</b>.
            </p>
          )}
        </section>

        {error && <p className="rounded-xl bg-red-500/15 p-3 text-sm text-red-300">{error}</p>}

        <div className="flex flex-wrap gap-3">
          <button type="button" className={btnRed} onClick={save} disabled={!!busy}>
            {busy || (draft.id ? "Save changes" : "Publish offer")}
          </button>
          <button type="button" className={btnLine} onClick={() => setDraft(null)} disabled={!!busy}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // ---------- the list ----------
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold uppercase tracking-wide">Offers of the moment</h2>
          <p className="text-sm text-gray-400">They show on the homepage and on /deals, and hide themselves when time is up.</p>
        </div>
        <button type="button" className={btnRed} onClick={() => { setError(""); setDraft(emptyDraft()); }}>
          <Plus size={18} /> New offer
        </button>
      </div>

      {error && <p className="rounded-xl bg-red-500/15 p-3 text-sm text-red-300">{error}</p>}

      {loading ? (
        <p className="text-gray-400">Loading…</p>
      ) : offers.length === 0 ? (
        <div className={`${card} text-center text-gray-400`}>No offers yet. Press “New offer” to post the first one.</div>
      ) : (
        <ul className="space-y-3">
          {offers.map((o) => {
            const s = status(o, now);
            const live = s.tone === "bg-green-600";
            return (
              <li key={o.id} className={`${card} flex flex-col gap-4 sm:flex-row sm:items-center`}>
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  {o.photos[0] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={o.photos[0]} alt="" className="h-20 w-16 shrink-0 rounded-lg object-cover" />
                  )}
                  <div className="min-w-0">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase ${s.tone}`}>{s.text}</span>
                    <p className="mt-1 truncate font-bold">{o.title_sq}</p>
                    <p className="text-xs text-gray-400">
                      {o.price_eur != null && `${o.price_eur}€ ${o.per_person ? "/ person" : "total"} · `}
                      ends {niceDateTime(o.ends_at)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  <button type="button" className={btnGhost} onClick={() => { setError(""); setDraft(draftFrom(o)); }}>
                    <Pencil size={15} /> Edit
                  </button>
                  <button type="button" className={btnGhost} onClick={() => addDay(o)}>
                    <Clock size={15} /> +1 day
                  </button>
                  {live && (
                    <button type="button" className={btnGhost} onClick={() => endNow(o)}>
                      End now
                    </button>
                  )}
                  <button type="button" className={`${btnGhost} text-red-400`} onClick={() => remove(o)}>
                    <Trash2 size={15} /> Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
