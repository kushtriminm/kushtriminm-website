import type { HotelPricing } from "@/data/hotel-pricing";
import { livePhotos } from "./hotel-info";
import { applyLivePricing } from "./live-pricing";
import {
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
  hasPricing,
  type HotelContent,
  type MomentOffer,
} from "./live-types";

// Reads what was posted in the agent panel. Results are kept for 60 seconds,
// and saving in the panel refreshes them at once (tag "live", see /api/revalidate).
export const LIVE_TAG = "live";
const REFRESH_SECONDS = 60;

async function select<T>(table: string, query: string): Promise<T[]> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return [];
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
      next: { revalidate: REFRESH_SECONDS, tags: [LIVE_TAG] },
    });
    if (!res.ok) {
      console.error(`Supabase ${table}: ${res.status}`);
      return [];
    }
    return (await res.json()) as T[];
  } catch (error) {
    // If Supabase cannot be reached the site still works with its own data.
    console.error(`Supabase ${table}:`, error);
    return [];
  }
}

// Live offers of the moment, the ones ending soonest first.
// (The database itself only returns offers that are running right now.)
export async function getMomentOffers(): Promise<MomentOffer[]> {
  return select<MomentOffer>("moment_offers", "select=*&order=ends_at.asc");
}

export async function getHotelContent(): Promise<Record<string, HotelContent>> {
  const rows = await select<HotelContent>("hotel_content", "select=*");
  return Object.fromEntries(rows.map((row) => [row.slug, row]));
}

// Prices entered in the panel, for the booking calculator.
export function pricingFrom(content: Record<string, HotelContent>): Record<string, HotelPricing> {
  const out: Record<string, HotelPricing> = {};
  for (const [slug, row] of Object.entries(content)) {
    if (hasPricing(row.pricing)) out[slug] = row.pricing;
  }
  return out;
}

// Call at the top of a server page that shows hotels: after this, fromPrice(),
// declaredBoards() and hotelPhotos() use the panel's prices and photos.
export async function loadLiveHotels(): Promise<Record<string, HotelContent>> {
  const content = await getHotelContent();
  applyLivePricing(pricingFrom(content));
  for (const slug of Object.keys(livePhotos)) delete livePhotos[slug];
  for (const [slug, row] of Object.entries(content)) {
    if (row.photos.length > 0) livePhotos[slug] = row.photos;
  }
  return content;
}
