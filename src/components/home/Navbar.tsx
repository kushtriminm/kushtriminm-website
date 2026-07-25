"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";

const links = [
  { name: "HOME", href: "/" },
  { name: "DESTINATIONS", href: "/destinations" },
  { name: "OFFERS", href: "/offers" },
  { name: "ABOUT", href: "/about" },
  { name: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-black/95 backdrop-blur-md shadow-lg py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">

        {/* LOGO */}

        <Link href="/">
          <Image
            src="/images/Logo.png"
            alt="Kushtrimi NM Worldwide"
            width={170}
            height={60}
            priority
          />
        </Link>

        {/* DESKTOP MENU */}

        <nav className="hidden items-center gap-10 lg:flex">

          {links.map((link) => {

            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative text-sm font-semibold tracking-[0.15em] transition

                ${
                  active
                    ? "text-red-500"
                    : "text-white hover:text-red-500"
                }`}
              >

                {link.name}

                <span
                  className={`absolute -bottom-2 left-0 h-[2px] bg-red-500 transition-all duration-300

                  ${
                    active
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />

              </Link>
            );

          })}

        </nav>

        {/* RIGHT SIDE */}

        <div className="hidden items-center gap-6 lg:flex">

          <a
            href="https://wa.me/38349833888"
            target="_blank"
            className="rounded-full border border-red-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            WhatsApp
          </a>

          <div className="flex items-center gap-2 text-white">

            <Phone size={18} />

            <span className="font-semibold">
              +383 49 833 888
            </span>

          </div>

        </div>

        {/* MOBILE BUTTON */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white lg:hidden"
        >
          {menuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

      </div>

      {/* MOBILE MENU */}

      <div
        className={`overflow-hidden bg-black transition-all duration-500 lg:hidden ${
          menuOpen ? "max-h-[700px]" : "max-h-0"
        }`}
      >

        <div className="flex flex-col px-6 py-6">

          {links.map((link) => {

            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`border-b border-neutral-800 py-5 text-lg font-semibold transition

                ${
                  active
                    ? "text-red-500"
                    : "text-white"
                }`}
              >
                {link.name}
              </Link>
            );

          })}

          <a
            href="https://wa.me/38349833888"
            target="_blank"
            className="mt-8 rounded-full bg-red-600 py-4 text-center font-semibold text-white transition hover:bg-red-700"
          >
            Chat on WhatsApp
          </a>

          <div className="mt-6 flex items-center justify-center gap-2 text-white">

            <Phone size={18} />

            <span>
              +383 49 833 888
            </span>

          </div>

        </div>

      </div>

    </header>
  );
}