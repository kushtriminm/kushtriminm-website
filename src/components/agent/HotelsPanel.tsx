"use client";

import { useEffect, useMemo, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { ArrowLeft, Check, ExternalLink, Plus, Search, Trash2 } from "lucide-react";
import type { HotelPricing } from "@/data/hotel-pricing";
import { countries } from "@/data/all-hotels";
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
  custom?: boolean; // added in the panel (can be renamed and deleted)
};

// The name, place and details of a hotel added in the panel.
type Basics = {
  name: string;
  country: string;
  destination: string;
  location: string;
  category: string;
  stars: string; // "" = not shown
  facilities: string; // one per line or comma separated
};

type Draft = {
  hotel: AgentHotel;
  isNew: boolean;
  basics: Basics | null; // null for the website's own hotels (their details are in the files)
  description_sq: string;
  description_en: string;
  photos: PhotoItem[];
  pricing: HotelPricing;
  savedPhotos: string[]; // what the database had, to delete removed uploads
};

const countryNames: Record<string, string> = {
  Albania: "Albania (Shqipëri)",
  Turkey: "Turkey (Turqi)",
  Egypt: "Egypt (Egjipt)",
  Greece: "Greece (Greqi)",
};

const same = (a: string[], b: string[]) => a.length === b.length && a.every((x, i) => x === b[i]);

// "Hotel Melia Durrës" -> "hotel-melia-durres"
function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/ë/g, "e")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function customFromRow(row: HotelContent): AgentHotel | null {
  if (!row.is_custom || !row.name) return null;
  return {
    slug: row.slug,
    name: row.name,
    country: row.country ?? "",
    destination: row.destination ?? "",
    description: "",
    sitePhotos: [],
    custom: true,
  };
}

const splitList = (text: string) =>
  text
    .split(/[\n,]/)
    .map((x) => x.trim())
    .filter(Boolean);

// Supabase says this when the new columns have not been added yet.
function friendly(message: string) {
  if (/column|schema cache/i.test(message)) {
    return "The database is not ready for new hotels yet: run part 6 of supabase/agent-panel.sql in Supabase (SQL Editor), then try again.";
  }
  return message;
}

export default function HotelsPanel({ sb, hotels }: { sb: SupabaseClient; hotels: AgentHotel[] }) {
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState<Record<string, HotelContent>>({});
  const [draft, setDraft] = useState<Draft | null>(null);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  // Which hotels already have something from the panel (for the marks in the list),
  // and the hotels that were added in the panel.
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

  // Hotels added in the panel first (newest work on top), then the website's own hotels.
  const everyHotel = useMemo(() => {
    const fileSlugs = new Set(hotels.map((h) => h.slug));
    const custom = Object.values(rows)
      .map(customFromRow)
      .filter((h): h is AgentHotel => h !== null && !fileSlugs.has(h.slug))
      .sort((a, b) => a.name.localeCompare(b.name));
    return [...custom, ...hotels];
  }, [hotels, rows]);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return everyHotel.filter(
      (h) => !q || `${h.name} ${h.destination} ${h.country}`.toLowerCase().includes(q)
    );
  }, [everyHotel, query]);

  // Places already on the website, offered as suggestions so new hotels join the same group.
  const placesByCountry = useMemo(() => {
    const out: Record<string, string[]> = {};
    for (const h of everyHotel) {
      if (!h.destination) continue;
      const list = (out[h.country] ??= []);
      if (!list.includes(h.destination)) list.push(h.destination);
    }
    for (const c of Object.keys(out)) out[c].sort();
    return out;
  }, [everyHotel]);

  function open(hotel: AgentHotel) {
    const row = rows[hotel.slug];
    setError("");
    setSaved(false);
    setDraft({
      hotel,
      isNew: false,
      basics: hotel.custom
        ? {
            name: row?.name ?? hotel.name,
            country: row?.country ?? hotel.country,
            destination: row?.destination ?? hotel.destination,
            location: row?.location ?? "",
            category: row?.category ?? "",
            stars: row?.stars ? String(row.stars) : "",
            facilities: (row?.facilities ?? []).join("\n"),
          }
        : null,
      description_sq: row?.description_sq ?? "",
      description_en: row?.description_en || (row ? "" : hotel.description),
      photos: photoItemsFrom(row?.photos.length ? row.photos : hotel.sitePhotos),
      pricing: row?.pricing ? { ...emptyPricing(), ...row.pricing } : emptyPricing(),
      savedPhotos: row?.photos ?? [],
    });
    window.scrollTo({ top: 0 });
  }

  function startNew() {
    setError("");
    setSaved(false);
    setDraft({
      hotel: { slug: "", name: "", country: "", destination: "", description: "", sitePhotos: [], custom: true },
      isNew: true,
      basics: { name: "", country: "", destination: "", location: "", category: "Hotel", stars: "", facilities: "" },
      description_sq: "",
      description_en: "",
      photos: [],
      pricing: emptyPricing(),
      savedPhotos: [],
    });
    window.scrollTo({ top: 0 });
  }

  // A web address for a new hotel that no other hotel uses yet.
  function freeSlug(name: string) {
    const base = slugify(name) || "hotel";
    const taken = new Set([...hotels.map((h) => h.slug), ...Object.keys(rows)]);
    let slug = base;
    for (let n = 2; taken.has(slug); n++) slug = `${base}-${n}`;
    return slug;
  }

  async function save() {
    if (!draft) return;
    setError("");
    setSaved(false);
    const b = draft.basics;
    if (b) {
      if (!b.name.trim()) return setError("Write the hotel's name.");
      if (!b.country) return setError("Choose the country.");
      if (!b.destination.trim()) return setError("Write the place (city or area), for example Durrës or Hurghada.");
    }
    const pricing = cleanPricing(draft.pricing);
    const problem = pricingProblem(pricing);
    if (problem) return setError(problem);

    try {
      const slug = draft.isNew ? freeSlug(b!.name) : draft.hotel.slug;

      setBusy("Uploading photos…");
      let photos = await uploadNew(
        draft.photos,
        (file) => uploadPhoto(sb, `hotels/${slug}`, file),
        (done, total) => setBusy(`Uploading photos… ${done}/${total}`)
      );
      // Unchanged website photos: save nothing, so the website keeps using its own.
      if (!b && same(photos, draft.hotel.sitePhotos)) photos = [];

      setBusy("Saving…");
      const row: HotelContent = {
        slug,
        description_sq: draft.description_sq.trim(),
        description_en: draft.description_en.trim(),
        photos,
        pricing: pricing.seasons.length > 0 || (pricing.boards ?? []).length > 0 ? pricing : null,
        updated_at: new Date().toISOString(),
      };
      if (b) {
        Object.assign(row, {
          is_custom: true,
          name: b.name.trim(),
          country: b.country,
          destination: b.destination.trim(),
          location: b.location.trim() || null,
          category: b.category.trim() || null,
          stars: b.stars ? Number(b.stars) : null,
          facilities: splitList(b.facilities),
        });
      }
      const { error } = await sb.from("hotel_content").upsert(row);
      if (error) throw error;

      await deletePhotos(sb, draft.savedPhotos.filter((url) => !photos.includes(url)));
      await refreshSite(sb);
      setRows((r) => ({ ...r, [slug]: row }));
      setDraft((d) =>
        d
          ? {
              ...d,
              isNew: false,
              hotel: b
                ? { ...d.hotel, slug, name: b.name.trim(), country: b.country, destination: b.destination.trim() }
                : d.hotel,
              photos: photoItemsFrom(photos.length ? photos : d.hotel.sitePhotos),
              savedPhotos: photos,
            }
          : d
      );
      setSaved(true);
    } catch (e) {
      setError(friendly(e instanceof Error ? e.message : "Saving failed. Try again."));
    } finally {
      setBusy("");
    }
  }

  async function remove() {
    if (!draft || draft.isNew || !draft.hotel.custom) return;
    if (!window.confirm(`Delete ${draft.hotel.name} from the website? This cannot be undone.`)) return;
    setError("");
    try {
      setBusy("Deleting…");
      const { error } = await sb.from("hotel_content").delete().eq("slug", draft.hotel.slug);
      if (error) throw error;
      await deletePhotos(sb, draft.savedPhotos);
      await refreshSite(sb);
      setRows((r) => {
        const next = { ...r };
        delete next[draft.hotel.slug];
        return next;
      });
      setDraft(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Deleting failed. Try again.");
    } finally {
      setBusy("");
    }
  }

  // ---------- one hotel ----------
  if (draft) {
    const h = draft.hotel;
    const b = draft.basics;
    const setBasics = (patch: Partial<Basics>) => setDraft({ ...draft, basics: { ...b!, ...patch } });
    const places = b ? (placesByCountry[b.country] ?? []) : [];

    return (
      <div className="space-y-5">
        <button type="button" className={btnGhost} onClick={() => setDraft(null)} disabled={!!busy}>
          <ArrowLeft size={16} /> All hotels
        </button>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            {draft.isNew ? (
              <p className="text-xs font-bold uppercase text-red-500">New hotel</p>
            ) : (
              <p className="text-xs font-bold uppercase text-red-500">{h.destination} · {h.country}</p>
            )}
            <h2 className="text-xl font-extrabold uppercase tracking-wide sm:text-2xl">
              {draft.isNew ? b?.name || "Add a hotel" : h.name}
            </h2>
          </div>
          {!draft.isNew && (
            <a href={`/hotels/${h.slug}`} target="_blank" rel="noopener noreferrer" className={btnGhost}>
              <ExternalLink size={15} /> View on website
            </a>
          )}
        </div>

        {b && (
          <section className={`${card} grid gap-4 sm:grid-cols-2`}>
            <div className="sm:col-span-2">
              <label className={label} htmlFor="b-name">Hotel name</label>
              <input id="b-name" className={field} value={b.name} onChange={(e) => setBasics({ name: e.target.value })} placeholder="e.g. Melia Durrës" />
            </div>
            <div>
              <label className={label} htmlFor="b-country">Country</label>
              <select id="b-country" className={field} value={b.country} onChange={(e) => setBasics({ country: e.target.value })}>
                <option value="">Choose…</option>
                {countries.map((c) => (
                  <option key={c} value={c}>{countryNames[c] ?? c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={label} htmlFor="b-place">Place (city or area)</label>
              <input id="b-place" list="b-places" className={field} value={b.destination} onChange={(e) => setBasics({ destination: e.target.value })} placeholder={b.country === "Egypt" ? "e.g. Hurghada" : "e.g. Durrës"} />
              <datalist id="b-places">
                {places.map((p) => <option key={p} value={p} />)}
              </datalist>
            </div>
            <div>
              <label className={label} htmlFor="b-loc">Address shown (optional)</label>
              <input id="b-loc" className={field} value={b.location} onChange={(e) => setBasics({ location: e.target.value })} placeholder="e.g. Golem, Durrës" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={label} htmlFor="b-cat">Type</label>
                <input id="b-cat" list="b-cats" className={field} value={b.category} onChange={(e) => setBasics({ category: e.target.value })} />
                <datalist id="b-cats">
                  {["Hotel", "Resort", "Beach Hotel", "Beach Resort", "Hotel & Spa", "Apartments", "Villa"].map((c) => <option key={c} value={c} />)}
                </datalist>
              </div>
              <div>
                <label className={label} htmlFor="b-stars">Stars</label>
                <select id="b-stars" className={field} value={b.stars} onChange={(e) => setBasics({ stars: e.target.value })}>
                  <option value="">None</option>
                  {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{"★".repeat(n)}</option>)}
                </select>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className={label} htmlFor="b-fac">What it offers (one per line)</label>
              <textarea id="b-fac" rows={4} className={field} value={b.facilities} onChange={(e) => setBasics({ facilities: e.target.value })} placeholder={"Beach\nSwimming pool\nSpa\nWi-Fi"} />
            </div>
            <p className="text-xs text-gray-500 sm:col-span-2">
              The hotel appears under its country on the Hotels page, on the country&apos;s page, in search and in the booking form, with its own page.
            </p>
          </section>
        )}

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
          <p className="flex flex-wrap items-center gap-2 rounded-xl bg-green-500/15 p-3 text-sm text-green-300">
            <Check size={16} /> Saved. The website shows it within a few seconds.
            {b && (
              <a href={`/hotels/${h.slug}`} target="_blank" rel="noopener noreferrer" className="font-bold underline">
                Open its page
              </a>
            )}
          </p>
        )}

        <div className="sticky bottom-0 -mx-4 flex flex-wrap gap-3 border-t border-white/10 bg-neutral-950/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border">
          <button type="button" className={btnRed} onClick={save} disabled={!!busy}>
            {busy || (draft.isNew ? "Add hotel to website" : "Confirm & save")}
          </button>
          <button type="button" className={btnLine} onClick={() => setDraft(null)} disabled={!!busy}>
            Close
          </button>
          {h.custom && !draft.isNew && (
            <button type="button" className={`${btnGhost} ml-auto text-red-400 hover:text-red-300`} onClick={remove} disabled={!!busy}>
              <Trash2 size={15} /> Delete hotel
            </button>
          )}
        </div>
      </div>
    );
  }

  // ---------- the list of hotels ----------
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold uppercase tracking-wide">Hotels</h2>
          <p className="text-sm text-gray-400">Choose a hotel to add photos, descriptions and prices, or add a new one.</p>
        </div>
        <button type="button" className={btnRed} onClick={startNew}>
          <Plus size={17} /> Add a new hotel
        </button>
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
                  {h.custom ? <span className="rounded-full bg-red-600/80 px-2 py-0.5">Added</span> : null}
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
