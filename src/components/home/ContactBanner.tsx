"use client";

import { Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";


export default function ContactBanner() {

  return (

    <section className="relative overflow-hidden bg-red-600 py-28">


      {/* background */}

      <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-600 to-red-500" />



      <div className="relative mx-auto max-w-5xl px-6 text-center text-white">



        <motion.div

          initial={{opacity:0,y:40}}

          whileInView={{opacity:1,y:0}}

          transition={{duration:0.7}}

        >




          <p className="text-sm uppercase tracking-[5px] text-white/80">

            Start Your Journey

          </p>






          <h2 className="mt-6 text-5xl font-black md:text-6xl">


            Ready For Your

            <br />

            Dream Holiday?


          </h2>







          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/90">


            Let Kushtrimi NM Worldwide create a personalized travel
            experience with handpicked hotels, premium destinations
            and complete support.


          </p>








          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">





            <a

              href="https://wa.me/38349833888"

              target="_blank"

              rel="noopener noreferrer"

              className="flex items-center justify-center gap-3 rounded-full bg-white px-10 py-4 font-bold text-red-600 transition hover:bg-black hover:text-white"

            >

              <MessageCircle size={20}/>

              Speak With A Travel Expert


            </a>







            <a

              href="tel:+38349833888"

              className="flex items-center justify-center gap-3 rounded-full border border-white px-10 py-4 font-bold text-white transition hover:bg-white hover:text-red-600"

            >

              <Phone size={20}/>

              Call Us


            </a>





          </div>





        </motion.div>




      </div>


    </section>

  );

}