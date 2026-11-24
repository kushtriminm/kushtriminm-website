import type { Metadata } from "next";
import MomentOffers from "@/components/home/MomentOffers";
import { getMomentOffers } from "@/lib/live";

export const metadata: Metadata = {
  title: "Ofertat e momentit | Kushtrimi NM Worldwide",
  description:
    "Ofertat e momentit nga Kushtrimi NM Worldwide: vetëm për pak ditë. Offers of the moment, only for a few days.",
};

export default async function DealsPage() {
  const offers = await getMomentOffers();
  return (
    <main className="min-h-screen bg-black text-white">
      <MomentOffers offers={offers} variant="page" />
    </main>
  );
}
