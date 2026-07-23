const reviews = [
  {
    name: "Arben K.",
    country: "Kosovo",
    text: "Amazing service! Everything was perfectly organized.",
  },
  {
    name: "Sara M.",
    country: "Germany",
    text: "Best travel agency I've ever booked with.",
  },
  {
    name: "Leon R.",
    country: "Switzerland",
    text: "Fantastic holiday in Antalya. Highly recommended!",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-black py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="mb-14 text-center text-5xl font-bold">
          What Our Clients Say
        </h2>

        <div className="grid gap-8 md:grid-cols-3">

          {reviews.map((review) => (
            <div
              key={review.name}
              className="rounded-3xl border border-neutral-800 bg-neutral-900 p-8"
            >
              <p className="text-gray-300">
                "{review.text}"
              </p>

              <h3 className="mt-8 text-xl font-bold">
                {review.name}
              </h3>

              <p className="text-gray-500">
                {review.country}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}