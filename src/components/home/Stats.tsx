import { Users, Plane, Globe2, Star } from "lucide-react";

const stats = [
  {
    icon: <Users size={42} />,
    number: "5,000+",
    title: "Happy Travelers",
  },
  {
    icon: <Plane size={42} />,
    number: "700+",
    title: "Travel Packages",
  },
  {
    icon: <Globe2 size={42} />,
    number: "30+",
    title: "Countries",
  },
  {
    icon: <Star size={42} />,
    number: "5.0",
    title: "Customer Rating",
  },
];

export default function Stats() {
  return (
    <section className="bg-neutral-950 py-24 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-4">

        {stats.map((stat) => (
          <div
            key={stat.title}
            className="text-center"
          >
            <div className="mb-4 flex justify-center text-red-500">
              {stat.icon}
            </div>

            <h2 className="text-5xl font-bold">
              {stat.number}
            </h2>

            <p className="mt-3 text-gray-400">
              {stat.title}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}