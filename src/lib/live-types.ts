import type { HotelPricing } from "@/data/hotel-pricing";

// Content that is added from the private agent panel (stored in Supabase).

export type MomentOffer = {
  id: string;
  title_sq: string;
  title_en: string;
  caption_sq: string;
  caption_en: string;
  photos: string[];
  price_eur: number | null;
  per_person: boolean;
  trip_from: string | null; // "YYYY-MM-DD"
  trip_to: string | null;
  starts_at: string; // ISO time
  ends_at: string;
  created_at?: string;
};

export type HotelContent = {
  slug: string;
  description_sq: string;
  description_en: string;
  photos: string[];
  pricing: HotelPricing | null;
  updated_at?: string;
};

// The Supabase project. Both values are public (safe in the browser);
// the admin rights are checked by the database itself.
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";
export const PHOTO_BUCKET = "site-photos";

// Pricing that actually has something in it (empty forms are ignored).
export function hasPricing(pricing: HotelPricing | null | undefined): pricing is HotelPricing {
  return !!pricing && Array.isArray(pricing.seasons) && pricing.seasons.length > 0;
}
