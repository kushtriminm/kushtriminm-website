import type { Metadata } from "next";
import DestinationPageView from "@/components/destination/DestinationPageView";
import { destinationPages } from "@/data/destination-pages";

export const metadata: Metadata = {
  title: "Hurghada, Egypt | Kushtrimi NM Worldwide",
  description: "Pushime në Hurghada: resorte all inclusive dhe aventura në Detin e Kuq. Pyet për ofertë.",
};

export default function Page() {
  return <DestinationPageView data={destinationPages.egypt} />;
}