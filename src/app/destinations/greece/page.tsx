import type { Metadata } from "next";
import DestinationPageView from "@/components/destination/DestinationPageView";
import { destinationPages } from "@/data/destination-pages";

export const metadata: Metadata = {
  title: "Greece | Kushtrimi NM Worldwide",
  description: "Pushime në Greqi: Santorini, Mykonos, Halkidiki dhe Crete. Pyet për ofertë.",
};

export default function Page() {
  return <DestinationPageView data={destinationPages.greece} />;
}