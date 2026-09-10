import Link from "next/link";
import { hotels } from "@/data/hotels";

type HotelPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function HotelPage({
  params,
}: HotelPageProps) {
  const { slug } = await params;

  const hotel = hotels.find(
    (item) => item.slug === slug
  );

  if (!hotel) {
    return (
      <main className="min-h-screen bg-black px-5 py-32 text-white sm:px-6">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-500">
            Kushtrimi NM Worldwide
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            Hotel Not Found
          </h1>

          <p className="mt-5 text-gray-400">
            We could not find the hotel you are looking for.
          </p>

          <Link
            href="/hotels"
            className="mt-8 inline-flex rounded-full bg-red-600 px-7 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            ← Back to Hotels
          </Link>

        </div>

      </main>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Hello, I am interested in ${hotel.name} in ${hotel.destination}. I would like to check availability and current prices.`
  );

  return (
    <main className="min-h-screen bg-black pb-24 pt-28 text-white">

      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        {/* BACK */}
        <div className="mb-8">

          <Link
            href="/hotels"
            className="
              inline-flex items-center rounded-full
              border border-neutral-700
              px-5 py-3 text-sm font-semibold
              text-white transition
              hover:border-red-500 hover:text-red-500
            "
          >
            ← Back to Hotels
          </Link>

        </div>

        {/* HERO */}
        <div className="relative overflow-hidden rounded-3xl bg-neutral-900">

          <div className="relative h-[280px] sm:h-[400px] lg:h-[520px]">

            {hotel.image ? (
              <img
                src={hotel.image}
                alt={hotel.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-950">

                <div className="text-center">

                  <p className="text-sm uppercase tracking-[0.25em] text-red-500">
                    {hotel.category}
                  </p>

                  <p className="mt-3 text-sm text-gray-500">
                    Hotel photo coming soon
                  </p>

                </div>

              </div>
            )}

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            {/* HOTEL NAME */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">

              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-red-500">
                {hotel.destination}
              </p>

              <h1 className="text-3xl font-bold sm:text-5xl lg:text-6xl">
                {hotel.name}
              </h1>

              {hotel.stars && (
                <div className="mt-3 text-lg tracking-wider text-yellow-400">
                  {"★".repeat(hotel.stars)}
                </div>
              )}

            </div>

          </div>

        </div>

        {/* MAIN */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_350px]">

          {/* LEFT */}
          <div className="space-y-8">

            {/* ABOUT */}
            <section className="rounded-3xl bg-neutral-900 p-6 sm:p-8">

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">
                Discover
              </p>

              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                About the Hotel
              </h2>

              <p className="mt-5 max-w-4xl leading-8 text-gray-400">
                {hotel.description}
              </p>

            </section>

            {/* FACILITIES */}
            {hotel.facilities.length > 0 && (
              <section className="rounded-3xl bg-neutral-900 p-6 sm:p-8">

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">
                  Facilities
                </p>

                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                  Hotel Facilities
                </h2>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">

                  {hotel.facilities.map(
                    (facility, index) => (
                      <div
                        key={`${facility}-${index}`}
                        className="
                          rounded-2xl
                          border border-neutral-800
                          bg-black/40
                          p-4 text-gray-300
                        "
                      >
                        <span className="mr-2 text-red-500">
                          ✓
                        </span>

                        {facility}
                      </div>
                    )
                  )}

                </div>

              </section>
            )}

            {/* GALLERY */}
            <section className="rounded-3xl bg-neutral-900 p-6 sm:p-8">

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">
                Discover
              </p>

              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                Hotel Gallery
              </h2>

              {hotel.gallery.length > 0 ? (
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">

                  {hotel.gallery.map(
                    (image, index) => (
                      <div
                        key={`${image}-${index}`}
                        className="
                          group overflow-hidden
                          rounded-2xl bg-neutral-800
                        "
                      >

                        <img
                          src={image}
                          alt={`${hotel.name} photo ${index + 1}`}
                          className="
                            h-40 w-full object-cover
                            transition duration-500
                            group-hover:scale-110
                            sm:h-52
                          "
                        />

                      </div>
                    )
                  )}

                </div>
              ) : (
                <div
                  className="
                    mt-6 flex min-h-[220px]
                    items-center justify-center
                    rounded-2xl
                    border border-dashed border-neutral-700
                    bg-black/30
                  "
                >

                  <div className="text-center">

                    <p className="text-lg font-semibold text-gray-300">
                      Photos coming soon
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                      We are preparing the gallery for this hotel.
                    </p>

                  </div>

                </div>
              )}

            </section>

          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="lg:sticky lg:top-28 lg:self-start">

            <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-6 sm:p-8">

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">
                Hotel Information
              </p>

              {/* PRICE */}
              <div className="mt-6 rounded-2xl bg-black p-5">

                <p className="text-sm text-gray-500">
                  Starting from
                </p>

                {hotel.price ? (
                  <>
                    <p className="mt-1 text-4xl font-bold text-white">
                      €{hotel.price}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      / person / night
                    </p>

                    {hotel.pricePeriod && (
                      <p className="mt-3 text-xs text-gray-600">
                        {hotel.pricePeriod}
                      </p>
                    )}

                    {hotel.priceNote && (
                      <p className="mt-2 text-xs leading-5 text-gray-500">
                        {hotel.priceNote}
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <p className="mt-1 text-2xl font-bold text-white">
                      Contact us
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      for current prices and availability
                    </p>
                  </>
                )}

              </div>

              {/* DESTINATION */}
              <div className="mt-5 border-t border-neutral-800 pt-5">

                <p className="text-sm text-gray-500">
                  Destination
                </p>

                <p className="mt-1 font-semibold text-white">
                  {hotel.destination}
                </p>

              </div>

              {/* LOCATION */}
              <div className="mt-5 border-t border-neutral-800 pt-5">

                <p className="text-sm text-gray-500">
                  Location
                </p>

                <p className="mt-1 font-semibold text-white">
                  {hotel.location}
                </p>

              </div>

              {/* CATEGORY */}
              <div className="mt-5 border-t border-neutral-800 pt-5">

                <p className="text-sm text-gray-500">
                  Category
                </p>

                <p className="mt-1 font-semibold text-white">
                  {hotel.category}
                </p>

              </div>

              {/* WHATSAPP */}
              <a
                href={`https://wa.me/38349833888?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-6 flex w-full items-center
                  justify-center rounded-full
                  bg-red-600 px-6 py-4
                  font-bold text-white
                  transition hover:bg-red-700
                "
              >
                Check Availability
              </a>

              <p className="mt-4 text-center text-xs leading-5 text-gray-500">
                Contact us on WhatsApp for availability,
                booking and the latest prices.
              </p>

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
}