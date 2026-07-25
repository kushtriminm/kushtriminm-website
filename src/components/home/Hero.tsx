"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">

      {/* Background */}
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000"
        alt="Luxury beach"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black" />


      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-32 text-center text-white">


        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="flex max-w-6xl flex-col items-center"
        >


          <h1 className="text-5xl font-black leading-[0.95] md:text-7xl lg:text-8xl">

            Your Dream Holiday

            <br />

            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
              Starts Here
            </span>

          </h1>



          <p className="mt-8 max-w-3xl text-lg text-gray-200 md:text-xl">
            Luxury holidays • Family escapes • Worldwide experiences
          </p>




          <div className="mt-12 flex flex-col gap-5 sm:flex-row">


            <a
              href="/offers"
              className="rounded-full bg-red-600 px-10 py-4 text-lg font-bold text-white transition hover:bg-red-700"
            >
              Explore Offers →
            </a>



            <a
              href="https://wa.me/38349833888"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/60 px-10 py-4 text-lg font-bold text-white transition hover:bg-white hover:text-black"
            >
              WhatsApp Us
            </a>


          </div>



        </motion.div>





        {/* Scroll Indicator */}

        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="mt-24 flex flex-col items-center"
        >

          <p className="text-xs uppercase tracking-[6px] text-white/70">
            Explore The World
          </p>


          <div className="mt-5 h-10 w-6 rounded-full border border-white/60">

            <div className="mx-auto mt-2 h-2 w-2 rounded-full bg-white" />

          </div>


        </motion.div>



      </div>


    </section>
  );
}