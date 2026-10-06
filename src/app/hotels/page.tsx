import type { Metadata } from "next";
import { allHotels } from "@/data/all-hotels";
import { fromPrice } from "@/lib/booking";
import { declaredBoards, hotelPhotos } from "@/lib/hotel-info";
import BookButton from "@/components/booking/BookButton";
import BookingModal from "@/components/booking/BookingModal";
import HotelsBrowser, { type HotelCard } from "@/components/booking/HotelsBrowser";

export const metadata: Metadata = {
  title: "Hotele | Kushtrimi NM Worldwide",
  description:
    "Hotele në Shqipëri, Turqi dhe Egjipt. Zgjidh hotelin, datat dhe numrin e personave, dhe pyet për vende të lira.",
};

// All the words on this page. Change them here.
const labels = {
  eyebrow: "Hotele",
  heading: "Zgjidh hotelin tënd",
  intro:
    "Shfleto hotelet sipas vendit, zgjidh datat dhe numrin e personave, dhe pyet për vende të lira. Çmimet dhe disponueshmërinë i konfirmojmë ne.",
  bookStay: "Rezervo një qëndrim",
};

export default function HotelsPage() {
  const cards: HotelCard[] = allHotels.map((hotel) => ({
    slug: hotel.slug,
    name: hotel.name,
    region: hotel.region,
    country: hotel.country,
    location: hotel.location,
    category: hotel.category,
    stars: hotel.stars ?? 0,
    image: hotelPhotos(hotel.slug, hotel.image, hotel.gallery)[0] ?? "",
    from: fromPrice(hotel.slug),
    boards: declaredBoards(hotel.slug),
  }));

  return (
    <main className="bg-black text-white">
      <section className="relative overflow-hidden px-5 pb-8 pt-36 text-center sm:pt-44">
        <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-[30rem] -translate-x-1/2 rounded-full bg-red-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase text-red-500">{labels.eyebrow}</p>
          <h1 className="mt-3 text-2xl font-bold uppercase tracking-wide sm:text-4xl">
            {labels.heading}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-gray-300">{labels.intro}</p>

          <BookButton className="mt-7 rounded-full bg-red-600 px-9 py-3.5 font-bold text-white transition hover:bg-red-700">
            {labels.bookStay}
          </BookButton>
        </div>
      </section>

      <HotelsBrowser cards={cards} />
      <BookingModal />
    </main>
  );
}