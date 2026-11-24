import { hotelPricing, type HotelPricing } from "@/data/hotel-pricing";

// Prices from the website's own file, kept so a price removed in the panel falls back to it.
const filePricing: Record<string, HotelPricing> = { ...hotelPricing };

// Puts the agent panel's prices into the booking calculator.
// Runs on the server (lib/live.ts) and in the browser (components/LivePricing.tsx).
export function applyLivePricing(live: Record<string, HotelPricing>) {
  for (const slug of Object.keys(hotelPricing)) {
    if (!(slug in live) && !(slug in filePricing)) delete hotelPricing[slug];
  }
  Object.assign(hotelPricing, filePricing, live);
}
