import Link from "next/link";
import { hotels } from "@/data/hotels";

export default function HotelsPage() {
  const regions = Array.from(
    new Set(hotels.map((hotel) => hotel.region))
  );

  return (
    <main className="min-h-screen bg-black pb-24 pt-32 text-white">

      {/* HEADER */}
      <section className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-500">
            Kushtrimi NM Worldwide
          </p>

          <h1 className="mt-4 text-4xl font-black sm:text-5xl md:text-6xl">
            Hotels in Albania
          </h1>

          <p className="mt-6 text-base leading-8 text-gray-400 sm:text-lg">
            Explore our selection of hotels across the Albanian coast.
            Choose your destination, view the hotel and contact us to check
            availability and current prices.
          </p>

        </div>
      </section>

      {/* DESTINATION FILTER */}
      <section className="mx-auto mt-12 max-w-7xl px-5 sm:px-6">

        <div
          className="
            flex gap-3 overflow-x-auto pb-3
            [scrollbar-width:none]
            [-ms-overflow-style:none]
            [&::-webkit-scrollbar]:hidden
          "
        >

          <Link
            href="/hotels"
            className="shrink-0 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold"
          >
            All Hotels
          </Link>

          {regions.map((region) => {
            const sectionId = region
              .toLowerCase()
              .replaceAll(" ", "-")
              .replaceAll("/", "-");

            return (
              <a
                key={region}
                href={`#${sectionId}`}
                className="shrink-0 rounded-full border border-neutral-700 px-6 py-3 text-sm font-semibold text-gray-300 transition hover:border-red-500 hover:text-white"
              >
                {region}
              </a>
            );
          })}

        </div>

      </section>

      {/* HOTEL COLLECTIONS */}
      <section className="mx-auto mt-14 max-w-7xl px-5 sm:px-6">

        {regions.map((region) => {

          const regionHotels = hotels.filter(
            (hotel) => hotel.region === region
          );

          const sectionId = region
            .toLowerCase()
            .replaceAll(" ", "-")
            .replaceAll("/", "-");

          return (
            <section
              key={region}
              id={sectionId}
              className="mb-20 scroll-mt-32"
            >

              {/* REGION TITLE */}
              <div className="mb-8">

                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-500">
                  Destination
                </p>

                <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                  {region}
                </h2>

              </div>

              {/* HOTELS */}
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

                {regionHotels.map((hotel) => (

                  <article
                    key={hotel.slug}
                    className="
                      group flex h-full flex-col overflow-hidden
                      rounded-3xl border border-neutral-800
                      bg-neutral-950
                      transition duration-300
                      hover:-translate-y-1
                      hover:border-red-900/60
                      hover:shadow-2xl
                      hover:shadow-red-950/20
                    "
                  >

                    {/* IMAGE */}
                    <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-950 sm:h-64">

                      {hotel.image ? (
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="text-center">

                          <p className="text-xs uppercase tracking-[0.25em] text-red-500">
                            {hotel.category}
                          </p>

                          <p className="mt-2 text-sm text-gray-600">
                            Photo coming soon
                          </p>

                        </div>
                      )}

                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-1 flex-col p-6 sm:p-7">

                      <p className="text-sm text-gray-500">
                        📍 {hotel.location}
                      </p>

                      <h3 className="mt-3 text-2xl font-bold">
                        {hotel.name}
                      </h3>

                      {hotel.stars && (
                        <div className="mt-2 text-sm tracking-wider text-yellow-400">
                          {"★".repeat(hotel.stars)}
                        </div>
                      )}

                      <p className="mt-3 line-clamp-3 text-sm leading-7 text-gray-400">
                        {hotel.description}
                      </p>

                      {/* PRICE */}
                      <div className="mt-6 rounded-2xl border border-neutral-800 bg-black/50 p-4">

                        {hotel.price ? (
                          <>
                            <p className="text-xs uppercase tracking-wider text-gray-500">
                              Starting from
                            </p>

                            <p className="mt-1 text-2xl font-bold text-white">
                              €{hotel.price}
                            </p>

                            <p className="text-xs text-gray-500">
                              / person / night
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-sm font-semibold text-white">
                              Contact us
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              for current prices & availability
                            </p>
                          </>
                        )}

                      </div>

                      {/* BUTTON */}
                      <div className="mt-auto pt-6">

                        <Link
                          href={`/hotels/${hotel.slug}`}
                          className="
                            flex w-full items-center justify-center
                            rounded-full bg-red-600 px-6 py-3.5
                            text-sm font-bold
                            transition hover:bg-red-700
                          "
                        >
                          View Hotel
                        </Link>

                      </div>

                    </div>

                  </article>

                ))}

              </div>

            </section>
          );
        })}

      </section>

    </main>
  );
}