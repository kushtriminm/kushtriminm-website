import Image from "next/image";

const destinations = [
  {
    name: "Antalya",
    country: "Turkey",
    price: "From €399",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    name: "Egypt",
    country: "Egypt",
    price: "From €499",
    image:
      "https://images.unsplash.com/photo-1572252009286-268acec5ca0a",
  },
  {
    name: "Greece",
    country: "Greece",
    price: "From €349",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077",
  },
  {
    name: "Dubai",
    country: "UAE",
    price: "From €699",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
  },
  {
    name: "Maldives",
    country: "Maldives",
    price: "From €1199",
    image:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd",
  },
  {
    name: "Italy",
    country: "Italy",
    price: "From €449",
    image:
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9",
  },
];

export default function DestinationCards() {
  return (
    <section id="offers" className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 uppercase tracking-[0.35em] text-red-500">
            OUR DESTINATIONS
          </p>

          <h2 className="text-5xl font-bold text-white">
            Explore The World
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <div
              key={destination.name}
              className="group overflow-hidden rounded-3xl bg-neutral-900"
            >
              <div className="relative h-72">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute bottom-6 left-6">
                  <h3 className="text-4xl font-bold text-white">
                    {destination.name}
                  </h3>

                  <p className="text-white/80">
                    {destination.country}
                  </p>
                </div>
              </div>

              <div className="p-8">
                <div className="mb-4 flex text-yellow-400">
                  ⭐⭐⭐⭐⭐
                </div>

                <p className="text-gray-400">
                  6 Nights • All Inclusive
                </p>

                <p className="mt-5 text-3xl font-bold text-red-500">
                  {destination.price}
                </p>

                <a
                  href={`https://wa.me/38349833888?text=Hello! I am interested in ${destination.name}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-block rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                >
                  View Offer
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}