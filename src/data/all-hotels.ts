import { hotels, type Hotel } from "./hotels";
import { abroadHotels } from "./hotels-abroad";
import type { HotelContent } from "@/lib/live-types";

export type Country = "Albania" | "Turkey" | "Egypt" | "Greece";
export type AnyHotel = Hotel & { country: Country };
export const countries: Country[] = ["Albania", "Turkey", "Egypt", "Greece"];

// The hotels written in the website's own files.
export const fileHotels: AnyHotel[] = [
  ...hotels.map((hotel) => ({ ...hotel, country: "Albania" as Country })),
  ...abroadHotels,
];

// Every hotel on the site, in one list: the file hotels plus the ones added in the agent panel
// (those are put in by applyCustomHotels, on the server in lib/live.ts and in the browser
// in components/LivePricing.tsx).
export const allHotels: AnyHotel[] = [...fileHotels];

export function applyCustomHotels(custom: AnyHotel[]) {
  allHotels.splice(0, allHotels.length, ...fileHotels, ...custom);
}

// A hotel added in the agent panel, in the same shape as the file hotels.
// It joins the group of the other hotels in the same place, if there are any.
export function hotelFromRow(row: HotelContent): AnyHotel | null {
  if (!row.is_custom || !row.name || !row.country || !row.destination) return null;
  if (!countries.includes(row.country as Country)) return null;
  if (fileHotels.some((h) => h.slug === row.slug)) return null;

  const country = row.country as Country;
  const place = row.destination.trim();
  const sameplace = fileHotels.find(
    (h) => h.country === country && h.destination.toLowerCase() === place.toLowerCase()
  );

  return {
    slug: row.slug,
    name: row.name,
    country,
    region: sameplace?.region ?? (country === "Albania" ? place : `${place}, ${country}`),
    destination: place,
    location: row.location?.trim() || place,
    category: row.category?.trim() || "Hotel",
    stars: row.stars ?? undefined,
    prices: [],
    image: "",
    description: row.description_sq || row.description_en,
    facilities: row.facilities ?? [],
    gallery: [],
  };
}

export function customHotelsFrom(content: Record<string, HotelContent>): AnyHotel[] {
  return Object.values(content)
    .map(hotelFromRow)
    .filter((h): h is AnyHotel => h !== null)
    .sort((a, b) => a.name.localeCompare(b.name));
}
