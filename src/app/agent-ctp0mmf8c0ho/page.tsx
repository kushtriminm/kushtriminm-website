import type { Metadata } from "next";
import { fileHotels } from "@/data/all-hotels";
import { filePhotos } from "@/lib/hotel-info";
import AgentApp from "@/components/agent/AgentApp";
import type { AgentHotel } from "@/components/agent/HotelsPanel";

// The private agent panel. This address is secret: it is not linked anywhere,
// not in the sitemap, and Google is told not to show it. You still need to log in.
export const metadata: Metadata = {
  title: "Agent",
  robots: { index: false, follow: false, nocache: true },
};

export default function AgentPage() {
  const hotels: AgentHotel[] = fileHotels
    .map((h) => ({
      slug: h.slug,
      name: h.name,
      country: h.country,
      destination: h.destination,
      description: h.description,
      sitePhotos: filePhotos(h.slug, h.image, h.gallery),
    }))
    .sort((a, b) => a.country.localeCompare(b.country) || a.name.localeCompare(b.name));

  return <AgentApp hotels={hotels} />;
}
