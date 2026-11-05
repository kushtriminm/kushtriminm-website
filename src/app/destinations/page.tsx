import type { Metadata } from "next";
import DestinationsView from "@/components/destination/DestinationsView";

export const metadata: Metadata = {
  title: "Destinations | Kushtrimi NM Worldwide",
  description:
    "Holidays, flights, hotels and city breaks: Dubai, Antalya, Egypt, Greece, Italy, Switzerland, Germany and more.",
};

export default function DestinationsPage() {
  return (
    <main className="bg-black text-white">
      <DestinationsView />
    </main>
  );
}