import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const links = [
  { name: "Home", href: "/" },
  { name: "Destinations", href: "/destinations" },
  { name: "Hotels", href: "/hotels" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/kushtriminm",
    icon: FaInstagram,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61558633936209",
    icon: FaFacebookF,
  },
];

const directionsUrl =
  "https://www.google.com/maps/search/?api=1&query=42.3768706,20.4321499";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Image
              src="/images/Logo.png"
              alt="Kushtrimi NM Worldwide"
              width={220}
              height={80}
              className="h-auto w-[180px]"
            />

            <p className="mt-5 max-w-sm leading-7 text-gray-400">
              Holidays, flights, hotels and bus tours, arranged personally from
              Gjakov&euml;.
            </p>

            <div className="mt-5 flex gap-3">
              {socials.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-700 text-gray-300 transition hover:border-red-500 hover:text-red-500"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold">Explore</h3>

            <div className="mt-5 flex flex-col gap-3 text-gray-400">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold">Contact</h3>

            <div className="mt-5 space-y-4 text-gray-400">
              <a
                href="tel:+38349833888"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Phone size={18} className="shrink-0 text-red-500" />
                +383 49 833 888
              </a>

              <a
                href="mailto:info@kushtriminm.com"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Mail size={18} className="shrink-0 text-red-500" />
                info@kushtriminm.com
              </a>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <MapPin size={18} className="shrink-0 text-red-500" />
                Xheladin Hana, Gjakov&euml;
              </a>
            </div>

            <a
              href="https://wa.me/38349833888"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-red-600 px-7 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              WhatsApp us
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-900 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Kushtrimi NM Worldwide. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}