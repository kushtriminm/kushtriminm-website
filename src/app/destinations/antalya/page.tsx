export default function AntalyaPage() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* Hero */}
      <section
        className="relative flex h-[70vh] items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative text-center">
          <h1 className="text-6xl font-black md:text-7xl">
            Antalya
          </h1>

          <p className="mt-6 text-xl text-gray-200">
            Turkey's Mediterranean Paradise
          </p>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-6xl px-6 py-24">

        <h2 className="text-4xl font-bold">
          Why Visit Antalya?
        </h2>
        

        <p className="mt-8 text-lg leading-9 text-gray-300">
          Antalya combines crystal-clear beaches, luxury resorts,
          historical landmarks, vibrant nightlife and world-class
          all-inclusive hotels. It is one of the most popular holiday
          destinations for families and couples.
        </p>

        

      </section>

    </main>
  );
}