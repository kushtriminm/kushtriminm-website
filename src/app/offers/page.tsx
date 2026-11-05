import type { Metadata } from "next";
import GuidedTours from "@/components/tours/GuidedTours";

export const metadata: Metadata = {
  title: "Oferta (Offers) | Kushtrimi NM Worldwide",
  description:
    "Udhëtime me guidë me autobus dhe me avion: Paris, Dubai, Itali, Spanjë, Maltë, Stamboll, Budapest dhe më shumë. Guided bus and flight tours.",
};

export default function OffersPage() {
  return (
    <main className="bg-black pt-24 text-white">
      <GuidedTours variant="page" />
    </main>
  );
}