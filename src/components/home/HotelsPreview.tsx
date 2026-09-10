"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Star, ArrowRight } from "lucide-react";

type Hotel = {
  id: number;
  name: string;
  location: string;
  image: string;
  stars: number;
  category: string;
  tag: string;
  type: "albania" | "international";
  price?: string;
  href: string;
};

const hotels: Hotel[] = [
  {
    id: 1,
    name: "Hotel Adriatik",
    location: "Durrës, Albania",
    image: "/images/hotels/albania/hotel-adriatik.jpg",
    stars: 5,
    category: "Luxury",
    tag: "BEST SELLER",
    type: "albania",
    price: "€120 / night",
    href: "/hotels/hotel-adriatik",
  },

  {
    id: 2,
    name: "Maritim Marina Bay Resort",
    location: "Vlorë, Albania",
    image: "/images/hotels/albania/maritim.jpg",
    stars: 5,
    category: "Beach Resort",
    tag: "POPULAR",
    type: "albania",
    price: "€150 / night",
    href: "/hotels/maritim-marina-bay",
  },

  {
    id: 3,
    name: "Bougainville Bay Resort",
    location: "Sarandë, Albania",
    image: "/images/hotels/albania/bougainville.jpg",
    stars: 5,
    category: "Beach Resort",
    tag: "SUMMER",
    type: "albania",
    price: "€100 / night",
    href: "/hotels/bougainville-bay",
  },

  {
    id: 4,
    name: "Sandy Beach Resort",
    location: "Durrës, Albania",
    image: "/images/hotels/albania/sandy.jpg",
    stars: 5,
    category: "Family Resort",
    tag: "FAMILY",
    type: "albania",
    price: "€95 / night",
    href: "/hotels/sandy-beach",
  },
];

export default function HotelsPreview() {
  return (
    <section className="overflow-hidden bg-black py-20 sm:py-28">

      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        {/* HEADER */}

        <div className="mb-10 flex items-end justify-between gap-6 sm:mb-14">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-500">
              Our Collection
            </p>

            <h2 className="mt-3 text-4xl font-black text-white sm:text-5xl">
              Find Your Hotel
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
              Browse our selected hotels and resorts. Choose your favorite
              hotel and contact us to check availability and the best price.
            </p>

          </div>

          {/* DESKTOP VIEW ALL */}

          <Link
            href="/hotels"
            className="hidden shrink-0 items-center gap-2 rounded-full border border-neutral-700 px-5 py-3 text-sm font-semibold text-white transition hover:border-red-500 hover:text-red-500 sm:flex"
          >
            View All Hotels
            <ArrowRight size={17} />
          </Link>

        </div>


        {/* HOTEL CARDS */}

        <div
          className="
            -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-5
            scrollbar-hide
            sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0
            lg:grid-cols-4
          "
        >

          {hotels.map((hotel, index) => (

            <motion.article
              key={hotel.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              className="
                group
                w-[82vw]
                shrink-0
                snap-start
                overflow-hidden
                rounded-3xl
                border
                border-neutral-800
                bg-neutral-950
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-red-500/40
                hover:shadow-2xl
                hover:shadow-red-900/10
                sm:w-auto
              "
            >

              {/* IMAGE */}

              <div className="relative h-64 overflow-hidden">

                <img
                  src={hotel.image}
                  alt={hotel.name}
                  loading="lazy"
                  className="
                    h-full
                    w-full
                    object-cover
                    transition
                    duration-700
                    group-hover:scale-110
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />


                {/* TAG */}

                <div className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1.5 text-[10px] font-bold tracking-wider text-white">
                  {hotel.tag}
                </div>


                {/* STARS */}

                <div className="absolute bottom-4 left-4 flex items-center gap-1">

                  {Array.from({ length: hotel.stars }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}

                </div>

              </div>


              {/* CONTENT */}

              <div className="p-5">

                <p className="flex items-center gap-1.5 text-xs text-gray-500">
                  <MapPin size={13} className="text-red-500" />
                  {hotel.location}
                </p>

                <h3 className="mt-2 text-xl font-bold text-white">
                  {hotel.name}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  {hotel.category}
                </p>


                {/* ALBANIA PRICE */}

                {hotel.type === "albania" && hotel.price && (
                  <div className="mt-4">

                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      Starting from
                    </p>

                    <p className="mt-1 text-2xl font-bold text-red-500">
                      {hotel.price}
                    </p>

                  </div>
                )}


                {/* INTERNATIONAL */}

                {hotel.type === "international" && (
                  <p className="mt-4 text-sm italic text-gray-500">
                    Price depends on dates & availability
                  </p>
                )}


                {/* BUTTONS */}

                <div className="mt-5 flex gap-2">

                  {/* VIEW HOTEL */}

                  <Link
                    href={hotel.href}
                    className="
                      flex-1
                      rounded-full
                      border
                      border-neutral-700
                      px-3
                      py-2.5
                      text-center
                      text-xs
                      font-semibold
                      text-white
                      transition
                      hover:border-red-500
                      hover:text-red-500
                    "
                  >
                    View Hotel
                  </Link>


                  {/* ALBANIA */}

                  {hotel.type === "albania" && (
                    <a
                      href={`https://wa.me/38349833888?text=${encodeURIComponent(
                        `Hello! I am interested in ${hotel.name} in ${hotel.location}. I would like to check availability.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex-1
                        rounded-full
                        bg-red-600
                        px-3
                        py-2.5
                        text-center
                        text-xs
                        font-semibold
                        text-white
                        transition
                        hover:bg-red-700
                      "
                    >
                      Check Availability
                    </a>
                  )}


                  {/* INTERNATIONAL */}

                  {hotel.type === "international" && (
                    <a
                      href={`https://wa.me/38349833888?text=${encodeURIComponent(
                        `Hello! I am interested in ${hotel.name} in ${hotel.location}. Please send me the current price and availability.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex-1
                        rounded-full
                        bg-red-600
                        px-3
                        py-2.5
                        text-center
                        text-xs
                        font-semibold
                        text-white
                        transition
                        hover:bg-red-700
                      "
                    >
                      Ask for Price
                    </a>
                  )}

                </div>

              </div>

            </motion.article>

          ))}

        </div>


        {/* MOBILE VIEW ALL */}

        <div className="mt-7 text-center sm:hidden">

          <Link
            href="/hotels"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-700 px-6 py-3 text-sm font-semibold text-white transition hover:border-red-500 hover:text-red-500"
          >
            View All Hotels
            <ArrowRight size={17} />
          </Link>

        </div>


        {/* MOBILE SWIPE HINT */}

        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-neutral-600 sm:hidden">
          <span>Swipe to explore</span>
          <ArrowRight size={13} />
        </div>

      </div>

    </section>
  );
}