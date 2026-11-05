"use client";

import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Navigation, MapPin } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";

// All the words here, in both languages. Change them here.
const labels = {
  sq: {
    eyebrow: "Vizito zyrën tonë",
    heading1: "Nis udhëtimin tënd",
    heading2: "këtu.",
    mapTitle: "Vendndodhja e zyrës së Kushtrimi NM Worldwide",
    address: "Xheladin Hana, Gjakovë",
    open: "Hapur tani",
    closed: "Mbyllur tani",
    closedDay: "Mbyllur",
    whatsapp: "Na shkruaj në WhatsApp",
    whatsappMessage: "Përshëndetje! Dua të pyes për një pushim.",
    directions: "Merr udhëzimet",
    call: "ose na telefono në",
  },
  en: {
    eyebrow: "Visit our office",
    heading1: "Start your journey",
    heading2: "here.",
    mapTitle: "Kushtrimi NM Worldwide office location",
    address: "Xheladin Hana, Gjakova",
    open: "Open now",
    closed: "Closed now",
    closedDay: "Closed",
    whatsapp: "WhatsApp us",
    whatsappMessage: "Hello! I would like to ask about a holiday.",
    directions: "Get directions",
    call: "or call",
  },
};

// Edit the hours here. days: 0 = Sunday, 1 = Monday ... 6 = Saturday.
// For a closed day, set open and close to null.
const hours: {
  label: { sq: string; en: string };
  days: number[];
  open: string | null;
  close: string | null;
}[] = [
  { label: { sq: "E hënë - E premte", en: "Monday - Friday" }, days: [1, 2, 3, 4, 5], open: "09:00", close: "19:00" },
  { label: { sq: "E shtunë", en: "Saturday" }, days: [6], open: "09:00", close: "18:00" },
  { label: { sq: "E diel", en: "Sunday" }, days: [0], open: null, close: null },
];

const directionsUrl =
  "https://www.google.com/maps/search/?api=1&query=42.3768706,20.4321499";

const mapEmbedUrl =
  "https://www.google.com/maps?q=42.3768706,20.4321499&z=16&output=embed";

const DAY_INDEX: Record<string, number> = {
  Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
};

// Current day and time in Kosovo, as "1-10:30" (day-hour:minute)
function getNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Belgrade",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${DAY_INDEX[get("weekday").slice(0, 3)]}-${get("hour")}:${get("minute")}`;
}

function subscribe(callback: () => void) {
  const id = setInterval(callback, 60000);
  return () => clearInterval(id);
}

function getStatus(now: string) {
  if (!now) return null;
  const [dayText, time] = now.split("-");
  const day = Number(dayText);
  const row = hours.find((h) => h.days.includes(day));
  const isOpen = !!row && !!row.open && !!row.close && time >= row.open && time < row.close;
  return { day, isOpen };
}

export default function Location() {
  const { lang } = useLang();
  const t = labels[lang];
  const now = useSyncExternalStore(subscribe, getNow, () => "");
  const status = getStatus(now);

  return (
    <section className="bg-gradient-to-b from-black via-neutral-950 to-black px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-red-500">{t.eyebrow}</p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold uppercase tracking-wide text-white sm:text-5xl">
            {t.heading1} <span className="text-red-500">{t.heading2}</span>
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
            title={t.mapTitle}
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
          <div className="min-w-0">
            <div className="flex items-center gap-3 text-white">
              <MapPin className="shrink-0 text-red-500" size={20} />
              <p className="break-words text-lg font-bold">{t.address}</p>
            </div>

            {status && (
              <span
                className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${
                  status.isOpen ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    status.isOpen ? "animate-pulse bg-green-400" : "bg-red-400"
                  }`}
                />
                {status.isOpen ? t.open : t.closed}
              </span>
            )}

            <dl className="mt-4 space-y-1 text-sm">
              {hours.map((row) => {
                const isToday = !!status && row.days.includes(status.day);

                return (
                  <div
                    key={row.label.en}
                    className={`flex flex-wrap items-center justify-between gap-x-6 gap-y-0.5 rounded-xl px-3 py-2 ${
                      isToday ? "bg-white/5" : ""
                    }`}
                  >
                    <dt
                      className={`flex items-center gap-2 ${
                        isToday ? "font-bold text-white" : "text-gray-400"
                      }`}
                    >
                      {isToday && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />}
                      {row.label[lang]}
                    </dt>
                    <dd className={`font-semibold ${row.open ? "text-white" : "text-gray-500"}`}>
                      {row.open ? `${row.open} - ${row.close}` : t.closedDay}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>

          <div className="flex min-w-0 flex-col gap-3">
            <a
              href={`https://wa.me/38349833888?text=${encodeURIComponent(t.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-3.5 font-bold text-white transition hover:bg-red-700"
            >
              <MessageCircle size={18} />
              {t.whatsapp}
            </a>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/30 px-4 py-3.5 font-bold text-white transition hover:bg-white hover:text-black"
            >
              <Navigation size={18} />
              {t.directions}
            </a>

            <a
              href="tel:+38349833888"
              className="text-center text-sm text-gray-400 transition hover:text-white"
            >
              {t.call} +383 49 833 888
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}