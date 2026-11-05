import type { Metadata } from "next";
import AboutView from "@/components/about/AboutView";

export const metadata: Metadata = {
  title: "Rreth nesh | Kushtrimi NM Worldwide",
  description:
    "Mbi 30 vjet pranë jush, në çdo udhëtim. Nga udhëtimet me guidë te fluturimet, hotelet dhe pushimet në mbarë botën.",
};

export default function AboutPage() {
  return (
    <main className="relative overflow-x-clip bg-black text-white">
      <AboutView />
    </main>
  );
}