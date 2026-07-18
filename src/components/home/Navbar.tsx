"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-black/40 backdrop-blur-md">
      <nav className="mx-auto flex h-24 max-w-7xl items-center justify-between px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center">
<Image
  src="/images/logo.png"
  alt="Kushtrimi NM Worldwide"
  width={180}
  height={60}
  priority
  className="h-12 w-auto"
/>
</Link>

        {/* Navigation */}
        <ul className="hidden items-center gap-10 text-sm font-medium uppercase tracking-widest text-white md:flex">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/destinations">Destinations</Link></li>
          <li><Link href="/offers">Offers</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-2 text-xl">
            🇦🇱 🇬🇧 🇩🇪
          </div>

          <a
            href="https://wa.me/38349833888"
            target="_blank"
            className="text-sm font-semibold uppercase tracking-widest text-white transition hover:text-red-500"
          >
            <Phone size={18} />
            WhatsApp
          </a>
        </div>
      </nav>
    </header>
  );
}