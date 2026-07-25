"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
} from "lucide-react";


export default function Footer() {

  return (

    <footer className="border-t border-neutral-800 bg-black text-white">


      <div className="mx-auto max-w-7xl px-6 py-16">


        <div className="grid gap-12 md:grid-cols-3">





          {/* BRAND */}

          <div>


            <Image
              src="/images/logo.png"
              alt="Kushtrimi NM Worldwide"
              width={220}
              height={80}
              className="h-auto w-[220px] object-contain"
            />



            <p className="mt-6 max-w-sm leading-7 text-gray-400">

              Luxury holidays, family vacations and unforgettable experiences
              around the world.

            </p>





            <div className="mt-6 flex gap-4">


              <a
                href="https://www.instagram.com/kushtriminm"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-neutral-700 px-5 py-3 text-sm transition hover:border-red-500 hover:text-red-500"
              >

                Instagram

              </a>



            </div>



          </div>









          {/* QUICK LINKS */}


          <div>


            <h3 className="text-lg font-bold">
              Explore
            </h3>



            <div className="mt-6 flex flex-col gap-4 text-gray-400">


              <Link
                href="/"
                className="transition hover:text-white"
              >
                Home
              </Link>


              <Link
                href="/offers"
                className="transition hover:text-white"
              >
                Offers
              </Link>


              <Link
                href="/about"
                className="transition hover:text-white"
              >
                About Us
              </Link>


              <Link
                href="/contact"
                className="transition hover:text-white"
              >
                Contact
              </Link>



            </div>



          </div>









          {/* CONTACT */}


          <div>


            <h3 className="text-lg font-bold">
              Contact
            </h3>




            <div className="mt-6 space-y-5 text-gray-400">





              <div className="flex items-center gap-3">

                <Phone
                  size={19}
                  className="text-red-500"
                />

                <span>
                  +383 49 833 888
                </span>

              </div>







              <div className="flex items-center gap-3">

                <Mail
                  size={19}
                  className="text-red-500"
                />

                <span>
                  info@kushtriminm.com
                </span>

              </div>







              <div className="flex items-center gap-3">

                <MapPin
                  size={19}
                  className="text-red-500"
                />

                <span>
                  Gjakovë, Kosovo
                </span>

              </div>





            </div>






            <a
              href="https://wa.me/38349833888"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full bg-red-600 px-8 py-3 font-semibold text-white transition hover:bg-red-700"
            >

              WhatsApp Us

            </a>



          </div>





        </div>








        {/* BOTTOM BAR */}


        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-8 text-sm text-gray-500 md:flex-row">


          <p>
            © {new Date().getFullYear()} Kushtrimi NM Worldwide.
            All rights reserved.
          </p>



          <div className="flex items-center gap-2">

            <Globe size={16}/>

            Worldwide Travel Experiences

          </div>


        </div>



      </div>


    </footer>

  );
}