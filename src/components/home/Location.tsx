"use client";

import { motion } from "framer-motion";
import { MessageCircle, Navigation, MapPin } from "lucide-react";

// Edit the hours here. Check they are correct before launch.
const hours = [
  { days: "Mon - Fri", time: "09:00 - 19:00" },
  { days: "Saturday", time: "09:00 - 18:00" },
  { days: "Sunday", time: "Closed" },
];

const directionsUrl =
  "https://www.google.com/maps/search/?api=1&query=42.3768706,20.4321499";

const mapEmbedUrl =
  "https://www.google.com/maps?q=42.3768706,20.4321499&z=16&output=embed";

export default function Location() {
  return (
    <section className="bg-neutral-950 px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-red-500">
            Visit our office
          </p>
          <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
            Start your journey <span className="text-red-500">here.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 overflow-hidden rounded-3xl"
        >
          <iframe
            title="Kushtrimi NM Worldwide office location"
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-64 w-full border-0 sm:h-80"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 grid gap-8 rounded-3xl bg-neutral-900 p-6 sm:grid-cols-2 sm:items-center sm:p-8"
        >
          <div>
            <div className="flex items-center gap-3 text-white">
              <MapPin className="shrink-0 text-red-500" size={20} />
              <p className="text-lg font-bold">Xheladin Hana, Gjakov&euml;</p>
            </div>

            <dl className="mt-4 space-y-1.5 text-sm">
              {hours.map((item) => (
                <div key={item.days} className="flex justify-between gap-6">
                  <dt className="text-gray-400">{item.days}</dt>
                  <dd className="font-semibold text-white">{item.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="https://wa.me/38349833888?text=Hello!%20I%20would%20like%20to%20ask%20about%20a%20holiday."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-red-600 py-3.5 font-bold text-white transition hover:bg-red-700"
            >
              <MessageCircle size={18} />
              WhatsApp us
            </a>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full border border-white/30 py-3.5 font-bold text-white transition hover:bg-white hover:text-black"
            >
              <Navigation size={18} />
              Get directions
            </a>

            <a
              href="tel:+38349833888"
              className="text-center text-sm text-gray-400 transition hover:text-white"
            >
              or call +383 49 833 888
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}