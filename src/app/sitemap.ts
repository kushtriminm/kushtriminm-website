import type { MetadataRoute } from "next";
import { allHotels } from "@/data/all-hotels";

// CHECK: use the same domain as in your old sitemap.ts
const baseUrl = "https://www.kushtriminm.com";

const pages = [
  "",
  "/destinations",
  "/destinations/antalya",
  "/destinations/egypt",
  "/destinations/greece",
  "/hotels",
  "/book",
  "/about",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...pages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: now,
      priority: path === "" ? 1 : 0.8,
    })),
    ...allHotels.map((hotel) => ({
      url: `${baseUrl}/hotels/${hotel.slug}`,
      lastModified: now,
      priority: 0.6,
    })),
  ];
}