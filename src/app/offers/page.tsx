import Link from "next/link";
export default function OffersPage() {
  const offers = [
    {
      destination: "Antalya",
      hotel: "5★ All Inclusive Resort",
      price: "From €599",
    },
    {
      destination: "Halkidiki",
      hotel: "Beach Hotel",
      price: "From €349",
    },
    {
      destination: "Dubai",
      hotel: "Luxury City Hotel",
      price: "From €899",
    },
    {
      destination: "Egypt",
      hotel: "Red Sea Resort",
      price: "From €699",
    },
  ];

  return (
    <main className="min-h-screen bg-black py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8">
  <Link
    href="/"
    className="inline-flex items-center rounded-full border border-neutral-700 px-5 py-2 text-white transition hover:border-red-500 hover:text-red-500"
  >
    ← Back to Home
  </Link>
</div>

        <h1 className="mb-4 text-center text-6xl font-bold text-white">
          Travel Offers
        </h1>

        <p className="mb-16 text-center text-gray-400">
          Discover our latest travel packages.
        </p>

        <div className="grid gap-8 md:grid-cols-2">

          {offers.map((offer) => (
            <div
              key={offer.destination}
              className="rounded-3xl border border-neutral-800 bg-neutral-900 p-8"
            >
              <h2 className="text-3xl font-bold text-white">
                {offer.destination}
              </h2>

              <p className="mt-3 text-gray-400">
                {offer.hotel}
              </p>

              <p className="mt-6 text-2xl font-bold text-red-500">
                {offer.price}
              </p>

              <a
                href="https://wa.me/38349833888"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                Book on WhatsApp
              </a>
            </div>
          ))}

        </div>

      </div>
    </main>
  );
}