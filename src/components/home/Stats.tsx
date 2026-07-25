// src/components/Stats.tsx

"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function Stats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  return (
    <section className="bg-neutral-950 py-24" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">

        <div className="grid gap-8 text-center md:grid-cols-4">

          <div>
            <h3 className="text-5xl font-black text-red-500">
              {inView && <CountUp end={10000} duration={3} />}+
            </h3>
            <p className="mt-3 text-gray-400">
              Happy Travelers
            </p>
          </div>

          <div>
            <h3 className="text-5xl font-black text-red-500">
              {inView && <CountUp end={2000} duration={3} />}+
            </h3>
            <p className="mt-3 text-gray-400">
              Destinations
            </p>
          </div>

          <div>
            <h3 className="text-5xl font-black text-red-500">
              {inView && <CountUp end={1000} duration={3} />}+
            </h3>
            <p className="mt-3 text-gray-400">
              Partner Hotels
            </p>
          </div>

          <div>
            <h3 className="text-5xl font-black text-red-500">
              24/7
            </h3>
            <p className="mt-3 text-gray-400">
              Support
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}