"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-black sm:min-h-screen">
      {/* Background */}
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000"
        alt="Luxury beach"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-5 pb-12 pt-28 text-center text-white sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center"
        >
          <h1 className="text-4xl font-black leading-[1.05] sm:text-6xl lg:text-7xl">
            Your Dream Holiday
            <br />
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
              Starts Here
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base text-gray-200 sm:mt-6 sm:text-lg">
            Luxury holidays &bull; Family escapes &bull; Worldwide experiences
          </p>

          <div className="mt-8 flex w-full max-w-xs flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4">
            <a
              href="/offers"
              className="rounded-full bg-red-600 px-8 py-3.5 text-center text-base font-bold text-white transition hover:bg-red-700"
            >
              Explore Offers &rarr;
            </a>

            <a
              href="https://wa.me/38349833888"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/60 px-8 py-3.5 text-center text-base font-bold text-white transition hover:bg-white hover:text-black"
            >
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}