import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

// All the words in the footer. Change them here.
const labels = {
  tagline:
    "Pushime, fluturime, hotele dhe udhëtime me autobus, të organizuara personalisht nga Gjakova.",
  explore: "Faqet",
  contact: "Kontakt",
  whatsapp: "Na shkruaj në WhatsApp",
  rights: "Të gjitha të drejtat e rezervuara.",
  designedBy: "Designed by",
};

const links = [
  { name: "Destinacionet", href: "/destinations" },
  { name: "Hotelet", href: "/hotels" },
  { name: "Rezervo", href: "/book" },
  { name: "Rreth nesh", href: "/about" },
  { name: "Kontakt", href: "/contact" },
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
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@kushtriminm",
    icon: FaTiktok,
  },
];

// Put the VISUALEA website or Instagram link in href. Empty = plain text.
const credit = { name: "VISUALEA", href: "https://www.instagram.com/visualeastudio" };

const directionsUrl =
  "https://www.google.com/maps/search/?api=1&query=42.3768706,20.4321499";

const glow = "font-semibold text-orange-500 [text-shadow:0_0_10px_rgba(249,115,22,0.7)]";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-10 sm:px-6 sm:pb-14 sm:pt-14">
        <div className="grid grid-cols-1 gap-y-9 md:grid-cols-[1.4fr_1fr_1.4fr] md:gap-x-10">
          {/* Brand */}
          <div>
            <Image
              src="/images/Logo.png"
              alt="Kushtrimi NM Worldwide"
              width={220}
              height={80}
              className="h-auto w-[150px] sm:w-[180px]"
            />

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
              {labels.tagline}
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

          {/* Links: desktop only */}
          <div className="hidden md:block">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              {labels.explore}
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-400">
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
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              {labels.contact}
            </h3>

            <div className="mt-4 space-y-3 text-sm text-gray-400">
              <a
                href="tel:+38349833888"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Phone size={16} className="shrink-0 text-red-500" />
                +383 49 833 888
              </a>

              <a
                href="mailto:info@kushtriminm.com"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Mail size={16} className="shrink-0 text-red-500" />
                <span className="break-all">info@kushtriminm.com</span>
              </a>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <MapPin size={16} className="shrink-0 text-red-500" />
                Xheladin Hana, Gjakovë
              </a>
            </div>

            <a
              href="https://wa.me/38349833888"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block whitespace-nowrap rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              {labels.whatsapp}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-neutral-900 pt-6 text-center text-xs text-gray-500 sm:flex-row sm:text-sm">
          <p>
            &copy; {new Date().getFullYear()} Kushtrimi NM Worldwide. {labels.rights}
          </p>
          <p>
            {labels.designedBy}{" "}
            {credit.href ? (
              <a
                href={credit.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${glow} transition hover:text-orange-400`}
              >
                {credit.name}
              </a>
            ) : (
              <span className={glow}>{credit.name}</span>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}