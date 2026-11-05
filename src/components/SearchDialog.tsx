"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { allHotels } from "@/data/all-hotels";
import { busTours } from "@/data/bus-tours";
import { offers, perPerson } from "@/data/offers";
import { useLang, type Lang } from "@/components/LanguageProvider";

// All the words here, in both languages. Change them here.
const labels = {
  sq: {
    title: "Kërko në faqe",
    placeholder: "Kërko faqe, hotel ose ofertë...",
    close: "Mbyll kërkimin",
    none: "Asnjë rezultat për",
    hint: "Provo: Paris, Stamboll, avion, autobus, Rixos, kontakt",
    page: "Faqe",
    hotel: "Hotel",
    offer: "Ofertë",
    from: "nga",
  },
  en: {
    title: "Search the site",
    placeholder: "Search pages, hotels or offers...",
    close: "Close search",
    none: "No results for",
    hint: "Try: Paris, Istanbul, plane, bus, Rixos, contact",
    page: "Page",
    hotel: "Hotel",
    offer: "Offer",
    from: "from",
  },
};

// Pages that can be found. Add a line here for a new page.
const pages = [
  { href: "/offers", sq: "Ofertat", en: "Offers", words: "oferta udhetime guide guided tours autobus avion bus plane fluturim" },
  { href: "/destinations", sq: "Destinacionet", en: "Destinations", words: "destinacione udhetime vende destinations countries trips" },
  { href: "/destinations/antalya", sq: "Antalya, Turqi", en: "Antalya, Turkey", words: "turqi turkey antalya belek pushime plazh holidays beach" },
  { href: "/destinations/egypt", sq: "Hurghada, Egjipt", en: "Hurghada, Egypt", words: "egjipt egypt hurghada hurgada" },
  { href: "/destinations/greece", sq: "Greqi", en: "Greece", words: "greqi greece ishuj islands" },
  { href: "/hotels", sq: "Hotelet", en: "Hotels", words: "hotele hotels shqiperi albania" },
  { href: "/book", sq: "Rezervo", en: "Book", words: "rezervo kerko oferte booking reserve request" },
  { href: "/about", sq: "Rreth nesh", en: "About us", words: "rreth nesh about agjencia agency" },
  { href: "/contact", sq: "Kontakt", en: "Contact", words: "kontakt contact telefon phone whatsapp viber email adresa address" },
];

// Words that help to find an offer by its region.
const regionWords: Record<string, string> = {
  italy: "itali italy italia",
  spain: "spanje spain",
  europe: "evrope europe",
  middleeast: "dubai emirates emiratet",
};

type Item = {
  type: "page" | "offer" | "hotel";
  title: string;
  sub: string;
  href: string;
  haystack: string;
  slug?: string; // for offers: the name used to open the offer's details
};

function norm(text: string) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function buildItems(lang: Lang): Item[] {
  const t = labels[lang];
  const today = new Date().toISOString().slice(0, 10);

  const pageItems: Item[] = pages.map((p) => ({
    type: "page",
    title: lang === "en" ? p.en : p.sq,
    sub: p.href,
    href: p.href,
    haystack: norm(`${p.sq} ${p.en} ${p.words}`),
  }));

  // Bus tours
  const busItems: Item[] = [];
  for (const tour of busTours) {
    if (!tour.active) continue;
    const upcoming = tour.departures.filter((d) => d.start >= today);
    if (upcoming.length === 0) continue;
    const text = lang === "en" && tour.en ? tour.en : tour;
    const min = Math.min(...upcoming.map((d) => d.price ?? tour.price));
    const days = [...tour.itinerary, ...(tour.en?.itinerary ?? [])].map((x) => x.text).join(" ");
    busItems.push({
      type: "offer",
      title: text.title,
      sub: `${text.duration} · ${t.from} ${min}€`,
      href: `/offers#${tour.slug}`,
      slug: tour.slug,
      haystack: norm(`${tour.title} ${tour.en?.title ?? ""} ${tour.from} ${days} autobus bus guide guided tour`),
    });
  }

  // Tours by plane
  const planeItems: Item[] = [];
  for (const offer of offers) {
    if (!offer.active) continue;
    const upcoming = offer.departures.filter((d) => d.start >= today);
    if (upcoming.length === 0) continue;
    const min = Math.min(...upcoming.map((d) => perPerson(d.total)));
    const days = offer.days.map((d) => `${d.sq} ${d.en}`).join(" ");
    planeItems.push({
      type: "offer",
      title: offer.title[lang],
      sub: `${offer.duration[lang]} · ${t.from} ${min}€`,
      href: `/offers#${offer.slug}`,
      slug: offer.slug,
      haystack: norm(
        `${offer.title.sq} ${offer.title.en} ${offer.tagline.sq} ${offer.tagline.en} ${days} ${regionWords[offer.region] ?? ""} avion plane flight fluturim guide guided tour`
      ),
    });
  }

  const hotelItems: Item[] = allHotels.map((hotel) => ({
    type: "hotel",
    title: hotel.name,
    sub: `${hotel.location}, ${hotel.country}`,
    href: `/hotels/${hotel.slug}`,
    haystack: norm(`${hotel.name} ${hotel.location} ${hotel.region} ${hotel.country}`),
  }));

  return [...pageItems, ...busItems, ...planeItems, ...hotelItems];
}

export default function SearchDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { lang } = useLang();
  const t = labels[lang];
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const items = useMemo(() => (open ? buildItems(lang) : []), [open, lang]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  function close() {
    setQuery("");
    onClose();
  }

  const terms = norm(query).split(/\s+/).filter(Boolean);
  const matches =
    terms.length === 0
      ? items.filter((item) => item.type === "page")
      : items.filter((item) => terms.every((term) => item.haystack.includes(term)));

  const shown = [
    ...matches.filter((item) => item.type === "page"),
    ...matches.filter((item) => item.type === "offer").slice(0, 10),
    ...matches.filter((item) => item.type === "hotel").slice(0, 8),
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.title}
      onKeyDown={(e) => {
        if (e.key === "Escape") close();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      className="fixed inset-0 z-[60] bg-black/80 px-4 pt-20 backdrop-blur-sm sm:pt-28"
    >
      <div className="mx-auto max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl">
        <div className="flex items-center gap-3 border-b border-white/10 px-4">
          <Search size={18} className="shrink-0 text-red-500" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.placeholder}
            aria-label={t.title}
            autoComplete="off"
            className="min-h-[56px] w-full bg-transparent text-base text-white outline-none placeholder:text-gray-500"
          />
          <button
            type="button"
            aria-label={t.close}
            onClick={close}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[60svh] overflow-y-auto p-2">
          {shown.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-gray-400">
              {t.none} &ldquo;{query}&rdquo;
            </p>
          ) : (
            <ul>
              {shown.map((item) => (
                <li key={`${item.type}-${item.href}-${item.title}`}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      if (item.slug) {
                        // If we are already on the Offers page, this opens the offer straight away.
                        window.dispatchEvent(new CustomEvent("open-offer", { detail: item.slug }));
                      }
                      close();
                    }}
                    className="flex min-h-[52px] items-center justify-between gap-3 rounded-xl px-3 py-2 outline-none transition hover:bg-white/5 focus:bg-white/10"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-bold text-white">
                        {item.title}
                      </span>
                      <span className="block truncate text-xs text-gray-400">{item.sub}</span>
                    </span>
                    <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-300">
                      {t[item.type]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {!query && <p className="border-t border-white/10 px-4 py-3 text-xs text-gray-500">{t.hint}</p>}
      </div>
    </div>
  );
}