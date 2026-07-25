import Link from "next/link";

const destinations = [
  {
    name: "Antalya",
    hotels: "Lara • Side • Belek • Kemer",
    image: "/images/destinations/antalya/hero.jpg",
    link: "/destinations/antalya",
    badge: "Best Seller",
  },
  {
    name: "Greece",
    hotels: "Santorini • Mykonos • Halkidiki • Crete",
    image: "/images/destinations/greece/hero.jpg",
    link: "/destinations/greece",
    badge: "Luxury",
  },
  {
    name: "Egypt",
    hotels: "Hurghada • Cairo • Sharm El Sheikh",
    image: "/images/destinations/egypt/hero.jpg",
    link: "/destinations/egypt",
    badge: "New",
  },
];

export default function DestinationsPage() {
  return (
    <main className="min-h-screen bg-black">

      {/* HERO */}

      <section
        className="relative flex h-[55vh] items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/images/destinations/banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 px-6 text-center">


          <h1 className="mt-5 text-5xl font-black text-white md:text-7xl">
            Explore Our Destinations
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            Luxury holidays, premium hotels and unforgettable experiences
            carefully selected for every traveler.
          </p>

        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-20">

        {/* BACK BUTTON */}

        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-neutral-700 px-6 py-3 text-white transition hover:border-red-500 hover:text-red-500"
          >
            ← Back to Home
          </Link>
        </div>

        {/* STATS */}

        <div className="mb-20 flex flex-wrap justify-center gap-12 text-center">

          <div>
            <p className="text-4xl font-black text-red-500">
              500+
            </p>

            <p className="mt-2 text-gray-400">
              Destinations
            </p>
          </div>

          <div>
            <p className="text-4xl font-black text-red-500">
              500+
            </p>

            <p className="mt-2 text-gray-400">
              Luxury Hotels
            </p>
          </div>

          <div>
            <p className="text-4xl font-black text-red-500">
              24/7
            </p>

            <p className="mt-2 text-gray-400">
              Customer Support
            </p>
          </div>

        </div>

        {/* DESTINATIONS */}

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">

          {destinations.map((destination) => (

            <Link
              key={destination.name}
              href={destination.link}
              className="group overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 transition-all duration-500 hover:-translate-y-4 hover:border-red-500 hover:shadow-2xl hover:shadow-red-600/20"
            >

              <div className="relative overflow-hidden">

                <img
                  src={destination.image}
                  alt={destination.name}
                  className="h-80 w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                <div className="absolute left-5 top-5 rounded-full bg-red-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
                  {destination.badge}
                </div>

              </div>

              <div className="p-8">

                <h2 className="text-3xl font-black text-white">
                  {destination.name}
                </h2>

                <p className="mt-4 leading-7 text-gray-400">
                  {destination.hotels}
                </p>

                <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-red-600 px-7 py-3 font-semibold text-white transition group-hover:bg-red-700">
                  Explore Destination
                  <span className="transition group-hover:translate-x-1">
                    →
                  </span>
                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </main>
  );
}