// src/components/ReviewsSlider.tsx

"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const reviews = [
  {
    name: "Sarah M.",
    text: "Amazing service and perfect holiday.",
  },
  {
    name: "David R.",
    text: "Everything was organized perfectly.",
  },
  {
    name: "Emily K.",
    text: "Will definitely book again.",
  },
];

export default function ReviewsSlider() {
  return (
    <section className="bg-black py-24">

      <div className="mx-auto max-w-5xl px-6">

        <h2 className="mb-12 text-center text-5xl font-bold text-white">
          Traveler Reviews
        </h2>

        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 4000,
          }}
          loop
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.name}>

              <div className="rounded-3xl bg-neutral-900 p-10 text-center">

                <p className="text-yellow-400 text-3xl">
                  ★★★★★
                </p>

                <p className="mt-6 text-gray-300">
                  {review.text}
                </p>

                <p className="mt-6 font-bold text-white">
                  {review.name}
                </p>

              </div>

            </SwiperSlide>
          ))}
        </Swiper>

      </div>

    </section>
  );
}