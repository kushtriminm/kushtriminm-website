const offers = [
  {
    destination: "Antalya",
    hotel: "5★ All Inclusive Resort",
    price: "from €599",
    image: "/images/offers/antalya.jpg",
    badge: "LAST MINUTE",
  },
  {
    destination: "Egypt",
    hotel: "5★ Beach Resort",
    price: "from €699",
    image: "/images/offers/egypt.jpg",
    badge: "BEST DEAL",
  },
  {
    destination: "Dubai",
    hotel: "Luxury City Hotel",
    price: "from €899",
    image: "/images/offers/dubai.jpg",
    badge: "POPULAR",
  },
];

export default function FeaturedOffers() {
  return (
    <section className="bg-neutral-950 py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <p className="font-semibold uppercase tracking-[0.35em] text-red-500">
            Luxury Holidays
          </p>

          <h2 className="mt-4 text-5xl font-black text-white">
            Featured Offers
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
            Handpicked luxury escapes with exceptional value and unforgettable experiences.
          </p>

        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {offers.map((offer) => (

            <div
              key={offer.destination}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl transition-all duration-500 hover:-translate-y-3 hover:border-red-500/40 hover:shadow-[0_25px_80px_rgba(220,38,38,0.25)]"
            >

              {/* IMAGE */}

              <div className="relative overflow-hidden">

                <img
                  src={offer.image}
                  alt={offer.destination}
                  className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                {/* BADGE */}

                <div className="absolute left-5 top-5 rounded-full bg-red-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                  {offer.badge}
                </div>

              </div>

              {/* CONTENT */}

              <div className="p-8">

                <h3 className="text-3xl font-bold text-white">
                  {offer.destination}
                </h3>

                <p className="mt-3 flex items-center gap-2 text-gray-400">
                  {offer.hotel}
                </p>

                <div className="mt-8">

                  <span className="text-sm uppercase tracking-widest text-gray-500">
                    Starting From
                  </span>

                  <p className="mt-2 text-4xl font-black text-red-500">
                    {offer.price}
                  </p>

                </div>

                <div className="mt-10 flex gap-4">

                  <a
                    href={`https://wa.me/38349833888?text=Hello! I'm interested in the ${offer.destination} holiday offer.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-red-600 py-3 font-semibold text-white transition duration-300 hover:bg-red-700"
                  >
                    View Offer
                    <span className="transition group-hover:translate-x-1">
                      →
                    </span>
                  </a>

                  <a
                    href={`https://wa.me/38349833888?text=Hello! I want to book ${offer.destination} holiday.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/20 px-6 py-3 text-white transition duration-300 hover:border-red-500 hover:bg-white hover:text-black"
                  >
                    Book
                  </a>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}