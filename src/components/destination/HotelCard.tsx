type HotelCardProps = {
  name: string;
  stars: string;
  concept: string;
  price: string;
  image: string;
};

export default function HotelCard({
  name,
  stars,
  concept,
  price,
  image,
}: HotelCardProps) {
  return (
    <div className="overflow-hidden rounded-3xl bg-neutral-900 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/20">

      <img
        src={image}
        alt={name}
        className="h-64 w-full object-cover"
      />

      <div className="p-6">

        <h3 className="text-2xl font-bold text-white">
          {name}
        </h3>

        <p className="mt-2 text-yellow-400">
          {stars}
        </p>

        <p className="mt-4 text-gray-400">
          {concept}
        </p>

        <p className="mt-6 text-3xl font-bold text-red-500">
          {price}
        </p>

        <a
          href="https://wa.me/38349833888"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          Request Offer
        </a>

      </div>

    </div>
  );
}