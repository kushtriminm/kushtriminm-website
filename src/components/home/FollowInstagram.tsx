"use client";

import { Plane } from "lucide-react";
import { motion } from "framer-motion";


export default function FollowInstagram() {

  return (

    <section className="relative overflow-hidden bg-black py-28">


      {/* Glow */}

      <div className="absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-red-600/10 blur-3xl" />



      <div className="relative mx-auto max-w-7xl px-6">



        <motion.div

          initial={{ opacity: 0, y: 40 }}

          whileInView={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.7 }}

          className="rounded-[40px] border border-white/10 bg-neutral-900/80 px-8 py-20 text-center"

        >




          <motion.div

            animate={{
              y:[0,-10,0]
            }}

            transition={{
              duration:3,
              repeat:Infinity
            }}

            className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-red-600/20 text-red-500"

          >

            <Plane size={30}/>

          </motion.div>






          <p className="text-sm uppercase tracking-[5px] text-red-500">

            Follow The Adventure

          </p>





          <h2 className="mt-6 text-5xl font-black text-white md:text-6xl">

            Discover the world

            <br />

            with us.

          </h2>





          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">

            Follow Kushtrimi NM Worldwide for luxury destinations,
            travel inspiration and exclusive holiday offers.

          </p>






          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">


            <a
              href="https://www.instagram.com/kushtriminm"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-red-600 px-10 py-4 font-semibold text-white transition hover:bg-red-700"
            >

              Explore Instagram

            </a>



            <a
              href="/offers"
              className="rounded-full border border-white/30 px-10 py-4 font-semibold text-white transition hover:border-red-500 hover:text-red-500"
            >

              View Offers

            </a>



          </div>





        </motion.div>



      </div>


    </section>

  );
}