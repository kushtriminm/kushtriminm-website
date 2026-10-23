import type { Metadata } from "next";
import Script from "next/script";
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
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2154860165140164');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://www.facebook.com/tr?id=2154860165140164&ev=PageView&noscript=1"
          />
        </noscript>

        <Navbar />

        <div>{children}</div>

        <Footer />

        <WhatsAppButton />
      </body>
    </html>
  );
}