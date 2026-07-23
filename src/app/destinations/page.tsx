import Link from "next/link";

const destinations = [
  {
    name: "Antalya",
    hotels: "Lara, Side, Kemer, Belek & More",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200",
    link: "/destinations/antalya",
  },
  {
    name: "Greece",
    hotels: "Santorini, Mykonos, Halkidiki, Crete & More",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200",
    link: "/destinations/greece",
  },

  {
    name: "Egypt",
    hotels: "Hurghada, Cairo & More",
    image:
      "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=1200",
    link: "/destinations/egypt",
  },
];

export default function DestinationsPage() {
  return (
    <main className="min-h-screen bg-black py-32">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-neutral-700 px-6 py-3 text-white transition hover:border-red-500 hover:text-red-500"
          >
            ← Back to Home
          </Link>
        </div>

        <h1 className="text-center text-6xl font-bold text-white">
          Destinations
        </h1>

        <p className="mt-6 text-center text-lg text-gray-400">
          Explore our most popular destinations around the world.
        </p>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {destinations.map((destination) => (
            <Link
              key={destination.name}
              href={destination.link}
              className="group overflow-hidden rounded-3xl bg-neutral-900"
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="p-8">

                <h2 className="text-3xl font-bold text-white">
                  {destination.name}
                </h2>

                <p className="mt-3 text-gray-400">
                  {destination.hotels}
                </p>

                <div className="mt-8 inline-block rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition group-hover:bg-red-700">
                  Explore Destination
                </div>

              </div>

            </Link>
          ))}

        </div>

      </div>
    </main>
  );
}