import Link from "next/link";
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10">
  <Link
    href="/"
    className="inline-flex items-center rounded-full border border-neutral-700 px-6 py-3 text-white transition hover:border-red-500 hover:text-red-500"
  >
    ← Back to Home
  </Link>
</div>

        <h1 className="text-center text-6xl font-bold text-white">
          About Us
        </h1>

        <p className="mx-auto mt-8 max-w-4xl text-center text-lg leading-9 text-gray-400">
          Kushtrimi NM Worldwide is a travel agency dedicated to creating
          unforgettable experiences around the world. From luxury beach resorts
          and family vacations to city escapes and exotic destinations, we help
          our clients travel with confidence and comfort.
        </p>

        <div className="mt-20 grid gap-10 md:grid-cols-3">

          <div className="rounded-3xl bg-neutral-900 p-8">
            <h2 className="text-2xl font-bold text-white">
              Our Mission
            </h2>

            <p className="mt-4 leading-8 text-gray-400">
              To provide exceptional travel experiences with honest service,
              competitive prices and unforgettable memories.
            </p>
          </div>

          <div className="rounded-3xl bg-neutral-900 p-8">
            <h2 className="text-2xl font-bold text-white">
              Our Vision
            </h2>

            <p className="mt-4 leading-8 text-gray-400">
              To become one of the most trusted travel agencies in the Balkans
              by offering premium holidays worldwide.
            </p>
          </div>

          <div className="rounded-3xl bg-neutral-900 p-8">
            <h2 className="text-2xl font-bold text-white">
              Why Choose Us
            </h2>

            <p className="mt-4 leading-8 text-gray-400">
              Personalized service, premium destinations, 24/7 assistance and
              carefully selected hotels.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}