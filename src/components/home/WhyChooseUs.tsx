"use client";

import { MessageCircle, Plane, ShieldCheck, Check } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";

// Edit the four reasons here, in both languages. Keep them true: they are what customers say about you.
const content = {
  sq: {
    eyebrow: "Pse ne?",
    heading: "Pse të udhëtosh me ne",
    reasons: [
      {
        title: "Përgjigje e shpejtë",
        text: "Na shkruaj në WhatsApp, na telefono ose na vizito në zyrë. Të përgjigjemi shpejt dhe me durim.",
      },
      {
        title: "Transparencë e plotë",
        text: "Çmimet, kushtet dhe pagesat shtesë të shpjegohen qartë që në fillim, pa surpriza.",
      },
      {
        title: "Gjithçka e rregulluar",
        text: "Fluturime, hotele dhe udhëtime me guidë, të organizuara nga një vend i vetëm.",
      },
      {
        title: "Kudo në botë",
        text: "Nga qytetet evropiane te plazhet e verës, të ndihmojmë të gjesh udhëtimin e duhur.",
      },
    ],
  },
  en: {
    eyebrow: "Why us?",
    heading: "Why travel with us",
    reasons: [
      {
        title: "Quick replies",
        text: "Message us on WhatsApp, call us or visit the office. We reply quickly and patiently.",
      },
      {
        title: "Full transparency",
        text: "Prices, conditions and extra payments are explained clearly from the start, with no surprises.",
      },
      {
        title: "Everything arranged",
        text: "Flights, hotels and guided tours, organised from one place.",
      },
      {
        title: "Anywhere in the world",
        text: "From European cities to summer beaches, we help you find the right trip.",
      },
    ],
  },
};

const icons = [MessageCircle, ShieldCheck, Check, Plane];

export default function WhyChooseUs() {
  const { lang } = useLang();
  const t = content[lang];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black via-neutral-950 to-black px-5 py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-[28rem] -translate-x-1/2 rounded-full bg-red-600/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase text-red-500">{t.eyebrow}</p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold uppercase tracking-wide text-white sm:text-5xl">
            {t.heading}
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 sm:mt-14 lg:grid-cols-4 lg:gap-6">
          {t.reasons.map((item, index) => {
            const Icon = icons[index];

            return (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 p-5 transition duration-300 hover:-translate-y-1 hover:border-red-500/60 hover:shadow-[0_0_40px_rgba(220,38,38,0.25)] sm:p-7"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 to-red-600/0 transition duration-300 group-hover:from-red-600/10" />

                <span className="absolute -right-1 -top-3 text-7xl font-black text-white/[0.04] transition group-hover:text-red-500/10 sm:text-8xl">
                  0{index + 1}
                </span>

                <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)] sm:h-12 sm:w-12">
                  <Icon size={22} />
                </span>

                <h3 className="relative mt-5 break-words text-base font-extrabold uppercase leading-tight tracking-wide text-white sm:text-lg">
                  {item.title}
                </h3>
                <p className="relative mt-2 text-sm leading-6 text-gray-400">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}