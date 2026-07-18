const destinations = [
  {
    name: "Antalya",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    name: "Egypt",
    image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a",
  },
  {
    name: "Greece",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077",
  },
  {
    name: "Dubai",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
  },
  {
    name: "Maldives",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd",
  },
  {
    name: "Italy",
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9",
  },
  {
    name: "Spain",
    image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325",
  },
];

export default function FeaturedDestinations() {
  return (
    <section
      id="offers"
      className="bg-black py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="mb-14 text-center text-5xl font-bold text-white">
          Explore The World
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {destinations.map((destination) => (

            <div
              key={destination.name}
              className="group relative h-96 overflow-hidden rounded-3xl"
            >

              <img
                src={destination.image}
                alt={destination.name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              <div className="absolute bottom-0 p-8">

                <h3 className="text-4xl font-bold text-white">
                  {destination.name}
                </h3>

                <p className="mt-2 text-gray-300">
                  Luxury Holidays
                </p>

                <button className="mt-6 rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700">
                  View Offers
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}