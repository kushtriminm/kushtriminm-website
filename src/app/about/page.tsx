"use client";

import Link from "next/link";
import CountUp from "react-countup";
import { useInView } from "framer-motion";
import { useRef } from "react";


export default function AboutPage() {


  const statsRef = useRef(null);

  const inView = useInView(statsRef, {
    once: true,
  });



  return (

    <main className="min-h-screen bg-black text-white">


      <div className="mx-auto max-w-7xl px-6 py-24">



        {/* BACK BUTTON */}

        <div className="mb-10">

          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-neutral-700 px-6 py-3 text-white transition hover:border-red-500 hover:text-red-500"
          >
            ← Back to Home
          </Link>

        </div>





        {/* HERO */}

        <section className="relative overflow-hidden rounded-[40px]">


          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600"
            alt="Luxury travel"
            className="h-[650px] w-full object-cover"
          />


          <div className="absolute inset-0 bg-black/50" />


          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">


            <div className="max-w-4xl">




              <h1 className="text-5xl font-bold leading-tight md:text-7xl">

                We don't just plan trips.
                <br />
                We create memories.

              </h1>


              <p className="mx-auto mt-8 max-w-2xl text-lg text-gray-200">

                Luxury holidays, family vacations and unforgettable experiences
                around the world.

              </p>


            </div>


          </div>


        </section>







        {/* STORY */}


        <section className="mt-32 grid items-center gap-16 md:grid-cols-2">



          <div>


            <p className="text-sm uppercase tracking-[5px] text-red-500">
              Our Journey
            </p>



            <h2 className="mt-5 text-4xl font-bold md:text-5xl">

              More than a holiday.
              <br />
              A memory for life.

            </h2>



            <p className="mt-8 text-lg leading-9 text-gray-400">

              At Kushtrimi NM Worldwide, we believe travel is about more than
              visiting places. It is about experiences, emotions and memories
              that stay with you forever.

            </p>



            <p className="mt-6 text-lg leading-9 text-gray-400">

              From Mediterranean beaches to exotic escapes, we carefully
              select destinations, hotels and experiences to create the perfect
              journey for every traveler.

            </p>



          </div>





          <div>


            <img
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1000"
              alt="Travel experience"
              className="rounded-[40px] object-cover"
            />


          </div>



        </section>









        {/* NUMBERS */}


        <section
          ref={statsRef}
          className="mt-32 border-y border-neutral-800 py-16"
        >


          <div className="grid gap-12 text-center md:grid-cols-3">





            <div>

              <h3 className="text-6xl font-bold text-red-500">


                {inView && (
                  <CountUp
                    end={10000}
                    duration={3}
                    separator=","
                  />
                )}

                +

              </h3>


              <p className="mt-3 text-gray-400">
                Happy Travelers
              </p>


            </div>







            <div>


              <h3 className="text-6xl font-bold text-red-500">


                {inView && (
                  <CountUp
                    end={250}
                    duration={3}
                    separator=","
                  />
                )}

                +

              </h3>


              <p className="mt-3 text-gray-400">
                Hotels & Resorts
              </p>


            </div>








            <div>


              <h3 className="text-6xl font-bold text-red-500">


                {inView && (
                  <CountUp
                    end={30}
                    duration={3}
                    separator=","
                  />
                )}

                +

              </h3>


              <p className="mt-3 text-gray-400">
                Destinations
              </p>


            </div>




          </div>



        </section>









        {/* JOURNEY */}


        <section className="mt-32">


          <p className="text-center text-sm uppercase tracking-[5px] text-red-500">
            How We Work
          </p>



          <h2 className="mt-5 text-center text-4xl font-bold md:text-5xl">
            Your journey starts here
          </h2>





          <div className="relative mx-auto mt-24 max-w-5xl">



            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-neutral-800 md:block" />




            <div className="space-y-32">






              <div className="relative grid items-center md:grid-cols-2">


                <div className="pr-20 text-right">


                  <h3 className="text-3xl font-bold">
                    Dream
                  </h3>


                  <p className="mt-4 text-gray-400">
                    You tell us your travel wishes and expectations.
                  </p>


                </div>



                <div className="absolute left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-red-600 font-bold">
                  01
                </div>


              </div>







              <div className="relative grid items-center md:grid-cols-2">


                <div></div>



                <div className="pl-20">


                  <h3 className="text-3xl font-bold">
                    Plan
                  </h3>


                  <p className="mt-4 text-gray-400">
                    We create a personalized holiday package for you.
                  </p>


                </div>




                <div className="absolute left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-red-600 font-bold">
                  02
                </div>



              </div>









              <div className="relative grid items-center md:grid-cols-2">


                <div className="pr-20 text-right">


                  <h3 className="text-3xl font-bold">
                    Experience
                  </h3>


                  <p className="mt-4 text-gray-400">
                    Enjoy your holiday while we take care of everything.
                  </p>


                </div>



                <div className="absolute left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-red-600 font-bold">
                  03
                </div>



              </div>




            </div>



          </div>


        </section>









        {/* DESTINATIONS */}


        <section className="mt-32">


          <h2 className="text-center text-5xl font-bold">
            Explore The World
          </h2>




          <div className="mt-12 grid gap-6 md:grid-cols-3">



            <img
              src="https://images.unsplash.com/photo-1544550285-f813152fb2fd?q=80&w=800"
              alt="Antalya"
              className="h-96 w-full rounded-3xl object-cover"
            />



            <img
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800"
              alt="Dubai"
              className="h-96 w-full rounded-3xl object-cover"
            />



            <img
              src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=800"
              alt="Maldives"
              className="h-96 w-full rounded-3xl object-cover"
            />


          </div>



        </section>









        {/* CTA */}


        <section className="mt-32 text-center">


          <h2 className="text-5xl font-bold">
            JOIN US!
          </h2>



          <p className="mx-auto mt-6 max-w-xl text-lg text-gray-400">

            Let Kushtrimi NM Worldwide create a holiday experience you will
            never forget.

          </p>



          <a
            href="https://wa.me/38349833888"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block rounded-full bg-red-600 px-10 py-4 font-semibold transition hover:bg-red-700"
          >
            Begin Your Journey
          </a>



        </section>




      </div>


    </main>

  );
}