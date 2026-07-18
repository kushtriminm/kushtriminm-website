"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-950 pt-24 text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-red-950" />

      {/* Decorative circles */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-red-600/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-red-500/10 blur-3xl" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
      >
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.4em] text-red-500">
          Kushtrimi NM Worldwide
        </p>

        <h1 className="text-5xl font-extrabold leading-tight md:text-7xl">
          Discover Your
          <span className="block bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
            Next Adventure
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-300">
          Luxury holidays, unforgettable adventures and exclusive travel
          packages to Antalya, Egypt, Greece, Dubai, Maldives, Italy and Spain.
        </p>

        <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row">
          <a
            href="#offers"
            className="rounded-full bg-red-600 px-8 py-4 font-semibold transition duration-300 hover:scale-105 hover:bg-red-700"
          >
            Explore Offers
          </a>

          <a
            href="https://wa.me/38349833888?text=Hello!%20I%20am%20interested%20in%20your%20travel%20offers."
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white px-8 py-4 font-semibold transition duration-300 hover:scale-105 hover:bg-white hover:text-black"
          >
            Chat on WhatsApp
          </a>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-8 text-gray-400">
          <span>🇹🇷 Antalya</span>
          <span>🇪🇬 Egypt</span>
          <span>🇬🇷 Greece</span>
          <span>🇦🇪 Dubai</span>
          <span>🏝 Maldives</span>
          <span>🇮🇹 Italy</span>
          <span>🇪🇸 Spain</span>
        </div>
      </motion.div>
    </section>
  );
}