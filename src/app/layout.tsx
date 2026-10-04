import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";

export const metadata: Metadata = {
  title: "Kushtrimi NM Worldwide",
  description:
    "Kushtrimi NM Worldwide - Discover hotels, holidays and unforgettable travel experiences worldwide.",
  keywords: [
    "Kushtrimi NM Worldwide",
    "kushtrimi nm",
    "travel agency",
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
      "Discover hotels, holidays and unforgettable travel experiences worldwide.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <Navbar />

        <main>{children}</main>

        <Footer />

        <WhatsAppButton />
      </body>
    </html>
  );
}