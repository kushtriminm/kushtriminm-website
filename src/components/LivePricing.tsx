"use client";

import type { ReactNode } from "react";
import type { HotelPricing } from "@/data/hotel-pricing";
import { applyLivePricing } from "@/lib/live-pricing";

// Gives the booking calculator in the browser the prices entered in the agent panel.
// It runs before the page content, so every price shown already uses them.
export default function LivePricing({
  pricing,
  children,
}: {
  pricing: Record<string, HotelPricing>;
  children: ReactNode;
}) {
  applyLivePricing(pricing);
  return <>{children}</>;
}
