const offers = [
  {
    destination: "Antalya",
    hotel: "5★ All Inclusive Resort",
    price: "from €599",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop",
  },
  {
    destination: "Egypt",
    hotel: "5★ Beach Resort",
    price: "from €699",
    image:
      "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    destination: "Dubai",
    hotel: "Luxury City Hotel",
    price: "from €899",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function FeaturedOffers() {
  return (
    <section className="bg-neutral-950 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">
          <p className="text-red-500 font-semibold uppercase tracking-[0.3em]">
            Best Deals
          </p>

          <h2 className="mt-3 text-5xl font-bold text-white">
            Featured Offers
          </h2>

          <p className="mt-5 text-gray-400">
            Handpicked holidays with the best prices.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {offers.map((offer) => (

            <div
              key={offer.destination}
              className="overflow-hidden rounded-3xl bg-neutral-900 shadow-xl transition duration-300 hover:-translate-y-2"
            >

              <img
                src={offer.image}
                alt={offer.destination}
                className="h-72 w-full object-cover"
              />

              <div className="p-8">

                <h3 className="text-3xl font-bold text-white">
                  {offer.destination}
                </h3>

                <p className="mt-2 text-gray-400">
                  {offer.hotel}
                </p>

                <p className="mt-6 text-3xl font-bold text-red-500">
                  {offer.price}
                </p>

                <div className="mt-8 flex gap-4">

                 <a
  href="/offers"
  className="flex-1 rounded-full bg-red-600 py-3 text-center font-semibold text-white transition hover:bg-red-700"
>
  View Offer
</a>

                  <a
                    href="https://wa.me/38349833888"
                    target="_blank"
                    className="rounded-full border border-white px-6 py-3 text-white hover:bg-white hover:text-black"
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