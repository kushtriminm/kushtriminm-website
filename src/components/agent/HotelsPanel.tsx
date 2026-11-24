"use client";

import { useEffect, useMemo, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { ArrowLeft, Check, ExternalLink, Search } from "lucide-react";
import type { HotelPricing } from "@/data/hotel-pricing";
import { hasPricing, type HotelContent } from "@/lib/live-types";
import { deletePhotos, refreshSite, uploadPhoto } from "@/lib/supabase-browser";
import PhotoPicker, { photoItemsFrom, uploadNew, type PhotoItem } from "./PhotoPicker";
import PricingEditor, { cleanPricing, emptyPricing, pricingProblem } from "./PricingEditor";
import { btnGhost, btnLine, btnRed, card, field, label } from "./ui";

export type AgentHotel = {
  slug: string;
  name: string;
  country: string;
  destination: string;
  description: string;
  sitePhotos: string[]; // photos that come with the website
};

type Draft = {
  hotel: AgentHotel;
  description_sq: string;
  description_en: string;
  photos: PhotoItem[];
  pricing: HotelPricing;
  savedPhotos: string[]; // what the database had, to delete removed uploads
};

const same = (a: string[], b: string[]) => a.length === b.length && a.every((x, i) => x === b[i]);

export default function HotelsPanel({ sb, hotels }: { sb: SupabaseClient; hotels: AgentHotel[] }) {
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState<Record<string, HotelContent>>({});
  const [draft, setDraft] = useState<Draft | null>(null);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  // Which hotels already have something from the panel (for the ✓ marks in the list).
  useEffect(() => {
    let alive = true;
    sb.from("hotel_content")
      .select("*")
      .then(({ data }) => {
        if (!alive || !data) return;
        setRows(Object.fromEntries((data as HotelContent[]).map((r) => [r.slug, r])));
      });
    return () => {
      alive = false;
    };
  }, [sb]);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return hotels.filter(
      (h) => !q || `${h.name} ${h.destination} ${h.country}`.toLowerCase().includes(q)
    );
  }, [hotels, query]);

  function open(hotel: AgentHotel) {
    const row = rows[hotel.slug];
    setError("");
    setSaved(false);
    setDraft({
      hotel,
      description_sq: row?.description_sq ?? "",
      description_en: row?.description_en || (row ? "" : hotel.description),
      photos: photoItemsFrom(row?.photos.length ? row.photos : hotel.sitePhotos),
      pricing: row?.pricing ? { ...emptyPricing(), ...row.pricing } : emptyPricing(),
      savedPhotos: row?.photos ?? [],
    });
    window.scrollTo({ top: 0 });
  }

  async function save() {
    if (!draft) return;
    setError("");
    setSaved(false);
    const pricing = cleanPricing(draft.pricing);
    const problem = pricingProblem(pricing);
    if (problem) return setError(problem);

    try {
      setBusy("Uploading photos…");
      const slug = draft.hotel.slug;
      let photos = await uploadNew(
        draft.photos,
        (file) => uploadPhoto(sb, `hotels/${slug}`, file),
        (done, total) => setBusy(`Uploading photos… ${done}/${total}`)
      );
      // Unchanged website photos: save nothing, so the website keeps using its own.
      if (same(photos, draft.hotel.sitePhotos)) photos = [];

      setBusy("Saving…");
      const row: HotelContent = {
        slug,
        description_sq: draft.description_sq.trim(),
        description_en: draft.description_en.trim(),
        photos,
        pricing: pricing.seasons.length > 0 || (pricing.boards ?? []).length > 0 ? pricing : null,
        updated_at: new Date().toISOString(),
      };
      const { error } = await sb.from("hotel_content").upsert(row);
      if (error) throw error;

      await deletePhotos(sb, draft.savedPhotos.filter((url) => !photos.includes(url)));
      await refreshSite(sb);
      setRows((r) => ({ ...r, [slug]: row }));
      setDraft((d) => (d ? { ...d, photos: photoItemsFrom(photos.length ? photos : d.hotel.sitePhotos), savedPhotos: photos } : d));
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Saving failed. Try again.");
    } finally {
      setBusy("");
    }
  }

  // ---------- one hotel ----------
  if (draft) {
    const h = draft.hotel;
    return (
      <div className="space-y-5">
        <button type="button" className={btnGhost} onClick={() => setDraft(null)} disabled={!!busy}>
          <ArrowLeft size={16} /> All hotels
        </button>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase text-red-500">{h.destination} · {h.country}</p>
            <h2 className="text-xl font-extrabold uppercase tracking-wide sm:text-2xl">{h.name}</h2>
          </div>
          <a href={`/hotels/${h.slug}`} target="_blank" rel="noopener noreferrer" className={btnGhost}>
            <ExternalLink size={15} /> View on website
          </a>
        </div>

        <section className={card}>
          <p className={label}>Photos (the first one is the cover)</p>
          <PhotoPicker items={draft.photos} onChange={(photos) => setDraft({ ...draft, photos })} max={20} />
        </section>

        <section className={`${card} grid gap-4 sm:grid-cols-2`}>
          <div>
            <label className={label} htmlFor="h-sq">Description · Shqip</label>
            <textarea id="h-sq" rows={8} className={field} value={draft.description_sq} onChange={(e) => setDraft({ ...draft, description_sq: e.target.value })} placeholder="Përshkrimi i hotelit" />
          </div>
          <div>
            <label className={label} htmlFor="h-en">Description · English</label>
            <textarea id="h-en" rows={8} className={field} value={draft.description_en} onChange={(e) => setDraft({ ...draft, description_en: e.target.value })} placeholder="About the hotel" />
          </div>
          <p className="text-xs text-gray-500 sm:col-span-2">If one language is empty, the other one is shown.</p>
        </section>

        <PricingEditor value={draft.pricing} onChange={(pricing) => setDraft({ ...draft, pricing })} />

        {error && <p className="rounded-xl bg-red-500/15 p-3 text-sm text-red-300">{error}</p>}
        {saved && (
          <p className="flex items-center gap-2 rounded-xl bg-green-500/15 p-3 text-sm text-green-300">
            <Check size={16} /> Saved. The website shows it within a few seconds.
          </p>
        )}

        <div className="sticky bottom-0 -mx-4 flex flex-wrap gap-3 border-t border-white/10 bg-neutral-950/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border">
          <button type="button" className={btnRed} onClick={save} disabled={!!busy}>
            {busy || "Confirm & save"}
          </button>
          <button type="button" className={btnLine} onClick={() => setDraft(null)} disabled={!!busy}>
            Close
          </button>
        </div>
      </div>
    );
  }

  // ---------- the list of hotels ----------
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-extrabold uppercase tracking-wide">Hotels</h2>
        <p className="text-sm text-gray-400">Choose a hotel to add photos, descriptions and prices.</p>
      </div>
      <div className="relative">
        <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" aria-hidden="true" />
        <input
          type="search"
          className={`${field} pl-10`}
          placeholder="Search a hotel or place…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search hotels"
        />
      </div>
      <ul className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900">
        {list.map((h) => {
          const row = rows[h.slug];
          return (
            <li key={h.slug}>
              <button
                type="button"
                onClick={() => open(h)}
                className="flex min-h-[56px] w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-white/5"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-bold">{h.name}</span>
                  <span className="block truncate text-xs text-gray-400">{h.destination} · {h.country}</span>
                </span>
                <span className="flex shrink-0 gap-1.5 text-[11px] font-bold uppercase">
                  {row?.photos.length ? <span className="rounded-full bg-white/10 px-2 py-0.5">{row.photos.length} photos</span> : null}
                  {hasPricing(row?.pricing) ? <span className="rounded-full bg-green-600/80 px-2 py-0.5">Prices</span> : null}
                </span>
              </button>
            </li>
          );
        })}
        {list.length === 0 && <li className="px-4 py-6 text-center text-sm text-gray-400">No hotel found.</li>}
      </ul>
    </div>
  );
}
