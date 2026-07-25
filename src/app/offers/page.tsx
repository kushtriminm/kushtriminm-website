import Link from "next/link";

export default function OffersPage() {
const offers = [
  {
    destination: "Antalya",
    hotel: "5★ All Inclusive Luxury Resort",
    price: "From €599",
    image:
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1200",
    details: "6 nights • Beach Resort • All Inclusive",
  },

  {
  destination: "Halkidiki",
  hotel: "Luxury Beach Hotel",
  price: "From €349",
  image:
    "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?q=80&w=1200",
  details: "Family holidays • Crystal beaches • Greece",
},

  {
    destination: "Dubai",
    hotel: "Luxury City Hotel",
    price: "From €899",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1200",
    details: "Luxury experience • Night skyline • Premium hotels",
  },

  {
    destination: "Egypt",
    hotel: "Red Sea Resort",
    price: "From €699",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200",
    details: "All Inclusive • Coral reefs • Snorkeling experience",
  },
];

  return (
    <main className="min-h-screen bg-black py-24">

      <div className="mx-auto max-w-7xl px-6">


        {/* Back Button */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-neutral-700 px-6 py-3 text-white transition hover:border-red-500 hover:text-red-500"
          >
            ← Back to Home
          </Link>
        </div>


        {/* Hero */}
        <section className="mb-20 text-center">

          <p className="mb-4 text-sm uppercase tracking-[5px] text-red-500">
            Exclusive Packages
          </p>

          <h1 className="text-5xl font-bold text-white md:text-6xl">
            Travel Offers
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            Discover handpicked holidays, luxury resorts and unforgettable
            experiences around the world with Kushtrimi NM Worldwide.
          </p>

        </section>



        {/* Offers Grid */}
        <div className="grid gap-10 md:grid-cols-2">


          {offers.map((offer) => (

            <div
              key={offer.destination}
              className="group overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 transition duration-500 hover:-translate-y-2 hover:border-red-600"
            >


              {/* Image */}

              <div className="overflow-hidden">

                <img
                  src={offer.image}
                  alt={offer.destination}
                  className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
                />

              </div>



              {/* Content */}

              <div className="p-8">


                <h2 className="text-3xl font-bold text-white">
                  {offer.destination}
                </h2>


                <p className="mt-3 text-xl text-gray-300">
                  {offer.hotel}
                </p>


                <p className="mt-4 text-gray-400">
                  {offer.details}
                </p>



                <div className="mt-8 flex items-center justify-between">

                  <p className="text-3xl font-bold text-red-500">
                    {offer.price}
                  </p>

                </div>



                <a
                  href="https://wa.me/38349833888"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 block rounded-full bg-red-600 py-4 text-center font-semibold text-white transition hover:bg-red-700"
                >
                  Request Offer on WhatsApp
                </a>


              </div>


            </div>

          ))}


        </div>



        {/* Bottom CTA */}

        <section className="mt-24 rounded-3xl border border-neutral-800 bg-neutral-900 p-10 text-center">

          <h2 className="text-3xl font-bold text-white">
            Need a personalized holiday?
          </h2>


          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Our travel specialists will create the perfect package based on
            your dates, budget and preferences.
          </p>


          <a
            href="https://wa.me/38349833888"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full bg-red-600 px-10 py-4 font-semibold text-white transition hover:bg-red-700"
          >
            Contact Our Travel Experts
          </a>


        </section>


      </div>

    </main>
  );
}