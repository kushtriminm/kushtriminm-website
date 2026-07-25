export default function DestinationMap() {

  const destinations = [
    "Turkey",
    "Egypt",
    "Greece",
    "Dubai",
    "Maldives",
  ];

  return (
    <section className="bg-neutral-950 py-24">

      <div className="mx-auto max-w-6xl px-6 text-center">

        <h2 className="mb-12 text-5xl font-bold text-white">
          Where Do You Want To Go?
        </h2>

        <div className="flex flex-wrap justify-center gap-6">

          {destinations.map((destination) => (

            <a
              key={destination}
              href={`https://wa.me/38349833888?text=Hello! I'm interested in ${destination}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-red-500 px-8 py-4 text-white transition hover:bg-red-600"
            >
              📍 {destination}
            </a>

          ))}

        </div>

      </div>

    </section>
  );
}