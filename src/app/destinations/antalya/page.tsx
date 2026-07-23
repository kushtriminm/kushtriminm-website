export default function AntalyaPage() {
  return (
    <main className="bg-black text-white">

     {/* HERO */}

<section className="relative flex h-screen items-center justify-center overflow-hidden">

  <img
    src="/images/destinations/antalya/hero.jpg"
    alt="Antalya"
    className="absolute inset-0 h-full w-full object-cover"
  />

  <div className="absolute inset-0 bg-black/60" />

  <div className="relative z-10 max-w-4xl px-6 text-center">

    <p className="mb-4 uppercase tracking-[0.4em] text-red-500">
      Kushtrimi NM Worldwide
    </p>

    <h1 className="text-6xl font-black md:text-8xl">
      Antalya
    </h1>

    <p className="mx-auto mt-8 max-w-2xl text-xl leading-9 text-gray-200">
      Luxury resorts, turquoise waters and unforgettable holidays
      on Turkey's Mediterranean coast.
    </p>

    <a
      href="https://wa.me/38349833888"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-12 inline-block rounded-full bg-red-600 px-10 py-4 font-semibold transition hover:scale-105 hover:bg-red-700"
    >
      Request Your Offer
    </a>

  </div>

</section>

      {/* ABOUT */}
<section className="mx-auto max-w-7xl px-6 py-28">

  <div className="grid items-center gap-16 lg:grid-cols-2">

    {/* IMAGE */}
    <div>
      <img
        src="/images/destinations/antalya/about.jpg"
        alt="Antalya"
        className="h-[520px] w-full rounded-[32px] border-4 border-red-500 object-cover shadow-2xl"
      />
    </div>

    {/* TEXT */}
    <div>

      <p className="uppercase tracking-[0.3em] text-red-500">
        Discover Antalya
      </p>

      <h2 className="mt-4 text-5xl font-black">
        Why Visit Antalya?
      </h2>

      <p className="mt-8 text-lg leading-9 text-gray-300">
        Antalya is one of Europe's favorite holiday destinations,
        famous for luxury all-inclusive resorts, beautiful beaches,
        ancient history and vibrant nightlife.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4">

        <div className="rounded-2xl bg-neutral-900 p-5">
          🏖 Private Beaches
        </div>

        <div className="rounded-2xl bg-neutral-900 p-5">
          🏨 Luxury Hotels
        </div>

        <div className="rounded-2xl bg-neutral-900 p-5">
          🍽 All Inclusive
        </div>

        <div className="rounded-2xl bg-neutral-900 p-5">
          ☀️ 300+ Sunny Days
        </div>

      </div>

    </div>

  </div>

</section>

      {/* HOTELS */}

      <section className="mx-auto max-w-7xl px-6 py-28">

        <div className="mb-16 text-center">

          <p className="uppercase tracking-[0.3em] text-red-500">
            Luxury Collection
          </p>

          <h2 className="mt-4 text-5xl font-black">
            Top Hotels
          </h2>

        </div>

        <div className="grid gap-10 lg:grid-cols-3">

          {/* HOTEL 1 */}

          <div className="overflow-hidden rounded-3xl bg-neutral-900 transition duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-red-600/20">

            <img
              src="/images/destinations/antalya/rixos.jpg"
              alt="Rixos Premium Belek"
              className="h-72 w-full object-cover transition duration-500 hover:scale-110"
            />

            <div className="p-8">

              <p className="text-lg text-yellow-400">
                ★★★★★
              </p>

              <h3 className="mt-3 text-3xl font-bold">
                Rixos Premium Belek
              </h3>

              <p className="mt-2 text-gray-400">
                📍 Belek, Antalya
              </p>

              <p className="mt-5 leading-8 text-gray-300">
                Luxury beachfront resort with world-class restaurants,
                private beach, spa and one of Turkey's best all-inclusive experiences.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">

                <span className="rounded-full bg-black px-3 py-2 text-sm">
                  Spa
                </span>

                <span className="rounded-full bg-black px-3 py-2 text-sm">
                  Beach
                </span>

                <span className="rounded-full bg-black px-3 py-2 text-sm">
                  Kids Club
                </span>

                <span className="rounded-full bg-black px-3 py-2 text-sm">
                  Water Park
                </span>

              </div>

              <a
                href="https://wa.me/38349833888"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded-full bg-red-600 px-8 py-3 font-semibold transition hover:bg-red-700"
              >
                View Offer
              </a>

            </div>

          </div>
                    {/* HOTEL 2 */}

          <div className="overflow-hidden rounded-3xl bg-neutral-900 transition duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-red-600/20">

             <img
              src="/images/destinations/antalya/maxxroyal.jpg"
              alt="Maxx Royal Belek"
              className="h-72 w-full object-cover transition duration-500 hover:scale-110"
            />

            <div className="p-8">

              <p className="text-lg text-yellow-400">
                ★★★★★
              </p>

              <h3 className="mt-3 text-3xl font-bold">
                Maxx Royal Belek
              </h3>

              <p className="mt-2 text-gray-400">
                📍 Belek, Antalya
              </p>

              <p className="mt-5 leading-8 text-gray-300">
                Luxury all-inclusive resort featuring private villas,
                golf courses, gourmet dining and exceptional family facilities.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">

                <span className="rounded-full bg-black px-3 py-2 text-sm">
                  Golf
                </span>

                <span className="rounded-full bg-black px-3 py-2 text-sm">
                  Private Beach
                </span>

                <span className="rounded-full bg-black px-3 py-2 text-sm">
                  Spa
                </span>

                <span className="rounded-full bg-black px-3 py-2 text-sm">
                  Aqua Park
                </span>

              </div>

              <a
                href="https://wa.me/38349833888"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded-full bg-red-600 px-8 py-3 font-semibold transition hover:bg-red-700"
              >
                View Offer
              </a>

            </div>

          </div>

          {/* HOTEL 3 */}

          <div className="overflow-hidden rounded-3xl bg-neutral-900 transition duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-red-600/20">

             <img
              src="/images/destinations/antalya/regnum.jpg"
              alt="Regnum Carya"
              className="h-72 w-full object-cover transition duration-500 hover:scale-110"
            />

            <div className="p-8">

              <p className="text-lg text-yellow-400">
                ★★★★★
              </p>

              <h3 className="mt-3 text-3xl font-bold">
                Regnum Carya
              </h3>

              <p className="mt-2 text-gray-400">
                📍 Belek, Antalya
              </p>

              <p className="mt-5 leading-8 text-gray-300">
                Elegant beachfront resort featuring championship golf courses,
                luxurious suites, gourmet dining and outstanding ultra all-inclusive service.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">

                <span className="rounded-full bg-black px-3 py-2 text-sm">
                  Golf
                </span>

                <span className="rounded-full bg-black px-3 py-2 text-sm">
                  Luxury Spa
                </span>

                <span className="rounded-full bg-black px-3 py-2 text-sm">
                  Private Beach
                </span>

                <span className="rounded-full bg-black px-3 py-2 text-sm">
                  Family Resort
                </span>

              </div>

              <a
                href="https://wa.me/38349833888"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded-full bg-red-600 px-8 py-3 font-semibold transition hover:bg-red-700"
              >
                View Offer
              </a>

            </div>

          </div>

        </div>

      </section>

      {/* INCLUDED */}

      <section className="bg-neutral-950 py-28">

        <div className="mx-auto max-w-7xl px-6">

          <h2 className="mb-16 text-center text-5xl font-black">
            What's Included
          </h2>

          <div className="grid gap-6 md:grid-cols-3">

            <div className="rounded-3xl bg-black p-8">
              ✈️ Flights Included
            </div>

            <div className="rounded-3xl bg-black p-8">
              🏨 Hotel Accommodation
            </div>

            <div className="rounded-3xl bg-black p-8">
              🚐 Airport Transfers
            </div>

            <div className="rounded-3xl bg-black p-8">
              🍽 Meals According To Package
            </div>

            <div className="rounded-3xl bg-black p-8">
              🛡 24/7 Assistance
            </div>

            <div className="rounded-3xl bg-black p-8">
              📞 Customer Support
            </div>

          </div>

        </div>

      </section>
            {/* REVIEWS */}

      <section className="bg-neutral-950 py-28">

        <div className="mx-auto max-w-6xl px-6">

          <h2 className="mb-16 text-center text-5xl font-black">
            Traveler Reviews
          </h2>

          <div className="grid gap-8 md:grid-cols-3">

            <div className="rounded-3xl bg-black p-8 border border-neutral-800">

              <p className="text-2xl text-yellow-400">
                ★★★★★
              </p>

              <p className="mt-5 leading-8 text-gray-300">
                Everything was perfectly organized. The hotel exceeded our expectations and the support from Kushtrimi NM Worldwide was excellent.
              </p>

              <p className="mt-6 font-bold text-white">
                — Sarah M.
              </p>

            </div>

            <div className="rounded-3xl bg-black p-8 border border-neutral-800">

              <p className="text-2xl text-yellow-400">
                ★★★★★
              </p>

              <p className="mt-5 leading-8 text-gray-300">
                One of the best vacations we've ever had. Great hotel, smooth transfers and amazing service from start to finish.
              </p>

              <p className="mt-6 font-bold text-white">
                — David R.
              </p>

            </div>

            <div className="rounded-3xl bg-black p-8 border border-neutral-800">

              <p className="text-2xl text-yellow-400">
                ★★★★★
              </p>

              <p className="mt-5 leading-8 text-gray-300">
                We will definitely book again. Professional communication and everything was exactly as promised.
              </p>

              <p className="mt-6 font-bold text-white">
                — Emily K.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* FINAL CTA */}

      <section
        className="relative py-40 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/destinations/antalya/footer.jpg')",
        }}
      >

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">

          <h2 className="text-5xl font-black md:text-6xl">
            Ready For Antalya?
          </h2>

          <p className="mt-8 text-xl leading-9 text-gray-300">
            Let us create your perfect holiday. Contact our travel experts today
            and receive a personalized offer tailored just for you.
          </p>

          <a
            href="https://wa.me/38349833888?text=Hello! I'm interested in Antalya."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block rounded-full bg-red-600 px-10 py-4 font-semibold transition hover:scale-105 hover:bg-red-700"
          >
            Request Your Offer
          </a>

        </div>

      </section>

    </main>
  );
}