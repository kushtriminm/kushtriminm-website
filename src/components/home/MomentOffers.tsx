"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, MessageCircle, X } from "lucide-react";
import { useLang, type Lang } from "@/components/LanguageProvider";
import ScrollRow from "@/components/booking/ScrollRow";
import { useModalDialog } from "@/components/tours/useModalDialog";
import type { MomentOffer } from "@/lib/live-types";

// "Offers of the moment": the short offers posted on Instagram, added in the agent panel.
// Each one disappears by itself when its time is up.

const labels = {
  sq: {
    eyebrow: "Ofertat e momentit",
    title: "Vetëm për pak ditë",
    sub: "Ofertat që sapo i publikuam në Instagram. Rezervo para se të mbarojnë.",
    all: "Shiko të gjitha",
    from: "nga",
    perPerson: "/ person",
    total: "gjithsej",
    endsToday: "Mbaron sot",
    endsIn: (d: number) => (d === 1 ? "Mbaron nesër" : `Edhe ${d} ditë`),
    endsHours: (h: number) => `Edhe ${h} orë`,
    details: "Shiko detajet",
    ask: "Rezervo në WhatsApp",
    close: "Mbyll",
    emptyTitle: "Asnjë ofertë e momentit tani",
    emptyText: "Ofertat e reja i publikojmë së pari në Instagram. Na ndiq që të mos i humbasësh.",
    follow: "Na ndiq në Instagram",
    wa: (title: string) => `Përshëndetje! Jam i interesuar për ofertën: ${title}`,
  },
  en: {
    eyebrow: "Offers of the moment",
    title: "Only for a few days",
    sub: "The offers we just posted on Instagram. Book before they are gone.",
    all: "See all",
    from: "from",
    perPerson: "/ person",
    total: "total",
    endsToday: "Ends today",
    endsIn: (d: number) => (d === 1 ? "Ends tomorrow" : `${d} days left`),
    endsHours: (h: number) => `${h} hours left`,
    details: "See details",
    ask: "Book on WhatsApp",
    close: "Close",
    emptyTitle: "No offers of the moment right now",
    emptyText: "We post new offers on Instagram first. Follow us so you don't miss them.",
    follow: "Follow us on Instagram",
    wa: (title: string) => `Hello! I'm interested in the offer: ${title}`,
  },
};

const months: Record<Lang, string[]> = {
  sq: ["Jan", "Shk", "Mar", "Pri", "Maj", "Qer", "Kor", "Gus", "Sht", "Tet", "Nën", "Dhj"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

const INSTAGRAM = "https://www.instagram.com/kushtriminm";

// The current time, updated every minute (null on the server, so nothing is guessed there).
function subscribeMinute(callback: () => void) {
  const id = setInterval(callback, 60_000);
  return () => clearInterval(id);
}
const getMinute = () => Math.floor(Date.now() / 60_000);

function niceDate(date: string, lang: Lang) {
  const [y, m, d] = date.split("-").map(Number);
  return `${d} ${months[lang][m - 1]} ${y}`;
}

function tripDates(offer: MomentOffer, lang: Lang) {
  if (!offer.trip_from) return null;
  if (!offer.trip_to || offer.trip_to === offer.trip_from) return niceDate(offer.trip_from, lang);
  return `${niceDate(offer.trip_from, lang)} – ${niceDate(offer.trip_to, lang)}`;
}

function text(offer: MomentOffer, lang: Lang) {
  return {
    title: (lang === "en" ? offer.title_en : offer.title_sq) || offer.title_sq || offer.title_en,
    caption: (lang === "en" ? offer.caption_en : offer.caption_sq) || offer.caption_sq || offer.caption_en,
  };
}

function timeLeft(offer: MomentOffer, minute: number, t: (typeof labels)["sq"]) {
  const ms = Date.parse(offer.ends_at) - minute * 60_000;
  const hours = Math.ceil(ms / 3_600_000);
  if (hours <= 12) return t.endsHours(Math.max(1, hours));
  const days = Math.floor(ms / 86_400_000);
  return days < 1 ? t.endsToday : t.endsIn(days);
}

function Price({ offer, t }: { offer: MomentOffer; t: (typeof labels)["sq"] }) {
  if (offer.price_eur == null) return null;
  return (
    <p className="flex flex-wrap items-baseline gap-x-1.5">
      <span className="text-xs text-gray-400">{t.from}</span>
      <span className="text-3xl font-black text-red-500">{offer.price_eur}€</span>
      <span className="text-xs text-gray-400">{offer.per_person ? t.perPerson : t.total}</span>
    </p>
  );
}

export default function MomentOffers({
  offers,
  variant,
}: {
  offers: MomentOffer[];
  variant: "home" | "page";
}) {
  const { lang } = useLang();
  const t = labels[lang];
  const minute = useSyncExternalStore(subscribeMinute, getMinute, () => null);
  const [openId, setOpenId] = useState<string | null>(null);

  // Hide offers whose time ran out since the page was made.
  const live =
    minute === null ? offers : offers.filter((o) => Date.parse(o.ends_at) > minute * 60_000);
  const open = live.find((o) => o.id === openId) ?? null;

  if (live.length === 0) {
    if (variant === "home") return null;
    return (
      <section className="px-5 pb-24 pt-36 text-center sm:pt-44">
        <div className="mx-auto max-w-md">
          <p className="text-sm font-bold uppercase text-red-500">{t.eyebrow}</p>
          <h1 className="mt-3 text-balance text-2xl font-extrabold uppercase tracking-wide sm:text-3xl">
            {t.emptyTitle}
          </h1>
          <p className="mt-3 text-balance text-sm text-gray-400">{t.emptyText}</p>
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full bg-red-600 px-8 py-3 font-bold text-white transition hover:bg-red-700"
          >
            {t.follow}
          </a>
        </div>
      </section>
    );
  }

  function card(offer: MomentOffer, width: string) {
    const { title } = text(offer, lang);
    const dates = tripDates(offer, lang);
    return (
      <article
        key={offer.id}
        className={`flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 transition duration-300 hover:border-red-500/60 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)] ${width}`}
      >
        <button
          type="button"
          onClick={() => setOpenId(offer.id)}
          className="relative block aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-red-950/60 to-neutral-950 text-left"
          aria-label={`${t.details}: ${title}`}
        >
          {offer.photos[0] && (
            <Image
              src={offer.photos[0]}
              alt={title}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 78vw"
              className="object-cover transition duration-500 hover:scale-[1.03]"
            />
          )}
          {minute !== null && (
            <span className="absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg">
              <Clock size={12} aria-hidden="true" />
              {timeLeft(offer, minute, t)}
            </span>
          )}
          {offer.photos.length > 1 && (
            <span className="absolute bottom-2.5 right-2.5 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-bold text-white backdrop-blur-sm">
              1/{offer.photos.length}
            </span>
          )}
        </button>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="break-words text-balance text-lg font-extrabold uppercase leading-tight tracking-wide text-white">
            {title}
          </h3>
          {dates && (
            <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-300">
              <CalendarDays size={14} className="shrink-0 text-red-500" aria-hidden="true" />
              {dates}
            </p>
          )}
          <div className="mt-2">
            <Price offer={offer} t={t} />
          </div>
          <div className="mt-auto pt-4">
            <button
              type="button"
              onClick={() => setOpenId(offer.id)}
              className="min-h-[44px] w-full rounded-full border border-white/30 px-3 text-sm font-bold text-white transition hover:bg-white hover:text-black"
            >
              {t.details}
            </button>
          </div>
        </div>
      </article>
    );
  }

  const Heading = variant === "page" ? "h1" : "h2";

  return (
    <section
      className={
        variant === "page"
          ? "px-5 pb-20 pt-32 sm:pt-40"
          : "bg-gradient-to-b from-black via-neutral-950 to-black px-5 py-10 sm:py-16"
      }
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="flex items-center justify-center gap-2 text-xs font-bold uppercase text-red-500 sm:text-sm">
            <span aria-hidden="true" className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            {t.eyebrow}
          </p>
          <Heading className="mt-3 text-balance text-2xl font-extrabold uppercase tracking-wide sm:text-4xl">
            {t.title}
          </Heading>
          <p className="mx-auto mt-3 max-w-xl text-balance text-sm text-gray-400 sm:text-base">{t.sub}</p>
        </div>

        {variant === "home" ? (
          <div className="mt-8">
            <ScrollRow>
              {live.map((o) =>
                card(o, "w-[78%] shrink-0 snap-center sm:w-[calc((100%_-_1rem)/2)] lg:w-[calc((100%_-_3rem)/4)] md:snap-start")
              )}
            </ScrollRow>
            <div className="mt-4 text-center">
              <Link
                href="/deals"
                className="inline-flex min-h-[44px] items-center gap-2 text-sm font-bold text-white transition hover:text-red-400"
              >
                {t.all}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {live.map((o) => card(o, ""))}
          </div>
        )}
      </div>

      {open && <OfferDialog offer={open} onClose={() => setOpenId(null)} />}
    </section>
  );
}

function OfferDialog({ offer, onClose }: { offer: MomentOffer; onClose: () => void }) {
  const { lang } = useLang();
  const t = labels[lang];
  const ref = useModalDialog(onClose);
  const { title, caption } = text(offer, lang);
  const dates = tripDates(offer, lang);

  return (
    <dialog
      ref={ref}
      aria-label={title}
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close();
      }}
      className="fixed inset-0 m-auto h-fit max-h-[90svh] w-[calc(100%-1.5rem)] max-w-lg overflow-y-auto overscroll-contain rounded-3xl bg-neutral-900 p-0 text-white backdrop:bg-black/75"
    >
      <div className="relative">
        {/* Photos: swipe on phones, scroll with the arrows on a computer */}
        {offer.photos.length > 0 && (
          <div className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {offer.photos.map((src, i) => (
              <div key={src} className="relative aspect-[4/5] w-full shrink-0 snap-center">
                <Image
                  src={src}
                  alt={`${title} ${i + 1}`}
                  fill
                  sizes="(min-width: 640px) 512px, 100vw"
                  className="object-cover"
                  priority={i === 0}
                />
                {offer.photos.length > 1 && (
                  <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2 py-0.5 text-xs font-bold backdrop-blur-sm">
                    {i + 1}/{offer.photos.length}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          aria-label={t.close}
          onClick={() => ref.current?.close()}
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-red-600"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-5 sm:p-6">
        <h2 className="break-words text-balance text-xl font-extrabold uppercase leading-tight tracking-wide">
          {title}
        </h2>
        {dates && (
          <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-300">
            <CalendarDays size={15} className="shrink-0 text-red-500" aria-hidden="true" />
            {dates}
          </p>
        )}
        <div className="mt-3">
          <Price offer={offer} t={t} />
        </div>
        {caption && (
          <p className="mt-4 whitespace-pre-line break-words text-sm leading-7 text-gray-300">{caption}</p>
        )}

        <a
          href={`https://wa.me/38349833888?text=${encodeURIComponent(t.wa(title))}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-3 font-bold text-white transition hover:bg-red-700"
        >
          <MessageCircle size={18} aria-hidden="true" />
          {t.ask}
        </a>
      </div>
    </dialog>
  );
}
