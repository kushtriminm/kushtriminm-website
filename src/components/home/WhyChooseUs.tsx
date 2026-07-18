import { Plane, ShieldCheck, Headphones, Globe } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Plane size={40} />,
      title: "Worldwide Destinations",
      description: "Travel to the world's most beautiful destinations.",
    },
    {
      icon: <ShieldCheck size={40} />,
      title: "Trusted Agency",
      description: "Professional service with hundreds of satisfied travelers.",
    },
    {
      icon: <Headphones size={40} />,
      title: "24/7 Support",
      description: "We are always available before and during your trip.",
    },
    {
      icon: <Globe size={40} />,
      title: "Best Prices",
      description: "Amazing packages at competitive prices.",
    },
  ];

  return (
    <section className="bg-black py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-14 text-center text-4xl font-bold">
          Why Travel With Us?
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8 text-center transition hover:border-red-600 hover:scale-105"
            >
              <div className="mb-5 flex justify-center text-red-600">
                {feature.icon}
              </div>

              <h3 className="mb-3 text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}