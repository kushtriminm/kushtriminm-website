import type { Metadata } from "next";
import DestinationPageView from "@/components/destination/DestinationPageView";
import { destinationPages } from "@/data/destination-pages";

export const metadata: Metadata = {
  title: "Antalya | Kushtrimi NM Worldwide",
  description: "Pushime në Antalya: resorte luksoze, plazhe dhe hotele all inclusive. Pyet për ofertë.",
};

export default function Page() {
  return <DestinationPageView data={destinationPages.antalya} />;
}