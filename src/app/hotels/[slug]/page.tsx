import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, MapPin, MessageCircle, Star } from "lucide-react";
import { allHotels } from "@/data/all-hotels";
import { boardLabels } from "@/data/hotel-pricing";
import { fromPrice } from "@/lib/booking";
import { declaredBoards, hotelPhotos } from "@/lib/hotel-info";
import BookButton from "@/components/booking/BookButton";
import BookingModal from "@/components/booking/BookingModal";
import Tr from "@/components/Tr";
import WhatsAppLink from "@/components/WhatsAppLink";

type Props = { params: Promise<{ slug: string }> };

// Pages are built once, ahead of time (faster and better for Google).
export const dynamicParams = false;

export function generateStaticParams() {
  return allHotels.map((hotel) => ({ slug: hotel.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const hotel = allHotels.find((item) => item.slug === slug);
  if (!hotel) return {};
  return {
    title: `${hotel.name} | Kushtrimi NM Worldwide`,
    description: hotel.description,
  };
}

export default async function HotelPage({ params }: Props) {
  const { slug } = await params;
  const hotel = allHotels.find((item) => item.slug === slug);
  if (!hotel) notFound();

  const photos = hotelPhotos(hotel.slug, hotel.image, hotel.gallery);
  const boards = declaredBoards(hotel.slug);
  const from = fromPrice(hotel.slug);

  return (
    <main className="bg-black text-white">
      <section className="px-5 pb-10 pt-32 sm:pt-36">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/hotels"
            className="inline-flex min-h-[44px] items-center gap-2 text-sm text-gray-400 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            <Tr sq="Të gjitha hotelet" en="All hotels" />
          </Link>

          <p className="mt-4 text-sm font-bold uppercase text-red-500">
            {hotel.category} · {hotel.region}
          </p>
          <h1 className="mt-2 break-words text-2xl font-extrabold uppercase leading-tight tracking-wide sm:text-4xl">
            {hotel.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-400">
            {hotel.stars && (
              <span className="flex gap-0.5">
                {Array.from({ length: hotel.stars }, (_, i) => (
                  <Star key={i} size={15} className="fill-yellow-400 text-yellow-400" />
                ))}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <MapPin size={15} className="shrink-0 text-red-500" />
              {hotel.location}
            </span>
          </div>

          {/* Gallery: swipe on phones, grid on desktop */}
          {photos.length > 0 ? (
            <>
              <div className="-mx-5 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
                {photos.map((src, i) => (
                  <div
                    key={src}
                    className="relative aspect-[4/3] w-[88%] shrink-0 snap-center overflow-hidden rounded-2xl"
                  >
                    <Image
                      src={src}
                      alt={`${hotel.name} ${i + 1}`}
                      fill
                      sizes="88vw"
                      priority={i === 0}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 hidden gap-3 md:grid md:grid-cols-3">
                {photos.slice(0, 5).map((src, i) => (
                  <div
                    key={src}
                    className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${
                      i === 0 ? "col-span-2 row-span-2" : ""
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`${hotel.name} ${i + 1}`}
                      fill
                      sizes={i === 0 ? "66vw" : "33vw"}
                      priority={i === 0}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="mt-6 flex aspect-[16/9] items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-800 to-neutral-950 px-4 text-center text-gray-500 sm:aspect-[21/9]">
              <Tr sq="Fotot vijnë së shpejti" en="Photos coming soon" />
            </div>
          )}
        </div>
      </section>

      <section className="px-5 pb-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_22rem]">
          <div className="min-w-0 space-y-10">
            <div>
              <h2 className="text-xl font-bold uppercase tracking-wide">
                <Tr sq="Rreth hotelit" en="About the hotel" />
              </h2>
              <p className="mt-3 break-words leading-8 text-gray-300">{hotel.description}</p>
            </div>

            {hotel.facilities.length > 0 && (
              <div>
                <h2 className="text-xl font-bold uppercase tracking-wide">
                  <Tr sq="Çfarë ofron" en="What it offers" />
                </h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {hotel.facilities.map((item) => (
                    <li key={item} className="flex gap-2 text-gray-300">
                      <Check size={16} className="mt-1 shrink-0 text-red-500" />
                      <span className="min-w-0 break-words">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {boards.length > 0 && (
              <div>
                <h2 className="text-xl font-bold uppercase tracking-wide">
                  <Tr sq="Shërbimet e mundshme" en="Available services" />
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {boards.map((b) => (
                    <span
                      key={b}
                      className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-bold text-gray-200"
                    >
                      {boardLabels[b]}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-white/10 bg-neutral-900 p-6 shadow-[0_0_50px_rgba(220,38,38,0.1)]">
              <p className="text-sm text-gray-400">
                {from !== null ? (
                  <>
                    <Tr sq="nga" en="from" />{" "}
                    <span className="text-3xl font-extrabold text-red-500">{from}€</span>{" "}
                    <Tr sq="për person / natë" en="per person / night" />
                  </>
                ) : (
                  <Tr sq="Çmimi: pyet për ofertë" en="Price: ask for an offer" />
                )}
              </p>

              <BookButton
                slug={hotel.slug}
                className="mt-5 min-h-[48px] w-full rounded-full bg-red-600 px-4 py-3.5 font-bold text-white transition hover:bg-red-700"
              >
                <Tr sq="Rezervo / kontrollo disponueshmërinë" en="Book / check availability" />
              </BookButton>

              <WhatsAppLink
                sq={`Përshëndetje! Dua të pyes për ${hotel.name} (${hotel.destination}).`}
                en={`Hello! I would like to ask about ${hotel.name} (${hotel.destination}).`}
                className="mt-3 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-white/30 px-4 py-3.5 font-bold transition hover:bg-white hover:text-black"
              >
                <MessageCircle size={18} />
                <Tr sq="Na shkruaj në WhatsApp" en="Message us on WhatsApp" />
              </WhatsAppLink>

              <p className="mt-4 text-xs text-gray-500">
                <Tr
                  sq="Çmimet dhe vendet e lira i konfirmojmë ne."
                  en="We confirm prices and availability."
                />
              </p>
            </div>
          </aside>
        </div>
      </section>

      <BookingModal />
    </main>
  );
}