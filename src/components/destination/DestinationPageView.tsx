import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, MapPin, MessageCircle, Star } from "lucide-react";
import { allHotels } from "@/data/all-hotels";
import type { DestinationPage } from "@/data/destination-pages";
import { fromPrice } from "@/lib/booking";
import { hotelPhotos } from "@/lib/hotel-info";
import BookButton from "@/components/booking/BookButton";
import BookingModal from "@/components/booking/BookingModal";
import ScrollRow from "@/components/booking/ScrollRow";

// All the words in this template. Change them here.
const labels = {
  hotelsEyebrow: "Hotelet tona",
  hotelsTitle: "Hotele të zgjedhura",
  allHotels: "Shiko të gjitha hotelet",
  activitiesEyebrow: "Gjatë pushimit",
  activitiesTitle: "Aktivitete",
  faqTitle: "Pyetje të shpeshta",
  ctaTitle: "Gati për",
  ctaText: "Na thuaj ku dëshiron të shkosh dhe ne merremi me pjesën tjetër: fluturime, hotel dhe asistencë.",
  bookHotel: "Rezervo një hotel",
  askOffer: "Kërko ofertë",
  whatsapp: "Na shkruaj në WhatsApp",
  details: "Detaje",
  book: "Rezervo",
  from: "nga",
  perNight: "për person / natë",
  askPrice: "Çmimi: pyet për ofertë",
  swipe: "Swipe for more",
};

const wa = (text: string) =>
  `https://wa.me/38349833888?text=${encodeURIComponent(text)}`;

const photoCard =
  "group relative aspect-[4/5] w-[72%] shrink-0 snap-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-800 to-neutral-950 transition duration-300 hover:border-red-500/60 hover:shadow-[0_0_40px_rgba(220,38,38,0.25)] md:aspect-[3/4] md:w-[calc((100%_-_3rem)/4)] md:snap-start";

const section = "px-5 py-14 sm:py-20";
const sectionAlt =
  "bg-gradient-to-b from-black via-neutral-950 to-black px-5 py-14 sm:py-20";
const h2 = "text-2xl font-extrabold uppercase tracking-wide sm:text-4xl";

export default function DestinationPageView({ data }: { data: DestinationPage }) {
  const hotels = allHotels.filter((hotel) => hotel.country === data.country);
  const hasHotels = hotels.length > 0;
  const areas = data.areas ?? [];
  const experiences = data.experiences ?? [];
  const message = `Përshëndetje! Jam i interesuar për ${data.title}.`;

  return (
    <main className="bg-black text-white">
      {/* Hero */}
      <section className="relative flex min-h-[64svh] items-end overflow-hidden px-5 pb-12 pt-36 sm:min-h-[72svh] sm:items-center sm:pb-16">
        <Image
          src={data.heroImage}
          alt={data.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black" />

        <div className="relative mx-auto w-full max-w-4xl text-center">
          <p className="text-sm font-bold uppercase text-red-500">{data.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-extrabold uppercase leading-[1.1] tracking-wide sm:text-6xl">
            {data.title}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-gray-200 sm:text-lg">{data.tagline}</p>

          <div className="mx-auto mt-8 flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            {hasHotels ? (
              <BookButton
                country={data.country}
                className="rounded-full bg-red-600 px-8 py-3.5 font-bold text-white transition hover:bg-red-700"
              >
                {labels.bookHotel}
              </BookButton>
            ) : (
              <Link
                href="/book"
                className="rounded-full bg-red-600 px-8 py-3.5 text-center font-bold text-white transition hover:bg-red-700"
              >
                {labels.askOffer}
              </Link>
            )}
            <a
              href={wa(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/50 px-8 py-3.5 text-center font-bold transition hover:bg-white hover:text-black"
            >
              {labels.whatsapp}
            </a>
          </div>
        </div>
      </section>

      {/* Areas */}
      {areas.length > 0 && (
        <section className={section}>
          <div className="mx-auto max-w-6xl">
            <h2 className={`mb-8 text-center ${h2}`}>{data.areasTitle}</h2>
            <ScrollRow>
              {areas.map((area) => (
                <div key={area.name} className={photoCard}>
                  <Image
                    src={area.image}
                    alt={area.name}
                    fill
                    sizes="(min-width: 768px) 25vw, 72vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="text-2xl font-extrabold uppercase tracking-wide">{area.name}</h3>
                    <p className="mt-1 text-sm text-gray-300">{area.text}</p>
                  </div>
                </div>
              ))}
            </ScrollRow>
            <p className="mt-1 text-center text-xs text-gray-500 md:hidden">{labels.swipe} &rarr;</p>
          </div>
        </section>
      )}

      {/* Hotels */}
      {hasHotels && (
        <section className={areas.length > 0 ? sectionAlt : section}>
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <p className="text-sm font-bold uppercase text-red-500">{labels.hotelsEyebrow}</p>
              <h2 className={`mt-3 ${h2}`}>{labels.hotelsTitle}</h2>
            </div>

            <ScrollRow>
              {hotels.map((hotel) => {
                const from = fromPrice(hotel.slug);
                const photo = hotelPhotos(hotel.slug, hotel.image, hotel.gallery)[0];

                return (
                  <article
                    key={hotel.slug}
                    className="group flex w-[78%] shrink-0 snap-center flex-col overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 transition duration-300 hover:border-red-500/60 hover:shadow-[0_0_40px_rgba(220,38,38,0.25)] md:w-[calc((100%_-_2rem)/3)] md:snap-start"
                  >
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-neutral-800 to-neutral-950">
                      {photo && (
                        <Image
                          src={photo}
                          alt={hotel.name}
                          fill
                          sizes="(min-width: 768px) 33vw, 78vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <p className="flex items-center gap-1.5 text-xs text-gray-400">
                        <MapPin size={14} className="text-red-500" />
                        {hotel.location}
                      </p>
                      <h3 className="mt-2 text-lg font-extrabold uppercase leading-tight tracking-wide">
                        {hotel.name}
                      </h3>
                      {hotel.stars && (
                        <div className="mt-2 flex gap-0.5">
                          {Array.from({ length: hotel.stars }, (_, i) => (
                            <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      )}
                      <p className="mt-3 line-clamp-2 text-sm text-gray-400">{hotel.description}</p>
                      <p className="mt-3 text-sm text-gray-400">
                        {from !== null ? (
                          <>
                            {labels.from}{" "}
                            <span className="text-xl font-extrabold text-red-500">{from}€</span>{" "}
                            {labels.perNight}
                          </>
                        ) : (
                          labels.askPrice
                        )}
                      </p>

                      <div className="mt-auto grid grid-cols-2 gap-3 pt-5">
                        <Link
                          href={`/hotels/${hotel.slug}`}
                          className="rounded-full border border-white/30 py-3 text-center text-sm font-bold transition hover:bg-white hover:text-black"
                        >
                          {labels.details}
                        </Link>
                        <BookButton
                          slug={hotel.slug}
                          country={data.country}
                          className="rounded-full bg-red-600 py-3 text-sm font-bold text-white transition hover:bg-red-700"
                        >
                          {labels.book}
                        </BookButton>
                      </div>
                    </div>
                  </article>
                );
              })}
            </ScrollRow>

            <p className="mt-1 text-center text-xs text-gray-500 md:hidden">{labels.swipe} &rarr;</p>
            <div className="mt-6 text-center">
              <Link
                href="/hotels"
                className="inline-flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-400"
              >
                {labels.allHotels}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Activities */}
      {experiences.length > 0 && (
        <section className={hasHotels && areas.length > 0 ? section : sectionAlt}>
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <p className="text-sm font-bold uppercase text-red-500">{labels.activitiesEyebrow}</p>
              <h2 className={`mt-3 ${h2}`}>{labels.activitiesTitle}</h2>
            </div>
            <ScrollRow>
              {experiences.map((item) => (
                <div key={item.title} className={photoCard}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 25vw, 72vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="text-xl font-extrabold uppercase tracking-wide">{item.title}</h3>
                    <p className="mt-1 text-sm text-gray-300">{item.text}</p>
                  </div>
                </div>
              ))}
            </ScrollRow>
            <p className="mt-1 text-center text-xs text-gray-500 md:hidden">{labels.swipe} &rarr;</p>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className={section}>
        <div className="mx-auto max-w-3xl">
          <h2 className={`mb-8 text-center ${h2}`}>{labels.faqTitle}</h2>
          <div className="space-y-3">
            {data.faq.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-white/10 bg-neutral-900 px-5 py-4"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <ChevronDown size={18} className="shrink-0 transition group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-gray-400">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final call to action */}
      <section className="relative overflow-hidden px-5 pb-24 pt-8 text-center sm:pb-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-[28rem] -translate-x-1/2 rounded-full bg-red-600/15 blur-3xl" />
        <div className="relative mx-auto max-w-xl">
          <h2 className={h2}>
            {labels.ctaTitle} {data.title}?
          </h2>
          <p className="mt-4 text-gray-400">{labels.ctaText}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={wa(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-red-600 px-9 py-3.5 font-bold transition hover:bg-red-700"
            >
              <MessageCircle size={18} />
              {labels.whatsapp}
            </a>
            <Link
              href="/book"
              className="rounded-full border border-white/30 px-9 py-3.5 text-center font-bold transition hover:bg-white hover:text-black"
            >
              {labels.askOffer}
            </Link>
          </div>
        </div>
      </section>

      {hasHotels && <BookingModal />}
    </main>
  );
}