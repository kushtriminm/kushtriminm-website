"use client";

import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";


const testimonials = [
  {
    name: "Arben K.",
    country: "Kosovo",
    destination: "Antalya, Turkey",
    text:
      "Amazing service! Everything was perfectly organized. The hotel, transfers and support were excellent.",
  },

  {
    name: "Sara M.",
    country: "Germany",
    destination: "Dubai, UAE",
    text:
      "The best travel experience I have ever had. Everything was simple and stress free.",
  },

  {
    name: "Leon R.",
    country: "Switzerland",
    destination: "Egypt",
    text:
      "Fantastic holiday in Antalya. Professional team and unforgettable memories!",
  },
];



export default function Testimonials() {


  return (

    <section className="relative overflow-hidden bg-black py-32">


      {/* Background glow */}

      <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-red-600/10 blur-3xl" />



      <div className="relative mx-auto max-w-7xl px-6">





        {/* TITLE */}


        <div className="text-center">


          <p className="uppercase tracking-[5px] text-red-500">
            Testimonials
          </p>



          <h2 className="mt-5 text-5xl font-black text-white md:text-6xl">

            Real Travelers.
            <br />

            Real Memories.

          </h2>



        </div>








        {/* CARDS */}


        <div className="mt-20 grid gap-8 md:grid-cols-3">



          {testimonials.map((item,index)=>(


            <motion.div

              key={item.name}

              initial={{
                opacity:0,
                y:40
              }}

              whileInView={{
                opacity:1,
                y:0
              }}

              transition={{
                delay:index * 0.2
              }}

              className="group relative rounded-[35px] border border-white/10 bg-neutral-900/70 p-8 backdrop-blur-xl transition hover:-translate-y-3 hover:border-red-500/40"

            >




              {/* quote */}


              <Quote
                className="absolute right-8 top-8 text-red-500/30"
                size={50}
              />







              {/* stars */}


              <div className="flex gap-1">

                {[1,2,3,4,5].map((star)=>(

                  <Star
                    key={star}
                    size={18}
                    className="fill-red-500 text-red-500"
                  />

                ))}

              </div>








              {/* text */}


              <p className="mt-8 text-lg leading-8 text-gray-300">

                "{item.text}"

              </p>









              {/* person */}


              <div className="mt-8 flex items-center gap-4">


                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 font-bold">

                  {item.name.charAt(0)}

                </div>



                <div>


                  <h3 className="font-bold text-white">

                    {item.name}

                  </h3>


                  <p className="text-sm text-gray-400">

                    {item.country}

                  </p>


                </div>



              </div>









              {/* destination */}


              <div className="mt-6 inline-block rounded-full bg-white/5 px-4 py-2 text-sm text-gray-400">

                ✈ {item.destination}

              </div>





            </motion.div>


          ))}



        </div>



      </div>


    </section>

  );

}