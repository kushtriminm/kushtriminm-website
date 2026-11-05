"use client";

import type { ReactNode } from "react";
import { FaFacebookF, FaInstagram, FaViber, FaWhatsapp } from "react-icons/fa";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Location from "@/components/home/Location";
import { useLang, type Lang } from "@/components/LanguageProvider";

// All the words on this page, in both languages. Change them here.
const labels = {
  sq: {
    eyebrow: "Na kontakto",
    title1: "Planifikojmë së bashku",
    title2: "udhëtimin tënd të radhës.",
    intro: "Na shkruaj, na telefono ose na vizito në zyrë. Të ndihmojmë të gjesh udhëtimin e duhur.",
    fastest: "Mënyra më e shpejtë për të na arritur",
    whatsappTitle: "Na shkruaj në WhatsApp",
    open: "Hap bisedën",
  },
  en: {
    eyebrow: "Contact us",
    title1: "Let's plan your",
    title2: "next trip.",
    intro: "Message us, call us or visit the office. We will help you find the right trip.",
    fastest: "Fastest way to reach us",
    whatsappTitle: "Message us on WhatsApp",
    open: "Open chat",
  },
};

type Row = {
  label: Record<Lang, string>;
  value: Record<Lang, string>;
  href: string;
  icon: ReactNode;
  external: boolean;
};

const same = (text: string): Record<Lang, string> => ({ sq: text, en: text });

const contacts: Row[] = [
  {
    label: { sq: "Telefon", en: "Phone" },
    value: same("+383 49 833 888"),
    href: "tel:+38349833888",
    icon: <Phone size={20} />,
    external: false,
  },
  {
    label: same("Viber"),
    value: same("+383 49 833 888"),
    href: "viber://chat?number=%2B38349833888",
    icon: <FaViber size={20} />,
    external: false,
  },
  {
    label: same("Email"),
    value: same("info@kushtriminm.com"),
    href: "mailto:info@kushtriminm.com",
    icon: <Mail size={20} />,
    external: false,
  },
  {
    label: { sq: "Zyra", en: "Office" },
    value: { sq: "Xheladin Hana, Gjakovë", en: "Xheladin Hana, Gjakova" },
    href: "https://www.google.com/maps/search/?api=1&query=42.3768706,20.4321499",
    icon: <MapPin size={20} />,
    external: true,
  },
  {
    label: same("Instagram"),
    value: same("@kushtriminm"),
    href: "https://www.instagram.com/kushtriminm",
    icon: <FaInstagram size={20} />,
    external: true,
  },
  {
    label: same("Facebook"),
    value: { sq: "Na ndiq në Facebook", en: "Follow our page" },
    href: "https://www.facebook.com/profile.php?id=61558633936209",
    icon: <FaFacebookF size={18} />,
    external: true,
  },
];

export default function ContactView() {
  const { lang } = useLang();
  const t = labels[lang];

  return (
    <>
      {/* Heading */}
      <section className="relative overflow-hidden px-5 pb-10 pt-36 text-center sm:pb-12 sm:pt-44">
        <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-[30rem] -translate-x-1/2 rounded-full bg-red-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase text-red-500">{t.eyebrow}</p>
          <h1 className="mt-3 text-balance text-2xl font-bold uppercase leading-[1.2] tracking-wide sm:text-4xl">
            {t.title1}
            <br />
            <span className="text-red-500">{t.title2}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-gray-300">{t.intro}</p>
        </div>
      </section>

      {/* Contact options */}
      <section className="px-5 pb-16 sm:pb-20">
        <div className="mx-auto max-w-4xl">
          {/* Featured: WhatsApp */}
          <a
            href="https://wa.me/38349833888"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-5 rounded-3xl border border-red-500/40 bg-gradient-to-br from-red-700 to-red-600 p-7 text-center shadow-[0_0_50px_rgba(220,38,38,0.25)] transition duration-300 hover:shadow-[0_0_70px_rgba(220,38,38,0.4)] sm:flex-row sm:justify-between sm:p-9 sm:text-left"
          >
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-white/80">
                {t.fastest}
              </p>
              <p className="mt-1 text-balance text-2xl font-extrabold uppercase tracking-wide sm:text-3xl">
                {t.whatsappTitle}
              </p>
            </div>

            <span className="flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3 font-bold text-red-600 transition group-hover:scale-105">
              <FaWhatsapp size={20} />
              {t.open}
            </span>
          </a>

          {/* Other ways: full-width rows, so long text always fits */}
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {contacts.map((item) => (
              <a
                key={item.label.en}
                href={item.href}
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-neutral-900 p-4 transition duration-300 hover:border-red-500/60 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)] sm:p-5 md:last:odd:col-span-2 md:last:odd:w-[calc(50%_-_0.375rem)] md:last:odd:justify-self-center"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-600">
                  {item.icon}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                    {item.label[lang]}
                  </span>
                  <span className="mt-0.5 block break-words font-bold">{item.value[lang]}</span>
                </span>

                <ArrowUpRight
                  size={18}
                  className="shrink-0 text-gray-600 transition group-hover:text-red-500"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      <Location />
    </>
  );
}