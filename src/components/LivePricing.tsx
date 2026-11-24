"use client";

import type { ReactNode } from "react";
import type { HotelPricing } from "@/data/hotel-pricing";
import { applyLivePricing } from "@/lib/live-pricing";
import { applyCustomHotels, type AnyHotel } from "@/data/all-hotels";

// Gives the browser the prices and the new hotels entered in the agent panel
// (booking form, search). It runs before the page content, so everything shown already uses them.
export default function LivePricing({
  pricing,
  hotels,
  children,
}: {
  pricing: Record<string, HotelPricing>;
  hotels: AnyHotel[];
  children: ReactNode;
}) {
  applyCustomHotels(hotels);
  applyLivePricing(pricing);
  return <>{children}</>;
}
