import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://kushtriminm.com"),
  title: "Kushtrimi NM Worldwide | Agjenci Udhëtimi në Gjakovë",
  description:
    "Kushtrimi NM Worldwide - agjencia e udhëtimit në Gjakovë. Pushime, fluturime, hotele dhe udhëtime me autobus në Turqi, Egjipt, Greqi, Shqipëri dhe më gjerë.",
  keywords: [
    "Kushtrimi NM Worldwide",
    "kushtrimi nm",
    "travel agency",
    "agjenci udhetimi Gjakove",
    "holidays",
    "hotels",
    "Albania hotels",
    "Turkey holidays",
    "Egypt holidays",
    "Greece holidays",
  ],
  openGraph: {
    title: "Kushtrimi NM Worldwide",
    description:
      "Pushime, fluturime, hotele dhe udhëtime me autobus, të organizuara personalisht nga Gjakova.",
    type: "website",
    url: "/",
    siteName: "Kushtrimi NM Worldwide",
    images: [
      {
        url: "/images/hero/home.jpg",
        alt: "Kushtrimi NM Worldwide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/hero/home.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sq">
      <body className="overflow-x-clip bg-black text-white antialiased">
        <Navbar />

        <div>{children}</div>

        <Footer />

        <WhatsAppButton />
      </body>
    </html>
  );
}