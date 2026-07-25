"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24 text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-red-900/40" />

      {/* Decorative Blur */}
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-red-600/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-3xl" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 text-center"
      >

        <h1 className="text-6xl font-black leading-tight md:text-8xl">
          Discover Your
          <span className="block bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
            Next Adventure
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-gray-200">
  Your journey begins here.
</p>

        {/* Buttons */}
        <div className="mt-12 flex flex-col gap-5 sm:flex-row">
          <a
            href="#offers"
            className="rounded-full bg-red-600 px-10 py-4 font-semibold transition duration-300 hover:scale-105 hover:bg-red-700"
          >
            Explore Offers
          </a>

          <a
            href="https://wa.me/38349833888?text=Hello!%20I%20am%20interested%20in%20your%20travel%20offers."
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white px-10 py-4 font-semibold transition duration-300 hover:scale-105 hover:bg-white hover:text-black"
          >
            Chat on WhatsApp
          </a>
        </div>

      

        {/* Scroll Down */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-16 text-gray-300"
        >
          <p className="mb-3 text-sm uppercase tracking-[0.3em]">
            Scroll Down
          </p>

          <div className="mx-auto h-10 w-6 rounded-full border-2 border-white">
            <div className="mx-auto mt-2 h-2 w-2 rounded-full bg-white" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}