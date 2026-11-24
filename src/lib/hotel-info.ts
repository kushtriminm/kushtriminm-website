import fs from "node:fs";
import path from "node:path";
import { allBoards, hotelPricing, type Board } from "@/data/hotel-pricing";

// Server-only helpers (they read files at build time).

// Photos added in the agent panel, filled by loadLiveHotels() in lib/live.ts.
export const livePhotos: Record<string, string[]> = {};

// Photos: 1) the ones added in the agent panel, 2) everything in public/images/hotels/<slug>/
// (sorted, 1.jpg is the cover), 3) the hotel's old image/gallery.
export function hotelPhotos(
  slug: string,
  image: string,
  gallery: string[]
): string[] {
  if (livePhotos[slug]?.length) return livePhotos[slug];
  return filePhotos(slug, image, gallery);
}

// The photos that come with the website itself (not the ones from the agent panel).
export function filePhotos(slug: string, image: string, gallery: string[]): string[] {
  const dir = path.join(process.cwd(), "public", "images", "hotels", slug);

  try {
    const own = fs
      .readdirSync(dir)
      .filter((file) => /\.(jpe?g|png|webp|avif)$/i.test(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((file) => `/images/hotels/${slug}/${encodeURIComponent(file)}`);

    if (own.length > 0) return own;
  } catch {
    // no photo folder yet
  }

  return [image, ...gallery].filter(Boolean);
}

// The services a hotel has declared in hotel-pricing.ts (empty if none yet).
export function declaredBoards(slug: string): Board[] {
  const pricing = hotelPricing[slug];
  if (!pricing) return [];
  if (pricing.boards && pricing.boards.length > 0) return pricing.boards;
  return allBoards.filter((board) =>
    pricing.seasons.some((season) => season.prices[board] !== undefined)
  );
}