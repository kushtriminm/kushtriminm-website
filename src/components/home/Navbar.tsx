"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";

const links = [
  { name: "HOME", href: "/" },
  { name: "DESTINATIONS", href: "/destinations" },
  { name: "HOTELS", href: "/hotels" },
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

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close mobile menu when changing page
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-black/95 py-3 shadow-lg backdrop-blur-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6">

        {/* LOGO */}

        <Link
          href="/"
          className="relative z-[60] shrink-0"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/images/Logo.png"
            alt="Kushtrimi NM Worldwide"
            width={160}
            height={56}
            priority
            className="h-auto w-[135px] sm:w-[160px]"
          />
        </Link>


        {/* DESKTOP MENU */}

        <nav className="hidden items-center gap-8 lg:flex xl:gap-10">

          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative text-sm font-semibold tracking-[0.15em] transition ${
                  active
                    ? "text-red-500"
                    : "text-white hover:text-red-500"
                }`}
              >
                {link.name}

                <span
                  className={`absolute -bottom-2 left-0 h-[2px] bg-red-500 transition-all duration-300 ${
                    active
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}

        </nav>


        {/* DESKTOP RIGHT SIDE */}

        <div className="hidden items-center gap-5 lg:flex">

          <a
            href="https://wa.me/38349833888"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            WhatsApp
          </a>

          <a
            href="tel:+38349833888"
            className="flex items-center gap-2 text-white transition hover:text-red-500"
          >
            <Phone size={18} />

            <span className="font-semibold">
              +383 49 833 888
            </span>
          </a>

        </div>


        {/* MOBILE MENU BUTTON */}

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-[60] rounded-xl p-2 text-white transition hover:bg-white/10 lg:hidden"
        >
          {menuOpen ? (
            <X size={30} />
          ) : (
            <Menu size={30} />
          )}
        </button>

      </div>


      {/* MOBILE MENU */}

      <div
        className={`fixed inset-0 z-50 bg-black transition-all duration-300 lg:hidden ${
          menuOpen
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >

        <div className="flex h-full flex-col px-6 pb-8 pt-28">

          {/* MOBILE LINKS */}

          <nav className="flex flex-col">

            {links.map((link, index) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`border-b border-neutral-800 py-5 text-xl font-semibold tracking-wide transition ${
                    active
                      ? "text-red-500"
                      : "text-white hover:text-red-500"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{link.name}</span>

                    <span className="text-sm text-neutral-600">
                      0{index + 1}
                    </span>
                  </div>
                </Link>
              );
            })}

          </nav>


          {/* MOBILE WHATSAPP */}

          <div className="mt-auto">

            <a
              href="https://wa.me/38349833888?text=Hello!%20I%20would%20like%20to%20ask%20about%20a%20holiday."
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-full bg-red-600 py-4 text-center font-semibold text-white shadow-lg shadow-red-900/20 transition hover:bg-red-700"
            >
              Chat on WhatsApp
            </a>


            {/* PHONE */}

            <a
              href="tel:+38349833888"
              className="mt-5 flex items-center justify-center gap-2 text-gray-300 transition hover:text-red-500"
            >
              <Phone size={18} />

              <span>
                +383 49 833 888
              </span>
            </a>


            {/* BRAND */}

            <p className="mt-8 text-center text-xs uppercase tracking-[0.3em] text-neutral-600">
              Kushtrimi NM Worldwide
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}