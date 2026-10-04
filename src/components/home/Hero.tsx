"use client";

import { motion, useReducedMotion } from "framer-motion";

// Swap this link to change the hero photo (e.g. a winter or summer photo).
const heroImage =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000";

export default function Hero() {
  const reduce = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.8,
      delay: reduce ? 0 : delay,
      ease: "easeOut" as const,
    },
  });

  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-black sm:min-h-screen">
      {/* Background: slow, subtle zoom */}
      <motion.img
        src={heroImage}
        alt="Quiet beach at sunset"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1 }}
        animate={{ scale: reduce ? 1 : 1.1 }}
        transition={{ duration: 24, ease: "linear" }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black" />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-5 pb-14 pt-28 text-center text-white sm:px-6">
        <motion.p
          {...fadeUp(0.1)}
          className="text-xs font-bold uppercase tracking-[0.15em] text-white/70"
        >
          Your Trusted Travel Partner
        </motion.p>

        <motion.h1
          {...fadeUp(0.25)}
          className="mt-5 text-4xl font-black uppercase leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          From Gjakov&euml;,
          <br />
          <span className="text-red-500">to the world.</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.4)}
          className="mx-auto mt-6 max-w-xl text-base text-gray-200 sm:text-lg"
        >
                    Stress-free travel planning.
                    Tell us where you want to go, and
          we&apos;ll handle the rest.
        </motion.p>

        <motion.div
          {...fadeUp(0.55)}
          className="mx-auto mt-9 flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4"
        >
          <a
            href="/offers"
            className="rounded-full bg-red-600 px-8 py-3.5 text-center text-base font-bold text-white transition hover:bg-red-700"
          >
            See our offers
          </a>

          <a
            href="https://wa.me/38349833888"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/50 px-8 py-3.5 text-center text-base font-bold text-white transition hover:bg-white hover:text-black"
          >
            Message us on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}