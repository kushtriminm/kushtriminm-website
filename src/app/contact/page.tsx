"use client";

import Link from "next/link";


export default function ContactPage() {

  return (

    <main className="min-h-screen bg-black text-white">


      <div className="mx-auto max-w-7xl px-6 py-24">



        {/* Back Button */}

        <div className="mb-10">

          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-neutral-700 px-6 py-3 transition hover:border-red-500 hover:text-red-500"
          >
            ← Back to Home
          </Link>

        </div>






        {/* HERO */}

        <section className="relative overflow-hidden rounded-[40px]">


          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600"
            alt="Travel"
            className="h-[550px] w-full object-cover"
          />


          <div className="absolute inset-0 bg-black/50" />



          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">


            <div className="max-w-3xl">


              <p className="text-sm uppercase tracking-[6px] text-red-500">
                Contact Us
              </p>



              <h1 className="mt-6 text-5xl font-bold md:text-7xl">

                Let's plan your
                <br />
                next adventure

              </h1>



              <p className="mt-8 text-lg text-gray-200">

                Our travel specialists are ready to help you create the perfect
                holiday experience.

              </p>


            </div>


          </div>


        </section>









        {/* CONTACT SECTION */}


        <section className="mt-24 grid gap-16 md:grid-cols-2">





          {/* LEFT TEXT */}


          <div>


            <p className="text-sm uppercase tracking-[5px] text-red-500">
              Get In Touch
            </p>



            <h2 className="mt-5 text-4xl font-bold">

              Your dream holiday
              <br />
              starts with a message.

            </h2>



            <p className="mt-8 text-lg leading-8 text-gray-400">

              Whether you are looking for a luxury resort, family vacation or
              an unforgettable experience, our team will help you find the
              perfect destination.

            </p>



            <a
              href="https://wa.me/38349833888"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-block rounded-full bg-red-600 px-10 py-4 font-semibold transition hover:bg-red-700"
            >
              Chat on WhatsApp
            </a>



          </div>









          {/* DETAILS */}


          <div className="space-y-10 border-l border-neutral-800 pl-10">



            <div>

              <p className="text-sm uppercase tracking-wider text-gray-500">
                WhatsApp / Phone
              </p>

              <p className="mt-3 text-2xl font-semibold">
                +383 49 833 888
              </p>

            </div>





            <div>

              <p className="text-sm uppercase tracking-wider text-gray-500">
                Email
              </p>


              <p className="mt-3 text-2xl font-semibold">
                info@kushtriminm.com
              </p>


            </div>







            <div>


              <p className="text-sm uppercase tracking-wider text-gray-500">
                Office
              </p>


              <p className="mt-3 text-2xl font-semibold">
                Gjakovë, Kosovo
              </p>


            </div>







            <div>


              <p className="text-sm uppercase tracking-wider text-gray-500">
                Social Media
              </p>


              <p className="mt-3 text-2xl font-semibold">
                @kushtriminm
              </p>


            </div>




          </div>




        </section>









        {/* OFFICE / MAP STYLE SECTION */}


        <section className="mt-32 rounded-[40px] border border-neutral-800 bg-neutral-900 p-12 text-center">


          <h2 className="text-4xl font-bold">

            Visit Our Office

          </h2>



          <p className="mt-5 text-lg text-gray-400">

            We are happy to welcome you and help plan your next journey.

          </p>



          <p className="mt-8 text-xl">

            Rr. Xheladin Hana
            <br />
            Gjakovë, Kosovo

          </p>



        </section>








        {/* FINAL CTA */}


        <section className="mt-24 text-center">


          <h2 className="text-5xl font-bold">

            Ready to travel?

          </h2>



          <p className="mt-5 text-gray-400">

            Contact Kushtrimi NM Worldwide and start planning your dream holiday.

          </p>



          <a
            href="https://wa.me/38349833888"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full bg-red-600 px-10 py-4 font-semibold hover:bg-red-700"
          >
            Start Your Journey
          </a>


        </section>



      </div>


    </main>

  );
}