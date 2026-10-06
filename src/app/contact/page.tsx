import type { Metadata } from "next";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Location from "@/components/home/Location";

export const metadata: Metadata = {
  title: "Contact | Kushtrimi NM Worldwide",
  description:
    "Message us on WhatsApp, call us or visit our office in Gjakovë. We will help you find the right trip.",
};

// All the words on this page. Change them here.
const labels = {
  eyebrow: "Contact us",
  title1: "Let's plan your",
  title2: "next trip.",
  intro:
    "Message us, call us or visit the office. We will help you find the right trip.",
  fastest: "Fastest way to reach us",
  whatsappTitle: "Message us on WhatsApp",
  open: "Open chat",
};

const contacts = [
  {
    label: "Phone",
    value: "+383 49 833 888",
    href: "tel:+38349833888",
    icon: <Phone size={20} />,
    external: false,
  },
  {
    label: "Email",
    value: "info@kushtriminm.com",
    href: "mailto:info@kushtriminm.com",
    icon: <Mail size={20} />,
    external: false,
  },
  {
    label: "Office",
    value: "Xheladin Hana, Gjakovë",
    href: "https://www.google.com/maps/search/?api=1&query=42.3768706,20.4321499",
    icon: <MapPin size={20} />,
    external: true,
  },
  {
    label: "Instagram",
    value: "@kushtriminm",
    href: "https://www.instagram.com/kushtriminm",
    icon: <FaInstagram size={20} />,
    external: true,
  },
  {
    label: "Facebook",
    value: "Follow our page",
    href: "https://www.facebook.com/profile.php?id=61558633936209",
    icon: <FaFacebookF size={18} />,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <main className="bg-black text-white">
      {/* Heading */}
      <section className="relative overflow-hidden px-5 pb-10 pt-36 text-center sm:pb-12 sm:pt-44">
        <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-[30rem] -translate-x-1/2 rounded-full bg-red-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase text-red-500">
            {labels.eyebrow}
          </p>
          <h1 className="mt-3 text-2xl font-bold uppercase leading-[1.2] tracking-wide sm:text-4xl">
            {labels.title1}
            <br />
            <span className="text-red-500">{labels.title2}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-gray-300">{labels.intro}</p>
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
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white/80">
                {labels.fastest}
              </p>
              <p className="mt-1 text-2xl font-extrabold uppercase tracking-wide sm:text-3xl">
                {labels.whatsappTitle}
              </p>
            </div>

            <span className="flex items-center gap-2 rounded-full bg-white px-7 py-3 font-bold text-red-600 transition group-hover:scale-105">
              <FaWhatsapp size={20} />
              {labels.open}
            </span>
          </a>

          {/* Other ways: full-width rows, so long text always fits */}
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {contacts.map((item) => (
              <a
                key={item.label}
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-neutral-900 p-4 md:last:col-span-2 md:last:w-[calc(50%_-_0.375rem)] md:last:justify-self-center md:last:col-span-2 md:last:w-[calc(50%_-_0.375rem)] md:last:justify-self-center md:last:col-span-2 md:last:w-[calc(50%_-_0.375rem)] md:last:justify-self-center transition duration-300 hover:border-red-500/60 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)] sm:p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-600">
                  {item.icon}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block break-words font-bold">
                    {item.value}
                  </span>
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
    </main>
  );
}