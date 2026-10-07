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

// All the words on this page. Change them here.
const labels = {
  back: "Të gjitha hotelet",
  about: "Rreth hotelit",
  facilities: "Çfarë ofron",
  services: "Shërbimet e mundshme",
  photoSoon: "Fotot vijnë së shpejti",
  from: "nga",
  perNight: "për person / natë",
  askPrice: "Çmimi: pyet për ofertë",
  book: "Rezervo / kontrollo disponueshmërinë",
  whatsapp: "Na shkruaj në WhatsApp",
  note: "Çmimet dhe vendet e lira i konfirmojmë ne.",
};

export default async function HotelPage({ params }: Props) {
  const { slug } = await params;
  const hotel = allHotels.find((item) => item.slug === slug);
  if (!hotel) notFound();

  const photos = hotelPhotos(hotel.slug, hotel.image, hotel.gallery);
  const boards = declaredBoards(hotel.slug);
  const from = fromPrice(hotel.slug);
  const message = `Përshëndetje! Dua të pyes për ${hotel.name} (${hotel.destination}).`;

  return (
    <main className="bg-black text-white">
      <section className="px-5 pb-10 pt-32 sm:pt-36">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/hotels"
            className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            {labels.back}
          </Link>

          <p className="mt-6 text-sm font-bold uppercase text-red-500">
            {hotel.category} · {hotel.region}
          </p>
          <h1 className="mt-2 text-2xl font-extrabold uppercase leading-tight tracking-wide sm:text-4xl">
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
              <MapPin size={15} className="text-red-500" />
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
            <div className="mt-6 flex aspect-[16/9] items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-800 to-neutral-950 text-gray-500 sm:aspect-[21/9]">
              {labels.photoSoon}
            </div>
          )}
        </div>
      </section>

      <section className="px-5 pb-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_22rem]">
          <div className="space-y-10">
            <div>
              <h2 className="text-xl font-bold uppercase tracking-wide">{labels.about}</h2>
              <p className="mt-3 leading-8 text-gray-300">{hotel.description}</p>
            </div>

            {hotel.facilities.length > 0 && (
              <div>
                <h2 className="text-xl font-bold uppercase tracking-wide">{labels.facilities}</h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {hotel.facilities.map((item) => (
                    <li key={item} className="flex gap-2 text-gray-300">
                      <Check size={16} className="mt-1 shrink-0 text-red-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {boards.length > 0 && (
              <div>
                <h2 className="text-xl font-bold uppercase tracking-wide">{labels.services}</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {boards.map((b) => (
                    <span key={b} className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-bold text-gray-200">
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
                    {labels.from}{" "}
                    <span className="text-3xl font-extrabold text-red-500">{from}€</span>{" "}
                    {labels.perNight}
                  </>
                ) : (
                  labels.askPrice
                )}
              </p>

              <BookButton
                slug={hotel.slug}
                className="mt-5 w-full rounded-full bg-red-600 py-3.5 font-bold text-white transition hover:bg-red-700"
              >
                {labels.book}
              </BookButton>

              <a
                href={`https://wa.me/38349833888?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-white/30 py-3.5 font-bold transition hover:bg-white hover:text-black"
              >
                <MessageCircle size={18} />
                {labels.whatsapp}
              </a>

              <p className="mt-4 text-xs text-gray-500">{labels.note}</p>
            </div>
          </aside>
        </div>
      </section>

      <BookingModal />
    </main>
  );
}