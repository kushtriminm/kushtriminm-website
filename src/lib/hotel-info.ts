import fs from "node:fs";
import path from "node:path";
import { allBoards, hotelPricing, type Board } from "@/data/hotel-pricing";

// Server-only helpers (they read files at build time).

// Photos: everything in public/images/hotels/<slug>/ (sorted, 1.jpg is the cover).
// If that folder is empty or missing, the hotel's old image/gallery is used.
export function hotelPhotos(
  slug: string,
  image: string,
  gallery: string[]
): string[] {
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