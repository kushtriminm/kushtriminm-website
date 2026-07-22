import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";

export const metadata: Metadata = {
  title: "Kushtrimi NM Worldwide",
  description: "Luxury holidays around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>

        <Navbar />

        {children}

        <Footer />

        <WhatsAppButton />

      </body>
    </html>
  );
}
